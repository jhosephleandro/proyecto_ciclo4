const express = require("express")
const router = express.Router()
const usuariosController = require("../controllers/usuarios.controller") // Aqui se hace el llamado de todas las funciones que tenemos definidas en "usuarios.controller.js"

router.post("/login", usuariosController.login)                         // <=========== Logeo de usuario
router.post("/", usuariosController.create)                             // <=========== Creación de nuevo usuario 
router.get("/", usuariosController.find)                                // <=========== Linea actualizada, aqui se realiza el llamado de la funcion (find) de "usuarios.controller.js"
router.get("/:id", usuariosController.findOne)                          // <=========== Linea actualizada, aqui se realiza el llamado de la funcion (findOne) de "usuarios.controller.js"                  
router.put("/:id", usuariosController.update)                           // <=========== Linea actualizada, aqui se realiza el llamado de la funcion (update) de "usuarios.controller.js"
router.delete("/:id", usuariosController.remove)                        // <=========== Linea actualizada, aqui se realiza el llamado de la funcion (delete) de "usuarios.controller.js"

module.exports = router