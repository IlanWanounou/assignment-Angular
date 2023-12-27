let User = require('../model/user');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
let config = require('../config');


function isAdmin(req, res) {
  console.log("isAdmin");
  let token = req.headers["x-access-token"];
  let user = jwt.verify(token, config.secret);
  User.findOne({ _id: user.id }, (err, user) => {
    if (err) return res.status(500).send("Erreur serveur.");
    if (!user) return res.status(404).send("Utilisateur non trouvé.");
    res.status(200).send({ isAdmin: user.isAdmin });
  });
}

function postUser(req, res){
    let name = req.body.name;
    let password = req.body.password;

    User.findOne({name: name, password: password}, async (err, user) => {
        if(err){res.send(err)}       
       if(user){
            let token = jwt.sign({id :user._id}, config.secret, {expiresIn: 86400});
           res.status(200).send({ auth: true, token: token });
        } else {
           res.status(200).send({ auth: false, message: "Connexion échouée" });
        }
    })
}




module.exports = { postUser, isAdmin };
