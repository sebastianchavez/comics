/* ============================================
   Store - Estado global + localStorage
   ============================================ */

const Store = (() => {
  const KEYS = {
    CART: 'comics_cart',
    USER: 'comics_user',
    USERS: 'comics_users',
    ORDERS: 'comics_orders',
    REVIEWS: 'comics_reviews',
    SESSION: 'comics_session',
    PROMOS: 'comics_promos'
  };

  // ===== Initializers =====
  function initUsers() {
    if (!localStorage.getItem(KEYS.USERS)) {
      localStorage.setItem(KEYS.USERS, JSON.stringify(MOCK_DATA.users));
    }
  }
  function initOrders() {
    if (!localStorage.getItem(KEYS.ORDERS)) {
      localStorage.setItem(KEYS.ORDERS, JSON.stringify(MOCK_DATA.orders));
    }
  }
  function initReviews() {
    if (!localStorage.getItem(KEYS.REVIEWS)) {
      localStorage.setItem(KEYS.REVIEWS, JSON.stringify(MOCK_DATA.reviews));
    }
  }
  function initPromos() {
    if (!localStorage.getItem(KEYS.PROMOS)) {
      localStorage.setItem(KEYS.PROMOS, JSON.stringify(MOCK_DATA.promos));
    }
  }
  function init() {
    initUsers();
    initOrders();
    initReviews();
    initPromos();
  }

  // ===== Helpers =====
  function read(key, fallback = null) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  }
  function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // ===== Cart =====
  const Cart = {
    getAll() { return read(KEYS.CART, []); },
    getCount() { return this.getAll().reduce((acc, i) => acc + i.quantity, 0); },
    add(productId, quantity = 1) {
      const cart = this.getAll();
      const existing = cart.find(i => i.productId === productId);
      if (existing) existing.quantity += quantity;
      else cart.push({ productId, quantity });
      write(KEYS.CART, cart);
      notify('cart:update');
    },
    update(productId, quantity) {
      let cart = this.getAll();
      if (quantity <= 0) cart = cart.filter(i => i.productId !== productId);
      else cart = cart.map(i => i.productId === productId ? { ...i, quantity } : i);
      write(KEYS.CART, cart);
      notify('cart:update');
    },
    remove(productId) {
      const cart = this.getAll().filter(i => i.productId !== productId);
      write(KEYS.CART, cart);
      notify('cart:update');
    },
    clear() {
      write(KEYS.CART, []);
      notify('cart:update');
    },
    getDetailed() {
      const cart = this.getAll();
      return cart.map(item => {
        const product = MOCK_DATA.products.find(p => p.id === item.productId);
        if (!product) return null;
        return { ...item, product, subtotal: product.price * item.quantity };
      }).filter(Boolean);
    },
    getSubtotal() {
      return this.getDetailed().reduce((acc, i) => acc + i.subtotal, 0);
    }
  };

  // ===== Auth =====
  const Auth = {
    getCurrentUser() { return read(KEYS.USER); },
    isAuthenticated() { return !!this.getCurrentUser(); },
    login(email, password) {
      const users = read(KEYS.USERS, []);
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) return { ok: false, error: 'Email o contraseña incorrectos' };
      const { password: _, ...safeUser } = user;
      write(KEYS.USER, safeUser);
      write(KEYS.SESSION, { userId: user.id, timestamp: Date.now() });
      notify('auth:login', safeUser);
      return { ok: true, user: safeUser };
    },
    register(data) {
      const users = read(KEYS.USERS, []);
      if (users.some(u => u.email === data.email)) {
        return { ok: false, error: 'Ya existe una cuenta con este email' };
      }
      const newUser = {
        id: 'u' + Date.now(),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phone: data.phone || '',
        address: data.address || null,
        registeredAt: new Date().toISOString().split('T')[0]
      };
      users.push(newUser);
      write(KEYS.USERS, users);
      const { password: _, ...safeUser } = newUser;
      write(KEYS.USER, safeUser);
      notify('auth:login', safeUser);
      return { ok: true, user: safeUser };
    },
    updateProfile(data) {
      const current = this.getCurrentUser();
      if (!current) return { ok: false, error: 'No autenticado' };
      const users = read(KEYS.USERS, []);
      const idx = users.findIndex(u => u.id === current.id);
      if (idx === -1) return { ok: false, error: 'Usuario no encontrado' };
      users[idx] = { ...users[idx], ...data };
      write(KEYS.USERS, users);
      const { password: _, ...safeUser } = users[idx];
      write(KEYS.USER, safeUser);
      notify('auth:update', safeUser);
      return { ok: true, user: safeUser };
    },
    logout() {
      localStorage.removeItem(KEYS.USER);
      localStorage.removeItem(KEYS.SESSION);
      notify('auth:logout');
    },
    requestPasswordReset(email) {
      const users = read(KEYS.USERS, []);
      const user = users.find(u => u.email === email);
      // Simula el envío de correo (no revelar si el email existe o no por seguridad)
      return { ok: true, message: 'Si el email existe, recibirás un enlace para restablecer tu contraseña.' };
    },
    resetPassword(email, newPassword) {
      const users = read(KEYS.USERS, []);
      const idx = users.findIndex(u => u.email === email);
      if (idx === -1) return { ok: false, error: 'Email no encontrado' };
      users[idx].password = newPassword;
      write(KEYS.USERS, users);
      return { ok: true };
    }
  };

  // ===== Orders =====
  const Orders = {
    getAll() { return read(KEYS.ORDERS, []); },
    getByUser(userId) { return this.getAll().filter(o => o.userId === userId).sort((a,b) => new Date(b.date) - new Date(a.date)); },
    getById(orderId) { return this.getAll().find(o => o.id === orderId); },
    create(orderData) {
      const orders = this.getAll();
      const date = new Date();
      const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
      const newOrder = {
        id: `ORD-${dateStr}-${String(orders.length + 1).padStart(3, '0')}`,
        userId: orderData.userId,
        date: date.toISOString().split('T')[0],
        status: 'pendiente',
        items: orderData.items,
        subtotal: orderData.subtotal,
        shipping: orderData.shipping,
        shippingMethod: orderData.shippingMethod,
        total: orderData.total,
        payment: orderData.payment,
        address: orderData.address,
        tracking: null
      };
      orders.push(newOrder);
      write(KEYS.ORDERS, orders);
      return newOrder;
    },
    updateStatus(orderId, status) {
      const orders = this.getAll();
      const idx = orders.findIndex(o => o.id === orderId);
      if (idx === -1) return null;
      orders[idx].status = status;
      write(KEYS.ORDERS, orders);
      return orders[idx];
    }
  };

  // ===== Reviews =====
  const Reviews = {
    getAll() { return read(KEYS.REVIEWS, []); },
    getByProduct(productId) { return this.getAll().filter(r => r.productId === productId).sort((a,b) => new Date(b.date) - new Date(a.date)); },
    add(review) {
      const reviews = this.getAll();
      const newReview = {
        id: 'r' + Date.now(),
        productId: review.productId,
        userId: review.userId,
        userName: review.userName,
        rating: review.rating,
        title: review.title,
        comment: review.comment,
        date: new Date().toISOString().split('T')[0],
        helpful: 0
      };
      reviews.push(newReview);
      write(KEYS.REVIEWS, reviews);
      return newReview;
    },
    hasUserReviewed(productId, userId) {
      return this.getAll().some(r => r.productId === productId && r.userId === userId);
    },
    getStats(productId) {
      const productReviews = this.getByProduct(productId);
      if (productReviews.length === 0) return { count: 0, average: 0, distribution: [0,0,0,0,0] };
      const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
      const distribution = [5,4,3,2,1].map(star => productReviews.filter(r => r.rating === star).length);
      return {
        count: productReviews.length,
        average: sum / productReviews.length,
        distribution
      };
    }
  };

  // ===== Promos =====
  const Promos = {
    getAll() { return read(KEYS.PROMOS, []); },
    findByCode(code) {
      return this.getAll().find(p => p.code.toUpperCase() === code.toUpperCase());
    },
    apply(code, subtotal) {
      const promo = this.findByCode(code);
      if (!promo) return { ok: false, error: 'Código no válido' };
      if (subtotal < promo.minPurchase) {
        return { ok: false, error: `Compra mínima de $${promo.minPurchase} requerida` };
      }
      if (promo.type === 'percent') {
        return { ok: true, discount: subtotal * promo.discount / 100, type: 'percent' };
      }
      if (promo.type === 'shipping') {
        return { ok: true, discount: 0, freeShipping: true, type: 'shipping' };
      }
      return { ok: false, error: 'Promoción no aplicable' };
    }
  };

  // ===== Event system =====
  const listeners = {};
  function on(event, callback) {
    if (!listeners[event]) listeners[event] = [];
    listeners[event].push(callback);
  }
  function notify(event, data) {
    if (listeners[event]) listeners[event].forEach(cb => cb(data));
  }

  return { init, Cart, Auth, Orders, Reviews, Promos, on, notify, KEYS };
})();

window.Store = Store;
