const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoutes = require("./routes/auth")
const {connecter} = require("../api/db/database")
const authUsers = require("./routes/user")
dotenv.config()
app.use(express.json())

connecter()

app.use('/auth', authRoutes)
app.use('/authenticate', authRoutes)
app.use('/users', authUsers)

app.listen("5010", ()=> {
    console.log("backend running")
})