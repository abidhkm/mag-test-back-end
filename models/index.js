const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model")(sequelize, Sequelize);
db.login = require("./login.model")(sequelize, Sequelize);
db.company = require("./company.model")(sequelize, Sequelize);
db.company_admin = require("./company_admin.model")(sequelize, Sequelize);
db.relationship = require("./relationship.model")(sequelize, Sequelize);
db.user_company = require("./user_company.model")(sequelize, Sequelize);

// db.user.hasOne(db.login)

module.exports = db;