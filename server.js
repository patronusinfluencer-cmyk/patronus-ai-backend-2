import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Patronus backend draait");
});

// Reflectie (slimme gratis versie)
app.post("/reflectie", (req, res) => {
  const situatie = req.body?.situatie || "";

  const s = situatie.toLowerCase();

  let reflectie = "";
  let analyse = "";
  let dialoog = "";

  // 🔍 HERKENNING
  if (s.includes("telefoon") || s.includes("contact") || s.includes("meelezen")) {
    reflectie = "De situatie raakt direct aan autonomie en communicatievrijheid van de cliënt.";
    analyse = "Het beperken van communicatie of meekijken kan onder de Wzd vallen als onvrijwillige zorg. Dit vraagt om een duidelijke onderbouwing en toetsing aan proportionaliteit en subsidiariteit.";
    dialoog = "“Ik begrijp de zorgen. Tegelijk is communicatie een belangrijk recht. Hoe zorgen we dat veiligheid en autonomie in balans blijven?”";
  } 
  
  else if (s.includes("agressie") || s.includes("onveilig")) {
    reflectie = "Hier lijkt veiligheid een dominante factor te zijn in het handelen.";
    analyse = "Binnen de Wzd mag veiligheid nooit los gezien worden van rechten. Ook bij risico moet gezocht worden naar de minst ingrijpende maatregel.";
    dialoog = "“Wat maakt deze situatie onveilig, en welke minst ingrijpende stappen zijn mogelijk om dit te verbeteren?”";
  } 
  
  else if (s.includes("beperken") || s.includes("vast") || s.includes("tegenhouden")) {
    reflectie = "Er is sprake van ingrijpen in vrijheid van de cliënt.";
    analyse = "Dit kan onder onvrijwillige zorg vallen en moet voldoen aan de Wzd: zorgvuldig, tijdelijk en goed vastgelegd.";
    dialoog = "“Hoe is deze maatregel tot stand gekomen, en is de cliënt hierin voldoende gehoord?”";
  } 
  
  else {
    reflectie = "De situatie vraagt om een zorgvuldige afweging tussen zorg en autonomie.";
    analyse = "Binnen de Wzd is het uitgangspunt altijd: nee, tenzij. Dat betekent dat elke beperking goed onderbouwd en minimaal ingrijpend moet zijn.";
    dialoog = "“Wat maakt dat deze keuze nu gemaakt wordt, en zijn er minder ingrijpende alternatieven overwogen?”";
  }

  const tekst = `
🔍 Reflectie  
${reflectie}

⚖️ Analyse (Wzd)  
${analyse}

🗣️ Dialoog  
${dialoog}

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
