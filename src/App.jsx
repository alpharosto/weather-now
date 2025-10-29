import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";
import { searchCity, getCurrentWeather } from "./services/openMeteo";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cityMeta, setCityMeta] = useState(null);
  const [weather, setWeather] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [recent, setRecent] = useState([]);
  const [coords, setCoords] = useState(null);
  const [userName, setUserName] = useState('Jamie');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const last = localStorage.getItem("lastCity");
    const storedRecent = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    setRecent(storedRecent);
    const storedName = localStorage.getItem('userName');
    if (storedName) setUserName(storedName);
    const storedFav = JSON.parse(localStorage.getItem('favoriteCities') || '[]');
    setFavorites(storedFav);
    if (last) handleSearch(last);

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto refresh every minute for current coords
  useEffect(() => {
    if (!coords) return;
    const int = setInterval(async () => {
      try {
        const current = await getCurrentWeather(coords.lat, coords.lon);
        setWeather(current);
      } catch {
        // Ignore errors on auto-refresh
      }
    }, 60_000);
    return () => clearInterval(int);
  }, [coords]);

  const handleSearch = async (cityName) => {
    if (!cityName) return;
    setError("");
    setWeather(null);
    setLoading(true);
    try {
      const matches = await searchCity(cityName);
      setSuggestions(matches);
      if (matches.length === 0) {
        setError("City not found. Try another name.");
        return;
      }
      const top = matches[0];
      const current = await getCurrentWeather(top.lat, top.lon);
      setCityMeta({ city: top.name, country: top.country });
      setCoords({ lat: top.lat, lon: top.lon });
      setWeather(current);
      localStorage.setItem("lastCity", cityName);
      localStorage.setItem("lastWeather", JSON.stringify(current));
      localStorage.setItem("lastCityMeta", JSON.stringify({ city: top.name, country: top.country }));
      const updatedRecent = [top.name, ...recent.filter((r) => r.toLowerCase() !== top.name.toLowerCase())].slice(0, 5);
      setRecent(updatedRecent);
      localStorage.setItem('recentSearches', JSON.stringify(updatedRecent));
    } catch {
      const cached = localStorage.getItem('lastWeather');
      const cachedMeta = localStorage.getItem('lastCityMeta');
      if (cached && cachedMeta) {
        setWeather(JSON.parse(cached));
        setCityMeta(JSON.parse(cachedMeta));
        setError("You are offline. Showing last saved weather.");
      } else {
        setError("Failed to fetch weather data. Check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGeo = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported.");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const current = await getCurrentWeather(latitude, longitude);
        setCityMeta({ city: "Your Location", country: "" });
        setCoords({ lat: latitude, lon: longitude });
        setWeather(current);
        setLoading(false);
      },
      () => {
        setError("Location permission denied.");
        setLoading(false);
      }
    );
  };

  // Units are fixed to Celsius and km/h

  const saveFavorite = () => {
    if (!cityMeta?.city) return;
    const updated = [cityMeta.city, ...favorites.filter((c) => c.toLowerCase() !== cityMeta.city.toLowerCase())].slice(0, 6);
    setFavorites(updated);
    localStorage.setItem('favoriteCities', JSON.stringify(updated));
  };

  const handlePickFavorite = (city) => {
    handleSearch(city);
  };

  const updateName = (e) => {
    const v = e.target.value || 'Jamie';
    setUserName(v);
    localStorage.setItem('userName', v);
  };

  return (
    <div className="min-h-screen w-full">
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <header className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Weather Now</h1>
          <p className="text-gray-700">
            Hi, <input aria-label="Your name" value={userName} onChange={updateName} className="px-2 py-0.5 rounded-md border border-gray-300 bg-white/80 w-28 text-center"/> — quick weather for your adventures
          </p>
          <div className="mt-1 text-sm text-gray-600">Units: °C / km/h</div>
          {(favorites.length > 0 || recent.length > 0) && (
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              {[...favorites, ...recent.filter(r => !favorites.includes(r))].slice(0,8).map((c) => (
                <button key={c} onClick={() => handlePickFavorite(c)} className="px-3 py-1 text-sm rounded-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700">
                  {c}
                </button>
              ))}
            </div>
          )}
        </header>

        <SearchBar onSearch={handleSearch} onGeo={handleGeo} suggestions={suggestions} recent={recent} />

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {loading && <Loading />}

        {!loading && weather && cityMeta && (
          <div className="space-y-3">
            <WeatherCard city={cityMeta.city} country={cityMeta.country} data={weather} currentTime={currentTime} />
            <div className="flex justify-end">
              <button onClick={saveFavorite} className="text-sm px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700">
                Save {cityMeta.city} to favorites
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
