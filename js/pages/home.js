/* ============================================
   Home Page
   ============================================ */

(function() {
  Components.init('home');

  function renderHero() {
    const hero = document.getElementById('hero');
    if (!hero) return;
    hero.innerHTML = `
      <section class="comic-banner text-white">
        <div class="max-w-7xl mx-auto px-4 py-16 md:py-24 relative z-10">
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div class="inline-block bg-comic-yellow text-comic-dark px-3 py-1 rounded-full text-xs font-bold mb-4 border-2 border-comic-dark shadow-[2px_2px_0_#0F172A]">
                ✨ NUEVAS LLEGADAS
              </div>
              <h1 class="font-comic text-5xl md:text-7xl mb-4 leading-tight">
                ¡Tu próxima <span class="text-comic-yellow">aventura</span> comienza aquí!
              </h1>
              <p class="text-lg md:text-xl mb-8 text-white/90">
                Cómics, manga, novelas gráficas y merchandising. Las mejores historias a un clic de distancia.
              </p>
              <div class="flex flex-wrap gap-3">
                <a href="productos.html" class="btn-comic btn-comic-yellow btn-comic-lg">
                  Ver catálogo
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </a>
                <a href="nosotros.html" class="btn-comic btn-comic-outline btn-comic-lg">
                  Conócenos
                </a>
              </div>
              <div class="mt-8 flex items-center gap-6 text-sm">
                <div class="flex items-center gap-2">
                  <span class="text-comic-yellow text-2xl">★</span>
                  <div>
                    <div class="font-bold">4.9/5</div>
                    <div class="text-white/70 text-xs">+2000 reseñas</div>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-comic-yellow text-2xl">🚚</span>
                  <div>
                    <div class="font-bold">Envío 24/48h</div>
                    <div class="text-white/70 text-xs">Gratis +$50</div>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-comic-yellow text-2xl">🔒</span>
                  <div>
                    <div class="font-bold">Pago seguro</div>
                    <div class="text-white/70 text-xs">SSL encriptado</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="relative hidden md:block">
              <div class="relative animate-float">
                <img src="https://picsum.photos/seed/comichero1/400/600" alt="Cómic destacado" class="rounded-lg border-2 border-comic-dark shadow-[8px_8px_0_#0F172A] rotate-3">
                <img src="https://picsum.photos/seed/comichero2/300/450" alt="" class="absolute -bottom-6 -left-12 rounded-lg border-2 border-comic-dark shadow-[6px_6px_0_#FBBF24] -rotate-6 hidden lg:block">
              </div>
              <div class="speech-bubble absolute -top-4 -left-8 hidden lg:block">
                <p class="font-comic text-comic-dark text-lg">¡POW!</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderCategories() {
    const container = document.getElementById('categories');
    if (!container) return;
    container.innerHTML = `
      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4">
          <div class="text-center mb-12">
            <div class="inline-block bg-comic-red text-white px-4 py-1 rounded-full text-xs font-bold mb-3 border-2 border-comic-dark shadow-[2px_2px_0_#0F172A]">
              EXPLORA
            </div>
            <h2 class="font-comic text-4xl md:text-5xl text-comic-dark mb-3">Categorías destacadas</h2>
            <p class="text-gray-600 max-w-2xl mx-auto">Descubre nuestras secciones favoritas. Desde superhéroes hasta manga, tenemos algo para cada fan.</p>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            ${MOCK_DATA.categories.map(Helpers.categoryChipHTML).join('')}
          </div>
        </div>
      </section>
    `;
  }

  function renderFeaturedProducts() {
    const container = document.getElementById('featured');
    if (!container) return;
    const featured = MOCK_DATA.products.filter(p => p.badge).slice(0, 8);
    container.innerHTML = `
      <section class="py-16">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12">
            <div>
              <div class="inline-block bg-comic-yellow text-comic-dark px-4 py-1 rounded-full text-xs font-bold mb-3 border-2 border-comic-dark shadow-[2px_2px_0_#0F172A]">
                TOP VENTAS
              </div>
              <h2 class="font-comic text-4xl md:text-5xl text-comic-dark">Productos destacados</h2>
              <p class="text-gray-600 mt-2">Los favoritos de nuestros clientes</p>
            </div>
            <a href="productos.html" class="btn-comic btn-comic-outline">
              Ver todos
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </a>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            ${featured.map(Helpers.productCardHTML).join('')}
          </div>
        </div>
      </section>
    `;
  }

  function renderPromoBanner() {
    const container = document.getElementById('promo');
    if (!container) return;
    container.innerHTML = `
      <section class="py-16 bg-comic-blue text-white relative">
        <div class="max-w-7xl mx-auto px-4 relative z-10">
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div class="inline-block bg-comic-yellow text-comic-dark px-3 py-1 rounded-full text-xs font-bold mb-4 border-2 border-comic-dark">
                🎁 OFERTA ESPECIAL
              </div>
              <h2 class="font-comic text-4xl md:text-6xl mb-4">25% OFF</h2>
              <p class="text-xl mb-2">en compras mayores a $100</p>
              <p class="text-white/80 mb-6">Usa el código <span class="bg-white text-comic-blue font-bold px-3 py-1 rounded">COMICS25</span> al finalizar tu compra</p>
              <a href="productos.html" class="btn-comic btn-comic-yellow btn-comic-lg">
                Aprovechar oferta
              </a>
            </div>
            <div class="text-center">
              <div class="font-comic text-9xl text-comic-yellow animate-float">%</div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderNewsletter() {
    const container = document.getElementById('newsletter');
    if (!container) return;
    container.innerHTML = `
      <section class="py-16 bg-white">
        <div class="max-w-4xl mx-auto px-4">
          <div class="comic-card p-8 md:p-12 bg-comic-yellow text-center">
            <div class="text-5xl mb-4">✉️</div>
            <h2 class="font-comic text-3xl md:text-4xl text-comic-dark mb-3">¡No te pierdas nada!</h2>
            <p class="text-comic-dark/80 mb-6">Suscríbete a nuestro boletín y recibe novedades, ofertas exclusivas y un 10% en tu primera compra.</p>
            <form onsubmit="event.preventDefault(); Helpers.toast('¡Suscripción exitosa! Revisa tu correo.', 'success'); this.reset();" class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" required placeholder="tu@email.com" class="input-comic flex-1">
              <button type="submit" class="btn-comic">Suscribirme</button>
            </form>
          </div>
        </div>
      </section>
    `;
  }

  function renderBenefits() {
    const container = document.getElementById('benefits');
    if (!container) return;
    const items = [
      { icon: '🚚', title: 'Envío rápido', desc: '24/48h en toda España' },
      { icon: '🔒', title: 'Pago 100% seguro', desc: 'Transacciones encriptadas' },
      { icon: '↩️', title: 'Devolución gratis', desc: '30 días para cambios' },
      { icon: '💬', title: 'Soporte 24/7', desc: 'Atención personalizada' }
    ];
    container.innerHTML = `
      <section class="py-12 bg-gray-50 border-y-2 border-gray-200">
        <div class="max-w-7xl mx-auto px-4">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            ${items.map(it => `
              <div class="text-center">
                <div class="text-4xl mb-2">${it.icon}</div>
                <h3 class="font-bold text-sm md:text-base">${it.title}</h3>
                <p class="text-xs md:text-sm text-gray-600">${it.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderHero();
    renderBenefits();
    renderCategories();
    renderFeaturedProducts();
    renderPromoBanner();
    renderNewsletter();
  });
})();