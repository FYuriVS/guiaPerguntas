const Sequelize = require("sequelize");

const connection = new Sequelize("guiaperguntas", "root", "15081628", {
  host: "localhost",
  dialect: "mysql",
});
module.exports = connection;
