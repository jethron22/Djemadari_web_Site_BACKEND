const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoutes = require("./routes/auth")
const {connecter} = require("../api/db/database")
const authUsers = require("./routes/user")
const servicesRoutes = require("../api/routes/service")
dotenv.config()
app.use(express.json())

connecter()

app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATH,OPTIONS');
    next();

})

app.use('/auth', authRoutes)
app.use('/authenticate', authRoutes)
app.use('/users', authUsers)
app.use('/api/load', servicesRoutes)


app.listen("5013", ()=> {
    console.log("backend running")
})