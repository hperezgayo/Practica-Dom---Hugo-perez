// === Galería dinámica: genera <li><article>...</article></li> en #grid ===
const products=[
  {name:'Detergente Líquido',price:12.99,stars:5,reviews:118,seller:'CleanPro',image:'https://via.placeholder.com/300x300?text=Detergente'},
  {name:'Limpiacristales',price:8.99,stars:4,reviews:96,seller:'CleanPro',image:'https://via.placeholder.com/300x300?text=Limpiacristales'},
  {name:'Multiusos Citrus',price:6.49,stars:4,reviews:73,seller:'EcoHome',image:'https://via.placeholder.com/300x300?text=Multiusos'},
  {name:'Fregona Microfibra',price:14.5,stars:3,reviews:40,seller:'HogarPlus',image:'https://via.placeholder.com/300x300?text=Fregona'},
  {name:'Lejía Gel',price:2.2,stars:4,reviews:340,seller:'EcoHome',image:'https://via.placeholder.com/300x300?text=Lejia+Gel'},
  {name:'Ambientador Vainilla',price:3.99,stars:5,reviews:510,seller:'AromaCo',image:'https://via.placeholder.com/300x300?text=Ambientador'},
  {name:'Guantes Nitrilo (100u)',price:9.99,stars:4,reviews:210,seller:'HogarPlus',image:'https://via.placeholder.com/300x300?text=Guantes'},
  {name:'Mopa Spray',price:24.9,stars:3,reviews:31,seller:'CleanPro',image:'https://via.placeholder.com/300x300?text=Mopa+Spray'},
  {name:'Desinfectante Hogar',price:5.49,stars:4,reviews:189,seller:'AromaCo',image:'https://via.placeholder.com/300x300?text=Desinfectante'},
];

const eur=n=>new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR'}).format(n);

function renderProducts(list){
  const grid=document.getElementById('grid');
  const empty=document.getElementById('empty');
  if(!grid||!empty){console.error('Falta #grid o #empty en el HTML');return;}
  if(!Array.isArray(list)||!list.length){grid.innerHTML='';empty.hidden=false;return;}
  empty.hidden=true;
  grid.innerHTML=list.map(p=>`
    <li>
      <article>
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <h3>${p.name}</h3>
        <p>Precio: ${eur(p.price)}</p>
        <p class="meta">
          <span aria-label="Puntuación ${p.stars} de 5">${'★'.repeat(p.stars)}${'☆'.repeat(5-p.stars)}</span>
          <span>(${p.reviews})</span>
          <span> · ${p.seller}</span>
        </p>
        <a href="#" class="btn-buy" aria-disabled="true">Comprar</a>
      </article>
    </li>
  `).join('');
}

document.addEventListener('DOMContentLoaded',()=>{
  console.log('[Galería] DOM listo, renderizando productos…');
  renderProducts(products);
});
