/* ============================================
   Checkout Page - Confirmación de pago
   ============================================ */

(function() {
  Components.init('products');

  const SHIPPING_METHODS = [
    { id: 'standard', name: 'Estándar', desc: '2-3 días laborables', price: 4.99 },
    { id: 'express', name: 'Express', desc: '24 horas', price: 6.99 },
    { id: 'pickup', name: 'Recogida en tienda', desc: 'Gratis · Calle Mayor 123, Madrid', price: 0 }
  ];

  const PAYMENT_METHODS = [
    { id: 'card', name: 'Tarjeta de crédito/débito', icon: '💳' },
    { id: 'paypal', name: 'PayPal', icon: '🅿️' },
    { id: 'transfer', name: 'Transferencia bancaria', icon: '🏦' },
    { id: 'cash', name: 'Contra reembolso', icon: '💵' }
  ];

  let state = {
    shippingMethod: 'standard',
    paymentMethod: 'card',
    useAccountAddress: true
  };

  function render() {
    const items = Store.Cart.getDetailed();
    const subtotal = Store.Cart.getSubtotal();
    const shippingCost = SHIPPING_METHODS.find(m => m.id === state.shippingMethod).price;
    const total = subtotal + shippingCost;
    const user = Store.Auth.getCurrentUser();

    if (items.length === 0) {
      document.getElementById('checkout-content').innerHTML = `
        <div class="text-center py-16">
          <div class="text-7xl mb-4">🛒</div>
          <h2 class="font-comic text-3xl mb-3">No hay productos en tu carrito</h2>
          <a href="productos.html" class="btn-comic">Ver catálogo</a>
        </div>
      `;
      return;
    }

    document.getElementById('checkout-content').innerHTML = `
      <form id="checkout-form" onsubmit="CheckoutPage.submit(event)" class="grid lg:grid-cols-[1fr_360px] gap-8">
        <div class="space-y-6">

          <!-- Login prompt -->
          ${!user ? `
            <div class="comic-card-flat p-4 bg-comic-yellow flex items-center justify-between flex-wrap gap-3">
              <p class="text-sm">¿Ya tienes cuenta? <a href="login.html?redirect=checkout.html" class="font-bold underline">Inicia sesión</a> para usar tu información.</p>
              <p class="text-xs">O continúa como invitado ↓</p>
            </div>
          ` : `
            <div class="comic-card-flat p-4 bg-green-50 border-green-300">
              <p class="text-sm">Comprando como: <strong>${user.firstName} ${user.lastName}</strong> (${user.email})</p>
            </div>
          `}

          <!-- Address -->
          <div class="comic-card p-6 bg-white">
            <h3 class="font-comic text-2xl mb-1">1. Dirección de envío</h3>
            <p class="text-sm text-gray-600 mb-4">¿Dónde enviaremos tu pedido?</p>

            ${user && state.useAccountAddress && user.address ? `
              <div class="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <p class="font-semibold">${user.firstName} ${user.lastName}</p>
                <p class="text-sm text-gray-700">${user.address.street}</p>
                <p class="text-sm text-gray-700">${user.address.zip} ${user.address.city}, ${user.address.state}</p>
                <p class="text-sm text-gray-700">${user.address.country}</p>
                <button type="button" onclick="CheckoutPage.useDifferentAddress()" class="text-xs text-comic-red hover:underline mt-2">Usar otra dirección</button>
              </div>
            ` : `
              <div class="grid sm:grid-cols-2 gap-3">
                <div class="sm:col-span-2">
                  <label class="block text-sm font-semibold mb-1">Nombre completo *</label>
                  <input type="text" name="name" required value="${user ? user.firstName + ' ' + user.lastName : ''}" class="input-comic">
                </div>
                <div class="sm:col-span-2">
                  <label class="block text-sm font-semibold mb-1">Calle y número *</label>
                  <input type="text" name="street" required value="${user?.address?.street || ''}" class="input-comic" placeholder="Calle Mayor 123">
                </div>
                <div>
                  <label class="block text-sm font-semibold mb-1">Ciudad *</label>
                  <input type="text" name="city" required value="${user?.address?.city || ''}" class="input-comic">
                </div>
                <div>
                  <label class="block text-sm font-semibold mb-1">Provincia *</label>
                  <input type="text" name="state" required value="${user?.address?.state || ''}" class="input-comic">
                </div>
                <div>
                  <label class="block text-sm font-semibold mb-1">Código postal *</label>
                  <input type="text" name="zip" required value="${user?.address?.zip || ''}" class="input-comic">
                </div>
                <div>
                  <label class="block text-sm font-semibold mb-1">País *</label>
                  <select name="country" required class="input-comic">
                    <option ${(!user?.address?.country || user.address.country === 'España') ? 'selected' : ''}>España</option>
                    <option ${user?.address?.country === 'Portugal' ? 'selected' : ''}>Portugal</option>
                    <option ${user?.address?.country === 'Francia' ? 'selected' : ''}>Francia</option>
                    <option ${user?.address?.country === 'Italia' ? 'selected' : ''}>Italia</option>
                  </select>
                </div>
                <div class="sm:col-span-2">
                  <label class="block text-sm font-semibold mb-1">Teléfono de contacto</label>
                  <input type="tel" name="phone" value="${user?.phone || ''}" class="input-comic">
                </div>
              </div>
            `}
          </div>

          <!-- Shipping -->
          <div class="comic-card p-6 bg-white">
            <h3 class="font-comic text-2xl mb-1">2. Tipo de envío</h3>
            <p class="text-sm text-gray-600 mb-4">Selecciona cómo quieres recibir tu pedido</p>
            <div class="space-y-2">
              ${SHIPPING_METHODS.map(m => `
                <label class="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${state.shippingMethod === m.id ? 'border-comic-red bg-red-50' : 'border-gray-200 hover:border-gray-300'}">
                  <input type="radio" name="shipping" value="${m.id}" ${state.shippingMethod === m.id ? 'checked' : ''} onchange="CheckoutPage.setShipping('${m.id}')" class="accent-comic-red">
                  <div class="flex-1">
                    <p class="font-bold">${m.name}</p>
                    <p class="text-sm text-gray-600">${m.desc}</p>
                  </div>
                  <p class="font-bold text-comic-red">${m.price === 0 ? 'Gratis' : Helpers.formatPrice(m.price)}</p>
                </label>
              `).join('')}
            </div>
          </div>

          <!-- Payment -->
          <div class="comic-card p-6 bg-white">
            <h3 class="font-comic text-2xl mb-1">3. Medio de pago</h3>
            <p class="text-sm text-gray-600 mb-4">Selecciona cómo pagarás tu compra</p>
            <div class="grid sm:grid-cols-2 gap-2">
              ${PAYMENT_METHODS.map(m => `
                <label class="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${state.paymentMethod === m.id ? 'border-comic-red bg-red-50' : 'border-gray-200 hover:border-gray-300'}">
                  <input type="radio" name="payment" value="${m.id}" ${state.paymentMethod === m.id ? 'checked' : ''} onchange="CheckoutPage.setPayment('${m.id}')" class="accent-comic-red">
                  <span class="text-2xl">${m.icon}</span>
                  <span class="font-semibold text-sm">${m.name}</span>
                </label>
              `).join('')}
            </div>

            <!-- Card fields -->
            ${state.paymentMethod === 'card' ? `
              <div class="mt-4 p-4 bg-gray-50 rounded-lg space-y-3">
                <div>
                  <label class="block text-sm font-semibold mb-1">Número de tarjeta *</label>
                  <input type="text" name="cardNumber" required maxlength="19" placeholder="4242 4242 4242 4242" class="input-comic" oninput="CheckoutPage.formatCard(this)">
                </div>
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-sm font-semibold mb-1">Vencimiento *</label>
                    <input type="text" name="cardExpiry" required maxlength="5" placeholder="MM/YY" class="input-comic" oninput="CheckoutPage.formatExpiry(this)">
                  </div>
                  <div>
                    <label class="block text-sm font-semibold mb-1">CVV *</label>
                    <input type="text" name="cardCvv" required maxlength="4" placeholder="123" class="input-comic">
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-semibold mb-1">Titular de la tarjeta *</label>
                  <input type="text" name="cardName" required class="input-comic" placeholder="Como aparece en la tarjeta">
                </div>
              </div>
            ` : ''}
          </div>

          <!-- Notes -->
          <div class="comic-card p-6 bg-white">
            <h3 class="font-bold mb-3">Notas del pedido</h3>
            <textarea name="notes" rows="3" class="input-comic resize-none" placeholder="Instrucciones especiales para la entrega..."></textarea>
          </div>
        </div>

        <!-- Summary -->
        <aside class="self-start sticky top-4">
          <div class="comic-card p-6 bg-white">
            <h3 class="font-comic text-2xl mb-4">Resumen del pedido</h3>

            <div class="space-y-3 mb-5 max-h-60 overflow-y-auto">
              ${items.map(item => `
                <div class="flex gap-3 text-sm">
                  <img src="${item.product.images[0]}" alt="" class="w-12 h-16 object-cover rounded border border-gray-200">
                  <div class="flex-1 min-w-0">
                    <p class="font-semibold line-clamp-1">${item.product.title}</p>
                    <p class="text-xs text-gray-500">Cant: ${item.quantity}</p>
                  </div>
                  <p class="font-bold">${Helpers.formatPrice(item.subtotal)}</p>
                </div>
              `).join('')}
            </div>

            <div class="border-t-2 border-gray-200 pt-3 space-y-2 text-sm">
              <div class="flex justify-between"><span>Subtotal</span><span class="font-semibold">${Helpers.formatPrice(subtotal)}</span></div>
              <div class="flex justify-between"><span>Envío (${SHIPPING_METHODS.find(m => m.id === state.shippingMethod).name})</span><span class="font-semibold">${shippingCost === 0 ? 'Gratis' : Helpers.formatPrice(shippingCost)}</span></div>
              <div class="flex justify-between text-lg font-bold border-t-2 border-gray-200 pt-2 mt-2">
                <span>Total</span><span class="text-comic-red">${Helpers.formatPrice(total)}</span>
              </div>
            </div>

            <button type="submit" class="btn-comic btn-comic-lg w-full mt-6">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              Confirmar compra
            </button>

            <p class="text-xs text-gray-500 text-center mt-3">
              Al confirmar aceptas nuestros <a href="terminos-condiciones.html" class="text-comic-red hover:underline">términos</a>
            </p>
          </div>
        </aside>
      </form>
    `;
  }

  window.CheckoutPage = {
    setShipping(id) { state.shippingMethod = id; render(); },
    setPayment(id) { state.paymentMethod = id; render(); },
    useDifferentAddress() { state.useAccountAddress = false; render(); },
    formatCard(input) {
      let v = input.value.replace(/\D/g, '').substring(0, 16);
      input.value = v.replace(/(.{4})/g, '$1 ').trim();
    },
    formatExpiry(input) {
      let v = input.value.replace(/\D/g, '').substring(0, 4);
      if (v.length >= 3) v = v.substring(0, 2) + '/' + v.substring(2);
      input.value = v;
    },
    submit(e) {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const user = Store.Auth.getCurrentUser();
      const items = Store.Cart.getDetailed();
      const subtotal = Store.Cart.getSubtotal();
      const shippingCost = SHIPPING_METHODS.find(m => m.id === state.shippingMethod).price;

      // Gather address
      let address = null;
      if (state.shippingMethod !== 'pickup') {
        if (user && state.useAccountAddress && user.address) {
          address = { ...user.address };
        } else {
          address = {
            street: formData.get('street'),
            city: formData.get('city'),
            state: formData.get('state'),
            zip: formData.get('zip'),
            country: formData.get('country')
          };
        }
      }

      // Validate address
      if (state.shippingMethod !== 'pickup' && (!address.street || !address.city || !address.zip)) {
        Helpers.toast('Por favor completa la dirección', 'error');
        return;
      }

      // Validate payment fields
      if (state.paymentMethod === 'card') {
        const num = (formData.get('cardNumber') || '').replace(/\s/g, '');
        if (num.length < 13) { Helpers.toast('Número de tarjeta inválido', 'error'); return; }
      }

      // Create order (requires user)
      if (!user) {
        Helpers.confirm('Necesitas una cuenta para finalizar la compra. ¿Crear una cuenta rápida?')
          .then(ok => {
            if (ok) window.location.href = `registro.html?redirect=checkout.html`;
          });
        return;
      }

      const order = Store.Orders.create({
        userId: user.id,
        items: items.map(i => ({
          productId: i.product.id,
          title: i.product.title,
          price: i.product.price,
          quantity: i.quantity,
          image: i.product.images[0]
        })),
        subtotal,
        shipping: shippingCost,
        shippingMethod: state.shippingMethod,
        total: subtotal + shippingCost,
        payment: {
          method: state.paymentMethod,
          last4: state.paymentMethod === 'card' ? (formData.get('cardNumber') || '').replace(/\s/g, '').slice(-4) : null
        },
        address
      });

      // Save order info to session for confirmation page
      sessionStorage.setItem('last_order_id', order.id);
      Store.Cart.clear();
      window.location.href = 'confirmacion.html';
    }
  };

  document.addEventListener('DOMContentLoaded', render);
})();