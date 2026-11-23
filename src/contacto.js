// =============================================================================
// CONTACTO (contacto.html): canales y formulario que se envía por WhatsApp.
// =============================================================================
import { $ } from './comun.js';
import { WHATSAPP, CORREO } from './datos.js';

const wa = (texto) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
$('[data-wa]').href = wa('Hola, escribo desde el sitio de Truvec.');
$('[data-wa-texto]').textContent = `+${WHATSAPP.slice(0, 3)} ${WHATSAPP.slice(3, 5)} ${WHATSAPP.slice(5, 8)} ${WHATSAPP.slice(8)}`;
$('[data-correo]').href = `mailto:${CORREO}`;
$('[data-correo-texto]').textContent = CORREO;

$('#formContacto').addEventListener('submit', (e) => {
  e.preventDefault();
  const d = new FormData(e.target);
  const texto = [d.get('motivo'), `Nombre: ${d.get('nombre')}`, d.get('ciudad') && `Ciudad: ${d.get('ciudad')}`, d.get('mensaje')].filter(Boolean).join('\n');
  window.open(wa(texto), '_blank', 'noopener');
  const aviso = $('.aviso', e.target);
  aviso.textContent = 'Se abrió WhatsApp con el mensaje listo para enviar.';
  aviso.hidden = false;
});
