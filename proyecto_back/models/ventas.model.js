const mongoose = require("mongoose");                               // Traemos el conector ("mongoose") para poder usar sus metodos.
const Schema = mongoose.Schema;                                     // Creamos una constante Schema a partir  de los metodos de mongoose

// Construcción del Schema para "ventas" orden (1)  
const VentasSchema = new Schema({                                   // Modelo "ventas" definido                              
    producto:[{type: mongoose.Types.ObjectId, ref: 'productos', require: true}],                    // Valor autoincrementable de tipo (Types.ObjectId) < ============== Key
    fecha:{type: String, require: true, max:20},
    valor:{type: Number, require: true, max:10000000},
    cantidad:{type: Number, require: true, max:99},
    usuario:[{type: mongoose.Types.ObjectId, ref: 'usuarios', require: true}]                      // Valor autoincrementable de tipo (Types.ObjectId) < ============== Key
});

module.exports = mongoose.model("ventas", VentasSchema);            // Creamos el modelo para que este Schema pueda ser utilizado en "controllers"