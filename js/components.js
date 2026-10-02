/* ============================================
   Components - Header, Footer, Navbar
   ============================================ */

const Components = (() => {

  function logoHTML() {
    return `
      <a href="index.html" class="flex items-center gap-2 group">
        <div class="w-10 h-10 bg-comic-red border-2 border-comic-dark rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-[2px_2px_0_#0F172A] group-hover:rotate-12 transition-transform">
          <span class="font-comic text-2xl">!</span>
        </div>
        <div>
          <div class="font-comic text-xl text-comic-dark leading-none">Comic Store</div>
          <div class="text-[10px] text-gray-500 uppercase tracking-widest">Tu tienda de cómics</div>
        </div>
      </a>
    `;
  }

  function navLinksHTML(active = '') {
    const links = [
      { href: 'index.html', label: 'Inicio', key: 'home' },
      { href: 'productos.html', label: 'Productos', key: 'products' },
      { href: 'nosotros.html', label: 'Nosotros', key: 'about' },
      { href: 'contacto.html', label: 'Contacto', key: 'contact' }
    ];
    return links.map(l => `
      <a href="${l.href}" class="nav-link ${active === l.key ? 'active' : ''}">${l.label}</a>
    `).join('');
  }

  function headerHTML(active = '') {
    return `
      <header class="site-header no-print">
        <div class="bg-comic-dark text-white text-xs">
          <div class="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
            <div class="flex items-center gap-4">
              <span class="flex items-center gap-1"><svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg> +34 912 345 678</span>
              <span class="hidden md:flex items-center gap-1"><svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg> hola@comicstore.com</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="hidden sm:inline">Envío gratis en compras +$50</span>
              <a href="#" class="hover:text-comic-yellow"><svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
              <a href="#" class="hover:text-comic-yellow"><svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
              <a href="#" class="hover:text-comic-yellow"><svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg></a>
            </div>
          </div>
        </div>
        <div class="max-w-7xl mx-auto px-4 py-4">
          <div class="flex items-center justify-between gap-4">
            ${logoHTML()}
            <nav class="hidden lg:flex items-center gap-2">
              ${navLinksHTML(active)}
            </nav>
            <div class="flex items-center gap-2 md:gap-3">
              <button onclick="Components.toggleSearch()" class="p-2 hover:bg-gray-100 rounded-lg" aria-label="Buscar">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </button>
              <a href="carrito.html" class="relative p-2 hover:bg-gray-100 rounded-lg" aria-label="Carrito">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                <span class="badge-cart" data-cart-count>0</span>
              </a>
              <div class="relative" data-user-menu>
                <button onclick="Components.toggleUserMenu()" class="p-2 hover:bg-gray-100 rounded-lg" aria-label="Mi cuenta">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                </button>
                <div data-user-dropdown class="hidden absolute right-0 mt-2 w-56 bg-white border-2 border-comic-dark rounded-lg shadow-[4px_4px_0_#0F172A] z-50 overflow-hidden"></div>
              </div>
              <button onclick="Components.toggleMobileMenu()" class="lg:hidden p-2 hover:bg-gray-100 rounded-lg" aria-label="Menú">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
              </button>
            </div>
          </div>
          <div data-search-bar class="hidden mt-4">
            <form onsubmit="Components.handleSearch(event)" class="flex gap-2">
              <input type="text" name="q" placeholder="Buscar cómics, manga, autores..." class="input-comic flex-1">
              <button type="submit" class="btn-comic">Buscar</button>
            </form>
          </div>
        </div>
        <div data-mobile-menu class="hidden lg:hidden bg-white border-t-2 border-gray-100">
          <nav class="max-w-7xl mx-auto px-4 py-2 flex flex-col">
            ${navLinksHTML(active)}
          </nav>
        </div>
      </header>
    `;
  }

  function footerHTML() {
    return `
      <footer class="bg-comic-dark text-white mt-16 no-print">
        <div class="max-w-7xl mx-auto px-4 py-12">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div class="flex items-center gap-2 mb-4">
                <div class="w-10 h-10 bg-comic-red rounded-lg flex items-center justify-center text-white font-bold text-xl border-2 border-white">
                  <span class="font-comic text-2xl">!</span>
                </div>
                <div class="font-comic text-2xl">Comic Store</div>
              </div>
              <p class="text-gray-400 text-sm mb-4">Tu tienda especializada en cómics, manga, novelas gráficas y merchandising. Desde 2015 trayendo las mejores historias a tu puerta.</p>
              <div class="flex gap-3">
                <a href="#" class="w-9 h-9 bg-white/10 hover:bg-comic-red rounded-lg flex items-center justify-center transition-colors">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" class="w-9 h-9 bg-white/10 hover:bg-comic-red rounded-lg flex items-center justify-center transition-colors">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="#" class="w-9 h-9 bg-white/10 hover:bg-comic-red rounded-lg flex items-center justify-center transition-colors">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                </a>
              </div>
            </div>
            <div>
              <h3 class="font-bold mb-4 text-comic-yellow">Tienda</h3>
              <ul class="space-y-2 text-sm text-gray-400">
                <li><a href="productos.html" class="hover:text-white transition-colors">Todos los productos</a></li>
                <li><a href="productos.html?categoria=marvel" class="hover:text-white transition-colors">Marvel</a></li>
                <li><a href="productos.html?categoria=dc" class="hover:text-white transition-colors">DC Comics</a></li>
                <li><a href="productos.html?categoria=manga" class="hover:text-white transition-colors">Manga</a></li>
                <li><a href="productos.html?categoria=merchandising" class="hover:text-white transition-colors">Merchandising</a></li>
              </ul>
            </div>
            <div>
              <h3 class="font-bold mb-4 text-comic-yellow">Ayuda</h3>
              <ul class="space-y-2 text-sm text-gray-400">
                <li><a href="contacto.html" class="hover:text-white transition-colors">Contacto</a></li>
                <li><a href="politicas-privacidad.html" class="hover:text-white transition-colors">Políticas de privacidad</a></li>
                <li><a href="terminos-condiciones.html" class="hover:text-white transition-colors">Términos y condiciones</a></li>
                <li><a href="nosotros.html" class="hover:text-white transition-colors">Sobre nosotros</a></li>
              </ul>
            </div>
            <div>
              <h3 class="font-bold mb-4 text-comic-yellow">Contacto</h3>
              <ul class="space-y-3 text-sm text-gray-400">
                <li class="flex items-start gap-2">
                  <svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  <span>Calle Mayor 123, 28013 Madrid, España</span>
                </li>
                <li class="flex items-center gap-2">
                  <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  +34 912 345 678
                </li>
                <li class="flex items-center gap-2">
                  <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  hola@comicstore.com
                </li>
                <li class="flex items-center gap-2">
                  <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  Lun-Sáb: 10:00 - 21:00
                </li>
              </ul>
            </div>
          </div>
          <div class="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p class="text-sm text-gray-400">&copy; 2025 Comic Store. Todos los derechos reservados.</p>
            <div class="flex items-center gap-2">
              <span class="text-xs text-gray-500">Pagos seguros:</span>
              <div class="flex gap-1">
                <div class="w-10 h-6 bg-white rounded flex items-center justify-center text-[10px] font-bold text-comic-dark">VISA</div>
                <div class="w-10 h-6 bg-white rounded flex items-center justify-center text-[10px] font-bold text-comic-dark">MC</div>
                <div class="w-10 h-6 bg-white rounded flex items-center justify-center text-[10px] font-bold text-comic-dark">PP</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  function renderHeader(active) {
    const slot = document.getElementById('app-header');
    if (slot) slot.innerHTML = headerHTML(active);
  }
  function renderFooter() {
    const slot = document.getElementById('app-footer');
    if (slot) slot.innerHTML = footerHTML();
  }

  function updateCartCount() {
    const count = Store.Cart.getCount();
    document.querySelectorAll('[data-cart-count]').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  function renderUserMenu() {
    const dropdown = document.querySelector('[data-user-dropdown]');
    if (!dropdown) return;
    const user = Store.Auth.getCurrentUser();
    if (user) {
      dropdown.innerHTML = `
        <div class="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <p class="font-bold text-sm">${user.firstName} ${user.lastName}</p>
          <p class="text-xs text-gray-500">${user.email}</p>
        </div>
        <a href="perfil.html" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          Mi perfil
        </a>
        <a href="perfil.html#pedidos" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          Mis pedidos
        </a>
        <button onclick="Components.handleLogout()" class="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-red-600 text-sm border-t border-gray-200">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          Cerrar sesión
        </button>
      `;
    } else {
      dropdown.innerHTML = `
        <a href="login.html" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm font-semibold">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/></svg>
          Iniciar sesión
        </a>
        <a href="registro.html" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg>
          Crear cuenta
        </a>
      `;
    }
  }

  function toggleUserMenu() {
    const dropdown = document.querySelector('[data-user-dropdown]');
    dropdown.classList.toggle('hidden');
  }
  function toggleSearch() {
    document.querySelector('[data-search-bar]').classList.toggle('hidden');
  }
  function toggleMobileMenu() {
    document.querySelector('[data-mobile-menu]').classList.toggle('hidden');
  }
  function handleSearch(e) {
    e.preventDefault();
    const q = e.target.q.value.trim();
    if (q) window.location.href = `productos.html?q=${encodeURIComponent(q)}`;
  }
  function handleLogout() {
    Store.Auth.logout();
    Helpers.toast('Sesión cerrada', 'info');
    setTimeout(() => window.location.href = 'index.html', 500);
  }

  // Close dropdowns on outside click
  function setupGlobalListeners() {
    document.addEventListener('click', (e) => {
      const userMenu = document.querySelector('[data-user-menu]');
      if (userMenu && !userMenu.contains(e.target)) {
        document.querySelector('[data-user-dropdown]')?.classList.add('hidden');
      }
    });
  }

  function init(active = '') {
    Store.init();
    renderHeader(active);
    renderFooter();
    renderUserMenu();
    updateCartCount();
    setupGlobalListeners();

    Store.on('cart:update', () => {
      updateCartCount();
      renderUserMenu();
    });
    Store.on('auth:login', renderUserMenu);
    Store.on('auth:logout', renderUserMenu);
    Store.on('auth:update', renderUserMenu);
  }

  return { init, logoHTML, navLinksHTML, headerHTML, footerHTML, toggleUserMenu, toggleSearch, toggleMobileMenu, handleSearch, handleLogout, updateCartCount, renderUserMenu };
})();

window.Components = Components;
