/* ============================================
   Profile Page
   ============================================ */

(function() {
  Components.init('profile');

  function render() {
    const user = Store.Auth.getCurrentUser();
    const container = document.getElementById('profile-content');

    if (!user) {
      container.innerHTML = `
        <div class="text-center py-16">
          <div class="text-7xl mb-4">🔒</div>
          <h2 class="font-comic text-3xl mb-3">Inicia sesión para ver tu perfil</h2>
          <a href="login.html?redirect=perfil.html" class="btn-comic btn-comic-lg">Iniciar sesión</a>
        </div>
      `;
      return;
    }

    const orders = Store.Orders.getByUser(user.id);
    const reviews = Store.Reviews.getAll().filter(r => r.userId === user.id);

    container.innerHTML = `
      <div class="grid lg:grid-cols-[280px_1fr] gap-6">

        <!-- Sidebar -->
        <aside>
          <div class="comic-card p-6 bg-white text-center">
            <div class="w-20 h-20 mx-auto mb-3 rounded-full bg-comic-yellow border-2 border-comic-dark flex items-center justify-center text-3xl font-bold text-comic-dark">
              ${user.firstName.charAt(0)}${user.lastName.charAt(0)}
            </div>
            <h3 class="font-bold text-lg">${user.firstName} ${user.lastName}</h3>
            <p class="text-sm text-gray-500">${user.email}</p>
            <p class="text-xs text-gray-400 mt-1">Miembro desde ${Helpers.formatDate(user.registeredAt)}</p>
          </div>

          <div class="comic-card-flat mt-4 bg-white overflow-hidden">
            <button onclick="ProfilePage.switchTab('orders')" data-tab-btn="orders" class="tab-btn w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 bg-gray-50">
              <svg class="w-5 h-5 text-comic-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
              <span class="font-semibold text-sm">Mis pedidos (${orders.length})</span>
            </button>
            <button onclick="ProfilePage.switchTab('profile')" data-tab-btn="profile" class="tab-btn w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100">
              <svg class="w-5 h-5 text-comic-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              <span class="font-semibold text-sm">Mi perfil</span>
            </button>
            <button onclick="ProfilePage.switchTab('reviews')" data-tab-btn="reviews" class="tab-btn w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50">
              <svg class="w-5 h-5 text-comic-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
              <span class="font-semibold text-sm">Mis reseñas (${reviews.length})</span>
            </button>
            <button onclick="ProfilePage.logout()" class="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-50 text-red-600 border-t border-gray-100">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/></svg>
              <span class="font-semibold text-sm">Cerrar sesión</span>
            </button>
          </div>
        </aside>

        <!-- Content -->
        <main>
          <div id="tab-orders" data-tab-content="orders" class="tab-content">
            <h2 class="font-comic text-3xl mb-4">Historial de pedidos</h2>
            ${orders.length === 0 ? `
              <div class="text-center py-12 comic-card-flat bg-white">
                <div class="text-5xl mb-3">📦</div>
                <p class="text-gray-600 mb-4">Aún no has realizado ningún pedido</p>
                <a href="productos.html" class="btn-comic">Explorar catálogo</a>
              </div>
            ` : `
              <div class="space-y-3">
                ${orders.map(order => `
                  <div class="comic-card-flat p-4 bg-white">
                    <div class="flex flex-col sm:flex-row gap-4">
                      <div class="flex-1">
                        <div class="flex flex-wrap items-center gap-2 mb-2">
                          <span class="font-bold">${order.id}</span>
                          ${Helpers.statusBadgeHTML(order.status)}
                        </div>
                        <p class="text-sm text-gray-600 mb-2">${Helpers.formatDate(order.date)} · ${order.items.length} producto${order.items.length !== 1 ? 's' : ''}</p>
                        <div class="flex gap-2 mb-2">
                          ${order.items.slice(0, 4).map(i => `
                              <img src="${i.image}" alt="" class="w-10 h-12 object-cover rounded border border-gray-200">
                            `).join('')}
                            ${order.items.length > 4 ? `<div class="w-10 h-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">+${order.items.length - 4}</div>` : ''}
                          </div>
                      </div>
                      <div class="text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2">
                        <p class="font-bold text-lg text-comic-red">${Helpers.formatPrice(order.total)}</p>
                        <a href="pedido-detalle.html?id=${order.id}" class="btn-comic btn-comic-outline btn-comic-sm">Ver detalle</a>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            `}
          </div>

          <div id="tab-profile" data-tab-content="profile" class="tab-content hidden">
            <h2 class="font-comic text-3xl mb-4">Mi perfil</h2>
            <div class="comic-card p-6 bg-white">
              <form id="profile-form" class="space-y-4">
                <div class="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-semibold mb-1">Nombre</label>
                    <input type="text" name="firstName" value="${user.firstName}" class="input-comic" required>
                  </div>
                  <div>
                    <label class="block text-sm font-semibold mb-1">Apellidos</label>
                    <input type="text" name="lastName" value="${user.lastName}" class="input-comic" required>
                  </div>
                </div>
                <div class="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-semibold mb-1">Email</label>
                    <input type="email" name="email" value="${user.email}" class="input-comic" required>
                  </div>
                  <div>
                    <label class="block text-sm font-semibold mb-1">Teléfono</label>
                    <input type="tel" name="phone" value="${user.phone || ''}" class="input-comic">
                  </div>
                </div>
                <div class="border-t-2 border-gray-100 pt-4">
                  <h3 class="font-bold mb-3">Dirección de envío</h3>
                  <div class="space-y-3">
                    <div>
                      <label class="block text-sm font-semibold mb-1">Calle y número</label>
                      <input type="text" name="street" value="${user.address?.street || ''}" class="input-comic">
                    </div>
                    <div class="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label class="block text-sm font-semibold mb-1">Ciudad</label>
                        <input type="text" name="city" value="${user.address?.city || ''}" class="input-comic">
                      </div>
                      <div>
                        <label class="block text-sm font-semibold mb-1">Provincia</label>
                        <input type="text" name="state" value="${user.address?.state || ''}" class="input-comic">
                      </div>
                    </div>
                    <div class="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label class="block text-sm font-semibold mb-1">Código postal</label>
                        <input type="text" name="zip" value="${user.address?.zip || ''}" class="input-comic">
                      </div>
                      <div>
                        <label class="block text-sm font-semibold mb-1">País</label>
                        <input type="text" name="country" value="${user.address?.country || 'España'}" class="input-comic">
                      </div>
                    </div>
                  </div>
                </div>
                <button type="submit" class="btn-comic">Guardar cambios</button>
              </form>
            </div>
          </div>

          <div id="tab-reviews" data-tab-content="reviews" class="tab-content hidden">
            <h2 class="font-comic text-3xl mb-4">Mis reseñas</h2>
            ${reviews.length === 0 ? `
              <div class="text-center py-12 comic-card-flat bg-white">
                <div class="text-5xl mb-3">✍️</div>
                <p class="text-gray-600">Aún no has escrito ninguna reseña</p>
              </div>
            ` : `
              <div class="space-y-3">
                ${reviews.map(r => {
                  const product = MOCK_DATA.products.find(p => p.id === r.productId);
                  return `
                    <div class="comic-card-flat p-4 bg-white">
                      <div class="flex gap-3">
                          <img src="${product?.images[0] || ''}" alt="" class="w-16 h-20 object-cover rounded border-2 border-gray-200">
                          <div class="flex-1">
                            <a href="producto-detalle.html?id=${r.productId}" class="font-bold text-sm hover:text-comic-red">${product?.title || 'Producto'}</a>
                            <div class="flex items-center gap-2">
                              ${Helpers.starsHTML(r.rating)}
                              <span class="text-xs text-gray-500">${Helpers.formatDate(r.date)}</span>
                            </div>
                            <p class="font-bold text-sm mt-1">${r.title}</p>
                            <p class="text-sm text-gray-700">${r.comment}</p>
                          </div>
                        </div>
                    </div>
                  `;
                }).join('')}
              </div>
            `}
          </div>
        </main>
      </div>
    `;

    document.getElementById('profile-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      const result = Store.Auth.updateProfile({
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        email: data.get('email'),
        phone: data.get('phone'),
        address: {
          street: data.get('street'),
          city: data.get('city'),
          state: data.get('state'),
          zip: data.get('zip'),
          country: data.get('country')
        }
      });
      if (result.ok) {
        Helpers.toast('Perfil actualizado', 'success');
        render();
      }
    });

    // Handle hash for direct navigation
    const hash = window.location.hash.replace('#', '');
    if (hash === 'pedidos') switchTab('orders');
    else if (hash === 'reviews') switchTab('reviews');
    else switchTab('orders');
  }

  function switchTab(tab) {
    document.querySelectorAll('[data-tab-btn]').forEach(b => {
      b.classList.remove('bg-gray-50', 'border-l-4', 'border-comic-red');
    });
    document.querySelectorAll('[data-tab-content]').forEach(c => c.classList.add('hidden'));
    const btn = document.querySelector(`[data-tab-btn="${tab}"]`);
    const content = document.querySelector(`[data-tab-content="${tab}"]`);
    if (btn) {
      btn.classList.add('bg-gray-50', 'border-l-4', 'border-comic-red');
    }
    if (content) content.classList.remove('hidden');
  }

  window.ProfilePage = {
    switchTab,
    logout() {
      Store.Auth.logout();
      Helpers.toast('Sesión cerrada', 'info');
      setTimeout(() => window.location.href = 'index.html', 500);
    }
  };

  document.addEventListener('DOMContentLoaded', render);
})();