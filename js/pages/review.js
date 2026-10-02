/* ============================================
   Review Page
   ============================================ */

(function() {
  Components.init('products');

  let state = { rating: 0 };

  function render() {
    const user = Store.Auth.getCurrentUser();
    const container = document.getElementById('review-content');
    const productId = Helpers.getParam('producto');
    const product = MOCK_DATA.products.find(p => p.id === productId);

    if (!product) {
      container.innerHTML = `
        <div class="text-center py-16">
          <div class="text-6xl mb-4">😕</div>
          <h2 class="font-comic text-3xl mb-3">Producto no encontrado</h2>
          <a href="productos.html" class="btn-comic">Ver productos</a>
        </div>
      `;
      return;
    }

    if (!user) {
      container.innerHTML = `
        <div class="max-w-md mx-auto text-center py-12">
          <div class="text-6xl mb-4">🔒</div>
          <h2 class="font-comic text-3xl mb-3">Inicia sesión para reseñar</h2>
          <p class="text-gray-600 mb-6">Necesitas una cuenta para dejar una reseña.</p>
          <a href="login.html?redirect=resena.html?producto=${productId}" class="btn-comic">Iniciar sesión</a>
        </div>
      `;
      return;
    }

    if (Store.Reviews.hasUserReviewed(product.id, user.id)) {
      container.innerHTML = `
        <div class="max-w-md mx-auto text-center py-12">
          <div class="text-6xl mb-4">✓</div>
          <h2 class="font-comic text-3xl mb-3">Ya has reseñado este producto</h2>
          <p class="text-gray-600 mb-6">Gracias por compartir tu opinión.</p>
          <a href="producto-detalle.html?id=${product.id}" class="btn-comic">Ver producto</a>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="max-w-2xl mx-auto">
        <div class="text-center mb-6">
          <h1 class="font-comic text-4xl text-comic-dark mb-2">Escribe una reseña</h1>
          <p class="text-gray-600">Comparte tu experiencia con otros lectores</p>
        </div>

        <!-- Product info -->
        <div class="comic-card-flat p-4 bg-white flex items-center gap-4 mb-6">
          <img src="${product.images[0]}" alt="${product.title}" class="w-20 h-24 object-cover rounded border-2 border-gray-200">
          <div class="flex-1">
            <p class="text-xs text-gray-500 uppercase">${product.author}</p>
            <p class="font-bold">${product.title}</p>
          </div>
        </div>

        <div class="comic-card p-6 bg-white">
          <form id="review-form" class="space-y-6">
            <!-- Star rating -->
            <div class="text-center">
              <label class="block text-sm font-semibold mb-3">Tu evaluación *</label>
              <div class="flex justify-center gap-2 text-5xl" id="star-picker">
                ${[1,2,3,4,5].map(i => `
                  <button type="button" data-star="${i}" class="star text-gray-300 hover:text-comic-yellow transition-colors focus:outline-none">★</button>
                `).join('')}
              </div>
              <p id="rating-label" class="text-sm text-gray-500 mt-2 h-5">Selecciona una calificación</p>
            </div>

            <!-- Title -->
            <div>
              <label class="block text-sm font-semibold mb-1">Título de tu reseña *</label>
              <input type="text" name="title" required maxlength="100" class="input-comic" placeholder="Resume tu opinión en una frase">
            </div>

            <!-- Comment -->
            <div>
              <label class="block text-sm font-semibold mb-1">Comentario *</label>
              <textarea name="comment" required rows="6" class="input-comic resize-none" placeholder="Cuéntanos qué te gustó, qué no, y a quién se lo recomendarías..."></textarea>
              <p class="text-xs text-gray-500 mt-1">Mínimo 20 caracteres</p>
            </div>

            <div class="text-xs text-gray-500 bg-gray-50 p-3 rounded">
              💡 Tu reseña será pública y ayudará a otros compradores. Sé respetuoso y constructivo.
            </div>

            <div class="flex flex-col sm:flex-row gap-3">
              <a href="producto-detalle.html?id=${product.id}" class="btn-comic btn-comic-outline flex-1">Cancelar</a>
              <button type="submit" class="btn-comic btn-comic-lg flex-1" id="submit-review">
                Publicar reseña
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    setupStarPicker();
  }

  function setupStarPicker() {
    const stars = document.querySelectorAll('#star-picker [data-star]');
    const label = document.getElementById('rating-label');
    const labels = ['', 'Muy malo', 'Malo', 'Aceptable', 'Bueno', 'Excelente'];

    stars.forEach(star => {
      star.addEventListener('mouseenter', () => {
        const value = parseInt(star.dataset.star);
        updateStars(value);
        label.textContent = labels[value];
      });
      star.addEventListener('mouseleave', () => {
        updateStars(state.rating);
        label.textContent = state.rating ? labels[state.rating] : 'Selecciona una calificación';
      });
      star.addEventListener('click', () => {
        state.rating = parseInt(star.dataset.star);
        updateStars(state.rating);
        label.textContent = labels[state.rating];
      });
    });

    function updateStars(value) {
      stars.forEach(s => {
        const v = parseInt(s.dataset.star);
        s.classList.toggle('text-comic-yellow', v <= value);
        s.classList.toggle('text-gray-300', v > value);
      });
    }

    document.getElementById('review-form').addEventListener('submit', (e) => {
      e.preventDefault();
      if (state.rating === 0) {
        Helpers.toast('Por favor selecciona una calificación', 'error');
        return;
      }
      const form = e.target;
      const data = new FormData(form);
      if ((data.get('comment') || '').trim().length < 20) {
        Helpers.toast('El comentario debe tener al menos 20 caracteres', 'error');
        return;
      }

      const user = Store.Auth.getCurrentUser();
      const productId = Helpers.getParam('producto');
      Store.Reviews.add({
        productId,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        rating: state.rating,
        title: data.get('title'),
        comment: data.get('comment')
      });
      Helpers.toast('¡Reseña publicada!', 'success');
      setTimeout(() => window.location.href = `producto-detalle.html?id=${productId}`, 1000);
    });
  }

  document.addEventListener('DOMContentLoaded', render);
})();