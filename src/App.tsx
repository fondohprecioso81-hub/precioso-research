import React, { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return alert("Please enter a search term.");

    // Google Scholar
    const scholarURL = `https://scholar.google.com/scholar?q=${encodeURIComponent(
      query
    )}`;

    // PubMed
    const pubmedURL = `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(
      query
    )}`;

    // Open both in new tabs
    window.open(scholarURL, "_blank");
    window.open(pubmedURL, "_blank");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1 style={{ color: "#3b82f6" }}>FONDOH RESEARCH AREA</h1>
      <p style={{ marginBottom: "20px" }}>
        Search across trusted journals — Google Scholar & PubMed
      </p>
      <input
        type="text"
        placeholder="Enter research topic..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          marginLeft: "10px",
          padding: "10px 20px",
          background: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Search
      </button>
    </div>
  );
}
