import fetch from 'node-fetch';
import readline from 'readline';
import 'dotenv/config';

async function fetchweather(city) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHERAPI_KEY}&q=${encodeURIComponent(city)}&aqi=no`;
  const response = await fetch(url);
  return response.json();
}

async function getAIResponse(prompt) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gemma2-9b-it", 
      messages: [
        { role: "system", content: "You are a friendly AI weather assistant. Explain the weather in a natural, clear way and give suggestions if needed." },
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await res.json();

  if (!data.choices || !data.choices.length) {
    return "Sorry, I couldn't get a response from the AI right now.";
  }
  return data.choices[0].message.content;
}

async function weatherAgent(city) {
  const data = await fetchweather(city);

  if (data.error) {
    return `Could not find weather data for "${city}".`;
  }

  const rawWeather = `
City: ${data.location.name}, ${data.location.country}
Temperature: ${data.current.temp_c}°C
Humidity: ${data.current.humidity}%
Condition: ${data.current.condition.text}
Wind: ${data.current.wind_kph} km/h
Feels Like: ${data.current.feelslike_c}°C
  `;

  return await getAIResponse(rawWeather);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(" Enter city name: ", async (city) => {
  const report = await weatherAgent(city);
  console.log("\n" + report);
  rl.close();
});
