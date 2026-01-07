// DATABASE PRODOTTI RICHIESTO
const products = [
    // --- HOME (4 Prodotti) ---
    { id: 1, name: "Jordan 1 High Chicago", category: "home", price: 1800, img: "https://images.stockx.com/images/Air-Jordan-1-Retro-High-OG-Chicago-Reimagined-Product.jpg?fit=fill&bg=FFFFFF&w=1200&h=857&fm=webp&auto=compress&dpr=2&trim=color&updated_at=1665691099", desc: "Il classico senza tempo. Condizioni DS." },
    { id: 2, name: "Travis Scott Reverse Mocha", category: "home", price: 1200, img: "https://images.stockx.com/images/Air-Jordan-1-Low-OG-SP-Travis-Scott-Reverse-Mocha-Product.jpg?fit=fill&bg=FFFFFF&w=1200&h=857&fm=webp&auto=compress&dpr=2&trim=color&updated_at=1658328765", desc: "La collab più calda del momento." },
    { id: 3, name: "Celine Hoodie Grey", category: "home", price: 650, img: "https://img.mytheresa.com/1088/1088/66/jpeg/catalog/product/67/P00769342.jpg", desc: "Cotone pesante, fit oversize." },
    { id: 4, name: "Louis Vuitton Trainer", category: "home", price: 1100, img: "https://it.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-sneaker-lv-trainer-calzature--BM9U5PMI01_PM2_Front%20view.png", desc: "Iconica sneaker by Virgil Abloh." },

    // --- CINTURE (6 Prodotti) ---
    { id: 5, name: "Hermès H Belt Gold", category: "cinture", price: 750, img: "https://assets.hermes.com/is/image/hermesproduct/cintura-h-au-carre--073967CAAA-Front-1-300-0-1600-1600-q99.jpg", desc: "Fibbia Gold, pelle reversibile." },
    { id: 6, name: "Gucci GG Marmont", category: "cinture", price: 420, img: "https://media.gucci.com/style/DarkGray_Center_0_0_2400x2400/1566234005/406831_DJ20T_1000_001_100_0000_Light-Cintura-GG-Marmont-in-pelle.jpg", desc: "Classico nero con fibbia ottone." },
    { id: 7, name: "LV Initiales Reversible", category: "cinture", price: 550, img: "https://it.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-cintura-lv-initiales-reversibile-40-mm-cinture--M9043V_PM2_Front%20view.png", desc: "Monogram Eclipse / Pelle nera." },
    { id: 8, name: "Ferragamo Gancini", category: "cinture", price: 390, img: "https://cdn.ferragamo.com/wcsstore/FerragamoCatalogAssetStore/images/products/675542/675542_00_464231_F.jpg", desc: "Fibbia Gancini palladio." },
    { id: 9, name: "Diesel 1DR Belt", category: "cinture", price: 150, img: "https://shop.diesel.com/dw/image/v2/BBPW_PRD/on/demandware.static/-/Sites-diesel-master-catalog/default/dw8e898f82/images/large/X08516PR666_T8013_F.jpg", desc: "Pelle bovina, logo D smaltato." },
    { id: 10, name: "Prada Saffiano Triangle", category: "cinture", price: 480, img: "https://www.prada.com/content/dam/pradacn_products/2/2CM/2CM206/053F0002/2CM206_053_F0002_SLR.jpg", desc: "Pelle Saffiano iconica." },

    // --- PORTAFOGLI (3 Prodotti) ---
    { id: 11, name: "Goyard Victoire Wallet", category: "portafogli", price: 900, img: "https://product-images.goat.com/judy_product_images/1699926/01.jpg", desc: "Tela Goyardine verde." },
    { id: 12, name: "Bottega Veneta Intrecciato", category: "portafogli", price: 550, img: "https://photos.giglio.com/i/2023/10/26/66dfd51e-2580-4d57-8dfa-c603b57367c0.jpg", desc: "Pelle intrecciata a mano." },
    { id: 13, name: "LV Multiple Wallet", category: "portafogli", price: 490, img: "https://it.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-portafoglio-multiple-monogram-shadow-piccola-pelletteria--M62901_PM2_Front%20view.png", desc: "Pelle Shadow nera." },

    // --- BORSELLI (1 Prodotto) ---
    { id: 14, name: "Prada Re-Nylon Pouch", category: "borselli", price: 690, img: "https://www.prada.com/content/dam/pradanux_products/2/2VH/2VH112/2DMHF0002/2VH112_2DMH_F0002_V_WOP_SLF.png", desc: "Nylon rigenerato, tracolla regolabile." }
];

document.addEventListener("DOMContentLoaded", () => {
    // Di default mostra i prodotti "home"
    renderProducts(products.filter(p => p.category === 'home'));
    
    // Header Scroll Logic
    let lastScroll = 0;
    const header = document.querySelector('.main-header');
    const homeBtn = document.querySelector('.floating-home-btn');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 50 && currentScroll > lastScroll) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        if (currentScroll > 300) homeBtn.classList.add('visible');
        else homeBtn.classList.remove('visible');
        lastScroll = currentScroll;
    });
});

function renderProducts(list) {
    const grid = document.getElementById('products-grid');
    const noRes = document.getElementById('no-results');
    grid.innerHTML = "";
    
    if(list.length === 0) {
        noRes.style.display = "block";
    } else {
        noRes.style.display = "none";
        list.forEach(p => {
            const div = document.createElement('div');
            div.className = 'card';
            div.onclick = () => openProductPage(p.id);
            div.innerHTML = `
                <img src="${p.img}" class="card-img" alt="${p.name}" loading="lazy">
                <div class="card-details">
                    <h3>${p.name}</h3>
                    <div class="price">€${p.price}</div>
                </div>
            `;
            grid.appendChild(div);
        });
    }
}

function filterProducts(cat) {
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filtro esatto per categoria
    const filtered = products.filter(p => p.category === cat);
    renderProducts(filtered);
}

function openProductPage(id) {
    const p = products.find(x => x.id === id);
    if(!p) return;
    
    // Su Mobile questo div diventerà un overlay a tutto schermo
    const page = document.getElementById('single-product-page');
    page.style.display = 'block'; 
    
    document.getElementById('detail-img').src = p.img;
    document.getElementById('detail-title').innerText = p.name;
    document.getElementById('detail-price').innerText = `€${p.price}`;
    document.getElementById('detail-desc').innerText = p.desc;
    document.getElementById('detail-category').innerText = p.category.toUpperCase();
    
    // Blocca lo scroll della home sotto se siamo su mobile
    if(window.innerWidth <= 768) {
        document.body.style.overflow = 'hidden'; 
    } else {
        window.scrollTo(0,0);
        document.getElementById('home-view').style.display = 'none'; // Su desktop nascondiamo la home
    }
}

function goBackToHome() {
    const page = document.getElementById('single-product-page');
    page.style.display = 'none';
    
    document.getElementById('home-view').style.display = 'block';
    document.body.style.overflow = 'auto'; // Riabilita scroll body
}

function goHome() {
    goBackToHome();
    document.querySelector('.filters button').click(); // Torna a Home
    window.scrollTo(0,0);
}

// Funzioni Search e Modal (Standard)
function openSearchOverlay() {
    document.getElementById('search-overlay').classList.add('active');
    setTimeout(() => document.getElementById('searchInput').focus(), 100);
}
function closeSearchOverlay() { document.getElementById('search-overlay').classList.remove('active'); }
function quickSearch(term) {
    document.getElementById('searchInput').value = term;
    // Cerca in tutti i prodotti ignorando le categorie attuali
    const filtered = products.filter(p => p.name.toLowerCase().includes(term.toLowerCase()) || p.category.includes(term.toLowerCase()));
    renderProducts(filtered);
    
    // Togli classe active dai filtri visuali
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
    
    closeSearchOverlay();
    goBackToHome();
}
document.getElementById('searchInput').addEventListener('keyup', (e) => {
    if(e.key === 'Enter') quickSearch(e.target.value);
});

function openSourcingModal() { document.getElementById('sourcing-modal').style.display = 'flex'; }
function closeSourcingModal() { document.getElementById('sourcing-modal').style.display = 'none'; }
function sendSourcingRequest() {
    const model = document.getElementById('src-model').value;
    if(model) {
        window.open(`https://ig.me/m/luxury.thread_?text=Richiesta VIP Sourcing: ${model}`);
        closeSourcingModal();
    }
}
function openReviewsModal() { document.getElementById('reviews-modal').style.display = 'flex'; }
function closeReviewsModal() { document.getElementById('reviews-modal').style.display = 'none'; }
function contactForProduct(type) {
    const title = document.getElementById('detail-title').innerText;
    let msg = type === 'buy' ? `Ciao, acquisto: ${title}` : `Ciao, info su: ${title}`;
    window.open(`https://ig.me/m/luxury.thread_?text=${encodeURIComponent(msg)}`);
}
function toggleTheme() { document.body.classList.toggle('dark-mode'); }
function scrollToTop() { window.scrollTo(0,0); }
