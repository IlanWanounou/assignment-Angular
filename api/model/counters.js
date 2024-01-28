let mongoose = require("mongoose");
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let CounterSchema = Schema({
  _id: String ,
  seq: Number,
});

CounterSchema.plugin(aggregatePaginate);

module.exports = mongoose.model("Counter", CounterSchema);
