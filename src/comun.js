// =============================================================================
// PARTES COMUNES A TODAS LAS PÁGINAS (sitio b: estilo «cápsula», sin video scroll)
// -----------------------------------------------------------------------------
// Cada página tiene <div id="cabecera"></div> y <div id="pie"></div>; este
// archivo los llena, así el menú y el pie se cambian en un solo lugar.
//   1. ÍCONOS          → dibujos <symbol> que se usan con <use href="#i-…">
//   2. CABECERA        → cápsula flotante: logo, menú con dos desplegables y Cotizar
//   3. PIE             → logo, cuatro columnas de enlaces y datos
//   4. COMPORTAMIENTO  → abrir y cerrar desplegables y el menú del celular;
//                        aparición de los bloques al bajar
// Para cambiar un enlace del menú: sección 2. Para el pie: sección 3.
// =============================================================================
import { CATEGORIAS, PRODUCTOS, WHATSAPP } from './datos.js';

const $ = (s, raiz = document) => raiz.querySelector(s);
const $$ = (s, raiz = document) => [...raiz.querySelectorAll(s)];

// ---------------------------------------------------------------------------
// 1. ÍCONOS (los mismos del sitio a)
// ---------------------------------------------------------------------------
const ICONOS = `
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<symbol id="i-gota" viewBox="0 0 24 24"><path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11Z"/></symbol>
<symbol id="i-escudo" viewBox="0 0 24 24"><path d="M12 3 4 6v6c0 4.5 3.4 8.2 8 9 4.6-.8 8-4.5 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/></symbol>
<symbol id="i-sol" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></symbol>
<symbol id="i-paleta" viewBox="0 0 24 24"><path d="M12 3a9 9 0 0 0 0 18c1.1 0 1.6-.8 1.6-1.6 0-1.3-1-1.6-1-2.8 0-1 .8-1.6 1.8-1.6H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3Z"/><circle cx="7.5" cy="11" r="1.2"/><circle cx="10.5" cy="7" r="1.2"/><circle cx="15" cy="7.5" r="1.2"/></symbol>
<symbol id="i-luz" viewBox="0 0 24 24"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z"/></symbol>
<symbol id="i-pluma" viewBox="0 0 24 24"><path d="M20 4C11 4 6 9 5 19l-1 1"/><path d="M5 19c7 0 12-3 13-9"/></symbol>
<symbol id="i-capas" viewBox="0 0 24 24"><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/></symbol>
<symbol id="i-moneda" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M15 9.5c-.5-1-1.6-1.5-3-1.5-1.8 0-3 .9-3 2s1 1.7 3 2 3 .9 3 2-1.2 2-3 2c-1.4 0-2.5-.5-3-1.5M12 6v2M12 16v2"/></symbol>
<symbol id="i-onda" viewBox="0 0 24 24"><path d="M3 15c3 0 3-6 6-6s3 6 6 6 3-6 6-6"/></symbol>
<symbol id="i-tijera" viewBox="0 0 24 24"><circle cx="6" cy="7" r="3"/><circle cx="6" cy="17" r="3"/><path d="M8.5 8.5 20 18M8.5 15.5 20 6"/></symbol>
<symbol id="i-check" viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></symbol>
<symbol id="i-teja" viewBox="0 0 24 24"><path d="M3 10 12 4l9 6"/><path d="M5 9v10h14V9"/><path d="M5 13c2.3 0 2.3-2 4.7-2s2.3 2 4.6 2 2.4-2 4.7-2"/></symbol>
<symbol id="i-casa" viewBox="0 0 24 24"><path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></symbol>
<symbol id="i-bodega" viewBox="0 0 24 24"><path d="M2 10 12 5l10 5v10H2Z"/><path d="M6 20v-7h12v7M6 16h12"/></symbol>
<symbol id="i-garaje" viewBox="0 0 24 24"><path d="M3 9 12 4l9 5v11"/><path d="M3 9v11"/><path d="M6 17h12M7 17l1-4h8l1 4"/><circle cx="8.5" cy="19" r="1"/><circle cx="15.5" cy="19" r="1"/></symbol>
<symbol id="i-tornillo" viewBox="0 0 24 24"><path d="M8 4h8l1 3H7Z"/><path d="M10 7v13l2 2 2-2V7M10 10l4 1M10 13l4 1M10 16l4 1"/></symbol>
<symbol id="i-reciclar" viewBox="0 0 24 24"><path d="M7 19H4l3.5-6M17 19h3l-3.5-6M9.5 5.5 12 2l2.5 3.5"/><path d="m7.5 13-2-3.5M16.5 13l2-3.5M12 2l-2.5 4.3M14 19H10"/><path d="M5.5 9.5 9 8M18.5 9.5 15 8"/></symbol>
<symbol id="i-hoja" viewBox="0 0 24 24"><path d="M5 19C5 10 10 5 20 4c-1 10-6 15-15 15Z"/><path d="M5 19 13 11"/></symbol>
<symbol id="i-sello" viewBox="0 0 24 24"><circle cx="12" cy="10" r="6"/><path d="m9.5 10 1.8 1.8 3.2-3.3M8.5 15l-1.5 6 5-2 5 2-1.5-6"/></symbol>
<symbol id="i-rayo" viewBox="0 0 24 24"><path d="M13 2 4 14h7l-1 8 9-12h-7Z"/></symbol>
<symbol id="i-casco" viewBox="0 0 24 24"><path d="M4 17h16M5 17a7 7 0 0 1 14 0M10 10V7h4v3"/></symbol>
<symbol id="i-factura" viewBox="0 0 24 24"><path d="M6 3h9l3 3v15H6Z"/><path d="M9 9h6M9 13h6M9 17h4"/></symbol>
<symbol id="i-mano" viewBox="0 0 24 24"><path d="M2 12 6 8l4 2 3-2 5 4 4-1"/><path d="M6 8v8l5 4 4-3 3 1 4-5M10 14l3 2"/></symbol>
<symbol id="i-megafono" viewBox="0 0 24 24"><path d="M3 10v4h3l9 5V5L6 10Z"/><path d="M18 9a4 4 0 0 1 0 6M7 14l1.5 5"/></symbol>
<symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></symbol>
<symbol id="i-fono" viewBox="0 0 24 24"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z"/></symbol>
<symbol id="i-flecha" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>
<symbol id="i-abajo" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></symbol>
<symbol id="i-fb" viewBox="0 0 24 24"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v7h4v-7h3l1-4h-4V8Z"/></symbol>
<symbol id="i-ig" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8"/></symbol>
<symbol id="i-in" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/></symbol>
<symbol id="i-tk" viewBox="0 0 24 24"><path d="M14 3v11a4 4 0 1 1-4-4"/><path d="M14 3c.5 3 2.5 5 5 5"/></symbol>
<!-- Íconos de «Truvec lo tiene todo» (dibujo de línea, 48 × 48) -->
<symbol id="t-teja" viewBox="0 0 48 48"><path d="M4 30 24 12l20 18"/><path d="M8 27c3 0 3 4 6 4s3-4 6-4 3 4 6 4 3-4 6-4 3 4 6 4"/><path d="M10 33v9h28v-9"/></symbol>
<symbol id="t-alveolar" viewBox="0 0 48 48"><path d="M6 16 30 8l12 6-24 8Z"/><path d="M6 16v14l12 6V22M42 14v14l-24 8"/><path d="M12 19v14M24 18v14M30 16v14M36 14v14"/></symbol>
<symbol id="t-polipropileno" viewBox="0 0 48 48"><path d="M6 30 18 14h24L30 30Z"/><path d="M10 25c2 0 3-3 5-3s3 3 5 3 3-3 5-3 3 3 5 3 3-3 5-3"/><path d="M6 30v6h24l12-16v-6"/><path d="M30 30v6"/></symbol>
<symbol id="t-cumbrera" viewBox="0 0 48 48"><path d="M4 34 24 16l20 18"/><path d="M14 25l10-9 10 9"/><path d="M8 38h32"/></symbol>
<symbol id="t-mas" viewBox="0 0 48 48"><rect x="8" y="8" width="13" height="13" rx="3"/><rect x="27" y="8" width="13" height="13" rx="3"/><rect x="8" y="27" width="13" height="13" rx="3"/><path d="M33.5 28v12M27.5 34h12"/></symbol>
<!-- WhatsApp: relleno (no línea), por eso fill y stroke van en el path -->
<symbol id="i-wa" viewBox="0 0 32 32"><path fill="currentColor" stroke="none" d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3Zm0 23.6c-2 0-4-.5-5.7-1.6l-.4-.2-3.9 1 1-3.8-.3-.4A10.6 10.6 0 1 1 16 26.6Zm5.8-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.7 8.7 0 0 1-4.3-3.8c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.8 5 2.1.9 3 1 4 .8.7-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5-.1-.1-.3-.2-.6-.4Z"/></symbol>
<symbol id="i-ojo" viewBox="0 0 24 24"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/><path d="M12 2v1M4.9 4.9l.7.7M19.1 4.9l-.7.7"/></symbol>
<symbol id="i-diana" viewBox="0 0 24 24"><circle cx="11" cy="13" r="8"/><circle cx="11" cy="13" r="4.5"/><circle cx="11" cy="13" r="1"/><path d="m11 13 9-9M17 4h3v3"/></symbol>
<symbol id="i-chispa" viewBox="0 0 24 24"><path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19"/></symbol>
</defs></svg>`;


const icono = (id) => `<svg class="ico" aria-hidden="true"><use href="#${id}"/></svg>`;

// ---------------------------------------------------------------------------
// 2. CABECERA
// «Productos» abre una tarjeta con las cuatro categorías (cada una con su color
// y sus productos). «Empresa» abre una tarjeta más angosta con tres páginas.
// data-pagina marca el enlace de la página actual (body data-pagina="…").
// ---------------------------------------------------------------------------
const EMPRESA = [
  ['nosotros', 'Nosotros', 'Quiénes somos y cómo trabajamos'],
  ['sostenibilidad', 'Sostenibilidad', 'Reciclaje, ambiente y calidad'],
  ['sucursales', 'Sucursales', 'Mapa con las ciudades'],
];

// Franja verde de arriba con tres accesos directos (pedido de Henry: «navpon»)
const ACCESOS = [
  ['sucursales.html', 'i-mano', 'Distribuidores'],
  ['nosotros.html#instaladores', 'i-casco', 'Club del instalador'],
  ['cotizar.html', 'i-factura', 'Cotizar'],
];

const cabecera = () => `
<div class="cabecera-fija">
<div class="franja">
  ${ACCESOS.map(([href, ico, texto]) => `<a class="pastilla" href="${href}">${icono(ico)}${texto}</a>`).join('')}
</div>
<header class="barra">
  <a href="index.html" class="logo" aria-label="Truvec, de IFT: ir al inicio">Truvec<sub>IFT</sub></a>
  <nav class="menu" id="menu" aria-label="Menú principal">
    <a href="index.html" data-pagina="inicio">Inicio</a>
    <div class="desplegable" data-pagina="productos producto">
      <button type="button" aria-expanded="false">Productos${icono('i-abajo')}</button>
      <div class="panel panel-banda panel-productos">
        ${CATEGORIAS.map((c) => `
        <div class="panel-grupo" style="--c: ${c.color}">
          <a class="panel-titulo" href="productos.html#${c.id}">${c.nombre}</a>
          <ul>${c.productos.map((id) => `<li><a href="producto.html?id=${id}">${PRODUCTOS[id].nombre}</a></li>`).join('')}</ul>
        </div>`).join('')}
        <a class="panel-todos" href="productos.html">Ver todos los productos ${icono('i-flecha')}</a>
      </div>
    </div>
    <div class="desplegable" data-pagina="nosotros sostenibilidad sucursales">
      <button type="button" aria-expanded="false">Empresa${icono('i-abajo')}</button>
      <div class="panel panel-banda panel-empresa">
        ${EMPRESA.map(([p, t, d]) => `
        <div class="panel-grupo" style="--c: var(--dorado)">
          <a class="panel-titulo" href="${p}.html">${t}</a>
          <ul><li><a href="${p}.html">${d}</a></li></ul>
        </div>`).join('')}
      </div>
    </div>
    <a href="contacto.html" data-pagina="contacto">Contacto</a>
  </nav>
  <a class="barra-fono" href="https://wa.me/${WHATSAPP}" target="_blank" rel="noopener" aria-label="Escribir por WhatsApp">${icono('i-fono')}</a>
  <a href="cotizar.html" class="boton boton-oscuro boton-cotizar">Cotizar</a>
  <button type="button" class="menu-boton" aria-controls="menu" aria-expanded="false"><span></span><span></span><span class="oculto">Menú</span></button>
</header>
</div>
<a class="wa" href="https://wa.me/${WHATSAPP}" target="_blank" rel="noopener" aria-label="Escribir por WhatsApp">
  <span class="wa-texto">Contáctanos</span>
  <span class="wa-icono"><svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3Zm0 23.6c-2 0-4-.5-5.7-1.6l-.4-.2-3.9 1 1-3.8-.3-.4A10.6 10.6 0 1 1 16 26.6Zm5.8-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.7 8.7 0 0 1-4.3-3.8c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.8 5 2.1.9 3 1 4 .8.7-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5-.1-.1-.3-.2-.6-.4Z"/></svg></span>
</a>`;

// ---------------------------------------------------------------------------
// 3. PIE: cuatro columnas siempre a la vista (sin desplegar)
// ---------------------------------------------------------------------------
const columna = (titulo, enlaces) => `
  <div class="pie-columna">
    <p class="pie-titulo">${titulo}</p>
    <ul>${enlaces.map(([texto, href]) => `<li><a href="${href}">${texto}</a></li>`).join('')}</ul>
  </div>`;

const pie = () => `
<footer class="pie oscura">
  <div class="pie-arriba">
    <div class="pie-marca">
      <p class="logo logo-pie">Truvec<sub>IFT</sub></p>
      <p class="pie-frase">Techos de PVC, policarbonato y polipropileno.</p>
      <ul class="redes" aria-label="Redes sociales">
        <li><a href="#" aria-label="Facebook">${icono('i-fb')}</a></li>
        <li><a href="#" aria-label="Instagram">${icono('i-ig')}</a></li>
        <li><a href="#" aria-label="LinkedIn">${icono('i-in')}</a></li>
        <li><a href="#" aria-label="TikTok">${icono('i-tk')}</a></li>
      </ul>
    </div>
    ${columna('Productos', [...CATEGORIAS.map((c) => [c.nombre, `productos.html#${c.id}`]), ['Ver todos', 'productos.html']])}
    ${columna('Empresa', EMPRESA.map(([p, t]) => [t, `${p}.html`]))}
    ${columna('Atención', [['Cotizar', 'cotizar.html'], ['Contacto', 'contacto.html'], ['Preguntas frecuentes', 'contacto.html#preguntas'], ['Escribir por WhatsApp', `https://wa.me/${WHATSAPP}`]])}
  </div>
  <p class="pie-legal">© Truvec · IFT. Boceto de demostración: datos y textos de ejemplo. <span class="pendiente">Política de privacidad pendiente.</span></p>
</footer>`;

document.body.insertAdjacentHTML('afterbegin', ICONOS);
$('#cabecera').outerHTML = cabecera();
$('#pie').outerHTML = pie();

// ---------------------------------------------------------------------------
// 4. COMPORTAMIENTO
// ---------------------------------------------------------------------------
const actual = document.body.dataset.pagina;
$$('.menu [data-pagina]').forEach((e) => e.classList.toggle('actual', e.dataset.pagina.split(' ').includes(actual)));

// Desplegables: se abren al pasar el mouse (computadora) o al tocarlos.
// Sólo uno abierto a la vez; Escape o un clic afuera los cierran. Al salir con
// el mouse esperan 300 ms antes de cerrarse (el mismo arreglo del sitio a).
const desplegables = $$('.desplegable');
function abrir(d, si) {
  d.classList.toggle('abierto', si);
  $('button', d).setAttribute('aria-expanded', si);
}
const cerrarTodos = (salvo) => desplegables.forEach((d) => d !== salvo && abrir(d, false));
const conMouse = matchMedia('(hover: hover) and (min-width: 1001px)');
const ESPERA_CIERRE = 300;
let cierre = null;
desplegables.forEach((d) => {
  $('button', d).addEventListener('click', () => { cerrarTodos(d); abrir(d, !d.classList.contains('abierto')); });
  d.addEventListener('mouseenter', () => {
    if (!conMouse.matches) return;
    clearTimeout(cierre);
    cerrarTodos(d);
    abrir(d, true);
  });
  d.addEventListener('mouseleave', () => {
    if (!conMouse.matches) return;
    clearTimeout(cierre);
    cierre = setTimeout(() => abrir(d, false), ESPERA_CIERRE);
  });
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') cerrarTodos(); });
document.addEventListener('click', (e) => { if (!e.target.closest('.desplegable')) cerrarTodos(); });

// Menú del celular (hasta 1000 px): el botón de tres rayas lo abre a pantalla completa.
const barra = $('.barra');
const botonMenu = $('.menu-boton');
botonMenu.addEventListener('click', () => {
  const abierta = barra.classList.toggle('abierta');
  botonMenu.setAttribute('aria-expanded', abierta);
  document.documentElement.classList.toggle('menu-abierto', abierta);
});

// Aparición suave de los bloques con data-entra al acercarse a la pantalla.
const verEntrada = new IntersectionObserver((entradas) => entradas.forEach((e) => {
  if (!e.isIntersecting) return;
  e.target.classList.add('visto');
  verEntrada.unobserve(e.target);
}), { rootMargin: '0px 0px -8% 0px' });
$$('[data-entra]').forEach((e) => verEntrada.observe(e));

export { $, $$, icono };
