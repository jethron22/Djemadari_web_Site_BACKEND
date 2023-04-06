const router = require('express').Router()
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const User = require("../Model/User")

//REGISTER

router.post("/register", async (req, res)=> {
    try {

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(req.body.password, salt)

        const newUser = new User({
            username : req.body.username,
            email : req.body.email,
            password : hashedPass,
            phone: req.body.phone
        })

        const user = await newUser.save()
        res.status(200).json(user)
        
    } catch (error) {
        res.status(500).json(error)
    }
})

//LOGIN

router.post("/login", async(req, res)=> {
    try {
        const user = await User.findOne({username: req.body.username})

        //if no user

        if(!user) {
            return res.status(400).json("Cet utilisateur n'existe pas !")
        }

        // if same user we compare password

        const validate = await bcrypt.compare(req.body.password, user.password)

        // if no validate 

        if(!validate) {
           return res.status(400).json("Mot de passe incorrectes ! Réessayez...")
        } 

        const { password, ...other} = user._doc
        res.status(200).json(other)
    } catch (error) {
        res.status(500).json(error) 
    }
})

module.exports = router