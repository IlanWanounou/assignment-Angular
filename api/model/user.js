let mongoose = require("mongoose");
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let UserSchema = Schema({
    name: String,
    password: String,
    isAdmin: Boolean,
});

UserSchema.plugin(aggregatePaginate);

module.exports = mongoose.model("User", UserSchema);
