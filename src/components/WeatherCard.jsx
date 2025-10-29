import { codeToIcon, codeToLabel } from "../utils/weatherCodes";

export default function WeatherCard({ city, country, data }) {
  const { temperature, windspeed, weathercode, time, winddirection } = data;
  const icon = codeToIcon(weathercode);
  const label = codeToLabel(weathercode);

  return (
    <div className="w-full mx-auto bg-white border border-gray-200 rounded-2xl shadow-md p-8 text-gray-900 animate-fadeIn transition-transform hover:scale-[1.01] duration-300">
      
      {/* Header: Location + Time */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 border-b border-gray-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold leading-tight">
              {city}
              {country && `, ${country}`}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              🕐 Updated:{" "}
              {new Date(time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Main Weather Display */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="text-7xl mb-4">{icon}</div>
        <div className="text-6xl font-bold text-gray-900 mb-2">
          {Math.round(temperature)}°C
        </div>
        <p className="text-lg text-gray-600 font-medium">{label}</p>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Wind Speed */}
        <div className="flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded-xl py-6 hover:bg-gray-100 transition-colors">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-3">
            <span className="text-2xl">💨</span>
          </div>
          <p className="text-3xl font-semibold text-gray-800">
            {Math.round(windspeed)}
            <span className="text-base text-gray-500"> km/h</span>
          </p>
          <p className="text-sm text-gray-500 uppercase tracking-wide mt-1">
            Wind Speed
          </p>
        </div>

        {/* Wind Direction */}
        <div className="flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded-xl py-6 hover:bg-gray-100 transition-colors">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-3">
            <span className="text-2xl">🧭</span>
          </div>
          <p className="text-3xl font-semibold text-gray-800">
            {winddirection ? `${Math.round(winddirection)}°` : "N/A"}
          </p>
          <p className="text-sm text-gray-500 uppercase tracking-wide mt-1">
            Direction
          </p>
        </div>
      </div>
    </div>
  );
}
