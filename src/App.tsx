import React, { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedField, setSelectedField] = useState("All");

  const handleSearch = async () => {
    if (!query.trim()) return alert("Please enter a search term.");
    setLoading(true);

    try {
      const response = await fetch(
        `https://serpapi.com/search.json?engine=google_scholar&q=${encodeURIComponent(
          query
        )}&api_key=demo`
      );
      const data = await response.json();
      setResults(data.organic_results || []);
    } catch (error) {
      console.error(error);
      alert("Search failed. Check your internet connection.");
    }

    setLoading(false);
  };

  // Press Enter to search
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  // Export results to EndNote format (.ris)
  const handleExportEndNote = () => {
    if (results.length === 0) return alert("No results to export.");

    const ris = results
      .map(
        (r) =>
          `TY  - JOUR\nTI  - ${r.title || "No title"}\nAU  - ${
            r.publication_info?.authors?.map((a: any) => a.name).join("; ") ||
            "Unknown"
          }\nPY  - ${r.publication_info?.year || "n.d."}\nUR  - ${
            r.link || ""
          }\nER  - `
      )
      .join("\n\n");

    const blob = new Blob([ris], { type: "application/x-research-info-systems" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fondo_research_results.ris";
    a.click();
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          background: "#1e3a8a",
          color: "white",
          padding: "20px",
        }}
      >
        <h2 style={{ fontSize: "20px", marginBottom: "15px" }}>Categories</h2>
        {["All", "Hematology", "Serology", "Biochemistry", "Microbiology", "Parasitology"].map(
          (field) => (
            <div
              key={field}
              onClick={() => setSelectedField(field)}
              style={{
                background:
                  selectedField === field ? "rgba(255,255,255,0.2)" : "transparent",
                padding: "10px",
                borderRadius: "8px",
                cursor: "pointer",
                marginBottom: "10px",
              }}
            >
              {field}
            </div>
          )
        )}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "30px" }}>
        <h1 style={{ color: "#2563eb", marginBottom: "10px" }}>
          FONDOH RESEARCH AREA
        </h1>
        <p>Search trusted journals and scholarly databases.</p>

        {/* Search Box */}
        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder={`Search ${selectedField} topics...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              padding: "10px",
              width: "60%",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              marginLeft: "10px",
              padding: "10px 20px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Search
          </button>

          <button
            onClick={handleExportEndNote}
            style={{
              marginLeft: "10px",
              padding: "10px 20px",
              background: "#22c55e",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Export to EndNote
          </button>
        </div>

        {/* Results */}
        {loading ? (
          <p>Loading...</p>
        ) : results.length > 0 ? (
          <div>
            {results.map((item, idx) => (
              <div
                key={idx}
                style={{
                  border: "1px solid #ddd",
                  padding: "15px",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              >
                <h3>{item.title}</h3>
                <p>{item.snippet}</p>
                {item.link && (
                  <a href={item.link} target="_blank" rel="noreferrer">
                    View on Google Scholar
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No results yet. Try searching.</p>
        )}
      </div>
    </div>
  );
}
