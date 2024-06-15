const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  email: { 
    type: Sequelize.STRING, 
    allowNull: false, 
    unique: true, 
    validate: {
      isEmail: true 
    }
  },
  phone: { type: Sequelize.STRING, allowNull: false, unique: true },
  password: { type: Sequelize.STRING, allowNull: false },
});

module.exports = User;