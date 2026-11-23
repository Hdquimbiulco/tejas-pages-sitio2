// =============================================================================
// DATOS DEL SITIO: productos, categorías y contacto
// -----------------------------------------------------------------------------
// Lo usan el menú (comun.js), la página de productos y la ficha de producto.
// PARA AGREGAR UN PRODUCTO: copiar un bloque de PRODUCTOS, cambiar el id (va en
// la dirección: producto.html?id=<id>) y ponerlo en la lista de su categoría.
// ejemplo: true → producto de prueba que no está en el catálogo real de Truvec.
// foto: null → se muestra un espacio marcado «Foto pendiente».
// =============================================================================

// Datos de contacto de PRUEBA: reemplazar por los reales de ventas.
export const WHATSAPP = '593999999999';
export const CORREO = 'ventas@truvec.example';

// Categorías, en el orden del menú. color = variable de CSS del material.
export const CATEGORIAS = [
  { id: 'pvc', nombre: 'Tejas de PVC', color: 'var(--pvc)', icono: 'i-teja', productos: ['teja-colonial-pvc', 'teja-trapezoidal-pvc', 'cumbrera-pvc'] },
  { id: 'pc', nombre: 'Policarbonato', color: 'var(--pc)', icono: 'i-luz', productos: ['policarbonato-alveolar', 'policarbonato-ondulado'] },
  { id: 'pp', nombre: 'Polipropileno', color: 'var(--pp)', icono: 'i-onda', productos: ['teja-polipropileno', 'teja-translucida-pp'] },
];

export const PRODUCTOS = {
  'teja-colonial-pvc': {
    nombre: 'Teja colonial de PVC', categoria: 'pvc', foto: 'img/mosaico/pvc-lamina.webp',
    usos: [['i-casa', 'Casas y locales'], ['i-gota', 'Zonas de mucha humedad']],
    descripcion: ['Lámina de PVC con perfil de teja colonial y traslape entre piezas.', 'No se oxida: soporta la humedad sin corroerse.', 'Colores: terracota, rojo, verde, azul y gris.', 'Flexiona con el granizo y vuelve a su forma.'],
    normas: [['Norma de referencia', 'Pendiente de la ficha técnica.'], ['Largos', '2,90 a 11,80 m (dato de ejemplo).']],
  },
  'teja-trapezoidal-pvc': {
    nombre: 'Teja trapezoidal de PVC', categoria: 'pvc', foto: 'img/mosaico/pvc-ondulada.webp', ejemplo: true,
    usos: [['i-bodega', 'Bodegas y galpones'], ['i-casa', 'Ampliaciones']],
    descripcion: ['Lámina de PVC con perfil trapezoidal para cubiertas amplias.', 'Liviana y fácil de cortar con herramienta común.'],
    normas: [['Norma de referencia', 'Pendiente de la ficha técnica.']],
  },
  'policarbonato-alveolar': {
    nombre: 'Policarbonato alveolar', categoria: 'pc', foto: 'img/mosaico/pc-alveolar.webp',
    usos: [['i-garaje', 'Garajes y pérgolas'], ['i-luz', 'Patios y tragaluces']],
    descripcion: ['Plancha de policarbonato con celdas internas: cubre y deja pasar la luz.', 'Liviana: se carga y se instala con facilidad.', 'Disponible en varios colores.'],
    normas: [['Norma de referencia', 'Pendiente de la ficha técnica.'], ['Largos', '2,44 a 6,10 m (dato de ejemplo).']],
  },
  'policarbonato-ondulado': {
    nombre: 'Policarbonato ondulado', categoria: 'pc', foto: 'img/mosaico/pc-greca.webp',
    usos: [['i-garaje', 'Corredores y pérgolas'], ['i-bodega', 'Tragaluces en bodegas']],
    descripcion: ['Lámina translúcida con onda de 76 mm.', 'Se fija con tornillos con arandela de goma.'],
    normas: [['Norma de referencia', 'Pendiente de la ficha técnica.']],
  },
  'teja-polipropileno': {
    nombre: 'Teja de polipropileno', categoria: 'pp', foto: 'img/material/pp.webp',
    usos: [['i-casa', 'Viviendas y ampliaciones'], ['i-bodega', 'Bodegas']],
    descripcion: ['Perfil trapezoidal y acabado mate.', 'Onda de 13 cm y 35 mm de alto, con capuchón en la cresta.', 'Rinde más techo por menos inversión.'],
    normas: [['Norma de referencia', 'Pendiente de la ficha técnica.'], ['Largos', '1,83 a 3,66 m (dato de ejemplo).']],
  },
  'teja-translucida-pp': {
    nombre: 'Teja translúcida de polipropileno', categoria: 'pp', foto: 'img/mosaico/pp-mano.webp', ejemplo: true,
    usos: [['i-luz', 'Tragaluces'], ['i-bodega', 'Bodegas y talleres']],
    descripcion: ['Lámina ondulada translúcida que deja entrar la luz natural.', 'Flexible: se dobla sin quebrarse.'],
    normas: [['Norma de referencia', 'Pendiente de la ficha técnica.']],
  },
  'cumbrera-pvc': {
    nombre: 'Cumbrera de PVC', categoria: 'pvc', foto: 'img/mosaico/pvc-cumbrera.webp',
    usos: [['i-casa', 'Cierre del techo en la cumbre']],
    descripcion: ['Pieza que cierra la unión de los dos faldones del techo.', 'En los mismos colores de la teja de PVC.'],
    normas: [['Medidas y colores', 'Pendientes del catálogo.']],
  },
};

// Dirección de un archivo de public/ desde JS (en el HTML se escribe directo).
export const ruta = (archivo) => `${import.meta.env.BASE_URL}${archivo}`;
