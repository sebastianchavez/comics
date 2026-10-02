/* ============================================
   Product Detail Page
   ============================================ */

(function() {
  Components.init('products');

  const productId = Helpers.getParam('id') || 'p001';
  let product = MOCK_DATA.products.find(p => p.id === productId);
  let currentImageIndex = 0;
  let currentQuantity = 1;

  function renderProduct() {
    if (!product) {
      document.getElementById('product-detail').innerHTML = `
        <div class="text-center py-16">
          <div class="text-6xl mb-4">😕</div>
          <h2 class="font-comic text-3xl mb-3">Producto no encontrado</h2>
          <a href="productos.html" class="btn-comic">Ver catálogo</a>
        </div>
      `;
      return;
    }

    const cat = MOCK_DATA.categories.find(c => c.slug === product.category);
    const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
    const stats = Store.Reviews.getStats(product.id);

    document.title = `${product.title} · Comic Store`;
    document.getElementById('breadcrumb').innerHTML = `
      <a href="index.html" class="hover:text-comic-red">Inicio</a>
      <span class="mx-2 text-gray-400">/</span>
      <a href="productos.html" class="hover:text-comic-red">Productos</a>
      ${cat ? `<span class="mx-2 text-gray-400">/</span><a href="productos.html?categoria=${cat.slug}" class="hover:text-comic-red">${cat.name}</a>` : ''}
      <span class="mx-2 text-gray-400">/</span>
      <span class="text-comic-red font-semibold truncate">${product.title}</span>
    `;

    document.getElementById('product-detail').innerHTML = `
      <div class="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <!-- Gallery -->
        <div>
          <div class="comic-card overflow-hidden bg-white">
            <div class="aspect-[3/4] bg-gray-100 relative">
              <img id="main-image" src="${product.images[0]}" alt="${product.title}" class="w-full h-full object-cover">
              ${product.badge ? `<span class="absolute top-3 left-3 bg-comic-red text-white text-xs font-bold px-3 py-1 rounded border-2 border-comic-dark">${product.badge}</span>` : ''}
              ${discount > 0 ? `<span class="absolute top-3 right-3 bg-comic-yellow text-comic-dark text-xs font-bold px-3 py-1 rounded border-2 border-comic-dark">-${discount}%</span>` : ''}
            </div>
          </div>
          <div class="mt-4 grid grid-cols-3 gap-2">
            ${product.images.map((img, i) => `
              <button onclick="ProductDetail.selectImage(${i})" class="border-2 ${i === 0 ? 'border-comic-red' : 'border-gray-200'} rounded-lg overflow-hidden hover:border-comic-red transition-colors">
                <img src="${img}" alt="" class="w-full aspect-[3/4] object-cover">
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Info -->
        <div>
          <p class="text-sm text-gray-500 uppercase tracking-wide mb-1">${product.author}</p>
          <h1 class="font-comic text-3xl md:text-5xl text-comic-dark mb-3">${product.title}</h1>

          <div class="flex items-center gap-3 mb-4">
            <div class="flex items-center gap-1 text-comic-yellow text-lg">${Helpers.starsHTML(product.rating)}</div>
            <a href="#reviews" class="text-sm text-gray-600 hover:text-comic-red">
              ${product.rating} · ${stats.count} reseñas
            </a>
          </div>

          <div class="flex items-baseline gap-3 mb-6">
            <span class="text-4xl font-bold text-comic-red">${Helpers.formatPrice(product.price)}</span>
            ${product.originalPrice ? `<span class="text-xl text-gray-400 line-through">${Helpers.formatPrice(product.originalPrice)}</span>` : ''}
            ${discount > 0 ? `<span class="bg-comic-yellow text-comic-dark text-sm font-bold px-2 py-1 rounded">-${discount}%</span>` : ''}
          </div>

          <p class="text-gray-700 mb-6 leading-relaxed">${product.description}</p>

          <!-- Stock -->
          <div class="mb-6">
            ${product.stock > 10
                ? `<span class="inline-flex items-center gap-2 text-green-600 text-sm"><span class="h-2 w-2 bg-green-500 rounded-full"></span>En stock (${product.stock} disponibles)</span>`
                : product.stock > 0
                  ? `<span class="inline-flex items-center gap-2 text-orange-600 text-sm"><span class="h-2 w-2 bg-orange-500 rounded-full"></span>¡Solo ${product.stock} disponibles!</span>`
                  : `<span class="inline-flex items-center gap-2 text-red-600 text-sm"><span class="h-2 w-2 bg-red-500 rounded-full"></span>Sin stock</span>`}
          </div>

          <!-- Quantity + Add to cart -->
          <div class="flex items-center gap-4 mb-6">
            <label class="font-semibold">Cantidad:</label>
            <div class="flex items-center border-2 border-comic-dark rounded-lg overflow-hidden">
              <button onclick="ProductDetail.changeQty(-1)" class="px-3 py-2 hover:bg-gray-100 ${currentQuantity <= 1 ? 'opacity-50' : ''}" ${currentQuantity <= 1 ? 'disabled' : ''}>−</button>
              <input id="qty-input" type="number" min="1" max="${product.stock}" value="${currentQuantity}" onchange="ProductDetail.setQty(this.value)" class="w-16 text-center font-bold border-x-2 border-comic-dark py-2 focus:outline-none">
              <button onclick="ProductDetail.changeQty(1)" class="px-3 py-2 hover:bg-gray-100 ${currentQuantity >= product.stock ? 'opacity-50' : ''}" ${currentQuantity >= product.stock ? 'disabled' : ''}>+</button>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 mb-6">
            <button onclick="ProductDetail.addToCart()" class="btn-comic btn-comic-lg flex-1" ${product.stock === 0 ? 'disabled' : ''}>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
              Agregar al carrito
            </button>
            <a href="checkout.html" onclick="ProductDetail.buyNow(event)" class="btn-comic btn-comic-yellow btn-comic-lg flex-1">
              Comprar ahora
            </a>
          </div>

          <!-- Meta -->
          <div class="space-y-2 text-sm border-t-2 border-gray-100 pt-4">
            <p class="flex items-center gap-2"><span>📦</span><span>Envío gratis en pedidos +$50</span></p>
            <p class="flex items-center gap-2"><span>↩️</span><span>Devolución gratis 30 días</span></p>
            <p class="flex items-center gap-2"><span>🔒</span><span>Pago 100% seguro</span></p>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="mt-12">
        <div class="border-b-2 border-gray-200 flex gap-1 mb-6 overflow-x-auto">
          <button onclick="ProductDetail.switchTab('description')" data-tab-btn="description" class="tab-btn px-5 py-3 font-bold border-b-4 border-comic-red text-comic-red">Descripción</button>
          <button onclick="ProductDetail.switchTab('specs')" data-tab-btn="specs" class="tab-btn px-5 py-3 font-bold border-b-4 border-transparent text-gray-600 hover:text-comic-red">Especificaciones</button>
          <button onclick="ProductDetail.switchTab('shipping')" data-tab-btn="shipping" class="tab-btn px-5 py-3 font-bold border-b-4 border-transparent text-gray-600 hover:text-comic-red">Envío</button>
        </div>
        <div id="tab-content" class="prose max-w-none"></div>
      </div>

      <!-- Reviews -->
      <div id="reviews" class="mt-12">
        ${renderReviewsSection(stats)}
      </div>

      <!-- Related -->
      <div class="mt-12">
        <h2 class="font-comic text-3xl mb-6">Productos relacionados</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          ${getRelated().map(Helpers.productCardHTML).join('')}
        </div>
      </div>
    `;

    switchTab('description');
  }

  function renderReviewsSection(stats) {
    const reviews = Store.Reviews.getByProduct(product.id);
    const user = Store.Auth.getCurrentUser();
    const canReview = user && !Store.Reviews.hasUserReviewed(product.id, user.id);

    return `
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-6">
        <h2 class="font-comic text-3xl">Reseñas (${stats.count})</h2>
        ${canReview ? `
          <a href="resena.html?producto=${product.id}" class="btn-comic btn-comic-yellow btn-comic-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
            Escribir reseña
          </a>
        ` : user ? `
          <span class="text-sm text-gray-500 italic">Ya has reseñado este producto</span>
        ` : `
          <a href="login.html?redirect=${encodeURIComponent(window.location.href)}" class="text-sm text-comic-red hover:underline">Inicia sesión para reseñar</a>
        `}
      </div>

      <!-- Stats -->
      <div class="comic-card-flat p-6 mb-6 bg-white">
        <div class="grid md:grid-cols-2 gap-6">
          <div class="text-center md:text-left">
            <div class="text-5xl font-bold text-comic-red mb-1">${stats.average.toFixed(1)}</div>
            <div class="flex justify-center md:justify-start mb-2">${Helpers.starsHTML(stats.average)}</div>
            <p class="text-sm text-gray-600">Basado en ${stats.count} reseñas</p>
          </div>
          <div class="space-y-2">
            ${[5,4,3,2,1].map((star, i) => {
              const count = stats.distribution[5 - star];
              const pct = stats.count > 0 ? (count / stats.count) * 100 : 0;
              return `
                <div class="flex items-center gap-2">
                  <span class="text-sm font-semibold w-4">${star}</span>
                  <span class="text-comic-yellow text-sm">★</span>
                  <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div class="h-full bg-comic-yellow transition-all" style="width:${pct}%"></div>
                  </div>
                  <span class="text-xs text-gray-500 w-8 text-right">${count}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>

      <!-- Review list -->
      <div class="space-y-4">
        ${reviews.length === 0 ? `
          <div class="text-center py-8 bg-gray-50 rounded-lg">
            <p class="text-gray-500">Aún no hay reseñas para este producto.</p>
          </div>
        ` : reviews.map(r => `
          <div class="comic-card-flat p-5 bg-white">
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-full bg-comic-yellow border-2 border-comic-dark flex items-center justify-center font-bold text-comic-dark">
                ${r.userName.charAt(0)}
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <span class="font-bold">${r.userName}</span>
                  <span class="text-xs text-gray-500">· ${Helpers.formatDate(r.date)}</span>
                </div>
                <div class="mb-2">${Helpers.starsHTML(r.rating)}</div>
                <h4 class="font-bold mb-1">${r.title}</h4>
                <p class="text-gray-700 text-sm">${r.comment}</p>
                <div class="mt-2 flex items-center gap-2 text-xs text-gray-500">
                  <button class="hover:text-comic-red">👍 Útil (${r.helpful})</button>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function switchTab(tab) {
    document.querySelectorAll('[data-tab-btn]').forEach(b => {
      b.classList.remove('border-comic-red', 'text-comic-red');
      b.classList.add('border-transparent', 'text-gray-600');
    });
    const active = document.querySelector(`[data-tab-btn="${tab}"]`);
    if (active) {
      active.classList.add('border-comic-red', 'text-comic-red');
      active.classList.remove('border-transparent', 'text-gray-600');
    }
    const content = document.getElementById('tab-content');
    if (!content) return;
    if (tab === 'description') {
      content.innerHTML = `
        <div class="prose prose-lg max-w-none">
          <p class="text-gray-700 leading-relaxed">${product.longDescription}</p>
        </div>
      `;
    } else if (tab === 'specs') {
      content.innerHTML = `
        <div class="comic-card-flat overflow-hidden">
          <table class="w-full">
            <tbody>
              ${Object.entries(product.specs).map(([k, v]) => `
                <tr class="border-b border-gray-200 last:border-0">
                  <td class="px-4 py-3 font-semibold bg-gray-50 w-1/3">${k}</td>
                  <td class="px-4 py-3">${v}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    } else if (tab === 'shipping') {
      content.innerHTML = `
        <div class="space-y-3">
          <div class="flex items-start gap-3 p-4 comic-card-flat">
            <span class="text-2xl">🚚</span>
            <div>
              <h4 class="font-bold">Envío estándar (2-3 días)</h4>
              <p class="text-sm text-gray-600">Gratis en compras superiores a $50. Costo: $4.99</p>
            </div>
          </div>
          <div class="flex items-start gap-3 p-4 comic-card-flat">
            <span class="text-2xl">⚡</span>
            <div>
              <h4 class="font-bold">Envío express (24h)</h4>
              <p class="text-sm text-gray-600">Recibe tu pedido al día siguiente. Costo: $6.99</p>
            </div>
          </div>
          <div class="flex items-start gap-3 p-4 comic-card-flat">
            <span class="text-2xl">🏪</span>
            <div>
              <h4 class="font-bold">Recogida en tienda</h4>
              <p class="text-sm text-gray-600">Pasa a recoger tu pedido por nuestra tienda en Madrid. Gratis.</p>
            </div>
          </div>
        </div>
      `;
    }
  }

  function getRelated() {
    return MOCK_DATA.products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  }

  // Public API
  window.ProductDetail = {
    selectImage(i) {
      currentImageIndex = i;
      document.getElementById('main-image').src = product.images[i];
      document.querySelectorAll('.grid-cols-3 button').forEach((b, idx) => {
        b.classList.toggle('border-comic-red', idx === i);
        b.classList.toggle('border-gray-200', idx !== i);
      });
    },
    changeQty(delta) {
      const newQty = Math.max(1, Math.min(product.stock, currentQuantity + delta));
      currentQuantity = newQty;
      const input = document.getElementById('qty-input');
      if (input) input.value = newQty;
      this.setQty(newQty);
    },
    setQty(value) {
      const v = Math.max(1, Math.min(product.stock, parseInt(value) || 1));
      currentQuantity = v;
      const input = document.getElementById('qty-input');
      if (input && input.value !== v) input.value = v;
    },
    addToCart() {
      if (product.stock === 0) { Helpers.toast('Producto sin stock', 'error'); return; }
      Store.Cart.add(product.id, currentQuantity);
      Helpers.toast(`"${product.title}" agregado al carrito`, 'success');
    },
    buyNow(e) {
      e.preventDefault();
      if (product.stock === 0) { Helpers.toast('Producto sin stock', 'error'); return; }
      Store.Cart.clear();
      Store.Cart.add(product.id, currentQuantity);
      window.location.href = 'checkout.html';
    },
    switchTab
  };

  document.addEventListener('DOMContentLoaded', renderProduct);
})();