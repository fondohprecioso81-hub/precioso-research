import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 5000;

// ✅ Replace this with your real SerpAPI key
const API_KEY = "da75cf0d72d81ff4f180829866a449d161db3b1816de75715cfc3ab5f638bbef";

app.use(cors());
app.use(express.json());

app.get("/api/search", async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Missing search query" });
  }

  try {
    const url = `https://serpapi.com/search.json?engine=google_scholar&q=${encodeURIComponent(
      q
    )}&api_key=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ error: data.error });
    }

    return res.json(data);
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
