import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// helper
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 🎭 toon
const toon = [
  "Hier schuurt het — en dat is niet toevallig.",
  "Je voelt dat dit niet helemaal klopt.",
  "Dit vraagt om vertraging en reflectie.",
  "Hier zit spanning tussen intentie en effect."
];

// ⚖️ juridisch
const juridisch = [
  "Binnen de Wzd geldt het uitgangspunt: nee, tenzij.",
  "Dit kan vallen onder onvrijwillige zorg.",
  "De kernvraag is proportionaliteit en subsidiariteit."
];

// 🧩 doelgroep
function doelgroepAnalyse(s) {
  if (s.includes("ggz")) {
    return "Binnen de GGZ speelt spanning tussen autonomie en veiligheid.";
  }
  if (s.includes("verstandelijke") || s.includes("vg")) {
    return "Binnen de VG is communicatie en interpretatie van wil extra belangrijk.";
  }
  if (s.includes("jeugd") || s.includes("kind")) {
    return "Binnen de jeugdzorg speelt bescherming en afhankelijkheid een rol.";
  }
  return "Deze situatie vraagt om contextbewust handelen.";
}

// ❓ vragen
const vragenSets = [
  [
    "Wat maakt dat dit je raakt?",
    "Waar zit je twijfel?",
    "Wat voelt hier niet kloppend?"
  ],
  [
    "Wat probeer je hiermee te voorkomen?",
    "Is dat risico concreet?",
    "Wat is het echte probleem hier?"
  ],
  [
    "Hoe kijkt de cliënt hiernaar?",
    "Is die stem echt meegenomen?",
    "Wat gebeurt er als je die centraal zet?"
  ]
];

// 🧠 eerste stap
app.post("/reflectie", (req, res) => {
  const situatie = req.body?.situatie || "";
  const s = situatie.toLowerCase();

  const vragen = pick(vragenSets);

  const tekst = `
🔍 Reflectie  
${pick(toon)}

⚖️ Juridische duiding  
${pick(juridisch)}

🧩 Context  
${doelgroepAnalyse(s)}

❓ Vragen  
- ${vragen[0]}  
- ${vragen[1]}  
- ${vragen[2]}

📌 Jouw situatie  
${situatie}

✍️ Reageer op een vraag om verder te verdiepen.
`;

  res.json({ tekst });
});

// 🔁 vervolg
app.post("/vervolg", (req, res) => {
  const antwoord = req.body?.antwoord || "";

  const tekst = `
🔁 Verdieping  

Jouw reactie:  
"${antwoord}"

🧠 Reflectie  
Wat zichtbaar wordt, is dat jouw antwoord richting geeft aan waar de spanning zit.

⚖️ Juridisch  
Blijft het handelen in lijn met 'nee, tenzij'?

❓ Doorvragen  
- Wat gebeurt er als je niets verandert?  
- Wat probeer je hier eigenlijk op te lossen?  
- Wat vraagt dit van jou als professional?

🤝 Blijft dit knagen?  
Patronus kan met je meekijken en helpen verdiepen.
`;

  res.json({ tekst });
});

// test
app.get("/", (req, res) => {
  res.send("Patronus Dialoog draait");
});

// server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server draait op poort " + PORT);
});
