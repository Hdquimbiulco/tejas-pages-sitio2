// =============================================================================
// COTIZAR (cotizar.html): calculadora de láminas y envío del pedido.
// ?material=pvc|pc|pp (lo usa la ficha de producto) abre con ese material marcado.
// =============================================================================
import { $ } from './comun.js';
import { WHATSAPP, CORREO } from './datos.js';

$('[data-wa-texto]').textContent = `+${WHATSAPP.slice(0, 3)} ${WHATSAPP.slice(3, 5)} ${WHATSAPP.slice(5, 8)} ${WHATSAPP.slice(8)}`;
$('[data-correo-texto]').textContent = CORREO;
const parametros = new URLSearchParams(location.search);
const marcado = $(`input[name="material"][value="${parametros.get('material')}"]`);
if (marcado) marcado.checked = true;

// Ancho útil por lámina (m) y peso por m²: se llenan con la ficha técnica; sin dato no se estima.
const ANCHO_UTIL = { pp: null, pc: null, pvc: null };
const PESO_M2 = { pp: null, pc: null, pvc: null };
const TRASLAPE = 0.05;
let pedido = {};
function calcular() {
  const opcion = $('input[name="material"]:checked');
  const material = opcion.value;
  const area = (+$('#largo').value || 0) * (+$('#ancho').value || 0);
  const conTraslape = area * (1 + TRASLAPE);
  const lamina = +$('#largoLamina').value || 0;
  const ancho = ANCHO_UTIL[material];
  const laminas = ancho && lamina ? `${Math.ceil(conTraslape / (ancho * lamina))} láminas de ${lamina} m` : `Láminas de ${lamina} m: pendiente del ancho útil`;
  const peso = PESO_M2[material] ? `${Math.round(conTraslape * PESO_M2[material])} kg aproximados` : 'Peso: pendiente de la ficha técnica';
  pedido = { material: opcion.dataset.nombre, medidas: `${$('#largo').value} × ${$('#ancho').value} m`, area: `${area.toFixed(1)} m² (${conTraslape.toFixed(1)} m² con traslapes)`, lamina: `${lamina} m` };
  $('#resultado').innerHTML = `<strong>${area.toFixed(1)} m²</strong><em>${conTraslape.toFixed(1)} m² de ${opcion.dataset.nombre} con 5 % de traslapes y cortes</em><span>${laminas}</span><span>${peso}</span>`;
}
$('#laminas').addEventListener('input', calcular);
$('#laminas').addEventListener('change', calcular);
$('#laminas').addEventListener('submit', (e) => e.preventDefault());
calcular();
$('#contacto').addEventListener('submit', (e) => {
  e.preventDefault();
  const datos = new FormData(e.target);
  const texto = [
    'Hola, quiero una cotización.',
    `Nombre: ${datos.get('nombre')}`,
    `Teléfono: ${datos.get('telefono')}`,
    datos.get('ciudad') && `Ciudad: ${datos.get('ciudad')}`,
    `Material: ${pedido.material}`,
    `Techo: ${pedido.medidas}, ${pedido.area}`,
    `Largo de lámina: ${pedido.lamina}`,
  ].filter(Boolean).join('\n');
  const aviso = $('#contactoAviso');
  if (e.submitter?.value === 'correo') {
    location.href = `mailto:${CORREO}?subject=${encodeURIComponent('Cotización de techo')}&body=${encodeURIComponent(texto)}`;
    aviso.textContent = 'Se abrió el correo con el pedido listo para enviar.';
  } else {
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener');
    aviso.textContent = 'Se abrió WhatsApp con el pedido listo para enviar.';
  }
  aviso.hidden = false;
});

