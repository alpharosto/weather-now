const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";


export async function searchCity(name) {
  const res = await fetch(`${GEO_URL}?name=${encodeURIComponent(name)}&count=5`);
  if (!res.ok) throw new Error("Geocoding failed");
  const data = await res.json();
  if (!data.results || data.results.length === 0) return [];
  return data.results.map(r => ({
    id: `${r.name}-${r.latitude}-${r.longitude}`,
    name: r.name,
    country: r.country,
    lat: r.latitude,
    lon: r.longitude,
  }));
}


export async function getCurrentWeather(lat, lon, opts = {}) {
  const { temperature_unit = 'celsius', windspeed_unit = 'kmh', timezone } = opts;
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current_weather: "true",
    temperature_unit,
    windspeed_unit,
    ...(timezone ? { timezone } : {}),
  });
  const res = await fetch(`${WEATHER_URL}?${params.toString()}`);
  if (!res.ok) throw new Error("Weather fetch failed");
  const data = await res.json();
  return data.current_weather; // { temperature, windspeed, weathercode, time, winddirection }
}
