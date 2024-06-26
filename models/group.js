const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Group = sequelize.define("group", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: { type: Sequelize.STRING, allowNull: false, unique: true },
});

module.exports = Group;