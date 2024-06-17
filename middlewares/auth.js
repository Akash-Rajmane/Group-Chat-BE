const jwt = require("jsonwebtoken");
const User = require('../models/user');
require('dotenv').config();

exports.checkAuth = async function (req, res, next) {
  if (!req.headers["authorization"]){
    const unauthorizedError = new Error("Unauthorized");
    unauthorizedError.status = 401;
    return next(unauthorizedError);
  }

  const bearerToken = req.headers["authorization"];
  const token = bearerToken.split(" ")[1];
  
  const {id} = jwt.verify(token, `${process.env.JWT_SECRET}`);

  const user = await User.findByPk(id);
  if (user) {
    req.user = user;
    //console.log(user);
    next();
  } else {
      throw new Error('User not Found');
  }
}

