const router = require('express').Router()
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const User = require("../Model/User")
const Services = require("../Model/Services")

router.put("/api/account/update/:id", async (req, res) => {
    try {
        if (req.body.userId === req.params.id) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)

            const updateUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                {
                    new: true, // we put this just for postman
                }
            )

            res.status(200).json(updateUser)

        } else {
            res.status(401).json("Compte mis à jour avec succès ")
        }

    } catch (error) {
        res.status(500).json(error)
    }
})

//delete
router.delete("/api/account/delete/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        
        //delete all services of user and his account

        try {

            const user = await User.findById(req.params.id)
            try {
                await Services.deleteMany({ username: user.username })

                //only delete user account

                await User.findByIdAndDelete(req.params.id)
                res.status(200).json("L'utilisateur a été supprimé..")

            } catch (error) {
                res.status(500).json(error)
            }

        } catch (error) {
            res.status(404).json("nous n'avons pas trouvé cet utilisateur !")
        }
    } else {
        res.status(401).json("Vous ne pouvez qu'effacer votre compte !")
    }
})

//GET USERS

router.get("/api/account/load/:id", async(req,res)=> {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others} = user._doc
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
})




module.exports = router