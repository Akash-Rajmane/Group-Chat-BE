const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Message = sequelize.define("message", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  content: { type: Sequelize.TEXT, allowNull: false },
});

module.exports = Message;