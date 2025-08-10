# CLI Weather Assistant (WeatherAPI + Groq API)

A simple **command-line weather assistant** that fetches real-time weather data from **WeatherAPI** and uses the free **Groq API** to generate friendly, human-like weather reports.

## Features
- Fetches live weather conditions for any city.
- Uses **Groq's Gemma2** model to rephrase data naturally.
- Simple CLI interface — just enter a city name and get the weather instantly.
- Free to use (WeatherAPI + Groq API daily quotas apply).

## Requirements
- Node.js v18 or later
- WeatherAPI key (free from [https://www.weatherapi.com/](https://www.weatherapi.com/))
- Groq API key (free from [https://console.groq.com/](https://console.groq.com/))

## Installation
1. Clone the repository or copy the code.
2. Install dependencies:
   ```bash
   npm install node-fetch readline dotenv
