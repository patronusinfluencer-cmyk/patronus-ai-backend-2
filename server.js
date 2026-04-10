import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

const FILE = "gesprekken.json";

// 📂 laad bestaande gesprekken
function loadData() {
  if (!fs.existsSync(FILE)) return {};
  return JSON.parse(fs.readFileSync(FILE));
}

// 💾 opslaan
function saveData(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

// geheugen
let gesprekken = loadData();

// helper
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 🔍 analyse
function analyse(s) {
  if (s.includes("naar buiten")) {
    return {
      reflectie: "Hier wordt bewegingsvrijheid beperkt.",
      juridisch: "Dit kan onvrijwillige zorg zijn.",
      confrontatie: "Wie wordt hier beschermd?"
    };
  }
  return {
    reflectie: "Dit vraagt om zorgvuldige afweging.",
    juridisch: "Wzd: nee, tenzij.",
    confrontatie: "Wat wordt hier opgelost?"
  };
}

// 🌐 test
app.get("/", (req, res) => {
  res.send("Patronus Pro draait");
});

// 🧠 start
app.post("/reflectie", (req, res) => {
  const naam = req.body.naam || "onbekend";
  const situatie = req.body.situatie || "";
  const s = situatie.toLowerCase();

  gesprekken[naam] = {
    situatie,
    geschiedenis: []
  };

  saveData(gesprekken);

  const a = analyse(s);

  res.json({
    tekst: `
🔍 ${a.reflectie}

⚖️ ${a.juridisch}

⚡ ${a.confrontatie}

📌 ${situatie}

✍️ Reageer om verder te gaan.
`
  });
});

// 🔁 vervolg
app.post("/vervolg", (req, res) => {
  const naam = req.body.naam;
  const antwoord = req.body.antwoord;

  if (!gesprekken[naam]) {
    return res.json({ tekst: "Start eerst een gesprek." });
  }

  gesprekken[naam].geschiedenis.push(antwoord);
  saveData(gesprekken);

  res.json({
    tekst: `
🔁 Verdieping

"${antwoord}"

📚 Gesprek:
${gesprekken[naam].geschiedenis.join("\n")}

❓ Wat valt je op?
`
  });
});

// 📄 export
app.get("/export/:naam", (req, res) => {
  const naam = req.params.naam;

  if (!gesprekken[naam]) {
    return res.send("Geen gesprek gevonden.");
  }

  const tekst = `
Situatie:
${gesprekken[naam].situatie}

Gesprek:
${gesprekken[naam].geschiedenis.join("\n")}
`;

  res.setHeader("Content-Disposition", "attachment; filename=gesprek.txt");
  res.send(tekst);
});

// 📩 contact (simpele versie)
app.post("/contact", (req, res) => {
  const naam = req.body.naam;
  const bericht = req.body.bericht;

  console.log("CONTACT:", naam, bericht);

  res.json({
    tekst: "Bericht ontvangen. Patronus neemt contact op."
  });
});

// 🚀 server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server draait op poort " + PORT);
});
