var express = require('express');
var router = express.Router();
const Usuario = require('../models/usuario.js');

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los usuarios.' });
  }
});




module.exports = router;
