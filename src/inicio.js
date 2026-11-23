// =============================================================================
// INICIO (index.html): menú y pie (comun.js), mapa de sucursales y video final.
// El mapa se carga recién cuando su sección se acerca a la pantalla, para que
// la portada (video) cargue primero.
// =============================================================================
import { $ } from './comun.js';
import { WHATSAPP } from './datos.js';

const seccion = $('#mapa');
const cargar = () => import('./mapaSucursales.js')
  .then(({ crearMapa }) => crearMapa(seccion, { whatsapp: WHATSAPP }))
  .catch((error) => {
    seccion.querySelector('.mapa-estado').textContent = 'No se pudo cargar el mapa de sucursales.';
    console.error(error);
  });

new IntersectionObserver((entradas, obs) => {
  if (!entradas.some((e) => e.isIntersecting)) return;
  obs.disconnect();
  cargar();
}, { rootMargin: '600px 0px' }).observe(seccion);

// Cifras de la portada: suben desde 0 la primera vez que se ven (1,2 s).
// Con movimiento reducido quedan quietas en su valor.
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const cifras = document.querySelectorAll('[data-cuenta]');
  const contar = (b) => {
    const fin = +b.dataset.cuenta;
    const antes = b.dataset.antes || '';
    const inicio = performance.now();
    const paso = (ahora) => {
      const t = Math.min(1, (ahora - inicio) / 1200);
      b.textContent = antes + Math.round(fin * (1 - (1 - t) ** 3));
      if (t < 1) requestAnimationFrame(paso);
    };
    requestAnimationFrame(paso);
  };
  cifras.forEach((b) => { b.textContent = (b.dataset.antes || '') + '0'; });
  const observador = new IntersectionObserver((entradas) => entradas.forEach((e) => {
    if (!e.isIntersecting) return;
    observador.unobserve(e.target);
    contar(e.target);
  }), { threshold: 0.6 });
  cifras.forEach((b) => observador.observe(b));
}

// Video final: se reproduce cuando al menos la mitad está en pantalla y se
// detiene en cuanto se pasa a otra sección.
const video = $('.video-final video');
new IntersectionObserver(([e]) => {
  if (e.isIntersecting) video.play().catch(() => {});
  else video.pause();
}, { threshold: 0.5 }).observe(video);
