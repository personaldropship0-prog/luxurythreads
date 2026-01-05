/* === DATABASE PRODOTTI === */
const products = [
    // 1. DI TENDENZA (Sneakers, Hoodies - HOT)
    { name: "Jordan 4 Retro Military Black", price: 450, category: "trending", img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80" },
    { name: "Nike Dunk Low Panda", price: 180, category: "trending", img: "https://images.unsplash.com/photo-1637844527273-df6881478839?auto=format&fit=crop&w=600&q=80" },
    { name: "Travis Scott Hoodie", price: 220, category: "trending", img: "https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?auto=format&fit=crop&w=600&q=80" },
    { name: "Adidas Yeezy Slide", price: 140, category: "trending", img: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=600&q=80" },

    // 2. CINTURE (Belts)
    { name: "Gucci GG Marmont Belt", price: 390, category: "belts", img: "https://images.unsplash.com/photo-1624223032773-772eb0462052?auto=format&fit=crop&w=600&q=80" },
    { name: "Diesel 1DR Belt Logo", price: 120, category: "belts", img: "https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=600&q=80" },
    { name: "Hermes H Belt", price: 780, category: "belts", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80" },
    { name: "Ferragamo Gancini", price: 350, category: "belts", img: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=600&q=80" },

    // 3. BORSELLINI (Wallets/Small Leather Goods)
    { name: "LV Pocket Organizer", price: 320, category: "wallets", img: "https://images.unsplash.com/photo-1627123424574-181ce90b94c0?auto=format&fit=crop&w=600&q=80" },
    { name: "Goyard Card Holder", price: 450, category: "wallets", img: "https://images.unsplash.com/photo-1628149455676-e8d1a33753c1?auto=format&fit=crop&w=600&q=80" },
    { name: "Prada Saffiano Wallet", price: 480, category: "wallets", img: "https://images.unsplash.com/photo-1550523412-40f46c6563e3?auto=format&fit=crop&w=600&q=80" },

    // 4. BORSELLI (Shoulder Bags)
    { name: "Prada Re-Nylon Bag", price: 1100, category: "bags", img: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=600&q=80" },
    { name: "Supreme Shoulder Bag", price: 150, category: "bags", img: "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=600&q=80" },
    { name: "Gucci Messenger", price: 950, category: "bags", img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80" },
];

/* === CARICAMENTO PAGINA === */
document.addEventListener("DOMContentLoaded", () => {
    loadCategory('trending', 'grid-trending');
    loadCategory('belts', 'grid-belts');
    loadCategory('wallets', 'grid-wallets');
    loadCategory('bags', 'grid-bags');
});

function loadCategory(cat, gridId) {
    const grid = document.getElementById(gridId);
    if(!grid) return;
    
    // Filtra e crea le card
    const items = products.filter(p => p.category === cat);
    
    items.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => {
            // Semplice alert per ora, o redirect a pagina prodotto
            alert("Contattaci su IG per acquistare: " + product.name); 
            window.open("https://instagram.com/luxury.thread_", "_blank");
        };
        
        card.innerHTML = `
            <div class="card-img-wrap">
                <img src="${product.img}" alt="${product.name}">
            </div>
            <div class="card-info">
                <div class="card-title">${product.name}</div>
                <div class="card-price">€${product.price}</div>
            </div>
        `;
        grid.appendChild(card);
    });
}

/* === RICERCA === */
function toggleSearch() {
    const bar = document.getElementById('search-bar-container');
    bar.classList.toggle('active');
    if(bar.classList.contains('active')) document.getElementById('search-input').focus();
}

function searchProducts() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const allCards = document.querySelectorAll('.card');
    let found = false;

    allCards.forEach(card => {
        const title = card.querySelector('.card-title').innerText.toLowerCase();
        if(title.includes(query)) {
            card.style.display = 'block';
            found = true;
        } else {
            card.style.display = 'none';
        }
    });

    const noRes = document.getElementById('no-results');
    const headers = document.querySelectorAll('.category-header');
    
    if(query.length > 0) {
        // Nascondi i titoli delle categorie se stiamo cercando
        headers.forEach(h => h.style.display = 'none');
        noRes.style.display = found ? 'none' : 'block';
    } else {
        // Ripristina vista normale
        headers.forEach(h => h.style.display = 'flex');
        noRes.style.display = 'none';
    }
}

/* === LOGICA BOT (FONDAMENTALE) === */

function toggleBot() {
    const win = document.getElementById('bot-window');
    const btn = document.getElementById('bot-trigger');
    
    if (win.style.display === 'flex') {
        win.style.display = 'none';
        btn.style.display = 'flex'; // Ri-mostra il bottone
    } else {
        win.style.display = 'flex';
        btn.style.display = 'none'; // Nasconde il bottone mentre la chat è aperta
        resetBot(); // Torna sempre al menu principale quando apri
    }
}

function resetBot() {
    document.getElementById('bot-main-menu').style.display = 'flex';
    document.getElementById('bot-sourcing-form').style.display = 'none';
}

function showSourcingForm() {
    document.getElementById('bot-main-menu').style.display = 'none';
    document.getElementById('bot-sourcing-form').style.display = 'flex';
}

function contactInstagram() {
    window.open("https://instagram.com/luxury.thread_", "_blank");
}

function sendSourcingEmail() {
    // 1. Prendi i dati
    const email = document.getElementById('user-email').value;
    const model = document.getElementById('user-model').value;
    const size = document.getElementById('user-size').value;

    if(!email || !model) {
        alert("Per favore inserisci almeno la tua email e il modello.");
        return;
    }

    // 2. Costruisci il link mailto
    // Questo aprirà l'app mail dell'utente con tutto già scritto
    const dest = "personal.drop.ship0@gmail.com";
    const subject = encodeURIComponent(`Richiesta Sourcing: ${model}`);
    const body = encodeURIComponent(
`Ciao Luxury Thread,

Vorrei richiedere il sourcing di questo prodotto:
MODELLO: ${model}
TAGLIA: ${size}

La mia Email per il contatto: ${email}

Grazie.`
    );

    window.location.href = `mailto:${dest}?subject=${subject}&body=${body}`;
    
    // Chiudi il bot dopo l'invio
    toggleBot();
}
