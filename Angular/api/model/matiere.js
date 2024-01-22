let mongoose = require("mongoose");
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let MatiereSchema = Schema({
  name: String,
  photoProf: String,
  photoMatiere: String,
});

MatiereSchema.plugin(aggregatePaginate);

module.exports = mongoose.model("matiere", MatiereSchema);
