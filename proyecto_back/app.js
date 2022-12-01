var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var database = require('./config/database');                 // <=== Creamos una variable de tipo (database) y cargamos toda la configuracion de la base de datos.
//var auth = require("./auth/main_auth");                      // <=== Se carga la configuración de authenticación de usario
var cors = require("cors");

// Aqui hacemos el llamado de todos los "routes" ************************************************************************************************
var usuariosRouter = require('./routes/usuarios.router')     //  < === Linea creada ******************** llamado de routes usuarios
var productosRouter = require('./routes/productos.router')   //  < === Linea creada ******************** llamado de routes productos
var ventasRouter = require('./routes/ventas.router')         //  < === Linea creada ******************** llamado de routes ventas
// **********************************************************************************************************************************************
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// mongoConnection ********************************************************************************************************************************
database.mongoConnect();                       // <========  Aqui llamamos a conexion la base de datos que hemos creado 
app.use('/usuarios', usuariosRouter);          // < ======== Linea creada ****** Ejecución de routes para usuarios
//app.use(auth);
//*************************************************************************************************************************************************

// router *****************************************************************************************************************************************
app.use('/productos', productosRouter);        // < ======== Linea creada ****** Ejecución de routes para productos
app.use('/ventas', ventasRouter);              // < ======== Linea creada ****** Ejecución de routes para ventas 
//*************************************************************************************************************************************************

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page 
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
