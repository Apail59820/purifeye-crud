const express = require("express");
const cors = require("cors");

const app = express();
const { exec } = require('child_process');

var corsOptions = {
  origin: ["http://localhost:8081", "http://localhost"]
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

app.get('/interface/historique', (req, res) => {
  exec('php interface/index.php', (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur lors de l'exécution de PHP : ${stderr}`);
      return res.status(500).send('Erreur du serveur');
    }
    res.send(stdout);
  });
});

db.sequelize.sync({ force: false } /* drop db : development */)
  .then(() => {
    console.log("Base de donnée synchonisée..");
  })
  .catch((err) => {
    console.log("Impossible de synchoniser la base de donnée : " + err.message);
});

require("./app/routes/entries.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
