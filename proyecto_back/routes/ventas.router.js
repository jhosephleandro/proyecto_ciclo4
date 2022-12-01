const express = require("express")
const router = express.Router()
const ventasController = require("../controllers/ventas.controller")  // Aqui se hace el llamado de todas las funciones que tenemos definidas en "ventas.controller.js"

router.post("/", ventasController.create)                             
router.get("/", ventasController.find)                                // <=========== Aqui se realiza el llamado de la funcion (find) de "ventas.controller.js"
router.get("/:id", ventasController.findOne)                          // <=========== Aqui se realiza el llamado de la funcion (findOne) de "ventas.controller.js"                  
router.put("/:id", ventasController.update)                           // <=========== Aqui se realiza el llamado de la funcion (update) de "ventas.controller.js"
router.delete("/:id", ventasController.remove)                        // <=========== Aqui se realiza el llamado de la funcion (delete) de "ventas.controller.js"

module.exports = router