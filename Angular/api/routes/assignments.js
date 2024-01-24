let Assignment = require("../model/assignment");
let Matiere = require("../model/matiere");

// Récupérer tous les assignments (GET)
const getAssignments = (req, res) => {
  const aggregateQuery = Assignment.aggregate();
  if (req.query.search) {
    aggregateQuery.match({
      $or: [
        { nom: { $regex: new RegExp(req.query.search, "i") } },
  
      ],
    });
  }

  Assignment.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    },
    (err, assignments) => {
      if (err) {
        res.send(err);
      }
      res.send(assignments);
    }
  );
};


// Récupérer un assignment par son id (GET)
function getAssignment(req, res) {
  let assignmentId = req.params.id;

  Assignment.findOne({ id: assignmentId }, (err, assignment) => {
    if (err) {
      res.send(err);
    }
    Matiere.populate(assignment, { path: "matiere" }, (err, assignment) => {
      if (err) {
        res.send(err);
      }
      res.json(assignment);
    });
  });
}

// Ajout d'un assignment (POST)
async function postAssignment(req, res) {
    // MongoDB doest not auto increment the id field like SQL database, so we have to do it manually.
    let assignment = new Assignment();
    const count = await Assignment.countDocuments({});
    assignment.id = count + 1;
    assignment.nom = req.body.nom;
    assignment.dateDeRendu = req.body.dateDeRendu;
    assignment.rendu = req.body.rendu;
    assignment.auteur = req.body.auteur;
    assignment.remarques = req.body.remarques;

    console.log("POST assignment reçu :");
    console.log(assignment)

    assignment.save( (err) => {
        if(err){
            res.send('cant post assignment ', err);
        }
        res.json({ message: `${assignment.nom} saved!`})
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: 'updated'})
        }

      // console.log('updated ', assignment)
    });

}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {

    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${assignment.nom} deleted`});
    })
}

function getAssignmentsCount(req, res) {
    Assignment.count({}, (err, count) => {
        if(err) {
            res.send(err);
        }
        res.json({count});
    })
  }

function initDb() {
  Assignment.count({}, (err, count) => {
    if (err) {
      console.log("error: ", err);
    }
    if (count === 0) {
      var assignments = require("../utils/data.json");

      assignments = assignments.map((assignment) => {
        assignment.dateDeRendu = assignment.dateDeRendu.replace(/"/g, "");
        assignment.dateDeRendu = Date(assignment.dateDeRendu);
        if (assignment.rendu) {
          assignment.note = Math.floor(Math.random() * 20);
        } else {
          assignment.note = null;
        }
        return assignment;
      });

      Assignment.insertMany(assignments, (err, insertedAssignments) => {
        if (err) {
          console.log("error: ", err);
        }
        console.log("assignments added: ", insertedAssignments);
      });
    }
  });
}

module.exports = {
  getAssignments,
  postAssignment,
  getAssignment,
  updateAssignment,
  deleteAssignment,
  getAssignmentsCount,
  initDb,
};
