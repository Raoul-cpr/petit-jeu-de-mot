const express = require('express');
const app = express();
const PORT = 3000;
const mysql = require('mysql2');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());

app.use(express.static('public'));

const connexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jeu',
    password: ''
});

//connexion: si le nom d'utilisateur existe, il se connecte si non on ajoute le nouveau nom d'utilisateur

app.post('/api/connexion', (req, res) => {
    var username = req.body.username;

        
      connexion.query("SELECT * FROM users WHERE username = ?",[username], (err, result) => {
            if (err) {
                console.log(err);
            } else {
               // return result.length;
                if (result.length>0) {
                    res.status(200).send(username);
                    console.log("Verification de l'existance de l'utilisateur");
                }
                else {
                    connexion.query('INSERT INTO users (username) VALUES (?)', [username], (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.status(200).send(username);
                        }
                    })
                    console.log("L'utilisateur n'existe pas, on l'ajoute");
                }
            }
         }); 

});


//mise a jour du score

app.post('/api/update_score', (req, res)=>{
    let score = req.body.score;
    let username = req.body.username;
    connexion.query(`UPDATE users SET score = ? WHERE username = ?`,[score,username], (err, result)=>{
        console.log("On entre dans l'API")
        if(err){
            console.log(err);
            console.log("Il y'a une erreur")
        }else{
            res.status(200).send(result);
            console.log("Ca fonctiionne")
        }
    })
}); 


//obtenir le score et le nom d'utilisateur des 10 meilleurs joueurs

app.get("/api/get_score", (req, res)=>{
    connexion.query("SELECT username, score FROM users ORDER BY score DESC LIMIT 10", (err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.status(200).send(result);
            console.log(result);
        }
    })
});

app.listen(PORT, function () {
    console.log('Le serveur a demarré sur le port', PORT);
})