import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🧠 simpel geheugen (per gebruiker via naam)
let gesprekken = {};

// 🎲 helper
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 🔍 analyse
function analyseSituatie(s) {

  if (s.includes("naar buiten")) {
    return {
      reflectie: "Hier wordt direct ingegrepen in bewegingsvrijheid.",
      juridisch: "Dit kan onder onvrijwillige zorg vallen en vraagt een zware onderbouwing binnen de Wzd.",
      verdieping: "De vraag is of dit echt noodzakelijk is.",
      confrontatie: "Wie wordt hier beschermd — de cliënt of de situatie?"
    };
  }

  if (s.includes("telefoon") || s.includes("contact")) {
    return {
      reflectie: "Hier wordt communicatievrijheid beperkt.",
      juridisch: "Dit kan onvrijwillige zorg zijn.",
      verdieping: "Zijn er minder ingrijpende alternatieven?",
      confrontatie: "Wat is het echte risico?"
    };
  }

  return {
    reflectie: "Deze situatie vraagt om een zorgvuldige afweging.",
    juridisch: "Binnen de Wzd geldt: nee, tenzij.",
    verdieping: "Wat is hier echt noodzakelijk?",
    confrontatie: "Wat wordt hier eigenlijk opgelost?"
  };
}

// 🌐 test
app.get("/", (req, res) => {
  res.send("Patronus Persoonlijk draait");
});

// 🧠 eerste stap
app.post("/reflectie", (req, res) => {
  const naam = req.body?.naam || "professional";
  const situatie = req.body?.situatie || "";
  const s = situatie.toLowerCase();

  // opslaan
  gesprekken[naam] = {
    situatie,
    geschiedenis: []
  };

  const analyse = analyseSituatie(s);

  const tekst = `
🔍 Reflectie (${naam})  
${analyse.reflectie}

⚖️ Juridische duiding  
${analyse.juridisch}

🧠 Verdieping  
${analyse.verdieping}

⚡ Confrontatie  
${analyse.confrontatie}

📌 Jouw situatie  
${situatie}

❓ Doorvragen  
- Wat maakt dat deze maatregel wordt ingezet?  
- Is dit aantoonbaar noodzakelijk?  
- Wat zou de cliënt zelf willen?

✍️ Reageer — ik onthoud wat je zegt.
`;

  res.json({ tekst });
});

// 🔁 vervolg (met geheugen)
app.post("/vervolg", (req, res) => {
  const naam = req.body?.naam || "professional";
  const antwoord = req.body?.antwoord || "";

  if (!gesprekken[naam]) {
    return res.json({
      tekst: "Ik mis nog je eerdere situatie. Start eerst een reflectie."
    });
  }

  gesprekken[naam].geschiedenis.push(antwoord);

  const tekst = `
🔁 Verdieping (${naam})  

Jouw reactie:  
"${antwoord}"

🧠 Reflectie  
Ik zie een lijn ontstaan in wat je zegt.

⚖️ Juridisch  
Blijft dit handelen binnen ‘nee, tenzij’?

⚡ Confrontatie  
Wat probeer je hier écht te voorkomen?

📚 Gesprek tot nu toe  
${gesprekken[naam].geschiedenis.map((g, i) => `${i+1}. ${g}`).join("\n")}

❓ Doorvragen  
- Wat zegt dit over jouw positie?  
- Wat zou je doen zonder druk van buitenaf?  
- Waar zit jouw grens?

🤝 Patronus  
Blijft dit spelen, dan kan het helpen om hier samen naar te kijken.
`;

  res.json({ tekst });
});

// 🚀 server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server draait op poort " + PORT);
});
