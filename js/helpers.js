/* ============================================
   Helpers - Utilidades comunes
   ============================================ */

const Helpers = (() => {

  // ===== Formatting =====
  function formatPrice(amount) {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD' }).format(amount);
  }
  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  function formatDateShort(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
  }
  function formatNumber(n) {
    return new Intl.NumberFormat('es-ES').format(n);
  }

  // ===== Validation =====
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  function isValidPassword(pwd) {
    return pwd && pwd.length >= 6;
  }
  function isValidName(name) {
    return name && name.trim().length >= 2;
  }
  function isValidPhone(phone) {
    if (!phone) return true;
    return /^[\+\d\s\-\(\)]{7,}$/.test(phone);
  }
  function isValidZip(zip) {
    if (!zip) return true;
    return /^[0-9]{4,10}$/.test(zip);
  }

  // ===== URL params =====
  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }
  function setParam(name, value) {
    const url = new URL(window.location);
    if (value) url.searchParams.set(name, value);
    else url.searchParams.delete(name);
    window.history.replaceState({}, '', url);
  }

  // ===== Toast notifications =====
  let toastContainer = null;
  function ensureToastContainer() {
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }
    return toastContainer;
  }
  function toast(message, type = 'info', duration = 3000) {
    const container = ensureToastContainer();
    const icons = { success: '✓', error: '✕', info: 'ℹ' };
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `
      <span class="font-bold text-lg">${icons[type] || '•'}</span>
      <span class="flex-1">${message}</span>
    `;
    container.appendChild(el);
    setTimeout(() => el.remove(), duration + 300);
  }

  // ===== Modal =====
  function showModal(html, options = {}) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `<div class="modal-content">${html}</div>`;
    overlay.addEventListener('click', (e) => { if (e.target === overlay && options.dismissible !== false) close(); });
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    return {
      element: overlay,
      close() {
        overlay.remove();
        document.body.style.overflow = '';
        if (options.onClose) options.onClose();
      }
    };
    function close() {
      overlay.remove();
      document.body.style.overflow = '';
      if (options.onClose) options.onClose();
    }
  }

  // ===== Star rating HTML =====
  function starsHTML(rating, max = 5, interactive = false) {
    const stars = [];
    for (let i = 1; i <= max; i++) {
      const filled = i <= Math.round(rating);
      stars.push(`<span class="star ${filled ? 'filled' : ''} ${interactive ? 'cursor-pointer text-2xl' : 'text-base'}" data-value="${i}">★</span>`);
    }
    return `<div class="star-rating ${interactive ? 'star-rating-interactive' : ''} inline-flex gap-0.5">${stars.join('')}</div>`;
  }

  // ===== Product card HTML =====
  function productCardHTML(product) {
    const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
    return `
      <a href="producto-detalle.html?id=${product.id}" class="comic-card-flat overflow-hidden block group">
        <div class="relative aspect-[3/4] bg-gray-100 overflow-hidden">
          <img src="${product.images[0]}" alt="${product.title}" loading="lazy"
               class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
          ${product.badge ? `<span class="absolute top-2 left-2 bg-comic-red text-white text-xs font-bold px-2 py-1 rounded border-2 border-comic-dark">${product.badge}</span>` : ''}
          ${discount > 0 ? `<span class="absolute top-2 right-2 bg-comic-yellow text-comic-dark text-xs font-bold px-2 py-1 rounded border-2 border-comic-dark">-${discount}%</span>` : ''}
        </div>
        <div class="p-4">
          <p class="text-xs text-gray-500 uppercase tracking-wide">${product.author}</p>
          <h3 class="font-bold text-sm md:text-base mt-1 line-clamp-2 min-h-[2.5rem] group-hover:text-comic-red transition-colors">${product.title}</h3>
          <div class="mt-2 flex items-center gap-1">
            <span class="text-comic-yellow text-sm">★</span>
            <span class="text-sm font-semibold">${product.rating}</span>
            <span class="text-xs text-gray-500">(${product.reviewsCount})</span>
          </div>
          <div class="mt-3 flex items-baseline gap-2">
            <span class="text-lg font-bold text-comic-red">${formatPrice(product.price)}</span>
            ${product.originalPrice ? `<span class="text-sm text-gray-400 line-through">${formatPrice(product.originalPrice)}</span>` : ''}
          </div>
        </div>
      </a>
    `;
  }

  // ===== Category chip =====
  function categoryChipHTML(category) {
    const colors = {
      red: 'bg-red-100 text-red-700 border-red-300',
      yellow: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      pink: 'bg-pink-100 text-pink-700 border-pink-300',
      purple: 'bg-purple-100 text-purple-700 border-purple-300',
      blue: 'bg-blue-100 text-blue-700 border-blue-300',
      green: 'bg-green-100 text-green-700 border-green-300'
    };
    return `
      <a href="productos.html?categoria=${category.slug}" class="comic-card-flat p-6 text-center group">
        <div class="text-5xl mb-3 animate-float">${category.icon}</div>
        <h3 class="font-bold text-lg group-hover:text-comic-red transition-colors">${category.name}</h3>
        <p class="text-sm text-gray-500 mt-1">${category.count} productos</p>
      </a>
    `;
  }

  // ===== Status badge =====
  function statusBadgeHTML(status) {
    const labels = {
      pendiente: 'Pendiente',
      enviado: 'Enviado',
      entregado: 'Entregado',
      cancelado: 'Cancelado'
    };
    return `<span class="status-badge status-${status}">${labels[status] || status}</span>`;
  }

  // ===== Confirm dialog =====
  function confirm(message, title = '¿Estás seguro?') {
    return new Promise((resolve) => {
      const modal = showModal(`
        <div class="p-6">
          <h3 class="text-xl font-bold mb-2">${title}</h3>
          <p class="text-gray-600 mb-6">${message}</p>
          <div class="flex gap-3 justify-end">
            <button class="btn-comic btn-comic-outline" data-action="cancel">Cancelar</button>
            <button class="btn-comic" data-action="confirm">Confirmar</button>
          </div>
        </div>
      `);
      modal.element.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        if (action === 'confirm') { modal.close(); resolve(true); }
        if (action === 'cancel') { modal.close(); resolve(false); }
      });
    });
  }

  // ===== Login required modal =====
  function requireLogin(redirectAfter = window.location.href) {
    return new Promise((resolve) => {
      const modal = showModal(`
        <div class="p-6 text-center">
          <div class="text-5xl mb-3">🔒</div>
          <h3 class="text-xl font-bold mb-2">Inicia sesión</h3>
          <p class="text-gray-600 mb-6">Necesitas una cuenta para continuar</p>
          <div class="flex gap-3">
            <a href="login.html?redirect=${encodeURIComponent(redirectAfter)}" class="btn-comic flex-1">Iniciar sesión</a>
            <a href="registro.html?redirect=${encodeURIComponent(redirectAfter)}" class="btn-comic btn-comic-outline flex-1">Registrarse</a>
          </div>
          <button class="mt-4 text-sm text-gray-500 hover:text-comic-red" data-action="close">Cancelar</button>
        </div>
      `);
      modal.element.addEventListener('click', (e) => {
        if (e.target.dataset.action === 'close') { modal.close(); resolve(false); }
      });
    });
  }

  return {
    formatPrice, formatDate, formatDateShort, formatNumber,
    isValidEmail, isValidPassword, isValidName, isValidPhone, isValidZip,
    getParam, setParam,
    toast, showModal, confirm, requireLogin,
    starsHTML, productCardHTML, categoryChipHTML, statusBadgeHTML
  };
})();

window.Helpers = Helpers;
