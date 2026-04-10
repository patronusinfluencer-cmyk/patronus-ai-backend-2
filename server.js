import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("Patronus AI backend draait");
});

app.post("/reflectie", (req, res) => {
  console.log("Binnengekomen:", req.body);

  const situatie = req.body?.situatie || "geen input";

  res.json({
    tekst: "🔍 Reflectie: " + situatie
  });
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server draait op poort " + PORT);
});
