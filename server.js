app.post("/reflectie", (req, res) => {
  const situatie = req.body.situatie || "Geen situatie opgegeven";

  const tekst = `
🔍 Reflectie  
De situatie die je beschrijft laat een spanningsveld zien tussen bescherming en autonomie. Het handelen lijkt ingegeven door zorg, maar roept vragen op over de positie van de cliënt.

⚖️ Analyse (Wzd)  
Binnen de Wet zorg en dwang geldt het uitgangspunt: nee, tenzij. Beperkingen zoals controle van communicatie of beperking van contact kunnen vallen onder onvrijwillige zorg. Dit vraagt om een zorgvuldige afweging van proportionaliteit, subsidiariteit en vooral: is de cliënt gehoord en betrokken?

🗣️ Dialoog  
Een mogelijke ingang in gesprek:
"Ik merk dat er zorgen zijn over veiligheid. Tegelijk zie ik dat dit invloed heeft op de autonomie van de cliënt. Hoe kunnen we samen kijken naar een oplossing die zowel veiligheid als eigen regie respecteert?"

📌 Jouw situatie:  
${situatie}
`;

  res.json({ tekst });
});
