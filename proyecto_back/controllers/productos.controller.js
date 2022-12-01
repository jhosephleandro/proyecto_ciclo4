const Producto = require("../models/productos.model");   // Cargamos el modelo "productos" en una variable de tipo constante para evitar su reescritura.
let response = {                                         // (Let) variable que requiere ser definida se recomienda su uso dentro de un loop. 
    msg:"",
    exito: false        
}
// Funcion que permite crear un nuevo producto dentro de la colección de productos    
exports.create = function(req, res){                    
    let producto = new Producto({
        //_id: req._id._id,
        marca: req.body.marca,
        modelo: req.body.modelo,
        nombre: req.body.nombre,
        precio: req.body.precio,
        descripcion: req.body.descripcion,
        stock: req.body.stock,
        activo: req.body.activo,
        categoria: req.body.categoria
    })
// Validamos el guardado de los datos si se realizó exitosamente o por el contrario presentó un error.
    producto.save(function(err){
        if(err){
            console.error(err),
            response.exito = false,
            response.msg = "Error al guardar producto"
            res.json(response)
            return;
        }
        response.exito = true,
        response.msg = "El producto se guardo correctamente"
        res.json(response)
    })
}
// Función que trae todos los datos de la colección de productos ********************************************************************
exports.find = function(req,res){                                         
    Producto.find(function(err, productos){
        res.json(productos)
    })                                                           // Función llamada desde "productos.router.js" *********************
}
// Función que trae los datos de un producto especifico de la tabla productos por medio del id del producto. ************************
exports.findOne = function(req,res){                                     
    Producto.findOne({_id: req.params.id},function(err, producto){
        res.json(producto)
    })
}
// Función que actualiza los datos de un producto especificado por medio de la id de la tabla productos ****************************
exports.update = function(req,res){                                     
    let producto = {
        //_id: req._id._id,
        marca: req.body.marca,
        modelo: req.body.modelo,
        nombre: req.body.nombre,
        precio: req.body.precio,
        descripcion: req.body.descripcion,
        stock: req.body.stock,
        activo: req.body.activo,
        categoria: req.body.categoria
    }

    Producto.findByIdAndUpdate(req.params.id, {$set: producto}, function(err){
        if(err){
            console.error(err), 
            response.exito = false,
            response.msg = "Error al modificar el producto"
            res.json(response)
            return;
        }

        response.exito = true,
        response.msg = "El producto se modifico correctamente"
        res.json(response)
    })           
}
// Fin de la función Update se valida si hay error al modificar los datos de un producto o si por el contrario se realizó la actualización exitosamente.

exports.remove = function(req,res){
    Producto.findByIdAndRemove({_id: req.params.id}, function(err){
        if(err){
            console.error(err), 
            response.exito = false,
            response.msg = "Error al eliminar el producto"
            res.json(response)
            return;
        }

        response.exito = true,
        response.msg = "El producto fue eliminado correctamente"
        res.json(response)
    })
}