'use strict';

// Imágenes proporcionadas
const IMG1 = 'https://m.media-amazon.com/images/I/71LZQxV1UmL._AC_SL1500_.jpg';
const IMG2 = 'https://m.media-amazon.com/images/I/71vKtTAM5DL._AC_SL1500_.jpg';
const IMG3 = 'https://m.media-amazon.com/images/I/71+Q--+HcoL._AC_SL1500_.jpg';

// ===== Datos =====
const products = [
  { name: 'Detergente Líquido',      price: 12.99, stars: 5, reviews: 118, seller: 'CleanPro', image: IMG1 },
  { name: 'Limpiacristales',         price: 8.99,  stars: 4, reviews: 96,  seller: 'CleanPro', image: IMG3 },
  { name: 'Multiusos Citrus',        price: 6.49,  stars: 4, reviews: 73,  seller: 'EcoHome',  image: IMG2 },
  { name: 'Fregona Microfibra',      price: 14.5,  stars: 3, reviews: 40,  seller: 'HogarPlus',image: IMG2 },
  { name: 'Lejía Gel',               price: 2.2,   stars: 4, reviews: 340, seller: 'EcoHome',  image: IMG1 },
  { name: 'Ambientador Vainilla',    price: 3.99,  stars: 5, reviews: 510, seller: 'AromaCo',  image: IMG3 },
  { name: 'Guantes Nitrilo (100u)',  price: 9.99,  stars: 4, reviews: 210, seller: 'HogarPlus',image: IMG1 },
  { name: 'Mopa Spray',              price: 24.9,  stars: 3, reviews: 31,  seller: 'CleanPro', image: IMG2 },
  { name: 'Desinfectante Hogar',     price: 5.49,  stars: 4, reviews: 189, seller: 'AromaCo',  image: IMG3 },
];

const eur = n => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n);

// Placeholder de respaldo por si alguna imagen falla
const FALLBACK_IMG = (title = 'Producto') =>
  `https://placehold.co/600x400?text=${encodeURIComponent(title)}`;

// ===== Render =====
function renderProducts(list) {
  const grid = document.getElementById('grid');
  const empty = document.getElementById('empty');

  if (!grid || !empty) {
    console.error('Falta #grid o #empty en el HTML');
    return;
  }

  grid.innerHTML = '';

  if (!Array.isArray(list) || !list.length) {
    empty.hidden = false;
    return;
  }
  empty.hidden = true;

  const html = list.map(p => `
    <li>
      <article>
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <h3>${p.name}</h3>
        <p>Precio: ${eur(p.price)}</p>
        <p class="meta">
          <span aria-label="Puntuación ${p.stars} de 5">${'★'.repeat(p.stars)}${'☆'.repeat(5 - p.stars)}</span>
          <span>(${p.reviews})</span>
          <span> · ${p.seller}</span>
        </p>
        <a href="#" class="btn-buy" aria-disabled="true">Comprar</a>
      </article>
    </li>
  `).join('');

  grid.innerHTML = html;

  // Fallback si falla una imagen
  grid.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
      const title = img.closest('article')?.querySelector('h3')?.textContent || 'Producto';
      img.src = FALLBACK_IMG(title);
    }, { once: true });
  });

  // Demo botón
  grid.querySelectorAll('.btn-buy').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const card = e.currentTarget.closest('article');
      const title = card?.querySelector('h3')?.textContent || 'Producto';
      alert(`Añadido al carrito: ${title}`);
    });
  });
}

// ===== Inicio =====
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
});
