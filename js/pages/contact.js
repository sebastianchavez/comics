/* ============================================
   Contact Page
   ============================================ */

(function() {
  Components.init('contact');

  function renderPage() {
    const main = document.getElementById('contact-main');
    if (!main) return;
    main.innerHTML = `
      <section class="py-12">
        <div class="max-w-7xl mx-auto px-4">
          <div class="grid lg:grid-cols-3 gap-8">

            <!-- Form -->
            <div class="lg:col-span-2">
              <div class="comic-card p-8 bg-white">
                <h2 class="font-comic text-3xl text-comic-dark mb-2">Envíanos un mensaje</h2>
                <p class="text-gray-600 mb-6">¿Tienes alguna pregunta, sugerencia o quieres saber más sobre algún producto? Estamos aquí para ayudarte.</p>
                <form id="contact-form" class="space-y-4">
                  <div class="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-semibold mb-1">Nombre completo *</label>
                      <input type="text" name="name" required class="input-comic" placeholder="Tu nombre">
                    </div>
                    <div>
                      <label class="block text-sm font-semibold mb-1">Email *</label>
                      <input type="email" name="email" required class="input-comic" placeholder="tu@email.com">
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-semibold mb-1">Teléfono</label>
                    <input type="tel" name="phone" class="input-comic" placeholder="+34 600 000 000">
                  </div>
                  <div>
                    <label class="block text-sm font-semibold mb-1">Asunto *</label>
                    <select name="subject" required class="input-comic">
                      <option value="">Selecciona un asunto</option>
                      <option>Consulta sobre un producto</option>
                      <option>Estado de mi pedido</option>
                      <option>Devoluciones</option>
                      <option>Sugerencias</option>
                      <option>Colaboraciones</option>
                      <option>Otro</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-semibold mb-1">Mensaje *</label>
                    <textarea name="message" required rows="6" class="input-comic resize-none" placeholder="Cuéntenos en qué podemos ayudarle..."></textarea>
                  </div>
                  <div class="flex items-start gap-2">
                    <input type="checkbox" name="accept" required class="mt-1 accent-comic-red">
                    <label class="text-sm text-gray-600">Acepto la <a href="politicas-privacidad.html" class="text-comic-red hover:underline">política de privacidad</a> *</label>
                  </div>
                  <button type="submit" class="btn-comic btn-comic-lg w-full">
                    Enviar mensaje
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </button>
                </form>
              </div>
            </div>

            <!-- Sidebar info -->
            <aside class="space-y-4">
              <div class="comic-card p-6 bg-comic-yellow">
                <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  Horario
                </h3>
                <ul class="space-y-2 text-sm">
                  <li class="flex justify-between"><span>Lunes a Viernes</span><span class="font-bold">10:00 - 21:00</span></li>
                  <li class="flex justify-between"><span>Sábado</span><span class="font-bold">10:00 - 22:00</span></li>
                  <li class="flex justify-between"><span>Domingo</span><span class="font-bold">11:00 - 20:00</span></li>
                </ul>
                <p class="text-xs mt-3 text-gray-700">*Horario de la tienda física. La web está disponible 24/7.</p>
              </div>

              <div class="comic-card-flat p-6">
                <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
                  <svg class="w-5 h-5 text-comic-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  Ubicación
                </h3>
                <p class="text-sm text-gray-700 mb-3">Calle Mayor 123<br>28013 Madrid, España</p>
                <a href="https://www.google.com/maps/search/?api=1&query=Calle+Mayor+123+Madrid" target="_blank" class="btn-comic btn-comic-outline btn-comic-sm w-full">
                  Ver en mapa
                </a>
              </div>

              <div class="comic-card-flat p-6">
                <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
                  <svg class="w-5 h-5 text-comic-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  Contacto directo
                </h3>
                <ul class="space-y-2 text-sm">
                  <li><strong>Teléfono:</strong> +34 912 345 678</li>
                  <li><strong>Email:</strong> hola@comicstore.com</li>
                  <li><strong>WhatsApp:</strong> +34 612 345 678</li>
                </ul>
              </div>

              <div class="comic-card-flat p-6">
                <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
                  <svg class="w-5 h-5 text-comic-red" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                  Redes sociales
                </h3>
                <ul class="space-y-2 text-sm">
                  <li><a href="#" class="hover:text-comic-red">@comicstore</a></li>
                  <li><a href="#" class="hover:text-comic-red">/comicstore</a></li>
                  <li><a href="#" class="hover:text-comic-red">/comicstore</a></li>
                </ul>
              </div>
            </aside>
          </div>

          <!-- Mapa -->
          <div class="mt-12">
            <h2 class="font-comic text-3xl mb-6 text-center">Encuéntranos</h2>
            <div class="comic-card overflow-hidden">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=-3.7177%2C40.4153%2C-3.6977%2C40.4353&marker=40.4253%2C-3.7077"
                width="100%" height="400" frameborder="0"
                style="border:0" loading="lazy"
                class="w-full">
              </iframe>
            </div>
          </div>

          <!-- FAQ -->
          <div class="mt-12">
            <h2 class="font-comic text-3xl mb-6">Preguntas frecuentes</h2>
            <div class="space-y-3">
              ${[
                { q: '¿Cuánto tarda en llegar mi pedido?', a: 'Los pedidos se procesan en 24h. El envío estándar tarda entre 2-3 días laborables. El expresso llega en 24h.' },
                { q: '¿Puedo devolver un producto?', a: 'Sí, tienes 30 días para devolver cualquier producto en su estado original sin abrir. Te reembolsamos el 100%.' },
                { q: '¿Hacen envíos internacionales?', a: 'Por ahora solo enviamos a España y Portugal. Estamos trabajando en ampliar a Europa.' },
                { q: '¿Tienen tienda física?', a: 'Sí, nuestra tienda está en Calle Mayor 123, Madrid. Ven a visitarnos y descubre más de 5000 productos.' },
                { q: '¿Cómo puedo saber si un cómic está disponible?', a: 'Todos los productos en la web tienen stock en tiempo real. Si ves "Sin stock", podemos avisarte cuando llegue.' }
              ].map((f, i) => `
                <details class="comic-card-flat p-4 group">
                  <summary class="flex items-center justify-between cursor-pointer font-semibold">
                    <span>${f.q}</span>
                    <svg class="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                  </summary>
                  <p class="mt-3 text-gray-700">${f.a}</p>
                </details>
              `).join('')}
            </div>
          </div>
        </div>
      </section>
    `;

    document.getElementById('contact-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.target;
      const data = new FormData(form);
      if (!data.get('accept')) {
        Helpers.toast('Debes aceptar la política de privacidad', 'error');
        return;
      }
      Helpers.toast('¡Mensaje enviado! Te responderemos en menos de 24h.', 'success');
      form.reset();
    });
  }

  document.addEventListener('DOMContentLoaded', renderPage);
})();