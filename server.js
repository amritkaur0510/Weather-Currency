const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// WEATHER ROUTE
app.get("/weather", async (req, res) => {
    try {
        const apiKey = process.env.WEATHER_API_KEY;

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=Calgary&units=metric&appid=${apiKey}`
        );

        const data = await response.json();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({
            message: "Weather API Error"
        });
    }
});


app.get("/currency/:from", async (req, res) => {
    try {
        const from = req.params.from;

        const apiKey = process.env.CURRENCY_API_KEY;

        const response = await fetch(
            `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`
        );
        const data = await response.json();
        res.json(data);
    }

    catch (error) {
        res.status(500).json({
            message: "Currency API Error"
        });
    }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});