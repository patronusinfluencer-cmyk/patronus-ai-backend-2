import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// helper voor random keuze
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Test route
app.get("/", (req, res) => {
  res.send("Patronus backend draait");
});

// Reflectie
app.post("/reflectie", (req, res) => {
  const situatie = req.body?.situatie || "";
  const s = situatie.toLowerCase();

  let reflectieOpties = [];
  let analyseOpties = [];
  let dialoogOpties = [];

  // 🔍 HERKENNING

  if (s.includes("telefoon") || s.includes("contact") || s.includes("meelezen")) {
    reflectieOpties = [
      "Deze situatie raakt direct aan autonomie en communicatievrijheid.",
      "Hier lijkt bescherming te botsen met het recht op communicatie.",
      "De cliënt lijkt beperkt te worden in sociale interactie."
    ];

    analyseOpties = [
      "Binnen de Wzd kan dit vallen onder onvrijwillige zorg, wat zorgvuldig moet worden afgewogen.",
      "Beperkingen in communicatie vragen om toetsing aan proportionaliteit en subsidiariteit.",
      "Dit raakt direct aan het uitgangspunt ‘nee, tenzij’ binnen de Wzd."
    ];

    dialoogOpties = [
      "“Hoe zorgen we dat veiligheid niet ten koste gaat van communicatievrijheid?”",
      "“Wat maakt dat deze beperking nodig is, en zijn er alternatieven?”",
      "“Hoe kunnen we de cliënt meer regie geven binnen deze situatie?”"
    ];
  } 
  
  else if (s.includes("agressie") || s.includes("onveilig")) {
    reflectieOpties = [
      "Veiligheid lijkt hier de boventoon te voeren.",
      "De situatie wordt sterk gestuurd door risico en spanning.",
      "Er lijkt sprake van escalatie of dreiging."
    ];

    analyseOpties = [
      "Binnen de Wzd blijft ook bij risico het uitgangspunt: minst ingrijpende maatregel.",
      "Veiligheid rechtvaardigt niet automatisch zware beperkingen.",
      "Het vraagt om balans tussen bescherming en rechten van de cliënt."
    ];

    dialoogOpties = [
      "“Wat maakt deze situatie onveilig, en wat is echt nodig?”",
      "“Welke lichtere interventies zijn mogelijk?”",
      "“Hoe betrekken we de cliënt in het herstellen van veiligheid?”"
    ];
  } 
  
  else if (s.includes("beperken") || s.includes("vast") || s.includes("tegenhouden")) {
    reflectieOpties = [
      "Er wordt ingegrepen in de vrijheid van de cliënt.",
      "De situatie laat duidelijke beperking zien.",
      "Er lijkt sprake van controle of begrenzing."
    ];

    analyseOpties = [
      "Dit kan onder onvrijwillige zorg vallen en moet voldoen aan de Wzd.",
      "Elke beperking moet zorgvuldig onderbouwd en tijdelijk zijn.",
      "Het vraagt om duidelijke verslaglegging en afweging."
    ];

    dialoogOpties = [
      "“Hoe is deze maatregel tot stand gekomen?”",
      "“Is de cliënt voldoende gehoord in dit proces?”",
      "“Welke alternatieven zijn onderzocht?”"
    ];
  } 
  
  else {
    reflectieOpties = [
      "De situatie vraagt om een zorgvuldige afweging.",
      "Hier lijkt een spanningsveld tussen zorg en autonomie.",
      "De casus vraagt om reflectie op handelen."
    ];

    analyseOpties = [
      "Binnen de Wzd geldt: nee, tenzij.",
      "Beperkingen moeten altijd goed onderbouwd zijn.",
      "De minst ingrijpende optie moet leidend zijn."
    ];

    dialoogOpties = [
      "“Wat maakt deze keuze noodzakelijk?”",
      "“Zijn er minder ingrijpende alternatieven?”",
      "“Hoe betrekken we de cliënt meer?”"
    ];
  }

  const tekst = `
🔍 Reflectie  
${pick(reflectieOpties)}

⚖️ Analyse (Wzd)  
${pick(analyseOpties)}

🗣️ Dialoog  
${pick(dialoogOpties)}

📌 Jouw situatie:  
${situatie}
`;

  res.json({ tekst });
});

// Render poort
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server draait op poort " + PORT);
});
