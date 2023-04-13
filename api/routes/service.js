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

router.put("/update/djema/:id", async (req, res) => {
    try {
        const service = await Services.findById(req.params.id);
        if (service.userName === req.body.userName)
            try {
                const updatedService = await Services.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
                }, { new: true });
                res.status(200).json(updatedService)
            } catch (error) {
                res.status(500).json(error)
            } else {
            res.status(401).json("Vous ne pouvez que mettre à jour votre djema")
        }
    }
    catch (error) {
        res.status(500).json(error)
    }
})

//DELETE SERVICES

router.delete("/djema/delete/:id", async(req, res)=> {
  try {
    const Service = await Services.findById(req.params.id);
    if(Service.userName === req.params.username) {
      try {
        await Service.delete();
        return res.status(200).json(Service)
      } catch (error) {
        res.status(500).json(error)
      }
    }else {
      res.status(401).json("Veuillez seulement supprimer votre djema")
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

//GET SERVICES

router.get("/api/account/load/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
})




module.exports = router