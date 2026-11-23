// =============================================================================
// SUCURSALES (sucursales.html): carga el mapa de tejas2 (src/mapaSucursales.js)
// y arma el enlace de WhatsApp de cada oficina.
// =============================================================================
import { $, $$ } from './comun.js';
import { WHATSAPP } from './datos.js';

const seccion = $('#mapa');
import('./mapaSucursales.js')
  .then(({ crearMapa }) => crearMapa(seccion, { whatsapp: WHATSAPP }))
  .catch((error) => {
    seccion.querySelector('.mapa-estado').textContent = 'No se pudo cargar el mapa de sucursales.';
    console.error(error);
  });

$$('[data-wa-ciudad]').forEach((a) => {
  a.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hola, escribo desde ${a.dataset.waCiudad}.`)}`;
  a.target = '_blank';
  a.rel = 'noopener';
});
