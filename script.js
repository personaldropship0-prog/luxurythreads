const products = [// --- DATI PRODOTTI (10 SLOTS CON IMMAGINI REALI) ---
const products = [
  { 
    id: 1, 
    name: "Royal Oxford Loafer", 
    category: "scarpe", 
    price: "€850",
    desc: "Mocassino in pelle di vitello spazzolata, suola in cuoio lavorata a mano. Un classico senza tempo.", 
    img: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?q=80&w=1000&auto=format&fit=crop" 
  },
  { 
    id: 2, 
    name: "Cashmere Turtleneck", 
    category: "maglie", 
    price: "€420",
    desc: "100% Cashmere mongolo, lavorazione a coste sottili. Calore e morbidezza assoluta.", 
    img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop" 
  },
  { 
    id: 3, 
    name: "Tailored Pleated Trouser", 
    category: "pantaloni", 
    price: "€380",
    desc: "Pantalone sartoriale con doppia pince, taglio moderno e tessuto in lana vergine.", 
    img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop" 
  },
  { 
    id: 4, 
    name: "Noir Leather Jacket", 
    category: "maglie", 
    price: "€1,200",
    desc: "Giacca in pelle nappa pieno fiore, zip asimmetrica e dettagli in argento brunito.", 
    img: "https://images.unsplash.com/photo-1551028919-383718bccf3b?q=80&w=1000&auto=format&fit=crop" 
  },
  { 
    id: 5, 
    name: "Urban Runner Limited", 
    category: "scarpe", 
    price: "€650",
    desc: "Sneaker di lusso con inserti in camoscio e tessuto tecnico. Edizione limitata.", 
    img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop" 
  },
  { 
    id: 6, 
    name: "Silk Evening Shirt", 
    category: "maglie", 
    price: "€550",
    desc: "Camicia da sera in seta nera, bottoni in madreperla nascosti. Eleganza notturna.", 
    img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop" 
  },
  { 
    id: 7, 
    name: "Heritage Cargo Pant", 
    category: "pantaloni", 
    price: "€320",
    desc: "Reinterpretazione luxury del pantalone cargo. Cotone giapponese ad alta densità.", 
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop" 
  },
  { 
    id: 8, 
    name: "Monogram Tote", 
    category: "accessori", 
    price: "€1,850",
    desc: "Borsa tote spaziosa con pattern monogrammato goffrato. Ideale per il viaggio.", 
    img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop" 
  },
  { 
    id: 9, 
    name: "Velvet Blazer", 
    category: "maglie", 
    price: "€980",
    desc: "Blazer strutturato in velluto liscio color midnight blue. Rever a lancia.", 
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop" 
  },
  { 
    id: 10, 
    name: "Minimalist Watch", 
    category: "accessori", 
    price: "€2,500",
    desc: "Orologio automatico con quadrante pulito e cinturino in pelle di alligatore.", 
    img: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1000&auto=format&fit=crop" 
  }
];

// --- RIFERIMENTI DOM ---
const hero = document.getElementById("hero");
const filters = document.getElementById("filters");
const container = document.getElementById("products");
const searchSection = document.getElementById("search-results");
const results = document.getElementById("results");
const searchTitle = document.getElementById("search-title");
const requestBox = document.getElementById("request-box");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popup-text");

// Modal Elements
const productModal = document.getElementById("product-modal");
const modalImg = document.getElementById("modal-img-src");
const modalCat = document.getElementById("modal-category");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalPrice = document.getElementById("modal-price");

// --- FUNZIONI CORE ---

function renderProducts(list, targetContainer = container) {
  targetContainer.innerHTML = "";
  list.forEach(p => {
    targetContainer.innerHTML += `
      <div class="card" onclick="openProductModal(${p.id})">
        <div class="card-img-container">
          <img src="${p.img}" alt="${p.name}">
        </div>
        <div class="card-info">
          <h3>${p.name}</h3>
          <p>${p.desc.substring(0, 40)}...</p>
          <div class="price">${p.price}</div>
        </div>
      </div>
    `;
  });
}

// Filtri
function filterProducts(cat) {
  const btns = document.querySelectorAll('.filters button');
  btns.forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');

  hero.style.display = "none";
  filters.style.display = "flex";
  searchSection.style.display = "none";
  container.style.display = "grid";

  if (cat === 'all') {
    hero.style.display = "flex";
    renderProducts(products);
  } else {
    const list = products.filter(p => p.category === cat);
    renderProducts(list);
  }
}

// Ricerca
function searchProduct() {
  const q = document.getElementById("searchInput").value.toLowerCase().trim();
  results.innerHTML = "";
  
  hero.style.display = "none";
  container.style.display = "none";

  const found = products.filter(p =>
    p.name.toLowerCase().includes(q) || p.category.includes(q)
  );

  if(found.length === 0) {
    searchTitle.innerText = "Nessun prodotto trovato";
    searchTitle.style.color = "#888";
    requestBox.style.display = "block";
  } else {
    searchTitle.innerText = `Risultati per "${q}"`;
    searchTitle.style.color = "#d6c9a5";
    requestBox.style.display = "none";
    renderProducts(found, results);
  }

  searchSection.style.display = "block";
  searchSection.scrollIntoView({behavior:"smooth"});
}

// Popup Request Logic
function showRequestPopup() {
  const product = document.getElementById("requestInput").value;
  const note = document.getElementById("requestNote").value;
  popupText.innerText = `Ciao Luxury Thread 👋\nSto cercando:\n👉 ${product}\n${note}`;
  popup.style.display = "flex";
}

function copyAndOpenInstagram() {
  navigator.clipboard.writeText(popupText.innerText).then(() => {
    window.open("https://ig.me/m/luxury.thread_", "_blank");
    popup.style.display = "none";
  });
}

function closePopup() {
  popup.style.display = "none";
}

// Home Reset
function goHome() {
  document.getElementById("searchInput").value = "";
  hero.style.display = "flex";
  filters.style.display = "flex";
  container.style.display = "grid";
  searchSection.style.display = "none";
  renderProducts(products); 
  window.scrollTo({top:0, behavior:"smooth"});
}

// --- LOGICA MODALE (FULL SCREEN) ---

function openProductModal(id) {
  const p = products.find(prod => prod.id === id);
  if(!p) return;

  modalImg.src = p.img;
  modalCat.innerText = p.category;
  modalTitle.innerText = p.name;
  modalDesc.innerText = p.desc;
  modalPrice.innerText = p.price;

  productModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  productModal.classList.remove('open');
  document.body.style.overflow = 'auto';
}

function contactForProduct() {
  const msg = `Ciao, sono interessato al prodotto: ${modalTitle.innerText} (${modalPrice.innerText})`;
  navigator.clipboard.writeText(msg).then(() => {
    window.open("https://ig.me/m/luxury.thread_", "_blank");
  });
}

// Chiudi modale cliccando fuori
productModal.addEventListener('click', (e) => {
  if (e.target === productModal) closeProductModal();
});

// Init
renderProducts(products);
