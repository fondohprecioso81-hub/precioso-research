import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 🔍 Search route (Google Scholar via SerpAPI)
app.get("/api/search", async (req, res) => {
  const query = req.query.q;
  const apiKey = "da75cf0d72d81ff4f180829866a449d161db3b1816de75715cfc3ab5f638bbef";

  if (!query) {
    return res.status(400).json({ error: "Missing search query" });
  }

  console.log("🔍 Searching for:", query);

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10-second timeout

    const response = await fetch(
      `https://serpapi.com/search.json?engine=google_scholar&q=${encodeURIComponent(
        query
      )}&api_key=${apiKey}`,
      { signal: controller.signal }
    );

    clearTimeout(timeout);
    console.log("➡️ SerpAPI responded with status:", response.status);

    if (!response.ok) {
      const text = await response.text();
      console.error("❌ API error:", text);
      return res.status(response.status).json({ error: text });
    }

    const data = await response.json();
    console.log("✅ Data received");
    res.json(data);
  } catch (err) {
    console.error("❌ Fetch failed:", err);
    res.status(500).json({ error: "Failed to fetch results from SerpAPI" });
  }
});

// 🧩 Example test route
app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from the Express backend 👋" });
});

// ⚠️ Handle undefined routes to prevent endless loading
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
