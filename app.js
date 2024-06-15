
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require("./utils/database");
const cors = require('cors');

const userRoutes = require("./routes/user");

const corsOptions = {
    origin: '*'
};

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());


app.use("/user",userRoutes);


sequelize.sync().then(() => {
    app.listen(4000, () => {
      console.log('Server is running on port 4000');
    });
  });