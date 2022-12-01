const express = require("express")
const router = express.Router()
const productosController = require("../controllers/productos.controller") // Aqui se hace el llamado de todas las funciones que tenemos definidas en "productos.controller.js"

router.post("/", productosController.create)                             
router.get("/", productosController.find)                                // <=========== Linea actualizada, aqui se realiza el llamado de la funcion (find) de "productos.controller.js"
router.get("/:id", productosController.findOne)                          // <=========== Linea actualizada, aqui se realiza el llamado de la funcion (findOne) de "productos.controller.js"                  
router.put("/:id", productosController.update)                           // <=========== Linea actualizada, aqui se realiza el llamado de la funcion (update) de "productos.controller.js"
router.delete("/:id", productosController.remove)                        // <=========== Linea actualizada, aqui se realiza el llamado de la funcion (delete) de "productos.controller.js"

module.exports = router