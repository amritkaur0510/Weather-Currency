const weatherBtn = document.getElementById("weatherBtn");

const convertBtn = document.getElementById("convertBtn");

// WEATHER

weatherBtn.addEventListener("click", getWeather
);

async function getWeather() {
    const lastCall = localStorage.getItem("weatherTime");

    if (lastCall && Date.now() - lastCall < 60000
    ) {
        alert("Please wait 1 minute.");
        return;
    }

    const response = await fetch("/weather");

    const data = await response.json();

    document.getElementById("temp").textContent = data.main.temp + " °C";

    document.getElementById("description").textContent = data.weather[0].description;

    const currentTime = new Date().toLocaleString();

    document.getElementById("time").textContent = currentTime;

    localStorage.setItem("weatherData", JSON.stringify(data));

    localStorage.setItem("weatherTime", Date.now());
}



window.addEventListener("load", () => {
    const savedWeather =
        localStorage.getItem("weatherData");

    if (savedWeather) {
        const data = JSON.parse(savedWeather);

        document.getElementById("temp").textContent = data.main.temp + " °C";

        document.getElementById("description").textContent = data.weather[0].description;
    }
});



// CURRENCY

convertBtn.addEventListener("click", convertCurrency);

async function convertCurrency() {
    const amount = document.getElementById("amount").value;

    const from = document.getElementById("from").value;

    const to = document.getElementById("to").value;

    const lastCall = sessionStorage.getItem("currencyTime");

    if (lastCall && Date.now() - lastCall < 30000) {
        alert("Please wait 30 seconds.");
        return;
    }

    const response = await fetch(`/currency/${from}`);

    const data = await response.json();

    const rate = data.conversion_rates[to];

    const converted = amount * rate;

    document.getElementById("rate").textContent = `1 ${from} = ${rate} ${to}`;

    document.getElementById("result").textContent = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;

    sessionStorage.setItem("exchangeRate", rate);

    sessionStorage.setItem("currencyTime", Date.now());
}