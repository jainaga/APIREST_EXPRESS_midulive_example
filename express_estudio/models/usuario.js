


const mongoose = require('mongoose');
const userSchema = require('../schemas/usuarios.js'); // Asegúrate de que la ruta sea correcta.

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true },
  edad: { type: Number, required: true }
  // Agrega más campos si es necesario
});

// Middleware para validar los datos usando Zod antes de guardar
usuarioSchema.pre('save', async function (next) {
  try {
    await userSchema.validateAsync(this.toObject());
    next();
  } catch (error) {
    next(error);
  }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;