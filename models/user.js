var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var jugadorSchema = Schema({
    nombre: String,
    apellido: String,
    equipo: String,
    edad: Number,
});

module.exports = mongoose.model("Jugador", jugadorSchema);