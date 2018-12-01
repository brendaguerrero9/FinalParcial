var express = require('express');
var router = express.Router();
var JugadorModel = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Ruta para insertar
router.post('/create',(req,res,next)=>{
  console.log(req.body);
  var newJugador = new JugadorModel();
  newJugador.nombre = req.body.nombre;
  newJugador.apellido = req.body.apellido;
  newJugador.equipo = req.body.equipo;
  newJugador.edad = req.body.edad;

  newJugador.save((error,jugador)=>{
    if(error) return res.status(500).json({sucess: false , message:"No se guardo"});
  
    if(jugador) return res.status(200).json({sucess:true , message:"Se guardo", jugador});
  });
});

//Ruta para actualizar
router.put('/update/:id', (req,res,next)=>{
  var jugadorId = req.params.id;
  var updateJugador = req.body;

  JugadorModel.findByIdAndUpdate(jugadorId,updateJugador, {new:true}, (error,jugador)=>{
    if(error) return res.status(500).json({sucess: false , message:"No se guardo"});
  
    if(jugador) return res.status(200).json({sucess:true , message:"Se guardo", jugador});
  });
});

//Ruta para eliminar 
router.delete('/delete/:id', (req,res,next)=>{
  var jugadorId = req.params.id;

  JugadorModel.findByIdAndDelete(jugadorId, (error,jugador)=>{
    if(error) return res.status(500).json({sucess: false , message:"No se guardo"});
  
    if(jugador) return res.status(200).json({sucess:true , message:"Se guardo", jugador});
  });
});

//Recibir un usuario
router.get('/user/:id' , (req,res,next)=>{

  JugadorModel.findById(req.params.id , (error,jugador)=>{
    if(error) return res.status(500).json({sucess: false , message:"No se guardo"});
  
    if(jugador) return res.status(200).json({sucess:true , message:"Se guardo", jugador});
  });
});

//Recibir todos los usuarios
router.get('/getUsers', (req,res,next)=>{
  JugadorModel.find({},(error,jugador)=>{
    if(error) return res.status(500).json({sucess: false , message:"No se guardo"});
  
    if(jugador) return res.status(200).json({sucess:true , message:"Se guardo", jugador});
  });
});

module.exports = router;
