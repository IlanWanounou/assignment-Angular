let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let assignment = require('./routes/assignments');
let user = require('./routes/user');
let matiere = require('./routes/matiere');

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('debug', true);

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
//  "mongodb+srv://wanounouilan:pRPZIwFadF9Zdeyy@angularmiage.zmh9zia.mongodb/assignments?retryWrites=true&w=majority";
const uri =
  "mongodb+srv://wanounouilan:pRPZIwFadF9Zdeyy@angularmiage.zmh9zia.mongodb.net/assignments?retryWrites=true&w=majority";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false
};

mongoose.connect(uri, options)
  .then(() => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log("vérifiez with http://localhost:8010/api/assignments que cela fonctionne")
    },
    err => {
      console.log('Erreur de connexion: ', err);
    });

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

let cors = require('cors');
app.use(cors());


// Pour les formulaires
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;

// les routes
const prefix = '/api';

app.use("/uploads", express.static("uploads"));

app.route(prefix + '/assignments')
  .get(assignment.getAssignments);

  app.route(prefix + "/assignments/count")
  .get(assignment.getAssignmentsCount);

app.route(prefix + '/assignments/:id')
  .get(assignment.getAssignment)
  .delete(assignment.deleteAssignment);


app.route(prefix + '/assignments')
  .post(assignment.postAssignment)
  .put(assignment.updateAssignment);
  

  app.route(prefix + '/matieres')
  .get(matiere.getMatieres);


app.route(prefix + "/user/isAdmin")
  .get(user.isAdmin);

app.route(prefix + '/user')
  .post(user.postUser);

assignment.initDb();



// On démarre le serveur
app.listen(port, () => {
  console.log("Serveur démarré sur http://localhost:" + port);
});


module.exports = app;


