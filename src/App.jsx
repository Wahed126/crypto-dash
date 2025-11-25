import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=10&page=1&sparkline=false`
        );
        if (!res.ok) throw new Error("Faild to fetch data.");
        const data = await res.json();
        console.log(data);
        setCoins(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, []);
  return (
    <div>
      <h1>🚀 Crypto Dash</h1>
      {loading && <p>Loading...</p>}
      {error && (
        <div className="error">
          <p>❌ {error}</p>
        </div>
      )}

      {!loading && !error && (
        <main className="grid">
          {coins.map((coin) => (
            <div className="coin-card" key={coin.id}>
              <div className="coin-header">
                <img src={coin.image} alt={coin.name} className="coin-image" />
                <div>
                  <h2>{coin.name}</h2>
                  <p className="symbol">{coin.symbol.toUpperCase()}</p>
                </div>
              </div>
              <p>Price: ${coin.current_price.toLocaleString()}</p>
              <p
                className={
                  coin.price_change_percentage_24h >= 0
                    ? "positive"
                    : "negative"
                }
              >
                24h Change: {coin.price_change_percentage_24h.toFixed(2)}%
              </p>
              <p>Market Cap: ${coin.market_cap.toLocaleString()}</p>
            </div>
          ))}
        </main>
      )}
    </div>
  );
};

export default App;
