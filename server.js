import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🔁 random helper
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 🔍 Test route
app.get("/", (req, res) => {
  res.send("Patronus Pro draait");
});

// 🧠 Reflectie-engine
app.post("/reflectie", (req, res) => {
  const situatie = req.body?.situatie || "";
  const s = situatie.toLowerCase();

  // 🔍 variaties
  const reflectiesAlgemeen = [
    "De situatie laat een spanningsveld zien tussen zorg en autonomie.",
    "Er lijkt sprake van een complexe afweging tussen bescherming en vrijheid.",
    "De casus raakt aan de kern van professioneel handelen binnen de zorg."
  ];

  const reflectiesAutonomie = [
    "De autonomie van de cliënt lijkt onder druk te staan.",
    "Er wordt mogelijk ingegrepen in zelfbeschikking.",
    "De regie van de cliënt lijkt beperkt."
  ];

  const reflectiesVeiligheid = [
    "Veiligheid lijkt leidend in het handelen.",
    "De situatie wordt gestuurd door risico en spanning.",
    "Bescherming lijkt prioriteit te krijgen boven vrijheid."
  ];

  const analyseWzd = [
    "Binnen de Wzd geldt het uitgangspunt ‘nee, tenzij’. Elke beperking moet goed onderbouwd zijn.",
    "Onvrijwillige zorg vraagt om proportionaliteit, subsidiariteit en zorgvuldige afweging.",
    "Beperkingen mogen alleen als er geen minder ingrijpende alternatieven zijn."
  ];

  const analyseVerdieping = [
    "Het is belangrijk te kijken of de cliënt daadwerkelijk betrokken is bij deze beslissing.",
    "De vraag is of deze maatregel tijdelijk en toetsbaar is ingericht.",
    "Ook speelt de vraag of dit handelen voortkomt uit zorg of uit systeemdruk."
  ];

  const perspectiefClient = [
    "Vanuit de cliënt kan dit voelen als controle of verlies van vrijheid.",
    "De cliënt kan dit ervaren als onvoldoende gehoord worden.",
    "Dit kan invloed hebben op vertrouwen en veiligheid van de cliënt."
  ];

  const perspectiefProfessional = [
    "Voor professionals kan dit voortkomen uit zorgen en verantwoordelijkheid.",
    "Het handelen kan ingegeven zijn door druk om veiligheid te waarborgen.",
    "Hier speelt vaak de spanning tussen richtlijnen en praktijk."
  ];

  const dialoogOpen = [
    "“Wat maakt dat deze keuze nu gemaakt wordt?”",
    "“Wat is hier precies het risico dat we proberen te voorkomen?”",
    "“Welke alternatieven zijn overwogen?”"
  ];

  const dialoogVerdieping = [
    "“Hoe is de cliënt betrokken bij deze beslissing?”",
    "“Wat zou een minder ingrijpende optie kunnen zijn?”",
    "“Wat hebben jullie nodig om dit anders aan te pakken?”"
  ];

  const tegenvragen = [
    "Wat zou er gebeuren als je niets zou veranderen?",
    "Waar zit jouw twijfel precies in deze situatie?",
    "Wat voelt voor jou hier niet helemaal kloppend?"
  ];

  // 🧠 logica
  let reflectie = pick(reflectiesAlgemeen);
  let extraReflectie = "";
  let analyse = pick(analyseWzd);
  let verdieping = pick(analyseVerdieping);
  let client = pick(perspectiefClient);
  let professional = pick(perspectiefProfessional);
  let dialoog = pick(dialoogOpen);
  let dialoog2 = pick(dialoogVerdieping);
  let vraag = pick(tegenvragen);

  if (s.includes("telefoon") || s.includes("contact") || s.includes("meelezen")) {
    extraReflectie = pick(reflectiesAutonomie);
  } else if (s.includes("agressie") || s.includes("onveilig")) {
    extraReflectie = pick(reflectiesVeiligheid);
  } else if (s.includes("beperken") || s.includes("vast") || s.includes("tegenhouden")) {
    extraReflectie = pick(reflectiesAutonomie);
  } else {
    extraReflectie = pick(reflectiesAlgemeen);
  }

  const tekst = `
🔍 Reflectie  
${reflectie}  
${extraReflectie}

⚖️ Analyse (Wzd)  
${analyse}  
${verdieping}

👤 Perspectief cliënt  
${client}

👥 Perspectief professional  
${professional}

🗣️ Dialoog  
${dialoog}  
${dialoog2}

❓ Verdiepende vraag  
${vraag}

📌 Jouw situatie:  
${situatie}
`;

  res.json({ tekst });
});

// 🌐 Render poort
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server draait op poort " + PORT);
});
