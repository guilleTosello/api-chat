const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  apellido: String
}, { collection: 'usuarios' });

const Libro = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;