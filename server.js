import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

function analyse(s) {

  if (s.includes("naar buiten")) {
    return {
      reflectie: "Hier wordt de bewegingsvrijheid van de cliënt beperkt.",
      juridisch: "Binnen de Wzd kan dit onvrijwillige zorg zijn en vraagt dit een duidelijke onderbouwing.",
      actie: "Ga na of deze beperking formeel is vastgelegd en of minder ingrijpende alternatieven zijn onderzocht.",
      confrontatie: "Is dit echt noodzakelijk — of vooral praktisch voor de omgeving?"
    };
  }

  return {
    reflectie: "Deze situatie vraagt om een zorgvuldige afweging.",
    juridisch: "Binnen de Wzd geldt het uitgangspunt: nee, tenzij.",
    actie: "Breng eerst helder in kaart wat het doel is van het handelen en of dit proportioneel is.",
    confrontatie: "Wat probeer je hier eigenlijk op te lossen?"
  };
}

// test
app.get("/", (req, res) => {
  res.send("Patronus Actie draait");
});

// hoofd
app.post("/reflectie", (req, res) => {
  const situatie = req.body?.situatie || "";
  const s = situatie.toLowerCase();

  const a = analyse(s);

  const tekst = `
🔍 Reflectie  
${a.reflectie}

⚖️ Juridische duiding (Wzd)  
${a.juridisch}

🛠️ Wat kun je doen  
${a.actie}

⚡ Scherpte  
${a.confrontatie}

📌 Jouw situatie  
${situatie}

❓ Vraag aan jou  
Wat maakt dat deze situatie zo blijft spelen?

🤝 Kom je er niet uit?  
Sommige situaties vragen om meer dan reflectie alleen.  
Wil je hier samen naar kijken? Ga dan naar:  
👉 https://patronusgroep.nl/contact
`;

  res.json({ tekst });
});

// vervolg
app.post("/vervolg", (req, res) => {
  const antwoord = req.body?.antwoord || "";

  const tekst = `
🔁 Verdieping  

Je reactie:  
"${antwoord}"

🧠 Reflectie  
Je zit waarschijnlijk op een punt waar twijfel en verantwoordelijkheid samenkomen.

❓ Doorvraag  
Wat heb jij nodig om hier een volgende stap in te zetten?

🤝 Hulp nodig?  
Je hoeft dit niet alleen te doen.  
👉 https://patronusgroep.nl/contact
`;

  res.json({ tekst });
});

// server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server draait op poort " + PORT);
});
