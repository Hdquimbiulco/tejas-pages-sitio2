// =============================================================================
// PRODUCTOS (productos.html): filtro por categoría y tarjetas de producto.
// Los datos salen de src/datos.js. productos.html#pc abre con ese filtro.
// =============================================================================
import { $, $$ } from './comun.js';
import { CATEGORIAS, PRODUCTOS, ruta } from './datos.js';

$('[data-filtros]').innerHTML = `<button type="button" class="filtro" data-filtro="todos">Todos</button>`
  + CATEGORIAS.map((c) => `<button type="button" class="filtro" data-filtro="${c.id}" style="--c: ${c.color}"><span class="punto"></span>${c.nombre}</button>`).join('');

$('[data-productos]').innerHTML = CATEGORIAS.flatMap((c) => c.productos.map((id) => {
  const p = PRODUCTOS[id];
  return `
  <a class="producto" href="producto.html?id=${id}" data-categoria="${c.id}" style="--c: ${c.color}">
    <figure>${p.foto ? `<img src="${ruta(p.foto)}" alt="" loading="lazy">` : '<div class="espacio-foto">Foto pendiente</div>'}</figure>
    <div>
      <span class="chip">${c.nombre}</span>
      <h3>${p.nombre}${p.ejemplo ? '<em class="etiqueta-ejemplo">Ejemplo</em>' : ''}</h3>
    </div>
  </a>`;
})).join('');

function filtrar(id) {
  $$('.filtro').forEach((b) => b.setAttribute('aria-pressed', b.dataset.filtro === id));
  $$('.producto').forEach((t) => { t.hidden = id !== 'todos' && t.dataset.categoria !== id; });
}
$('[data-filtros]').addEventListener('click', (e) => {
  const boton = e.target.closest('[data-filtro]');
  if (!boton) return;
  filtrar(boton.dataset.filtro);
  history.replaceState(null, '', boton.dataset.filtro === 'todos' ? location.pathname : `#${boton.dataset.filtro}`);
});
// Los enlaces del menú llevan a productos.html#<categoría>; también al cambiar el # sin recargar.
const desdeDireccion = () => filtrar(CATEGORIAS.some((c) => `#${c.id}` === location.hash) ? location.hash.slice(1) : 'todos');
addEventListener('hashchange', desdeDireccion);
desdeDireccion();
