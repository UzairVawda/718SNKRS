const express = require('express');
const app = express();

//ROUTES
const authRouter = require('./routes/auth.routes')

// USE ROUTER
app.use(authRouter)


app.listen(7180);
