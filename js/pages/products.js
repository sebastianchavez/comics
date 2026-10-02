/* ============================================
   Products Page (Catalog)
   ============================================ */

(function() {
  Components.init('products');

  let state = {
    category: Helpers.getParam('categoria') || 'all',
    search: Helpers.getParam('q') || '',
    sort: 'relevance',
    priceRange: 'all',
    page: 1,
    perPage: 12
  };

  function getFilteredProducts() {
    let list = [...MOCK_DATA.products];
    if (state.category !== 'all') {
      list = list.filter(p => p.category === state.category);
    }
    if (state.search) {
      const q = state.search.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    if (state.priceRange !== 'all') {
      if (state.priceRange === '0-15') list = list.filter(p => p.price < 15);
      else if (state.priceRange === '15-25') list = list.filter(p => p.price >= 15 && p.price < 25);
      else if (state.priceRange === '25-50') list = list.filter(p => p.price >= 25 && p.price < 50);
      else if (state.priceRange === '50+') list = list.filter(p => p.price >= 50);
    }
    switch (state.sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      case 'name': list.sort((a, b) => a.title.localeCompare(b.title)); break;
      default: break;
    }
    return list;
  }

  function renderPage() {
    const filtered = getFilteredProducts();
    const totalPages = Math.max(1, Math.ceil(filtered.length / state.perPage));
    if (state.page > totalPages) state.page = totalPages;
    const start = (state.page - 1) * state.perPage;
    const pageItems = filtered.slice(start, start + state.perPage);

    document.getElementById('products-count').textContent = `${filtered.length} producto${filtered.length !== 1 ? 's' : ''} encontrado${filtered.length !== 1 ? 's' : ''}`;
    document.getElementById('products-grid').innerHTML = pageItems.length
      ? pageItems.map(Helpers.productCardHTML).join('')
      : `
        <div class="col-span-full text-center py-16">
          <div class="text-6xl mb-4">🔍</div>
          <h3 class="text-xl font-bold mb-2">No encontramos productos</h3>
          <p class="text-gray-600 mb-4">Intenta ajustar tu búsqueda o filtros</p>
          <button onclick="ProductsPage.resetFilters()" class="btn-comic">Limpiar filtros</button>
        </div>
      `;
    renderPagination(totalPages);
    renderBreadcrumb();
  }

  function renderPagination(totalPages) {
    const container = document.getElementById('pagination');
    if (totalPages <= 1) { container.innerHTML = ''; return; }
    let html = '<div class="flex gap-2 justify-center">';
    html += `<button onclick="ProductsPage.goPage(${state.page - 1})" ${state.page === 1 ? 'disabled' : ''} class="btn-comic btn-comic-outline btn-comic-sm">← Anterior</button>`;
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= state.page - 1 && i <= state.page + 1)) {
        html += `<button onclick="ProductsPage.goPage(${i})" class="btn-comic btn-comic-sm ${i === state.page ? '' : 'btn-comic-outline'}">${i}</button>`;
      } else if (i === state.page - 2 || i === state.page + 2) {
        html += `<span class="px-2">…</span>`;
      }
    }
    html += `<button onclick="ProductsPage.goPage(${state.page + 1})" ${state.page === totalPages ? 'disabled' : ''} class="btn-comic btn-comic-outline btn-comic-sm">Siguiente →</button>`;
    html += '</div>';
    container.innerHTML = html;
  }

  function renderBreadcrumb() {
    const container = document.getElementById('breadcrumb');
    if (!container) return;
    const cat = MOCK_DATA.categories.find(c => c.slug === state.category);
    container.innerHTML = `
      <a href="index.html" class="hover:text-comic-red">Inicio</a>
      <span class="mx-2 text-gray-400">/</span>
      <a href="productos.html" class="hover:text-comic-red">Productos</a>
      ${cat ? `<span class="mx-2 text-gray-400">/</span><span class="text-comic-red font-semibold">${cat.name}</span>` : ''}
      ${state.search ? `<span class="mx-2 text-gray-400">/</span><span class="text-comic-red font-semibold">"${state.search}"</span>` : ''}
    `;
  }

  function renderSidebar() {
    const sidebar = document.getElementById('filters');
    sidebar.innerHTML = `
      <div class="comic-card-flat p-6">
        <h3 class="font-bold text-lg mb-4">Categorías</h3>
        <ul class="space-y-1">
          <li>
            <button onclick="ProductsPage.setCategory('all')" class="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 ${state.category === 'all' ? 'bg-comic-yellow font-bold border-2 border-comic-dark' : ''}">
              Todas las categorías
            </button>
          </li>
          ${MOCK_DATA.categories.map(c => `
            <li>
              <button onclick="ProductsPage.setCategory('${c.slug}')" class="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center justify-between ${state.category === c.slug ? 'bg-comic-yellow font-bold border-2 border-comic-dark' : ''}">
                <span><span class="mr-2">${c.icon}</span>${c.name}</span>
                <span class="text-xs text-gray-500">${c.count}</span>
              </button>
            </li>
          `).join('')}
        </ul>
      </div>
      <div class="comic-card-flat p-6">
        <h3 class="font-bold text-lg mb-4">Precio</h3>
        <ul class="space-y-2">
          ${[
            { v: 'all', label: 'Todos los precios' },
            { v: '0-15', label: 'Menos de $15' },
            { v: '15-25', label: '$15 - $25' },
            { v: '25-50', label: '$25 - $50' },
            { v: '50+', label: 'Más de $50' }
          ].map(p => `
            <li>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="price" value="${p.v}" ${state.priceRange === p.v ? 'checked' : ''} onchange="ProductsPage.setPrice('${p.v}')" class="accent-comic-red">
                <span class="text-sm">${p.label}</span>
              </label>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }

  function renderToolbar() {
    const tb = document.getElementById('toolbar');
    tb.innerHTML = `
      <div class="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        <div class="flex-1">
          <form onsubmit="ProductsPage.handleSearch(event)" class="flex gap-2">
            <input type="text" name="q" value="${state.search}" placeholder="Buscar..." class="input-comic flex-1">
            <button type="submit" class="btn-comic btn-comic-sm">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </button>
          </form>
        </div>
        <div class="flex items-center gap-2">
          <label class="text-sm text-gray-600">Ordenar:</label>
          <select onchange="ProductsPage.setSort(this.value)" class="input-comic py-2">
            <option value="relevance" ${state.sort === 'relevance' ? 'selected' : ''}>Relevancia</option>
            <option value="price-asc" ${state.sort === 'price-asc' ? 'selected' : ''}>Precio: menor a mayor</option>
            <option value="price-desc" ${state.sort === 'price-desc' ? 'selected' : ''}>Precio: mayor a menor</option>
            <option value="rating" ${state.sort === 'rating' ? 'selected' : ''}>Mejor valorados</option>
            <option value="name" ${state.sort === 'name' ? 'selected' : ''}>Nombre A-Z</option>
          </select>
        </div>
      </div>
    `;
  }

  // Public API
  window.ProductsPage = {
    setCategory(c) { state.category = c; state.page = 1; Helpers.setParam('categoria', c === 'all' ? null : c); renderSidebar(); renderPage(); },
    setPrice(p) { state.priceRange = p; state.page = 1; renderPage(); },
    setSort(s) { state.sort = s; renderPage(); },
    goPage(p) { if (p < 1 || p > 999) return; state.page = p; renderPage(); window.scrollTo({ top: 0, behavior: 'smooth' }); },
    handleSearch(e) { e.preventDefault(); state.search = e.target.q.value.trim(); state.page = 1; Helpers.setParam('q', state.search); renderPage(); },
    resetFilters() {
      state = { category: 'all', search: '', sort: 'relevance', priceRange: 'all', page: 1, perPage: 12 };
      window.history.replaceState({}, '', window.location.pathname);
      renderSidebar(); renderToolbar(); renderPage();
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    renderSidebar();
    renderToolbar();
    renderPage();
  });
})();