import { useState } from "react";
import "./App.css";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [search, setSearch] = useState({
    movie: "",
  });

  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async (search) => {
    const url = `http://www.omdbapi.com/?apikey=${API_KEY}&t=${search.movie}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setResults([data]);
  };

   return (
    <div className="app-container">
      <h2 className="main-title">Movie Search</h2>
      <div className="search-bar">
        <input
          type="text"
          className="dashboard-card-input"
          name="movie"
          value={search.movie}
          onChange={handleChange}
          placeholder="Search movie"
        />

        <button
          className="dashboard-card-search"
          onClick={() => handleSearch(search)}
        >
          Search
        </button>
      </div>

<div className="dashboard-results">
        {results.length === 0 ? (
          null
        ) : results[0] && results[0].Response === "False" ? (
          <p className="not-found">No se encontró la película.</p>
        ) : (
          results.map((result) => (
            <div key={result.imdbID} className="dashboard-card">
              <h1 className="movie-title">{result.Title}</h1>
              <p className="movie-year">{result.Year}</p>
              <img
                className="movie-poster"
                src={result.Poster}
                alt="Image not found"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
