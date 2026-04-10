import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 🔍 betekenis herkennen
function analyseSituatie(s) {
  if (s.includes("naar buiten") || s.includes("mag niet buiten")) {
    return {
      reflectie: "Hier wordt de bewegingsvrijheid van de cliënt direct beperkt.",
      juridisch: "Het niet naar buiten mogen gaan kan onder onvrijwillige zorg vallen en vraagt een zware onderbouwing binnen de Wzd.",
      verdieping: "De vraag is of deze beperking echt noodzakelijk is, of voortkomt uit praktische of organisatorische overwegingen."
    };
  }

  if (s.includes("telefoon") || s.includes("contact")) {
    return {
      reflectie: "Hier wordt ingegrepen in communicatievrijheid.",
      juridisch: "Beperken van contact kan onvrijwillige zorg zijn en moet zorgvuldig worden afgewogen.",
      verdieping: "De kernvraag is of er minder ingrijpende alternatieven zijn."
    };
  }

  if (s.includes("agressie") || s.includes("onveilig")) {
    return {
      reflectie: "Veiligheid lijkt hier de leidende factor.",
      juridisch: "Ook bij risico blijft de Wzd gelden: minst ingrijpende maatregel.",
      verdieping: "De vraag is of veiligheid hier wordt gebruikt als argument of als onderbouwde noodzaak."
    };
  }

  return {
    reflectie: "Deze situatie vraagt om een zorgvuldige afweging.",
    juridisch: "Binnen de Wzd geldt het uitgangspunt: nee, tenzij.",
    verdieping: "De vraag is wat hier echt noodzakelijk is."
  };
}

// 🧠 vraag herkennen
function isVraag(s) {
  return s.includes("wie") || s.includes("wat") || s.includes("waarom") || s.includes("hoe");
}

// 🧠 simpele antwoorden
function antwoordOpVraag(s) {
  if (s.includes("wie is patronus")) {
    return "Patronus is een reflectiepartner die helpt om situaties te analyseren, spanning zichtbaar te maken en tot zorgvuldiger handelen te komen.";
  }

  if (s.includes("wat bedoel je")) {
    return "Met de reflectie wordt bedoeld dat we kijken naar wat er onder het handelen ligt: intenties, effecten en de positie van de cliënt.";
  }

  return "Goede vraag. Kun je hem iets concreter maken of koppelen aan een situatie?";
}

// 🌐 test
app.get("/", (req, res) => {
  res.send("Patronus Slim draait");
});

// 🧠 hoofd
app.post("/reflectie", (req, res) => {
  const situatie = req.body?.situatie || "";
  const s = situatie.toLowerCase();

  // 👉 vraag beantwoorden
  if (isVraag(s)) {
    return res.json({
      tekst: antwoordOpVraag(s)
    });
  }

  const analyse = analyseSituatie(s);

  const tekst = `
🔍 Reflectie  
${analyse.reflectie}

⚖️ Juridische duiding (Wzd)  
${analyse.juridisch}

🧠 Verdieping  
${analyse.verdieping}

📌 Jouw situatie  
${situatie}

❓ Doorvraag  
Wat maakt dat deze beperking wordt toegepast — en is die ook echt noodzakelijk?
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
Hier zit vaak de kern: wat proberen we te voorkomen?

⚖️ Juridisch  
Blijft dit handelen binnen ‘nee, tenzij’?

❓ Doorvraag  
Wat zou er gebeuren als de cliënt meer vrijheid krijgt?
`;

  res.json({ tekst });
});

// 🚀 server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server draait op poort " + PORT);
});
