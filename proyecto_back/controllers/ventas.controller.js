const Venta = require("../models/ventas.model");   // Aquí cargamos el modelo "ventas" para que este pueda ser usado en la gestion de datos (CRUD)
let response = {                                   // (Let) variable que requiere ser definida dentro de un loop para poder ser utilizada. 
    msg:"",
    exito: false        
}
// Funcion que permite crear un nueva venta dentro de la colección de ventas 
exports.create = function(req, res){                // Se crea una función para el modelo "ventas" con argumentos tipo(request) & tipo(response) que hace posible la gestión de la información.    
    let venta = new Venta({
        id_producto: req.body.id_producto,          // Se crea desde POSTMAN con "POST" 
        fecha: req.body.fecha,
        valor: req.body.valor,
        cantidad: req.body.cantidad,
        id_usuario: req.body.id_usuario
    })
// Validamos el guardado de los datos de la venta si se realizó exitosamente o por el contrario presentó un error.
    venta.save(function(err){                        
        if(err){
            console.error(err),
            response.exito = false,
            response.msg = "Error al guardar venta"
            res.json(response)
            return;
        }
        response.exito = true,
        response.msg = "La venta se guardo correctamente"
        res.json(response)
    })
}
// Función que trae todos los datos de la colección de ventas ********************************************************************
exports.find = function(req,res){                                // Se llama desde POSTMAN con "GET"     
    Venta.find(function(err, ventas){
        res.json(ventas)
    })                                                           // Función llamada desde "productos.router.js" *********************
}
// Función que trae los datos de una venta especifica de la tabla ventas por medio del id de la venta. ***************************
exports.findOne = function(req,res){                                     
    Venta.findOne({_id: req.params.id},function(err, venta){      // Se llama desde POSTMAN con "GET" mediante la "id" 
        res.json(venta)
    })
}
// Función que actualiza los datos de una venta en especifico por medio de la id de la tabla venta ****************************
exports.update = function(req,res){                                     
    let venta = {
        id_venta: req.body.id_venta,                              // Se actualiza desde POSTMAN mediante la función "PUT" a manera general 
        id_producto: req.body.id_producto,
        fecha: req.body.fecha,
        valor: req.body.valor,
        cantidad: req.body.cantidad,
        id_usuario: req.body.id_usuario
    }

    Venta.findByIdAndUpdate(req.params.id, {$set: venta}, function(err){
        if(err){
            console.error(err), 
            response.exito = false,                                // Se actualiza desde POSTMAN mediante la función "PUT" y el id del item a actualizar 
            response.msg = "Error al modificar la venta"
            res.json(response)
            return;
        }

        response.exito = true,
        response.msg = "La venta se modifico correctamente"
        res.json(response)
    })           
}
// Fin de la función Update se valida si hay error al modificar los datos de una venta o si por el contrario se realizó la actualización exitosamente.

exports.remove = function(req,res){
    Venta.findByIdAndRemove({_id: req.params.id}, function(err){
        if(err){
            console.error(err), 
            response.exito = false,
            response.msg = "Error al eliminar venta"
            res.json(response)
            return;
        }

        response.exito = true,
        response.msg = "La venta fue eliminada correctamente"
        res.json(response)
    })
}

// Función que relaciona la venta de un producto con su usuario comprador 
const ventasProductosU = async () => {
    const resultado = await Ventas.aggregate(
        [
            {
                $lookup:
                {
                    from: "usuarios",
                    localField: "id_usuario",
                    foreignField: "id_usuario",
                    as: "ventaUsuario"
                }    
              
            }
        ]
    )
   console.log('***** El resultado es: ********', resultado);
}
 