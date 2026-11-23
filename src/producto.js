// =============================================================================
// FICHA DE PRODUCTO (producto.html?id=<id>)
// Una sola página para todos los productos: los datos salen de src/datos.js.
// Si el id no existe, se muestra el primer producto.
// =============================================================================
import { $, icono } from './comun.js';
import { CATEGORIAS, PRODUCTOS, WHATSAPP, ruta } from './datos.js';

const pedido = new URLSearchParams(location.search).get('id');
const id = PRODUCTOS[pedido] ? pedido : CATEGORIAS[0].productos[0];
const p = PRODUCTOS[id];
const categoria = CATEGORIAS.find((c) => c.id === p.categoria);
const foto = (archivo, alt) => (archivo ? `<img src="${ruta(archivo)}" alt="${alt}">` : '<div class="espacio-foto">Foto pendiente</div>');

document.title = `${p.nombre} · Truvec`;
document.body.style.setProperty('--c', categoria.color);
if (p.foto) $('[data-encabezado]').style.setProperty('--foto', `url(${ruta(p.foto)})`);
$('[data-categoria]').textContent = categoria.nombre;
$('[data-migas]').innerHTML = `<li><a href="index.html">Inicio</a></li><li><a href="productos.html">Productos</a></li><li><a href="productos.html#${categoria.id}">${categoria.nombre}</a></li><li aria-current="page">${p.nombre}</li>`;
$('[data-foto]').innerHTML = foto(p.foto, p.nombre);
$('[data-chip]').textContent = categoria.nombre;
$('[data-nombre]').innerHTML = p.nombre + (p.ejemplo ? '<em class="etiqueta-ejemplo">Ejemplo</em>' : '');
$('[data-usos]').innerHTML = p.usos.map(([ico, texto]) => `<span class="uso">${icono(ico)}${texto}</span>`).join('');
$('[data-descripcion]').innerHTML = p.descripcion.map((d) => `<li>${d}</li>`).join('');
$('[data-normas]').innerHTML = p.normas.map(([t, d]) => `<div><dt>${t}</dt><dd>${d}</dd></div>`).join('');
// Cotizar abre la calculadora con el material del producto marcado.
$('[data-cotizar]').href = `cotizar.html?material=${p.categoria}`;
$('[data-wa-producto]').href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hola, quiero información de: ${p.nombre}`)}`;
$('[data-relacionados]').innerHTML = categoria.productos.filter((otro) => otro !== id).map((otro) => `
  <a class="producto" href="producto.html?id=${otro}" style="--c: ${categoria.color}">
    <figure>${foto(PRODUCTOS[otro].foto, '')}</figure>
    <div><h3>${PRODUCTOS[otro].nombre}</h3></div>
  </a>`).join('');
