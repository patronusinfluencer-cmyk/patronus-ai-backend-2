import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Test route
app.get("/", (req, res) => {
  res.send("Patronus AI backend draait");
});

// Reflectie route
app.post("/reflectie", async (req, res) => {
  try {
    const situatie = req.body.situatie || "Geen situatie opgegeven";

    const prompt = `
Je bent Patronus Reflectie®.

Je helpt professionals in de zorg met reflectie, analyse en dialoog.

Geef een antwoord in het Nederlands in 3 delen:

1. Reflectie (kort en scherp)
2. Analyse (met Wzd perspectief: rechten, autonomie, proportionaliteit)
3. Dialoog (hoe zou je dit bespreekbaar maken)

Situatie:
${situatie}
`;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt
    });

    // ROBUUSTE UITLEZING (werkt altijd)
    let tekst =
      response.output?.[0]?.content?.[0]?.text ||
      response.output_text ||
      "Geen antwoord ontvangen";

    res.json({ tekst });

  } catch (error) {
    console.error("AI fout:", error);
    res.status(500).json({ error: "AI fout" });
  }
});

// Render poort
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server draait op poort " + PORT);
});
