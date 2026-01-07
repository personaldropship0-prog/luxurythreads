// DATA
const products = [
    // HOME (4)
    { id: 1, name: "Jordan 1 Chicago", category: "home", price: 1800, img: "https://images.stockx.com/images/Air-Jordan-1-Retro-High-OG-Chicago-Reimagined-Product.jpg?fit=fill&bg=FFFFFF&w=1200&h=857&fm=webp&auto=compress&dpr=2&trim=color&updated_at=1665691099", desc: "Il Graal delle Jordan. Condizioni DS." },
    { id: 2, name: "Travis Scott Mocha", category: "home", price: 1200, img: "https://images.stockx.com/images/Air-Jordan-1-Low-OG-SP-Travis-Scott-Reverse-Mocha-Product.jpg?fit=fill&bg=FFFFFF&w=1200&h=857&fm=webp&auto=compress&dpr=2&trim=color&updated_at=1658328765", desc: "Reverse Mocha Low. Taglia 42.5 disponibile." },
    { id: 3, name: "Celine Hoodie", category: "home", price: 650, img: "https://img.mytheresa.com/1088/1088/66/jpeg/catalog/product/67/P00769342.jpg", desc: "Loose fit cotton. Collezione FW24." },
    { id: 4, name: "LV Trainer", category: "home", price: 1100, img: "https://it.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-sneaker-lv-trainer-calzature--BM9U5PMI01_PM2_Front%20view.png", desc: "Virgil Abloh design. Iconica." },
    
    // CINTURE
    { id: 5, name: "Hermès H Silver", category: "cinture", price: 19,99, img: "https://luxurymood.shop/wp-content/uploads/2024/11/HERMES_Cintura-Nera-3_-01.jpg" },
    { id: 6, name: "Amiri black", category: "cinture", price: 34,99, img: "https://si.geilicdn.com/pcitem1861886529-72dd0000018fea87acb70a207569-unadjust_937_920.png", desc: "Black leather." },
    { id: 7, name: "LV Black", category: "cinture", price: 29,99, img: "https://avvenice.com/83776-thickbox_default/louis-vuitton-vintage-damier-graphie-initiales-belt-black-gray-leather-belt-luxury-high-quality.jpg", desc: "Monogram canvas." },
    { id: 8, name: "Diesel 1DR", category: "cinture", price: 24,89, img: "https://cdn.ferragamo.com/wcsstore/FerragamoCatalogAssetStore/images/products/675542/675542_00_464231_F.jpg", desc: "Gancini buckle." },
    
    // PORTAFOGLI
    { id: 11, name: "Goyard Wallet", category: "portafogli", price: 900, img: "https://product-images.goat.com/judy_product_images/1699926/01.jpg", desc: "Green Goyardine." },
    { id: 12, name: "Bottega Veneta", category: "portafogli", price: 550, img: "https://photos.giglio.com/i/2023/10/26/66dfd51e-2580-4d57-8dfa-c603b57367c0.jpg", desc: "Intrecciato." },
    { id: 13, name: "LV Multiple", category: "portafogli", price: 490, img: "https://it.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-portafoglio-multiple-monogram-shadow-piccola-pelletteria--M62901_PM2_Front%20view.png", desc: "Shadow leather." },
    
    // BORSELLI
    { id: 14, name: "Prada Nylon", category: "borselli", price: 690, img: "https://www.prada.com/content/dam/pradanux_products/2/2VH/2VH112/2DMHF0002/2VH112_2DMH_F0002_V_WOP_SLF.png", desc: "Re-Nylon Pouch." }
];

let lastSearchTerm = "";

document.addEventListener("DOMContentLoaded", () => {
    // Carica Home di default
    renderProducts(products.filter(p => p.category === 'home'));
    
    // Enter key per ricerca
    document.getElementById('searchInput').addEventListener('keyup', (e) => {
        if(e.key === 'Enter') performSearch(e.target.value);
    });
});

function renderProducts(list, isSearch = false) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = "";
    
    // LOGICA NESSUN RISULTATO -> BOT
    if(list.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <p>Nessun prodotto trovato per "${lastSearchTerm}".</p>
                <button class="bot-redirect-btn" onclick="openBotWithQuery()">NON TROVATO? CHIEDI AL BOT</button>
            </div>
        `;
        return;
    }

    list.forEach(p => {
        grid.innerHTML += `
            <div class="card" onclick="openProductPage(${p.id})">
                <div class="card-img-wrapper">
                    <img src="${p.img}" class="card-img" alt="${p.name}">
                    <div class="card-mini-logo">
                        <img src="img/logo.png" onerror="this.src='https://via.placeholder.com/30x30?text=LT'">
                    </div>
                </div>
                <div class="card-details">
                    <h3>${p.name}</h3>
                    <div class="price">€${p.price}</div>
                </div>
            </div>
        `;
    });
}

function filterProducts(cat) {
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
    if(event && event.target) event.target.classList.add('active');
    renderProducts(products.filter(p => p.category === cat));
}

// --- POPUP SCHEDA PRODOTTO ---
function openProductPage(id) {
    const p = products.find(x => x.id === id);
    if(!p) return;

    document.getElementById('detail-img').src = p.img;
    document.getElementById('detail-title').innerText = p.name;
    document.getElementById('detail-price').innerText = `€${p.price}`;
    document.getElementById('detail-desc').innerText = p.desc;
    document.getElementById('detail-category').innerText = p.category;

    const prodView = document.getElementById('single-product-page');
    prodView.style.display = 'flex'; // Centra il popup
    document.body.style.overflow = 'hidden'; // Blocca scroll pagina
}

function closeProductPage() {
    document.getElementById('single-product-page').style.display = 'none';
    document.body.style.overflow = 'auto'; // Sblocca scroll
}

function goHome() {
    closeProductPage();
    closeSearch();
    filterProducts('home');
    const homeBtn = document.querySelector(".filters button");
    if(homeBtn) homeBtn.classList.add('active');
    window.scrollTo(0,0);
}

// --- SEARCH ---
function openSearch() {
    document.getElementById('search-backdrop').classList.add('active');
    document.getElementById('search-bar-container').classList.add('active');
    setTimeout(() => document.getElementById('searchInput').focus(), 100);
}

function closeSearch() {
    document.getElementById('search-backdrop').classList.remove('active');
    document.getElementById('search-bar-container').classList.remove('active');
}

function performSearch(term) {
    if(!term) return;
    lastSearchTerm = term;
    const filtered = products.filter(p => p.name.toLowerCase().includes(term.toLowerCase()) || p.category.includes(term.toLowerCase()));
    
    closeSearch();
    closeProductPage();
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
    renderProducts(filtered, true);
    window.scrollTo(0, 300);
}

// --- BOT ---
function toggleBot() {
    const chat = document.getElementById('bot-chat-window');
    chat.classList.toggle('active');
}

function openBotWithQuery() {
    toggleBot();
    const input = document.getElementById('bot-input');
    input.value = `Cerco: ${lastSearchTerm}`;
    input.focus();
}

function sendBotRequest() {
    const req = document.getElementById('bot-input').value;
    if(req.trim() !== "") {
        window.open(`https://ig.me/m/luxury.thread_?text=Richiesta Bot Sourcing: ${req}`);
        document.getElementById('bot-input').value = "";
        toggleBot();
    }
}

function contactForProduct(type) {
    const title = document.getElementById('detail-title').innerText;
    window.open(`https://ig.me/m/luxury.thread_?text=${type === 'buy' ? 'Acquisto' : 'Info'}: ${title}`);
}

function toggleTheme() { document.body.classList.toggle('dark-mode'); }
