/* ============================================
   Confirmation Page
   ============================================ */

(function() {
  Components.init();

  const orderId = sessionStorage.getItem('last_order_id');
  const order = orderId ? Store.Orders.getById(orderId) : null;

  function render() {
    const container = document.getElementById('confirmation-content');

    if (!order) {
      container.innerHTML = `
        <div class="text-center py-16">
          <div class="text-7xl mb-4">🤔</div>
          <h2 class="font-comic text-3xl mb-3">No hay pedido reciente</h2>
          <p class="text-gray-600 mb-6">No encontramos un pedido para confirmar.</p>
          <a href="productos.html" class="btn-comic">Ver productos</a>
        </div>
      `;
      return;
    }

    document.getElementById('order-id-display').textContent = order.id;

    const paymentMethodNames = { card: 'Tarjeta', paypal: 'PayPal', transfer: 'Transferencia', cash: 'Contra reembolso' };
    const shippingNames = { standard: 'Estándar', express: 'Express', pickup: 'Recogida en tienda' };

    container.innerHTML = `
      <div class="max-w-4xl mx-auto">
        <!-- Success banner -->
        <div class="text-center mb-8">
          <div class="inline-flex w-20 h-20 bg-green-100 rounded-full items-center justify-center mb-4 animate-pop">
            <svg class="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
          </div>
          <h1 class="font-comic text-4xl md:text-5xl text-comic-dark mb-2">¡Pedido confirmado!</h1>
          <p class="text-gray-600">Tu pedido ha sido procesado exitosamente</p>
        </div>

        <div class="grid lg:grid-cols-[1fr_360px] gap-8 print:grid-cols-1 print:gap-4">

          <!-- Main info -->
          <div class="space-y-6">
            <!-- Order info -->
            <div class="comic-card p-6 bg-white print:shadow-none print:border-gray-300">
              <div class="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-gray-200">
                <div>
                  <p class="text-xs text-gray-500 uppercase">Pedido</p>
                  <p class="font-bold text-xl">${order.id}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-500 uppercase">Fecha</p>
                  <p class="font-bold">${Helpers.formatDate(order.date)}</p>
                </div>
                <div>
                  ${Helpers.statusBadgeHTML(order.status)}
                </div>
              </div>

              <h2 class="font-comic text-2xl mb-4">Productos (${order.items.length})</h2>
              <div class="space-y-3">
                ${order.items.map(item => `
                  <div class="flex gap-4 items-center">
                    <img src="${item.image}" alt="${item.title}" class="w-16 h-20 object-cover rounded border-2 border-gray-200">
                    <div class="flex-1 min-w-0">
                      <p class="font-bold">${item.title}</p>
                      <p class="text-sm text-gray-500">Cantidad: ${item.quantity} × ${Helpers.formatPrice(item.price)}</p>
                    </div>
                    <p class="font-bold text-lg">${Helpers.formatPrice(item.price * item.quantity)}</p>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Shipping + Payment -->
            <div class="grid md:grid-cols-2 gap-4">
              <div class="comic-card-flat p-5 bg-white">
                <h3 class="font-bold mb-2 flex items-center gap-2">
                  <svg class="w-5 h-5 text-comic-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  Envío
                </h3>
                <p class="font-semibold">${shippingNames[order.shippingMethod]}</p>
                ${order.address ? `
                  <p class="text-sm text-gray-700 mt-1">${order.address.street}</p>
                  <p class="text-sm text-gray-700">${order.address.zip} ${order.address.city}</p>
                  <p class="text-sm text-gray-700">${order.address.country}</p>
                ` : `<p class="text-sm text-gray-500 mt-1">Recoger en tienda</p>`}
              </div>

              <div class="comic-card-flat p-5 bg-white">
                <h3 class="font-bold mb-2 flex items-center gap-2">
                  <svg class="w-5 h-5 text-comic-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  Pago
                </h3>
                <p class="font-semibold">${paymentMethodNames[order.payment.method]}</p>
                ${order.payment.last4 ? `<p class="text-sm text-gray-700 mt-1">Terminada en ****${order.payment.last4}</p>` : ''}
                ${order.payment.method === 'transfer' ? `<p class="text-xs text-gray-500 mt-1">Recibirás las instrucciones por email</p>` : ''}
                ${order.payment.method === 'cash' ? `<p class="text-xs text-gray-500 mt-1">Pagarás al recibir tu pedido</p>` : ''}
              </div>
            </div>

            <!-- Next steps -->
            <div class="comic-card p-6 bg-comic-yellow">
              <h3 class="font-bold mb-3">¿Qué sigue ahora?</h3>
              <ol class="space-y-2 text-sm">
                <li class="flex items-start gap-2">
                  <span class="font-bold">1.</span>
                  <span>Te enviaremos un email de confirmación con el número de seguimiento.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="font-bold">2.</span>
                  <span>Prepararemos tu pedido en nuestro almacén en 24 horas.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="font-bold">3.</span>
                  <span>Recibirás tu pedido en ${order.shippingMethod === 'express' ? '24 horas' : order.shippingMethod === 'pickup' ? 'nuestra tienda' : '2-3 días laborables'}.</span>
                </li>
              </ol>
            </div>

            <!-- 2 botones finales -->
            <div class="grid sm:grid-cols-2 gap-3 no-print">
              <button onclick="ConfirmationPage.print()" class="btn-comic btn-comic-lg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
                Imprimir comprobante
              </button>
              <a href="perfil.html" class="btn-comic btn-comic-yellow btn-comic-lg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                Ver historial de pedidos
              </a>
            </div>
          </div>

          <!-- Summary -->
          <aside class="self-start no-print">
            <div class="comic-card p-6 bg-white sticky top-4">
              <h3 class="font-bold mb-3">Resumen</h3>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between"><span>Subtotal</span><span class="font-semibold">${Helpers.formatPrice(order.subtotal)}</span></div>
                <div class="flex justify-between"><span>Envío</span><span class="font-semibold">${order.shipping === 0 ? 'Gratis' : Helpers.formatPrice(order.shipping)}</span></div>
                <div class="border-t-2 border-gray-200 pt-2 mt-2 flex justify-between text-lg font-bold">
                  <span>Total</span><span class="text-comic-red">${Helpers.formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    `;
  }

  window.ConfirmationPage = {
    print() {
      window.print();
    }
  };

  document.addEventListener('DOMContentLoaded', render);
})();