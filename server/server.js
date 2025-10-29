import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

// ✅ Use Render's PORT variable OR fallback to 5000 locally
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Default route (prevents "Cannot GET /")
app.get("/", (req, res) => {
  res.send("✅ PRECIOSO Research Backend is running smoothly!");
});

// ✅ Example search API route
app.get("/api/search", async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: "Missing search query" });
  }

  try {
    // Replace this with your actual search logic later
    res.json({
      message: `Search results for "${query}" would appear here.`,
    });
  } catch (error) {
    res.status(500).json({ 
      error: "Internal server error", 
      details: error.message 
    });
  }
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`✅ PRECIOSO Backend running at http://localhost:${PORT}`);
});
