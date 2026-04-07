const container = document.getElementById("currency-container");
const loading = document.getElementById("loading");
let visibleCount = 12;
let allCurrencies = []; 
async function fetchCurrencies() {
    console.log("Button clicked, fetching data...");
  try {
    const base = document.getElementById("base-code").value.toUpperCase();

    const response = await fetch(`https://open.er-api.com/v6/latest/${base}`);
    const data = await response.json();
    visibleCount = 12;

    document.getElementById("base-code").value = data.base_code;

    loading.style.display = "none";
    container.innerHTML = "";

    allCurrencies = Object.entries(data.rates);
    displayCurrencies(allCurrencies);

    

  } catch (error) {
  console.error("ACTUAL ERROR:", error);
  loading.innerText = "Error loading data";
}
}
const viewMoreBtn = document.getElementById("view-more");

viewMoreBtn.addEventListener("click", function () {
  visibleCount += 12;
  displayCurrencies(allCurrencies);
});

function displayCurrencies(data) {
  container.innerHTML = "";

  const priorityCurrencies = [
  "USD", "EUR", "INR", "GBP", "JPY",
  "AUD", "CAD", "CHF", "CNY", "SGD",
  "AED", "NZD"
];

const sortedData = [...data].sort((a, b) => {
  const aPriority = priorityCurrencies.includes(a[0]) ? 0 : 1;
  const bPriority = priorityCurrencies.includes(b[0]) ? 0 : 1;
  return aPriority - bPriority;
});

const base = document.getElementById("base-code").value.toUpperCase();

const filteredData = sortedData.filter(([currency]) => currency !== base);

filteredData.slice(0, visibleCount).forEach(([currency, rate]) =>  {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h3>${currency}</h3>
      <p>${rate}</p>
    `;

    container.appendChild(div);
  });

if (visibleCount >= filteredData.length) {
  viewMoreBtn.style.display = "none";
} else {
  viewMoreBtn.style.display = "block";
}
}

const searchInput = document.getElementById("search");

searchInput.addEventListener("input", function () {
  const value = searchInput.value.toUpperCase();

  const filtered = allCurrencies.filter(([currency]) =>
    currency.includes(value)
  );
  visibleCount = 12;
  displayCurrencies(filtered);
});
const baseInput = document.getElementById("base-code");

baseInput.addEventListener("change", function () {
  fetchCurrencies();
});

const sortSelect = document.getElementById("sort-select");

sortSelect.addEventListener("change", function () {
  let sorted = [...allCurrencies]; 

  if (sortSelect.value === "high") {
    
    sorted.sort((a, b) => b[1] - a[1]);

  } else if (sortSelect.value === "low") {
    
    sorted.sort((a, b) => a[1] - b[1]);

  

  } else {
    
    sorted = [...allCurrencies];
  }

  displayCurrencies(sorted);
});

document.addEventListener("DOMContentLoaded", () => {
  fetchCurrencies();
});