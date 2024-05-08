import express from 'express'
import mongoose from 'mongoose'


const app = express();
const port = process.env.PORT || 3000;

// Utiliza el análisis de cuerpo de solicitud JSON incorporado
app.use(express.json());

// Utiliza el análisis de cuerpo de solicitud de formulario incorporado
app.use(express.urlencoded({ extended: false }));

// Conexión a MongoDB
mongoose.connect('mongodb://del:password@monguito:27017/registro_puntos?authSource=admin')
//mongoose.connect('mongodb://mongo:27017/registro_puntos', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Definir el esquema de usuario
const usuarioSchema = new mongoose.Schema({
  nombre: String,
  puntos: [{ restaurante_id: mongoose.Schema.Types.ObjectId, cantidad: Number }]
});

const restauranteSchema = new mongoose.Schema({
    nombre: String,
});

// Definir el modelo de usuario
const Usuario = mongoose.model('Usuario', usuarioSchema);
const Restaurante = mongoose.model('Restaurante', restauranteSchema);

////////////////// *********
// Registrar un restaurante por defecto
async function registrarRestaurantePorDefecto() {
    try {
      const restauranteEncontrado = await Restaurante.findOne({ nombre: 'RestaurantePorDefecto' });
      if (!restauranteEncontrado) {
        const restaurantePorDefecto = new Restaurante({
          nombre: 'RestaurantePorDefecto'
        });
        await restaurantePorDefecto.save();
        console.log('Restaurante por defecto creado:', restaurantePorDefecto);
      }
    } catch (error) {
      console.error('Error al crear el restaurante por defecto:', error);
    }
  }
  
  // Registrar un usuario por defecto con puntos en el restaurante por defecto
  async function registrarUsuarioPorDefecto() {
    try {
      const usuarioEncontrado = await Usuario.findOne({ nombre: 'UsuarioPorDefecto' });
      if (!usuarioEncontrado) {
        const restaurantePorDefecto = await Restaurante.findOne({ nombre: 'RestaurantePorDefecto' });
        if (!restaurantePorDefecto) {
          await registrarRestaurantePorDefecto();
        }
        if (restaurantePorDefecto?._id !== null) {
          const usuarioPorDefecto = new Usuario({
            nombre: 'UsuarioPorDefecto',
            puntos: [{ restaurante_id: restaurantePorDefecto._id, cantidad: 100 }]
          });
          await usuarioPorDefecto.save();
          console.log('Usuario por defecto creado:', usuarioPorDefecto);
        }else{
          console.log('ME INVENTE UN RESTAURANTE ID')
          const usuarioPorDefecto = new Usuario({
            nombre: 'UsuarioPorDefecto',
            puntos: [{ restaurante_id: 0, cantidad: 100 }]
          });
          await usuarioPorDefecto.save();
          console.log('Usuario por defecto creado:', usuarioPorDefecto);

        }
        
      }
    } catch (error) {
      console.error('Error al crear el usuario por defecto:', error);
    }
  }
  
  registrarRestaurantePorDefecto();
  console.log('se ha registrado un restaurante!!!!!')
  registrarUsuarioPorDefecto();
  console.log('se ha registrado un user!!!!!')
  
  // Ruta para listar todos los registros de usuarios con sus puntos
  app.get('/usuarios', async (req, res) => {
    try {
      const usuarios = await Usuario.find();
      res.json(usuarios);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      res.status(500).json({ message: 'Error del servidor' });
    }
  });
///////////////////********

// Ruta para registrar los puntos del usuario en un restaurante
app.post('/usuarios/:id/puntos', async (req, res) => {
  try {
    console.log('BODY!!!! :D', req.body)
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (!req.body || !req.body.restaurante_id) {
      return res.status(400).json({ message: 'Datos incompletos en la solicitud!!' });
    }
    usuario.puntos.push({ restaurante_id: req.body.restaurante_id, cantidad: req.body.cantidad });
    await usuario.save();
    res.json(usuario);
  } catch (error) {
    console.log('SE SALIO!')
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
