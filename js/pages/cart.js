/* ============================================
   Cart Page
   ============================================ */

(function() {
  Components.init('products');

  let appliedPromo = null;

  function render() {
    const items = Store.Cart.getDetailed();
    const container = document.getElementById('cart-content');
    const subtotal = Store.Cart.getSubtotal();

    if (items.length === 0) {
      container.innerHTML = `
        <div class="text-center py-16 max-w-md mx-auto">
          <div class="text-7xl mb-4">🛒</div>
          <h2 class="font-comic text-3xl mb-3">Tu carrito está vacío</h2>
          <p class="text-gray-600 mb-6">¡Descubre nuestras historias favoritas y empieza tu colección!</p>
          <a href="productos.html" class="btn-comic btn-comic-lg">
            Explorar catálogo
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </a>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="grid lg:grid-cols-[1fr_360px] gap-8">
        <!-- Items list -->
        <div class="space-y-3">
          ${items.map(item => `
            <div class="comic-card-flat p-4 bg-white flex flex-col sm:flex-row gap-4">
              <a href="producto-detalle.html?id=${item.product.id}" class="shrink-0 w-24 sm:w-28">
                <img src="${item.product.images[0]}" alt="${item.product.title}" class="w-full aspect-[3/4] object-cover rounded-lg border-2 border-gray-200">
              </a>
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-2">
                  <div class="min-w-0">
                    <p class="text-xs text-gray-500 uppercase">${item.product.author}</p>
                    <a href="producto-detalle.html?id=${item.product.id}" class="font-bold hover:text-comic-red line-clamp-2">${item.product.title}</a>
                  </div>
                  <button onclick="CartPage.remove('${item.product.id}')" class="text-gray-400 hover:text-red-600 shrink-0" aria-label="Eliminar">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </div>
                <div class="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <div class="flex items-center border-2 border-comic-dark rounded-lg overflow-hidden">
                    <button onclick="CartPage.changeQty('${item.product.id}', -1)" class="px-3 py-1 hover:bg-gray-100">−</button>
                    <span class="px-4 py-1 border-x-2 border-comic-dark font-bold">${item.quantity}</span>
                    <button onclick="CartPage.changeQty('${item.product.id}', 1)" class="px-3 py-1 hover:bg-gray-100">+</button>
                  </div>
                  <div class="text-right">
                    <p class="font-bold text-lg text-comic-red">${Helpers.formatPrice(item.subtotal)}</p>
                    <p class="text-xs text-gray-500">${Helpers.formatPrice(item.product.price)} c/u</p>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
          <div class="flex justify-between items-center pt-3">
            <a href="productos.html" class="text-comic-red hover:underline flex items-center gap-2 text-sm">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
              Seguir comprando
            </a>
            <button onclick="CartPage.clear()" class="text-sm text-gray-500 hover:text-red-600">Vaciar carrito</button>
          </div>
        </div>

        <!-- Summary -->
        <aside class="self-start sticky top-4">
          <div class="comic-card p-6 bg-white">
            <h3 class="font-comic text-2xl mb-4">Resumen</h3>

            <!-- Promo -->
            <div class="mb-4 pb-4 border-b border-gray-200">
              <label class="block text-sm font-semibold mb-2">Código promocional</label>
              ${appliedPromo ? `
                <div class="flex items-center justify-between bg-green-50 border border-green-300 rounded-lg px-3 py-2">
                  <div>
                    <span class="font-bold text-green-700 text-sm">${appliedPromo.code}</span>
                    <span class="text-xs text-green-600 ml-1">${appliedPromo.description}</span>
                  </div>
                  <button onclick="CartPage.removePromo()" class="text-red-600 hover:text-red-800 text-xs font-bold">Quitar</button>
                </div>
              ` : `
                <form onsubmit="CartPage.applyPromo(event)" class="flex gap-2">
                  <input type="text" name="code" placeholder="BIENVENIDO10" class="input-comic flex-1 py-2 text-sm uppercase">
                  <button type="submit" class="btn-comic btn-comic-sm">Aplicar</button>
                </form>
              `}
            </div>

            <div class="space-y-2 text-sm">
              <div class="flex justify-between"><span>Subtotal</span><span class="font-semibold">${Helpers.formatPrice(subtotal)}</span></div>
              <div class="flex justify-between"><span>Envío</span><span class="font-semibold" id="shipping-cost">Calculado en checkout</span></div>
              ${appliedPromo && appliedPromo.discount > 0 ? `<div class="flex justify-between text-green-600"><span>Descuento</span><span class="font-semibold">-${Helpers.formatPrice(appliedPromo.discount)}</span></div>` : ''}
              <div class="border-t-2 border-gray-200 pt-2 mt-2 flex justify-between text-lg font-bold">
                <span>Total estimado</span><span class="text-comic-red">${Helpers.formatPrice(subtotal - (appliedPromo?.discount || 0))}</span>
              </div>
            </div>

            <a href="checkout.html" class="btn-comic btn-comic-lg w-full mt-6">
              Ir al checkout
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>

            <div class="mt-4 text-xs text-gray-500 text-center">
              🔒 Pago 100% seguro · SSL encriptado
            </div>
          </div>
        </aside>
      </div>
    `;
  }

  window.CartPage = {
    changeQty(productId, delta) {
      const items = Store.Cart.getDetailed();
      const item = items.find(i => i.productId === productId);
      if (!item) return;
      const newQty = item.quantity + delta;
      Store.Cart.update(productId, newQty);
      render();
    },
    remove(productId) {
      Store.Cart.remove(productId);
      Helpers.toast('Producto eliminado', 'info');
      render();
    },
    clear() {
      Helpers.confirm('¿Vaciar todo el carrito?').then(ok => {
        if (ok) { Store.Cart.clear(); appliedPromo = null; render(); }
      });
    },
    applyPromo(e) {
      e.preventDefault();
      const code = e.target.code.value.trim();
      const subtotal = Store.Cart.getSubtotal();
      const result = Store.Promos.apply(code, subtotal);
      if (!result.ok) { Helpers.toast(result.error, 'error'); return; }
      appliedPromo = { code: code.toUpperCase(), ...Store.Promos.findByCode(code), discount: result.discount, freeShipping: result.freeShipping };
      Helpers.toast('¡Código aplicado!', 'success');
      render();
    },
    removePromo() { appliedPromo = null; render(); }
  };

  document.addEventListener('DOMContentLoaded', render);
})();