let Matiere = require("../model/matiere");


function getMatieres(req, res) {
  let assignmentId = req.params.id;
  Matiere.find((err, matiere) => {
    if (err) {
      res.send(err);
    }
      res.json(matiere);
  });
}


// function getMatiere(req, res) {
//   let matiereId = req.params.id;
//   Matiere.findOne({ id: matiereId }, (err, matiere) => {
//     if (err) {
//       res.send(err);
//     }
//     res.json(matiere);
//   });
// }


module.exports = { getMatieres };
