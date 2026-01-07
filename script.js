// DATA
const products = [
    // HOME (4)
    { id: 1, name: "Jordan 1 Chicago", category: "home", price: 1800, img: "https://images.stockx.com/images/Air-Jordan-1-Retro-High-OG-Chicago-Reimagined-Product.jpg?fit=fill&bg=FFFFFF&w=1200&h=857&fm=webp&auto=compress&dpr=2&trim=color&updated_at=1665691099", desc: "Il Graal delle Jordan." },
    { id: 2, name: "Travis Scott Mocha", category: "home", price: 1200, img: "https://images.stockx.com/images/Air-Jordan-1-Low-OG-SP-Travis-Scott-Reverse-Mocha-Product.jpg?fit=fill&bg=FFFFFF&w=1200&h=857&fm=webp&auto=compress&dpr=2&trim=color&updated_at=1658328765", desc: "Reverse Mocha Low." },
    { id: 3, name: "Celine Hoodie", category: "home", price: 650, img: "https://img.mytheresa.com/1088/1088/66/jpeg/catalog/product/67/P00769342.jpg", desc: "Loose fit cotton." },
    { id: 4, name: "LV Trainer", category: "home", price: 1100, img: "https://it.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-sneaker-lv-trainer-calzature--BM9U5PMI01_PM2_Front%20view.png", desc: "Virgil Abloh design." },
    
    // CINTURE (6)
    { id: 5, name: "Hermès H Gold", category: "cinture", price: 750, img: "https://assets.hermes.com/is/image/hermesproduct/cintura-h-au-carre--073967CAAA-Front-1-300-0-1600-1600-q99.jpg", desc: "Gold buckle." },
    { id: 6, name: "Gucci Marmont", category: "cinture", price: 420, img: "https://media.gucci.com/style/DarkGray_Center_0_0_2400x2400/1566234005/406831_DJ20T_1000_001_100_0000_Light-Cintura-GG-Marmont-in-pelle.jpg", desc: "Black leather." },
    { id: 7, name: "LV Initiales", category: "cinture", price: 550, img: "https://it.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-cintura-lv-initiales-reversibile-40-mm-cinture--M9043V_PM2_Front%20view.png", desc: "Monogram canvas." },
    { id: 8, name: "Ferragamo", category: "cinture", price: 390, img: "https://cdn.ferragamo.com/wcsstore/FerragamoCatalogAssetStore/images/products/675542/675542_00_464231_F.jpg", desc: "Gancini buckle." },
    { id: 9, name: "Diesel 1DR", category: "cinture", price: 150, img: "https://shop.diesel.com/dw/image/v2/BBPW_PRD/on/demandware.static/-/Sites-diesel-master-catalog/default/dw8e898f82/images/large/X08516PR666_T8013_F.jpg", desc: "D logo." },
    { id: 10, name: "Prada Saffiano", category: "cinture", price: 480, img: "https://www.prada.com/content/dam/pradacn_products/2/2CM/2CM206/053F0002/2CM206_053_F0002_SLR.jpg", desc: "Triangle logo." },
    
    // PORTAFOGLI (3)
    { id: 11, name: "Goyard Wallet", category: "portafogli", price: 900, img: "https://product-images.goat.com/judy_product_images/1699926/01.jpg", desc: "Green Goyardine." },
    { id: 12, name: "Bottega Veneta", category: "portafogli", price: 550, img: "https://photos.giglio.com/i/2023/10/26/66dfd51e-2580-4d57-8dfa-c603b57367c0.jpg", desc: "Intrecciato." },
    { id: 13, name: "LV Multiple", category: "portafogli", price: 490, img: "https://it.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-portafoglio-multiple-monogram-shadow-piccola-pelletteria--M62901_PM2_Front%20view.png", desc: "Shadow leather." },
    
    // BORSELLI (1)
    { id: 14, name: "Prada Nylon", category: "borselli", price: 690, img: "https://www.prada.com/content/dam/pradanux_products/2/2VH/2VH112/2DMHF0002/2VH112_2DMH_F0002_V_WOP_SLF.png", desc: "Re-Nylon Pouch." }
];

document.addEventListener("DOMContentLoaded", () => {
    // 1. Forza il rendering Home
    renderProducts(products.filter(p => p.category === 'home'));
    
    // 2. Setup Search Input per invio con ENTER
    document.getElementById('searchInput').addEventListener('keyup', (e) => {
        if(e.key === 'Enter') performSearch(e.target.value);
    });
});

function renderProducts(list) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = "";
    
    if(list.length === 0) {
        grid.innerHTML = "<p style='width:100%; text-align:center; padding: 20px;'>Nessun prodotto trovato.</p>";
        return;
    }

    list.forEach(p => {
        grid.innerHTML += `
            <div class="card" onclick="openProductPage(${p.id})">
                <img src="${p.img}" class="card-img" alt="${p.name}">
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

// --- LOGICA POPUP PRODOTTO ---
function openProductPage(id) {
    const p = products.find(x => x.id === id);
    if(!p) return;

    document.getElementById('detail-img').src = p.img;
    document.getElementById('detail-title').innerText = p.name;
    document.getElementById('detail-price').innerText = `€${p.price}`;
    document.getElementById('detail-desc').innerText = p.desc;
    document.getElementById('detail-category').innerText = p.category;

    const prodView = document.getElementById('single-product-page');
    
    // Apri sempre in modalità "Popup" (gestito da CSS per mobile/desktop)
    prodView.style.display = 'flex'; // Flex per centrare il popup
    document.body.style.overflow = 'hidden'; 
}

function closeProductPage() {
    document.getElementById('single-product-page').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function goHome() {
    closeProductPage();
    closeSearch();
    filterProducts('home');
    const homeBtn = document.querySelector(".filters button");
    if(homeBtn) homeBtn.classList.add('active');
    window.scrollTo(0,0);
}

// --- LOGICA SEARCH (NUOVA) ---
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
    const filtered = products.filter(p => p.name.toLowerCase().includes(term.toLowerCase()) || p.category.includes(term.toLowerCase()));
    
    closeSearch();
    closeProductPage(); // Se eravamo in un prodotto, chiudilo
    
    // Togli selezione dai filtri
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
    
    renderProducts(filtered);
    window.scrollTo(0, 300); // Scrolla alla griglia
}

// --- LOGICA VIP BOT ---
function toggleBot() {
    const chat = document.getElementById('vip-chat-window');
    chat.classList.toggle('active');
}

function sendVipRequest() {
    const req = document.getElementById('vip-input').value;
    if(req.trim() !== "") {
        window.open(`https://ig.me/m/luxury.thread_?text=Richiesta Sourcing VIP: ${req}`);
        document.getElementById('vip-input').value = ""; // Pulisci
        toggleBot(); // Chiudi
    }
}

// UTILS
function contactForProduct(type) {
    const title = document.getElementById('detail-title').innerText;
    window.open(`https://ig.me/m/luxury.thread_?text=${type === 'buy' ? 'Acquisto' : 'Info'}: ${title}`);
}
function toggleTheme() { document.body.classList.toggle('dark-mode'); }
