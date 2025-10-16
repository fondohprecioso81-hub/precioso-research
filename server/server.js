import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ✅ Default route — fixes "Cannot GET /"
app.get("/", (req, res) => {
  res.send("✅ PRECIOSO Research Backend is running!");
});

// ✅ Example API route (adjust as needed)
app.get("/api/search", async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: "Missing search query" });
  }

  try {
    // Example placeholder
    res.json({
      message: `Search results for "${query}" would appear here.`,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
