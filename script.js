async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const apiKey = "10da37b09261f7f017c9e32a981e7ffd"; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=BeloHorizonte&appid={10da37b09261f7f017c9e32a981e7ff}&lang=pt_br&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            document.getElementById("weatherInfo").innerHTML = "Cidade não encontrada. Tente novamente.";
            return;
        }

        displayWeather(data);
    } catch (error) {
        document.getElementById("weatherInfo").innerHTML = "Erro ao buscar informações do clima.";
        console.error(error);
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById("weatherInfo");
    const { name } = data;
    const { temp, humidity } = data.main;
    const { description, icon } = data.weather[0];
    const { speed } = data.wind;

    weatherInfo.innerHTML = `
        <h2>${name}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
        <p>Descrição: ${description}</p>
        <p>Temperatura: ${temp}°C</p>
        <p>Umidade: ${humidity}%</p>
        <p>Vento: ${speed} m/s</p>
    `;
}
