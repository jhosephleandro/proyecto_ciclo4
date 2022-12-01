const mongoose = require("mongoose");                               // Traemos el conector (mongoose) para poder usar sus metodos.
const Schema = mongoose.Schema;

// Construcción del Schema para "productos" orden (1)
const ProductosSchema = new Schema({                                      
    marca:{type: String, require: true, max:60},
    modelo:{type: String, require: true, max:60},
    nombre:{type: String, require: true, max:60},
    precio:{type: Number, require: true, max:10000000},
    descripcion:{type: String, require: false, max:70},
    stock:{type: Number, require: true, max:40},
    activo:{type: String, require: false, max:10},
    categoria:{type: String, require: false, max:60},
});

module.exports = mongoose.model("productos", ProductosSchema);      // Creamos el modelo para que este Schema pueda ser utilizado en "controllers"