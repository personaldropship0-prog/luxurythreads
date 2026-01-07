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
    // FIX: Seleziona visivamente il bottone "Home"
    const homeBtn = document.querySelector(".filters button");
    if(homeBtn) homeBtn.classList.add('active');

    // FIX: Carica direttamente i dati Home senza aspettare il click
    renderProducts(products.filter(p => p.category === 'home'));
});

function renderProducts(list) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = "";
    
    if(list.length === 0) {
        grid.innerHTML = "<p style='width:100%; text-align:center;'>Nessun prodotto.</p>";
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
    // Rimuovi classe active da tutti
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
    
    // Aggiungi active SOLO se l'evento esiste (click utente)
    if(event && event.target) {
        event.target.classList.add('active');
    }

    renderProducts(products.filter(p => p.category === cat));
}

function openProductPage(id) {
    const p = products.find(x => x.id === id);
    if(!p) return;

    // Popola dati
    document.getElementById('detail-img').src = p.img;
    document.getElementById('detail-title').innerText = p.name;
    document.getElementById('detail-price').innerText = `€${p.price}`;
    document.getElementById('detail-desc').innerText = p.desc;
    document.getElementById('detail-category').innerText = p.category;

    const prodView = document.getElementById('single-product-page');
    const homeView = document.getElementById('home-view');

    // MOBILE: Overlay
    if(window.innerWidth <= 768) {
        prodView.style.display = 'flex'; // FLEX serve per centrare il popup
        document.body.style.overflow = 'hidden'; // Blocca scroll sotto
    } 
    // DESKTOP: Switch view classico
    else {
        homeView.style.display = 'none';
        prodView.style.display = 'block';
        window.scrollTo(0,0);
    }
}

function closeProductPage() {
    const prodView = document.getElementById('single-product-page');
    const homeView = document.getElementById('home-view');
    
    prodView.style.display = 'none';
    homeView.style.display = 'block';
    document.body.style.overflow = 'auto'; // Sblocca scroll
}

function goHome() {
    closeProductPage();
    // Simula click su Home per resettare filtri
    const homeBtn = document.querySelector(".filters button");
    if(homeBtn) {
        homeBtn.click();
    } else {
        filterProducts('home');
    }
}

// UTILS
function openSearchOverlay() { document.getElementById('search-overlay').classList.add('active'); }
function closeSearchOverlay() { document.getElementById('search-overlay').classList.remove('active'); }
function openReviewsModal() { document.getElementById('reviews-modal').style.display = 'flex'; }
function closeReviewsModal() { document.getElementById('reviews-modal').style.display = 'none'; }
function contactForProduct(type) {
    const title = document.getElementById('detail-title').innerText;
    window.open(`https://ig.me/m/luxury.thread_?text=${type === 'buy' ? 'Acquisto' : 'Info'}: ${title}`);
}
function toggleTheme() { document.body.classList.toggle('dark-mode'); }
