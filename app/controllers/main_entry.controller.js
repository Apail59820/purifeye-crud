const db = require("../models");
const Entries = db.entries;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  //Validate request
  if (!req.body.type) {
    res.status(400).send({
      message: "Le contenu ne peut pas être vide!"
    });
    return;
  }

  const entry = {
    type: req.body.type,
    value: req.body.value,
  };

  Entries.create(entry)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue lors de la creation de l\'entrée."
      });
    });
};

exports.findAll = (req, res) => {
  const type = req.query.type;
  var condition = type ? { type: { [Op.like]: `%${type}%` } } : null;

  Entries.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue lors de la récéption des entrées."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Entries.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Impossible de trouver une entrée ayant pour id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur en essayant de trouver une entrée ayant pour id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Entries.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Entrée mise à jour avec succès."
        });
      } else {
        res.send({
          message: `Impossible de mettre à jour l'entrée ayant pour id=${id}. Peut être 'Entry' n'a pas été trouvée ou req.body est vide!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur en essayant de mettre à jour l'entrée ayant pour id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Entries.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Entrée supprimée avec succès!"
        });
      } else {
        res.send({
          message: `Impossible de supprimer l'entrée avec l'id=${id}. Peut être 'Entry' n'a pas été trouvée!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Impossible de supprimée l'entrée avec l'id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Entries.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Les entrées ont été supprimées avec succès` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue en tentant de supprimer les entrées."
      });
    });
};

exports.findAllCO2 = (req, res) => {
  Entries.findAll({ where: { type: "CO2" } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue en tentant de récupérer le contenu de la table."
      });
    });
};

exports.findLatestCO2 = (req, res) => {
  Entries.findOne({
    where: { type: "CO2" },
    order: [['createdAt', 'DESC']]  
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue en tentant de récupérer le contenu de la table."
      });
    });
};

exports.findAllTemp = (req, res) => {
  Entries.findAll({ where: { type: "TEMP" } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue en tentant de récupérer le contenu de la table."
      });
    });
};

exports.findLatestTemp = (req, res) => {
  Entries.findOne({
    where: { type: "TEMP" },
    order: [['createdAt', 'DESC']]  
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue en tentant de récupérer le contenu de la table."
      });
    });
};

exports.findAllHumidity= (req, res) => {
  Entries.findAll({ where: { type: "HUM" } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue en tentant de récupérer le contenu de la table."
      });
    });
};

exports.findLatestHumidity = (req, res) => {
  Entries.findOne({
    where: { type: "HUM" },
    order: [['createdAt', 'DESC']]  
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue en tentant de récupérer le contenu de la table."
      });
    });
};

exports.findAllNO2= (req, res) => {
  Entries.findAll({ where: { type: "NO2" } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue en tentant de récupérer le contenu de la table."
      });
    });
};

exports.findLatestNO2 = (req, res) => {
  Entries.findOne({
    where: { type: "NO2" },
    order: [['createdAt', 'DESC']]  
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue en tentant de récupérer le contenu de la table."
      });
    });
};


exports.findAllCOV= (req, res) => {
  Entries.findAll({ where: { type: "COV" } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue en tentant de récupérer le contenu de la table."
      });
    });
};

exports.findLatestCOV = (req, res) => {
  Entries.findOne({
    where: { type: "COV" },
    order: [['createdAt', 'DESC']]  
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue en tentant de récupérer le contenu de la table."
      });
    });
};


exports.findAllPM= (req, res) => {
  Entries.findAll({ where: { type: "PM" } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue en tentant de récupérer le contenu de la table."
      });
    });
};

exports.findAllPM1= (req, res) => {
  Entries.findAll({ where: { type: "PM1" } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue en tentant de récupérer le contenu de la table."
      });
    });
};

exports.findAllPM2p5= (req, res) => {
  Entries.findAll({ where: { type: "PM2p5" } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue en tentant de récupérer le contenu de la table."
      });
    });
};

exports.findAllPM10= (req, res) => {
  Entries.findAll({ where: { type: "PM10" } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue en tentant de récupérer le contenu de la table."
      });
    });
};
exports.findLatestPM = (req, res) => {
  Entries.findOne({
    where: { type: "PM" },
    order: [['createdAt', 'DESC']]  
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue en tentant de récupérer le contenu de la table."
      });
    });
};

exports.findLatestPM1 = (req, res) => {
  Entries.findOne({
    where: { type: "PM1" },
    order: [['createdAt', 'DESC']]  
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue en tentant de récupérer le contenu de la table."
      });
    });
};

exports.findLatestPM2p5 = (req, res) => {
  Entries.findOne({
    where: { type: "PM2p5" },
    order: [['createdAt', 'DESC']]  
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue en tentant de récupérer le contenu de la table."
      });
    });
};

exports.findLatestPM10 = (req, res) => {
  Entries.findOne({
    where: { type: "PM10" },
    order: [['createdAt', 'DESC']]  
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue en tentant de récupérer le contenu de la table."
      });
    });
};