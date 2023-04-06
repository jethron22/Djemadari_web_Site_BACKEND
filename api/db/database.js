const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const express = require('express');

const connecter =()=> {
    mongoose.connect("mongodb+srv://Jethron:A9G2Jugho82Cq17v@cluster0.e6pkmtn.mongodb.net/FreeworkeyDB?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,   
    })
        .then(result => {
            console.log("Connexion à la base de donnée FreeworkeyBD réussi..!")  
        })
        .catch(error => {
            console.log("Erreur lors de la connexion à la base de donnée FreeworkeyDB");
            process.exit(-1)
        }
    )}
    module.exports = {connecter};