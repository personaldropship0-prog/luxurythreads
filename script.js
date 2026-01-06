// --- DATABASE ---
const products = [
    { id: 1, name: "Jordan 1 Retro High OG", category: "sneakers", price: 450, img: "https://si.geilicdn.com/open1778275904-1234478995-5fc200000189a4eead4f0a8115b5_800_800.jpg", desc: "Iconica silhouette Chicago colorway. Pelle premium." },
    { id: 2, name: "Yeezy Boost 350 V2", category: "sneakers", price: 320, img: "https://si.geilicdn.com/wdseller169153426-4802000001872c2910950a2313df_2560_1920.jpg", desc: "Comfort imbattibile con tecnologia Boost." },
    { id: 3, name: "Supreme Box Logo Hoodie", category: "hoodies", price: 800, img: "https://si.geilicdn.com/open1687670541-252808396-0b160000019a521ee8a30a231226_800_800.jpg", desc: "Il classico streetwear. Heavyweight cotton." },
    { id: 4, name: "Essentials Fear of God", category: "hoodies", price: 180, img: "https://www.francocuoio.it/wp-content/uploads/2019/10/Hermes-Franco-Cuoio-Web.jpg", desc: "Minimalismo di lusso. Oversized fit." },
    { id: 5, name: "Gallery Dept. Flared Sweatpants", category: "pants", price: 450, img: "https://si.geilicdn.com/open1610848089-1610848089-491400000192c2ff72390a8115b5_1200_900.jpg", desc: "Hand painted vintage wash." },
    { id: 6, name: "Chrome Hearts Ring", category: "accessories", price: 650, img: "https://si.geilicdn.com/open1848188377-1848188377-605e00000192c797c77e0a22d234-unadjust_800_800.gif", desc: "Argento sterling .925 lavorato a mano a LA." }
];

// --- INIT ---
document.addEventListener("DOMContentLoaded", () => {
    renderProducts(products);
    
    // Header Scroll Logic
    let lastScroll = 0;
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 50 && currentScroll > lastScroll) {
            header.classList.add('hidden'); // Scendi = nascondi
        } else {
            header.classList.remove('hidden'); // Sali = mostra
        }
        lastScroll = currentScroll;
    });
});

// --- RENDER ---
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

// --- FILTERS ---
function filterProducts(cat) {
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    
    if(cat === 'all') renderProducts(products);
    else renderProducts(products.filter(p => p.category === cat));
}

// --- NAVIGATION ---
function openProductPage(id) {
    const p = products.find(x => x.id === id);
    if(!p) return;
    
    document.getElementById('home-view').style.display = 'none';
    document.getElementById('single-product-page').style.display = 'block';
    
    // Popola dettagli
    document.getElementById('detail-img').src = p.img;
    document.getElementById('detail-title').innerText = p.name;
    document.getElementById('detail-price').innerText = `€${p.price}`;
    document.getElementById('detail-desc').innerText = p.desc;
    document.getElementById('detail-category').innerText = p.category;
    
    window.scrollTo(0,0);
}

function goBackToHome() {
    document.getElementById('single-product-page').style.display = 'none';
    document.getElementById('home-view').style.display = 'block';
}

function goHome() {
    goBackToHome();
    filterProducts('all');
    window.scrollTo(0,0);
}

// --- SEARCH ---
function openSearchOverlay() {
    document.getElementById('search-overlay').classList.add('active');
    setTimeout(() => document.getElementById('searchInput').focus(), 100);
}
function closeSearchOverlay() {
    document.getElementById('search-overlay').classList.remove('active');
}
function quickSearch(term) {
    document.getElementById('searchInput').value = term;
    // Simula ricerca immediata
    const filtered = products.filter(p => p.name.toLowerCase().includes(term.toLowerCase()));
    renderProducts(filtered);
    closeSearchOverlay();
    goBackToHome();
}
document.getElementById('searchInput').addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        const val = e.target.value.toLowerCase();
        const filtered = products.filter(p => p.name.toLowerCase().includes(val));
        renderProducts(filtered);
        closeSearchOverlay();
        goBackToHome();
    }
});

// --- MODALS ---
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
    let msg = "";
    if(type === 'buy') msg = `Ciao, voglio acquistare: ${title}`;
    else msg = `Ciao, info su: ${title}`;
    
    window.open(`https://ig.me/m/luxury.thread_?text=${encodeURIComponent(msg)}`);
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}
function scrollToTop() {
    window.scrollTo(0,0);
}
