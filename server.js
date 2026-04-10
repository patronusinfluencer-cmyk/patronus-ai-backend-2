import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/reflectie", async (req, res) => {
  try {
    const situatie = req.body.situatie;

    const prompt = `
Je bent Patronus Reflectie®.

Geef antwoord in het Nederlands in 3 delen:

1. Reflectie  
2. Analyse (met Wzd context)  
3. Dialoog  

Situatie:
${situatie}
`;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt
    });

    res.jsonres.json({ tekst: response.output[0].content[0].text });

  } catch (error) {
    res.status(500).json({ error: "AI fout" });
  }
});

app.listen(3000, () => {
  console.log("Server draait");
});
