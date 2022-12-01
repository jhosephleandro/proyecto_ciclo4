const mongoose = require("mongoose");                                   // Traemos el conector ("mongoose") para poder usar sus metodos.
const Schema = mongoose.Schema;

// Construcción del Schema para "usuarios" orden (1)
const UsuariosSchema = new Schema({ 
    usuario:{type: String, required: true, max:60},
    pass:{type: String, required: true, max:128},                       // 128 caracteres maximos permitidos para password.
    id_usuario:{type: mongoose.Types.ObjectId},                         // Valor autoincrementable (Types.ObjectId) ========> Key                                  
    numeroId:{type: Number, require: true, max:100000000},              // Numero de identificación de usuario.
    nombre:{type: String, require: true, max:60},
    apellido:{type: String, require: true, max:40},
    mail:{type: String, require: false, max:70},
    telefono:{type: String, require: true, max:15},
    direccion:{type: String, require: false, max:150},
});
// Creamos el modelo usuarios a partir del Schema definido de usuarios
module.exports = mongoose.model("usuarios", UsuariosSchema);        