
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require("./utils/database");
const cors = require('cors');

const User = require("./models/user");
const Message = require("./models/message");

const userRoutes = require("./routes/user");
const messageRoutes = require("./routes/message")

const corsOptions = {
    origin: '*'
};

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());

//Relationships
User.hasMany(Message);
Message.belongsTo(User);


app.use("/api/user",userRoutes);
app.use("/api/message",messageRoutes);




sequelize.sync().then(() => {
    app.listen(4000, () => {
      console.log('Server is running on port 4000');
    });
  });