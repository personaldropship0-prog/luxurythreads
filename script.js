const products = [
  { name:"Signature Leather", category:"scarpe", desc:"Scarpe in pelle premium" },
  { name:"Essential Knit", category:"maglie", desc:"Maglia sartoriale elegante" },
  { name:"Tailored Urban", category:"pantaloni", desc:"Pantaloni moderni" }
];

const hero = document.getElementById("hero");
const filters = document.getElementById("filters");
const container = document.getElementById("products");
const searchSection = document.getElementById("search-results");
const results = document.getElementById("results");
const searchTitle = document.getElementById("search-title");
const requestBox = document.getElementById("request-box");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popup-text");

function renderProducts(list) {
  container.innerHTML = "";
  list.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
      </div>
    `;
  });
}

function filterProducts(cat) {
  hero.style.display = "none";
  filters.style.display = "none";
  searchSection.style.display = "none";

  const list = cat === "all" ? products : products.filter(p => p.category === cat);
  renderProducts(list);
  container.scrollIntoView({behavior:"smooth"});
}

function searchProduct() {
  const q = document.getElementById("searchInput").value.toLowerCase().trim();
  results.innerHTML = "";

  hero.style.display = "none";
  filters.style.display = "none";

  const found = products.filter(p =>
    p.name.toLowerCase().includes(q) || p.category.includes(q)
  );

  if(found.length === 0) {
    searchTitle.innerText = "Prodotto non disponibile";
    requestBox.style.display = "block";
  } else {
    searchTitle.innerText = "Risultati ricerca";
    requestBox.style.display = "none";
    found.forEach(p => {
      results.innerHTML += `
        <div class="card">
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
        </div>
      `;
    });
  }

  searchSection.style.display = "block";
  searchSection.scrollIntoView({behavior:"smooth"});
}

function showRequestPopup() {
  const product = document.getElementById("requestInput").value;
  const note = document.getElementById("requestNote").value;
  popupText.innerText =
    `Ciao Luxury Thread 👋\nSto cercando:\n👉 ${product}\n${note}`;
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

function goHome() {
  hero.style.display = "flex";
  filters.style.display = "flex";
  searchSection.style.display = "none";
  window.scrollTo({top:0, behavior:"smooth"});
}

renderProducts(products);
