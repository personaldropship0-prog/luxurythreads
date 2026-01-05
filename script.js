// --- DATABASE PRODOTTI AMPLIATO ---
const products = [
    // --- TRENDING (5 Prodotti) ---
    { id: 1, name: "Jordan 1 High Chicago", category: "sneakers", price: 1850, img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80", desc: "Il Graal delle sneakers. Condizioni DS." },
    { id: 2, name: "Travis Scott x Jordan 1 Low", category: "sneakers", price: 1200, img: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&w=800&q=80", desc: "Mocha colorway invertita. Edizione limitata." },
    { id: 3, name: "Supreme Box Logo Camo", category: "hoodies", price: 450, img: "https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?auto=format&fit=crop&w=800&q=80", desc: "FW23 release. Heavyweight cotton." },
    { id: 4, name: "Yeezy Slide Pure", category: "sneakers", price: 140, img: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=800&q=80", desc: "Comfort assoluto. Schiuma EVA iniettata." },
    { id: 5, name: "Off-White Industrial Belt", category: "accessories", price: 220, img: "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?auto=format&fit=crop&w=800&q=80", desc: "Gialla iconica con cuciture rosse." },

    // --- CINTURE (6 Prodotti) ---
    { id: 101, name: "Gucci GG Marmont", category: "belts", price: 395, img: "https://images.unsplash.com/photo-1624223032773-772eb0462052?auto=format&fit=crop&w=800&q=80", desc: "Pelle nera con fibbia ottone anticato." },
    { id: 102, name: "Hermès H Belt Kit", category: "belts", price: 780, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80", desc: "Reversibile Black/Gold. Fibbia spazzolata." },
    { id: 103, name: "LV Initiales Damier", category: "belts", price: 450, img: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80", desc: "Tela Damier Graphite. Classica." },
    { id: 104, name: "Ferragamo Gancini", category: "belts", price: 350, img: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80", desc: "Reversibile. Fibbia iconica Gancini." },
    { id: 105, name: "Bottega Veneta Intrecciato", category: "belts", price: 550, img: "https://images.unsplash.com/photo-1605763240004-7e93b172d754?auto=format&fit=crop&w=800&q=80", desc: "Pelle intrecciata a mano. Colore Parakeet." },
    { id: 106, name: "Diesel 1DR Belt", category: "belts", price: 120, img: "https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=800&q=80", desc: "Logo D in metallo. Pelle di vacchetta." },

    // --- PORTAFOGLI (3 Prodotti) ---
    { id: 201, name: "LV Pocket Organizer", category: "wallets", price: 320, img: "https://images.unsplash.com/photo-1627123424574-181ce90b94c0?auto=format&fit=crop&w=800&q=80", desc: "Monogram Eclipse. Compatto e versatile." },
    { id: 202, name: "Goyard Saint Sulpice", category: "wallets", price: 450, img: "https://images.unsplash.com/photo-1628149455676-e8d1a33753c1?auto=format&fit=crop&w=800&q=80", desc: "Card holder in tela Goyardine verde." },
    { id: 203, name: "Prada Saffiano Wallet", category: "wallets", price: 480, img: "https://images.unsplash.com/photo-1550523412-40f46c6563e3?auto=format&fit=crop&w=800&q=80", desc: "Pelle Saffiano nera. Logo triangolo." },

    // --- BORSELLI (1 Prodotto) ---
    { id: 301, name: "Prada Re-Nylon Pouch", category: "bags", price: 690, img: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80", desc: "Nylon rigenerato. Tracolla staccabile." }
];

// INIT
document.addEventListener("DOMContentLoaded", () => {
    loadHomePage();
    
    // SCROLL LISTENER (Header & Tasto Home)
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

// --- FUNZIONE PRINCIPALE: CARICA LA HOME A SEZIONI ---
function loadHomePage() {
    // 1. Visibilità: Mostra sezioni Home, nascondi Risultati Ricerca
    document.getElementById('home-sections').style.display = 'block';
    document.getElementById('search-results-view').style.display = 'none';
    document.getElementById('no-results').style.display = 'none';
    
    // Reset bottoni filtri
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
    document.querySelector('.filters button:first-child').classList.add('active'); // Attiva tasto HOME

    // 2. Popola "DI TENDENZA" (Primi 5 prodotti qualsiasi)
    const trendingList = products.slice(0, 5); 
    renderToGrid('grid-trending', trendingList);

    // 3. Popola "CINTURE" (Esattamente 6)
    const beltsList = products.filter(p => p.category === 'belts').slice(0, 6);
    renderToGrid('grid-belts', beltsList);

    // 4. Popola "PORTAFOGLI" (Esattamente 3)
    const walletsList = products.filter(p => p.category === 'wallets').slice(0, 3);
    renderToGrid('grid-wallets', walletsList);

    // 5. Popola "BORSELLI" (Esattamente 1)
    const bagsList = products.filter(p => p.category === 'bags').slice(0, 1);
    renderToGrid('grid-bags', bagsList);
}

// Funzione helper per renderizzare una lista in un ID specifico
function renderToGrid(gridId, list) {
    const grid = document.getElementById(gridId);
    if(grid) {
        grid.innerHTML = ""; // Pulisci
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

// --- GESTIONE RICERCA E FILTRI ---

// Quando usi un filtro, nascondi la home a sezioni e mostra la griglia risultati
function filterProducts(category) {
    // Gestione bottoni attivi
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');

    // Cambia vista
    document.getElementById('home-sections').style.display = 'none';
    document.getElementById('search-results-view').style.display = 'block';
    
    // Filtra e renderizza
    const filtered = products.filter(p => p.category === category);
    renderProducts(filtered); // Usa la funzione generica per la griglia risultati
    document.getElementById('search-title').innerText = category.toUpperCase();
}

// Renderizza nella griglia dei risultati (quella nascosta)
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

// Funzioni Search Overlay
function openSearchOverlay() {
    const overlay = document.getElementById('search-overlay');
    const input = document.getElementById('searchInput');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; 
    setTimeout(() => { input.focus(); }, 100);
}

function closeSearchOverlay() {
    const overlay = document.getElementById('search-overlay');
    overlay.classList.remove('active');
    document.body.style.overflow = ''; 
}

function quickSearch(term) {
    document.getElementById('searchInput').value = term;
    performSearch();
}

function performSearch() {
    const input = document.getElementById('searchInput');
    const query = input.value.toLowerCase();
    
    // Filtra su tutto il database
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query)
    );

    // Passa alla vista risultati
    document.getElementById('home-sections').style.display = 'none';
    document.getElementById('search-results-view').style.display = 'block';
    document.getElementById('search-title').innerText = `RISULTATI: "${query}"`;
    
    // Togli classe active dai filtri
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));

    renderProducts(filtered);
    
    closeSearchOverlay();
    goBackToHome(); // Assicura che non siamo nella pagina prodotto
    
    // Scrolla all'inizio dei risultati
    const resultsView = document.getElementById('search-results-view');
    resultsView.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

    // Nascondi tutto il main (home o risultati)
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
    loadHomePage(); // Ricarica la struttura a sezioni
    scrollToTop();
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
