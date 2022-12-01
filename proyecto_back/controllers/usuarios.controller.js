const Usuario = require("../models/usuarios.model"); // Cargamos el modelo "usuarios" en una variable de tipo constante para evitar su reescritura.
const crypto = require("crypto"); // Biblioteca JavaScript de estándares criptográficos.
const jwt = require("jsonwebtoken");
let response = {
  // (Let) variable que requiere ser definida se recomienda su uso dentro de un loop.
  msg: "",
  exito: false,
};

exports.login = function (req, res, next) {
  // Función para validar el login de un usurio generando un token codificado para brindar mayor seguridad de acceso
  let hashedpass = crypto
    .createHash("sha512")
    .update(req.body.pass)
    .digest("hex");

  Usuario.findOne(
    { usuario: req.body.usuario, pass: hashedpass },
    function (err, usuario) {
      let response = {
        token: null,
      };
      if (usuario !== null) {
        response.token = jwt.sign(
          {
            id: usuario._id,
            usuario: usuario.usuario,
          },
          "recret",
          {
            expiresIn: "12h"
          }
        );
      }
      res.json(response);
    }
  );
};
// Funcion que permite la creación un nuevo "usuario". *****************************************************************************
exports.create = function (req, res) {
  // Funciones llamadas desde "usuarios.router.js"
  let usuario = new Usuario({
    usuario: req.body.usuario,
    pass: req.body.pass,
    numeroId: req.body.numeroId,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    mail: req.body.mail,
    telefono: req.body.telefono,
    direccion: req.body.direccion,
  });
  // Validación de guardado exitoso o erroneo de usuario. *****************************************************************************
  usuario.save(function (err) {
    if (err) {
      console.error(err),
        (response.exito = false),
        (response.msg = "Error al guardar usuario");
      res.json(response);
      return;
    }
    (response.exito = true),
      (response.msg = "El usuario se guardo correctamente");
    res.json(response);
  });
};
// Función que trae todos los datos de la tabla usuarios
exports.find = function (req, res) {
  Usuario.find(function (err, usuarios) {
    // Funciones llamadas desde "usuarios.router.js"
    res.json(usuarios);
  });
};
// Función que trae un dato en especifico de la tabla usuarios pidiendo el id del usuario en especifico ****************************
exports.findOne = function (req, res) {
  Usuario.findOne({ _id: req.params.id }, function (err, usuario) {
    // Funciones llamadas desde "usuarios.router.js"
    res.json(usuario);
  });
};
// Función que actualiza los datos de un usuario en especifico por medio de la id, de la tabla usuarios.
exports.update = function (req, res) {
  let usuario = {
    usuario: req.body.usuario,
    pass: req.body.pass,
    numeroId: req.body.numeroId,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    mail: req.body.mail,
    telefono: req.body.telefono,
    direccion: req.body.direccion,
  };
  // Fin de la función Update se valida si hay error al modificar los datos de un usuario o si por el contrario se realizó la actualización exitosamente.
  Usuario.findByIdAndUpdate(req.params.id, { $set: usuario }, function (err) {
    if (err) {
      console.error(err),
        (response.exito = false),
        (response.msg = "Error al modificar el usuario");
      res.json(response);
      return;
    }

    (response.exito = true),
      (response.msg = "El usuario se modifico correctamente");
    res.json(response);
  });
};
// Función de borrado de usuarios de la colección "usuarios" por medio de la id del usuario en especifico.
exports.remove = function (req, res) {
  Usuario.findByIdAndRemove({ _id: req.params.id }, function (err) {
    // Funciones llamadas desde "usuarios.router.js"
    if (err) {
      console.error(err),
        (response.exito = false),
        (response.msg = "Error al eliminar el usuario");
      res.json(response);
      return;
    }
    // Validación de borrado de usuarios
    (response.exito = true),
      (response.msg = "El usuario fue eliminado correctamente");
    res.json(response);
  });
};
