const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require('path');
const cors = require("cors");

//parse application json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//routes
var routesAdmin = require("../routes/admin");
routesAdmin(app);

var routesInstance = require("../routes/instance");
routesInstance(app);

var routesUser = require("../routes/user");
routesUser(app);

app.use('/images/profile', express.static(path.join(__dirname, 'images/profile')));

app.listen(5000, () => {
  console.log(`Server started on port`);
});
