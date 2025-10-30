import React, { useState } from "react";
import "./index.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [selectedField, setSelectedField] = useState("All");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fields = [
    "All",
    "Hematology",
    "Parasitology",
    "Biochemistry",
    "Microbiology",
    "Serology",
  ];

  const latestResearch = [
    {
      title: "AI-driven hematology analysis improves diagnostic accuracy",
      source: "Hematology Reports • 2024",
    },
    {
      title: "New malaria detection biomarkers identified",
      source: "Parasitology Today • 2023",
    },
    {
      title: "Advances in clinical biochemistry for sepsis detection",
      source: "Clinical Biochem Journal • 2025",
    },
  ];

  const handleSearch = async () => {
    if (!query.trim()) {
      alert("Please enter a search term");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const fieldQuery = selectedField !== "All" ? selectedField : "";

      // ✅ Connect to your Render backend
      const response = await fetch(
        `https://precioso-research.onrender.com/api/search?q=${encodeURIComponent(
          query + " " + fieldQuery
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Backend not responding properly.");
      }

      const data = await response.json();
      console.log("📄 Data received:", data);

      // ✅ Adjusted to match SerpAPI or other formats
      if (data.organic_results && data.organic_results.length > 0) {
        setResults(data.organic_results);
      } else if (data.articles && data.articles.length > 0) {
        setResults(data.articles);
      } else {
        setError("No results found for this topic.");
      }
    } catch (err: any) {
      console.error("Search error:", err);
      setError("Search failed. Please check your backend or internet connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="app-container">
      <header>
        <h1>PRECIOSO’S RESEARCH AREA</h1>
        <p>Explore trusted Medical Laboratory Science research papers.</p>
      </header>

      <div className="main-content">
        <aside className="sidebar">
          <h2>Fields</h2>
          {fields.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedField(f)}
              className={selectedField === f ? "active" : ""}
            >
              {f}
            </button>
          ))}
        </aside>

        <section className="content">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search topics, e.g. malaria biomarkers"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearch}>Search</button>
          </div>

          <div className="results">
            <h2>Search Results</h2>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading && !error && results.length === 0 && (
              <p>No results yet. Try searching something above.</p>
            )}

            {results.map((r, i) => (
              <div key={i} className="result-card">
                <a href={r.link} target="_blank" rel="noopener noreferrer">
                  <h3>{r.title}</h3>
                </a>
                {r.snippet && <p>{r.snippet}</p>}
                {r.publication_info && (
                  <p>{r.publication_info.summary}</p>
                )}
                <div className="cite-buttons">
                  <button>Cite in EndNote</button>
                  <button>Cite in Mendeley</button>
                  <button>Cite in Zotero</button>
                </div>
              </div>
            ))}
          </div>

          <div className="latest">
            <h2>Latest Research Highlights</h2>
            {latestResearch.map((item, idx) => (
              <div key={idx} className="highlight">
                <h4>{item.title}</h4>
                <p>{item.source}</p>
                <div className="research-buttons">
                  <a
                    href={`https://scholar.google.com/scholar?q=${encodeURIComponent(
                      item.title
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button>View on Google Scholar</button>
                  </a>
                  <a
                    href={`https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(
                      item.title
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button>View on PubMed</button>
                  </a>
                  <a
                    href={`https://www.sciencedirect.com/search?qs=${encodeURIComponent(
                      item.title
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button>View on ScienceDirect</button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer>
        © 2025 PRECIOSO’S RESEARCH AREA — Built with React + Vite
      </footer>
    </div>
  );
};

export default App;
