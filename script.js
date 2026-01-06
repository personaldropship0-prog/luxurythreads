// DATABASE PRODOTTI
const products = [
    { id: 1, name: "Jordan 1 Retro High OG", category: "sneakers", price: 450, img: "https://si.geilicdn.com/open1778275904-1234478995-5fc200000189a4eead4f0a8115b5_800_800.jpg", desc: "Iconica silhouette Chicago colorway. Pelle premium." },
    { id: 2, name: "Yeezy Boost 350 V2", category: "sneakers", price: 320, img: "https://si.geilicdn.com/wdseller169153426-4802000001872c2910950a2313df_2560_1920.jpg", desc: "Comfort imbattibile con tecnologia Boost." },
    { id: 3, name: "Supreme Box Logo Hoodie", category: "hoodies", price: 800, img: "https://si.geilicdn.com/open1687670541-252808396-0b160000019a521ee8a30a231226_800_800.jpg", desc: "Il classico streetwear. Heavyweight cotton." },
    { id: 4, name: "Essentials Fear of God", category: "hoodies", price: 180, img: "https://www.francocuoio.it/wp-content/uploads/2019/10/Hermes-Franco-Cuoio-Web.jpg", desc: "Minimalismo di lusso. Oversized fit." },
    { id: 5, name: "Gallery Dept. Flared Sweatpants", category: "pants", price: 450, img: "https://si.geilicdn.com/open1610848089-1610848089-491400000192c2ff72390a8115b5_1200_900.jpg", desc: "Hand painted vintage wash." },
    { id: 6, name: "Chrome Hearts Ring", category: "accessories", price: 650, img: "https://si.geilicdn.com/open1848188377-1848188377-605e00000192c797c77e0a22d234-unadjust_800_800.gif", desc: "Argento sterling .925 lavorato a mano a LA." }
];

// INIT
document.addEventListener("DOMContentLoaded", () => {
    renderProducts(products);
    
    // SCROLL LISTENER
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.main-header');
        const homeBtn = document.querySelector('.floating-home-btn');
        const scrollPosition = window.scrollY;

        if (scrollPosition > 100) {
            header.classList.add('hidden');
            homeBtn.classList.add('visible');
        } else {
            header.classList.remove('hidden');
            homeBtn.classList.remove('visible');
        }
    });
});

// FUNZIONE SCROLL TOP
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// RENDER GRID
function renderProducts(list) {
    const grid = document.getElementById('products-grid');
    const noResults = document.getElementById('no-results');
    grid.innerHTML = "";

    if (list.length === 0) {
        noResults.style.display = "block";
    } else {
        noResults.style.display = "none";
        list.forEach(p => {
            const card = document.createElement('div');
            card.className = 'card';
            card.onclick = () => openProduct(p.id);
            card.innerHTML = `
                <img src="${p.img}" class="card-img" alt="${p.name}">
                <div class="card-details">
                    <h3>${p.name}</h3>
                    <div class="price">€${p.price}</div>
                </div>
            `;
            grid.appendChild(card);
        });
    }
}

// FILTRI
function filterProducts(category) {
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    if (category === 'all') renderProducts(products);
    else renderProducts(products.filter(p => p.category === category));
}

/* --- LOGICA SEARCH OVERLAY (NIKE STYLE) --- */

function openSearchOverlay() {
    const overlay = document.getElementById('search-overlay');
    const input = document.getElementById('searchInput');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Blocca scroll
    setTimeout(() => { input.focus(); }, 100);
}

function closeSearchOverlay() {
    const overlay = document.getElementById('search-overlay');
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // Sblocca scroll
}

function quickSearch(term) {
    const input = document.getElementById('searchInput');
    input.value = term;
    performSearch();
}

function performSearch() {
    const input = document.getElementById('searchInput');
    const query = input.value.toLowerCase();
    
    // Filtra
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    renderProducts(filtered);
    
    // Chiudi overlay e vai ai risultati
    closeSearchOverlay();
    goBackToHome(); 
    
    // Scrolla alla griglia
    const grid = document.getElementById('products-grid');
    grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Tasto Invio e ESC
document.getElementById('searchInput').addEventListener("keyup", function(event) {
    if (event.key === "Enter") performSearch();
});
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") closeSearchOverlay();
});


// NAVIGAZIONE PAGINE
function openProduct(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;

    document.getElementById('detail-img').src = p.img;
    document.getElementById('detail-title').innerText = p.name;
    document.getElementById('detail-desc').innerText = p.desc;
    document.getElementById('detail-price').innerText = "€" + p.price;
    document.getElementById('detail-category').innerText = p.category.toUpperCase();

    document.getElementById('home-view').style.display = 'none';
    document.getElementById('single-product-page').style.display = 'block';
    window.scrollTo(0,0);
}

function goBackToHome() {
    document.getElementById('single-product-page').style.display = 'none';
    document.getElementById('home-view').style.display = 'block';
}

function goHome() {
    goBackToHome();
    filterProducts('all');
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
    document.querySelector('.filters button:first-child').classList.add('active');
    scrollToTop();
}

// POPUPS
function contactForProduct(type) {
    const title = document.getElementById('detail-title').innerText;
    let msg = type === 'buy' ? `Ciao, sono interessato ad acquistare: ${title}. È ancora disponibile?` : `Ciao, vorrei maggiori info su: ${title}.`;
    document.getElementById('popup-text').innerText = msg;
    document.getElementById('popup').style.display = 'flex';
}

function closePopup() { document.getElementById('popup').style.display = 'none'; }
function openInstagram() { window.open("https://instagram.com/luxury.thread_", "_blank"); closePopup(); }

function openSourcingModal() { document.getElementById('sourcing-modal').style.display = 'flex'; }
function closeSourcingModal() { document.getElementById('sourcing-modal').style.display = 'none'; }

function sendSourcingRequest() {
    const model = document.getElementById('src-model').value;
    const size = document.getElementById('src-size').value;
    if(!model) { alert("Inserisci il modello"); return; }
    const msg = `Ciao, richiesta sourcing VIP per: ${model} (Taglia: ${size})`;
    window.open(`https://ig.me/m/luxury.thread_?text=${encodeURIComponent(msg)}`, "_blank");
    closeSourcingModal();
}

function openReviewsModal() { document.getElementById('reviews-modal').style.display = 'flex'; }
function closeReviewsModal() { document.getElementById('reviews-modal').style.display = 'none'; }

function toggleTheme() { document.body.classList.toggle('dark-mode'); }

