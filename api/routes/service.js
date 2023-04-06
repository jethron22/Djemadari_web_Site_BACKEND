const router = require('express').Router()
const User = require("../Model/User")
const Services = require("../Model/Services")


//CREATE SERVICES

router.post("/services", async (req, res) => {
   const newPost = new Services(req.body);
   try {
    const savedPost = await newPost.save()
    res.status(200).json(savedPost)
    
   } catch (error) {   
    res.status(500).json(error)
    
   }
})

//UPDATE SERVICES

router.post("/services", async (req, res) => {
    const newPost = new Services(req.body);
    try {
     const savedPost = await newPost.save()
     res.status(200).json(savedPost)
     
    } catch (error) {   
     res.status(500).json(error)
     
    }
 })

//DELETE SERVICES

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

//GET SERVICES

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