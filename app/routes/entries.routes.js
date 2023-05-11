module.exports = app => {
  const entries = require("../controllers/main_entry.controller.js");

  var router = require("express").Router();
  router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    next();
  });

  router.post("/", entries.create);

  router.get("/", entries.findAll);

  router.get("/CO2", entries.findAllCO2);

  router.get("/temperature", entries.findAllTemp);

  router.get("/humidity", entries.findAllHumidity);

  router.get("/NO2", entries.findAllNO2);
  
  router.get("/COV", entries.findAllCOV);

  router.get("/PM", entries.findAllPM);


  router.get("/latest/CO2", entries.findLatestCO2);

  router.get("/latest/temperature", entries.findLatestTemp);

  router.get("/latest/humidity", entries.findLatestHumidity);

  router.get("/latest/NO2", entries.findLatestNO2);
  
  router.get("/latest/COV", entries.findLatestCOV);

  router.get("/latest/PM", entries.findLatestPM);


  router.get("/:id", entries.findOne);

  router.put("/:id", entries.update);

  router.delete("/:id", entries.delete);

  router.delete("/", entries.deleteAll);

  app.use('/api/entries', router);
};