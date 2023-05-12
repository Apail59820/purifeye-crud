module.exports = {
  HOST: "eu-cdbr-west-03.cleardb.net",
  USER: "b5b39d52f466ad",
  PASSWORD: "eab3317c",
  DB: "heroku_56366cbee5ccd56",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
