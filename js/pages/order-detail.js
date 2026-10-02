/* ============================================
   Order Detail Page
   ============================================ */

(function() {
  Components.init('profile');

  function render() {
    const user = Store.Auth.getCurrentUser();
    const container = document.getElementById('order-detail-content');
    const orderId = Helpers.getParam('id');
    const order = Store.Orders.getById(orderId);

    if (!order || (user && order.userId !== user.id)) {
      container.innerHTML = `
        <div class="text-center py-16">
          <div class="text-6xl mb-4">😕</div>
          <h2 class="font-comic text-3xl mb-3">Pedido no encontrado</h2>
          <a href="perfil.html" class="btn-comic">Ver mis pedidos</a>
        </div>
      `;
      return;
    }

    const paymentMethodNames = { card: 'Tarjeta', paypal: 'PayPal', transfer: 'Transferencia', cash: 'Contra reembolso' };
    const shippingNames = { standard: 'Estándar (2-3 días)', express: 'Express (24h)', pickup: 'Recogida en tienda' };

    // Check if all products have been reviewed
    const reviewedProducts = order.items.filter(item => Store.Reviews.hasUserReviewed(item.productId, order.userId)).map(i => i.productId);

    container.innerHTML = `
      <div class="max-w-5xl mx-auto">
        <!-- Header -->
        <div class="flex flex-wrap items-start justify-between gap-3 mb-6">
          <div>
            <nav class="text-sm text-gray-500 mb-2">
              <a href="perfil.html" class="hover:text-comic-red">Mi perfil</a>
              <span class="mx-1">/</span>
              <a href="perfil.html#pedidos" class="hover:text-comic-red">Mis pedidos</a>
              <span class="mx-1">/</span>
              <span class="text-comic-red font-semibold">${order.id}</span>
            </nav>
            <h1 class="font-comic text-3xl md:text-4xl">Pedido ${order.id}</h1>
            <p class="text-gray-600">Realizado el ${Helpers.formatDate(order.date)}</p>
          </div>
          <div class="text-right">
            ${Helpers.statusBadgeHTML(order.status)}
          </div>
        </div>

        <div class="grid lg:grid-cols-[1fr_320px] gap-6">

          <!-- Main -->
          <div class="space-y-6">

            <!-- Status timeline -->
            <div class="comic-card p-6 bg-white">
              <h2 class="font-bold text-lg mb-4">Estado del pedido</h2>
              <div class="flex items-center">
                ${['pendiente', 'enviado', 'entregado'].map((s, i, arr) => {
                  const orderStatusIdx = arr.indexOf(order.status);
                  const reached = arr.indexOf(s) <= orderStatusIdx;
                  return `
                    <div class="flex-1 flex items-center ${i < arr.length - 1 ? '' : ''}">
                      <div class="flex flex-col items-center">
                        <div class="w-10 h-10 rounded-full flex items-center justify-center border-2 ${reached ? 'bg-comic-yellow border-comic-dark' : 'bg-gray-100 border-gray-300'}">
                          ${reached ? '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>' : (i + 1)}
                        </div>
                        <span class="text-xs mt-1 font-semibold ${reached ? 'text-comic-dark' : 'text-gray-400'}">${s.charAt(0).toUpperCase() + s.slice(1)}</span>
                      </div>
                      ${i < arr.length - 1 ? `<div class="flex-1 h-1 ${reached && arr.indexOf(s) < orderStatusIdx ? 'bg-comic-yellow' : 'bg-gray-200'} mx-2 -mt-5"></div>` : ''}
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Products -->
            <div class="comic-card p-6 bg-white">
              <h2 class="font-bold text-lg mb-4">Productos (${order.items.length})</h2>
              <div class="space-y-4">
                ${order.items.map(item => {
                  const reviewed = reviewedProducts.includes(item.productId);
                  return `
                    <div class="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
                      <a href="producto-detalle.html?id=${item.productId}" class="shrink-0">
                        <img src="${item.image}" alt="${item.title}" class="w-20 h-24 object-cover rounded border-2 border-gray-200">
                      </a>
                      <div class="flex-1 min-w-0">
                        <a href="producto-detalle.html?id=${item.productId}" class="font-bold hover:text-comic-red line-clamp-2">${item.title}</a>
                        <p class="text-sm text-gray-500 mt-1">Cantidad: ${item.quantity}</p>
                        <p class="text-sm text-gray-500">Precio unitario: ${Helpers.formatPrice(item.price)}</p>
                        ${order.status === 'entregado' ? `
                          <div class="mt-2">
                            ${reviewed
                              ? `<span class="text-xs text-green-600 font-semibold">✓ Ya has reseñado este producto</span>`
                              : `<a href="resena.html?producto=${item.productId}&pedido=${order.id}" class="text-xs text-comic-red font-semibold hover:underline">⭐ Dejar reseña</a>`}
                          </div>
                        ` : ''}
                      </div>
                      <p class="font-bold text-lg">${Helpers.formatPrice(item.price * item.quantity)}</p>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Shipping & Payment -->
            <div class="grid md:grid-cols-2 gap-4">
              <div class="comic-card-flat p-5 bg-white">
                <h3 class="font-bold mb-2 flex items-center gap-2">
                  <svg class="w-5 h-5 text-comic-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  Dirección de envío
                </h3>
                ${order.address ? `
                  <p class="font-semibold">${shippingNames[order.shippingMethod]}</p>
                  <p class="text-sm text-gray-700 mt-1">${order.address.street}</p>
                  <p class="text-sm text-gray-700">${order.address.zip} ${order.address.city}</p>
                  <p class="text-sm text-gray-700">${order.address.state}, ${order.address.country}</p>
                ` : `
                  <p class="font-semibold">Recogida en tienda</p>
                  <p class="text-sm text-gray-700 mt-1">Calle Mayor 123, Madrid</p>
                  <p class="text-sm text-gray-500">Disponible en 24h</p>
                `}
                ${order.tracking ? `
                  <div class="mt-3 p-2 bg-gray-50 rounded text-sm">
                    <span class="text-gray-500">Tracking:</span>
                    <span class="font-mono font-bold ml-1">${order.tracking}</span>
                  </div>
                ` : ''}
              </div>

              <div class="comic-card-flat p-5 bg-white">
                <h3 class="font-bold mb-2 flex items-center gap-2">
                  <svg class="w-5 h-5 text-comic-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  Pago
                </h3>
                <p class="font-semibold">${paymentMethodNames[order.payment.method]}</p>
                ${order.payment.last4 ? `<p class="text-sm text-gray-700 mt-1">Terminada en ****${order.payment.last4}</p>` : ''}
                <p class="text-xs text-gray-500 mt-2">Pagado el ${Helpers.formatDate(order.date)}</p>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <aside class="self-start">
            <div class="comic-card p-6 bg-white sticky top-4">
              <h3 class="font-bold mb-3">Resumen</h3>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between"><span>Subtotal</span><span>${Helpers.formatPrice(order.subtotal)}</span></div>
                <div class="flex justify-between"><span>Envío</span><span>${order.shipping === 0 ? 'Gratis' : Helpers.formatPrice(order.shipping)}</span></div>
                <div class="border-t-2 border-gray-200 pt-2 mt-2 flex justify-between text-lg font-bold">
                  <span>Total</span><span class="text-comic-red">${Helpers.formatPrice(order.total)}</span>
                </div>
              </div>
              ${order.status !== 'entregado' && order.status !== 'cancelado' ? `
                <button onclick="OrderDetail.cancel()" class="btn-comic btn-comic-outline w-full mt-4">
                  Cancelar pedido
                </button>
              ` : ''}
              <a href="perfil.html#pedidos" class="btn-comic btn-comic-ghost btn-comic-sm w-full mt-3">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                Volver a mis pedidos
              </a>
            </div>
          </aside>
        </div>
      </div>
    `;
  }

  window.OrderDetail = {
    cancel() {
      Helpers.confirm('¿Estás seguro de cancelar este pedido?').then(ok => {
        if (ok) {
          const id = Helpers.getParam('id');
          Store.Orders.updateStatus(id, 'cancelado');
          Helpers.toast('Pedido cancelado', 'info');
          render();
        }
      });
    }
  };

  document.addEventListener('DOMContentLoaded', render);
})();