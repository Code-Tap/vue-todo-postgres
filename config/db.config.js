module.exports = {
    HOST: "localhost",
    USER: "actix",
    PASSWORD: "actix",
    DB: "actix",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };