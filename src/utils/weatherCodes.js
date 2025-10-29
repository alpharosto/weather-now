export const WMO = {
  0:  { label: "Clear sky",            icon: "☀️" },
  1:  { label: "Mainly clear",         icon: "🌤️" },
  2:  { label: "Partly cloudy",        icon: "⛅" },
  3:  { label: "Overcast",             icon: "☁️" },
  45: { label: "Fog",                  icon: "🌫️" },
  48: { label: "Depositing rime fog",  icon: "🌫️" },
  51: { label: "Light drizzle",        icon: "🌦️" },
  53: { label: "Drizzle",              icon: "🌦️" },
  55: { label: "Dense drizzle",        icon: "🌧️" },
  61: { label: "Slight rain",          icon: "🌧️" },
  63: { label: "Rain",                 icon: "🌧️" },
  65: { label: "Heavy rain",           icon: "🌧️" },
  66: { label: "Freezing rain",        icon: "🌧️" },
  67: { label: "Heavy freezing rain",  icon: "🌧️" },
  71: { label: "Slight snow",          icon: "🌨️" },
  73: { label: "Snow",                 icon: "🌨️" },
  75: { label: "Heavy snow",           icon: "❄️" },
  77: { label: "Snow grains",          icon: "❄️" },
  80: { label: "Rain showers",         icon: "🌦️" },
  81: { label: "Heavy rain showers",   icon: "🌧️" },
  82: { label: "Violent rain showers", icon: "⛈️" },
  85: { label: "Snow showers",         icon: "🌨️" },
  86: { label: "Heavy snow showers",   icon: "❄️" },
  95: { label: "Thunderstorm",         icon: "⛈️" },
  96: { label: "Thunderstorm w/ hail", icon: "⛈️" },
  99: { label: "Severe thunderstorm",  icon: "⛈️" },
};

export function codeToLabel(code) {
  return (WMO[code]?.label) ?? "Unknown";
}
export function codeToIcon(code) {
  return (WMO[code]?.icon) ?? "🌡️";
}
