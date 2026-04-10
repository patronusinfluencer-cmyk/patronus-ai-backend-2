import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 🧠 herken of het een vraag is
function isVraag(s) {
  return s.includes("wie") || s.includes("wat") || s.includes("waarom") || s.includes("hoe");
}

// 🧠 simpele antwoorden
function antwoordOpVraag(s) {
  if (s.includes("wie is patronus")) {
    return `
Patronus is een reflectiepartner die helpt bij het analyseren van situaties binnen zorg, gedrag en de Wet zorg en dwang.  
Het doel is om bewustwording te vergroten, spanning zichtbaar te maken en tot zorgvuldiger handelen te komen.
`;
  }

  if (s.includes("wat bedoel je")) {
    return `
Met de reflectie wordt bedoeld dat we samen kijken naar wat er onder het handelen ligt:  
intenties, effecten en de positie van de cliënt.

Het gaat dus niet alleen om wat er gebeurt, maar vooral waarom en hoe.
`;
  }

  return `
Dat is een goede vraag.  
Probeer hem iets concreter te maken of koppel hem aan een situatie, dan kan ik gerichter met je meedenken.
`;
}

// 🎭 reflectie (oude logica)
const toon = [
  "Hier schuurt het — en dat is niet toevallig.",
  "Je voelt dat dit niet helemaal klopt.",
  "Dit vraagt om vertraging en reflectie."
];

const juridisch = [
  "Binnen de Wzd geldt het uitgangspunt: nee, tenzij.",
  "Dit kan vallen onder onvrijwillige zorg.",
  "De kernvraag is proportionaliteit en subsidiariteit."
];

// 🌐 test
app.get("/", (req, res) => {
  res.send("Patronus Dialoog draait");
});

// 🧠 hoofd
app.post("/reflectie", (req, res) => {
  const situatie = req.body?.situatie || "";
  const s = situatie.toLowerCase();

  // 👉 ALS HET EEN VRAAG IS → ANDERS ANTWOORD
  if (isVraag(s)) {
    return res.json({
      tekst: antwoordOpVraag(s)
    });
  }

  // 👉 ANDERS → reflectie
  const tekst = `
🔍 Reflectie  
${pick(toon)}

⚖️ Juridische duiding  
${pick(juridisch)}

📌 Jouw situatie  
${situatie}

❓ Wat maakt dat deze situatie je bezighoudt?
`;

  res.json({ tekst });
});

// 🔁 vervolg
app.post("/vervolg", (req, res) => {
  const antwoord = req.body?.antwoord || "";

  const tekst = `
🔁 Verdieping  

Je reactie:  
"${antwoord}"

🧠 Reflectie  
Wat zegt dit over waar voor jou de spanning zit?

❓ Doorvraag  
Wat vraagt deze situatie van jou?
`;

  res.json({ tekst });
});

// 🚀 server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server draait op poort " + PORT);
});
