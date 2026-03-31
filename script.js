const container = document.getElementById("currency-container");
const loading = document.getElementById("loading");

async function fetchCurrencies() {
    console.log("Button clicked, fetching data...");
  try {
    const response = await fetch("https://api.frankfurter.app/latest");
    const data = await response.json();

    loading.style.display = "none";
    container.innerHTML = "";

    const rates = Object.entries(data.rates);

    rates.forEach(([currency, rate]) => {
      const div = document.createElement("div");
      div.className = "card";

      div.innerHTML = `
        <h3>${currency}</h3>
        <p>${rate}</p>
      `;

      container.appendChild(div);
    });

  } catch (error) {
    loading.innerText = "Error loading data";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchCurrencies();
});