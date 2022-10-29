const path = require("path");

//EXPRESS
const express = require("express");
const csrf = require("csurf");
const expressSession = require("express-session");

const createSessionConfig = require("./config/session");
const csrfMiddle = require("./middle/csrf");
const errorMiddle = require("./middle/error");
const checkAuthMiddle = require("./middle/checkAuth");
const protectRoutesMiddle = require("./middle/protectRoutes");

//DATABASE
const db = require("./data/database");

//ROUTES
const baseRouter = require("./routes/base.routes");
const authRouter = require("./routes/auth.routes");
const productsRouter = require("./routes/products.routes");
const adminRouter = require("./routes/admin.routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"));

app.use(express.static("public"));
app.use("/products/assets", express.static("productData"));
app.use(express.urlencoded({ extended: false }));

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(csrf());
app.use(csrfMiddle);

app.use(checkAuthMiddle);

// USE ROUTER
app.use(baseRouter);
app.use(authRouter);
app.use(productsRouter);
app.use(protectRoutesMiddle);
app.use("/admin", adminRouter);

app.use(errorMiddle); // error route

db.connectToDB()
  .then(function () {
    app.listen(7180);
  })
  .catch(function (error) {
    console.log("FAILED TO CONNECT TO DB");
    console.log(error);
  });
