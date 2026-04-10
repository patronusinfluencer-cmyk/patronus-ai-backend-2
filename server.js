import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function analyse(s) {

  if (s.includes("naar buiten")) {
    return {
      reflectie: pick([
        "Hier wordt de bewegingsvrijheid van de cliënt beperkt.",
        "Dit raakt direct aan vrijheid en autonomie.",
        "Hier lijkt sprake van een vrijheidsbeperkende maatregel."
      ]),
      juridisch: pick([
        "Dit kan onder onvrijwillige zorg vallen binnen de Wzd.",
        "De Wzd stelt hier strikte eisen aan proportionaliteit.",
        "Dit vraagt een duidelijke juridische onderbouwing."
      ]),
      actie: pick([
        "Controleer of deze maatregel formeel is vastgelegd.",
        "Onderzoek minder ingrijpende alternatieven.",
        "Ga na of de cliënt hierbij betrokken is geweest."
      ]),
      confrontatie: pick([
        "Is dit echt noodzakelijk — of vooral praktisch?",
        "Wie wordt hier beschermd?",
        "Wat zou er gebeuren als je dit niet doet?"
      ])
    };
  }

  return {
    reflectie: pick([
      "Er lijkt iets niet in balans.",
      "Deze situatie vraagt om nadere reflectie.",
      "Hier zit mogelijk spanning onder de oppervlakte."
    ]),
    juridisch: pick([
      "Binnen de Wzd geldt: nee, tenzij.",
      "Beperkingen moeten goed onderbouwd zijn.",
      "De minst ingrijpende optie moet leidend zijn."
    ]),
    actie: pick([
      "Breng het doel van het handelen helder in kaart.",
      "Kijk of dit proportioneel is.",
      "Onderzoek alternatieven."
    ]),
    confrontatie: pick([
      "Wat probeer je hier op te lossen?",
      "Waar zit de echte spanning?",
      "Wat wringt hier voor jou?"
    ])
  };
}

app.get("/", (req, res) => {
  res.send("Patronus werkt");
});

app.post("/reflectie", (req, res) => {
  const situatie = req.body?.situatie || "";
  const a = analyse(situatie.toLowerCase());

  res.json({
    tekst: `
🔍 ${a.reflectie}

⚖️ ${a.juridisch}

🛠️ ${a.actie}

⚡ ${a.confrontatie}

📌 ${situatie}

✍️ Typ hieronder je reactie en klik op 'Verdiep verder'
`
  });
});

app.post("/vervolg", (req, res) => {
  const antwoord = req.body?.antwoord || "";

  res.json({
    tekst: `
🔁 Je reactie:
"${antwoord}"

🧠 Wat hier zichtbaar wordt:
Je benoemt een belangrijke spanning.

❓ Doorvragen:
- Wat maakt dit voor jou lastig?
- Wat zou een eerste kleine stap zijn?
- Wat heb je nodig?

👉 https://patronusgroep.nl/contact
`
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server draait");
});
