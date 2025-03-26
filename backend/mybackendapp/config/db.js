const mongoose = require("mongoose");
const User = require("../models/User");

const MAX_RETRIES = 5; // Número máximo de intentos para conectar a MongoDB
const RETRY_DELAY = 5000; // Tiempo de espera entre intentos en milisegundos (5s)

// Función para agregar un usuario automáticamente al iniciar el servidor
// Quiero que tenga un usuario admin por default
async function addDefaultUser() {
  try {
      const existingUser = await User.findOne({ email: 'admin@admin.com' });
      if (!existingUser) {
          const newUser = new User({
              name: 'admin',
              email: 'admin@admin.com',
              password: '12345',
              role: 'admin'
          });
          await newUser.save();
          console.log('Usuario por defecto agregado.');
      } else {
          console.log('El usuario ya existe.');
      }
  } catch (error) {
      console.error('Error al agregar usuario:', error);
  }
}

// Función para conectar a MongoDB con reintentos en caso de fallo
const connectDB = async (retries = MAX_RETRIES) => {
  while (retries > 0) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("MongoDB conectado.");
      
      // Una vez conectados, intentamos agregar el usuario admin
      await addDefaultUser();
      return; // Salir de la función si la conexión fue exitosa
    } catch (error) {
      console.error(`Error conectando a MongoDB: ${error.message}`);
      retries--;

      if (retries === 0) {
        console.error("No se pudo conectar a MongoDB después de varios intentos.");
        process.exit(1); // Salir con código de error
      } else {
        console.log(`Reintentando conexión en ${RETRY_DELAY / 1000} segundos...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY)); // Esperar antes de reintentar
      }
    }
  }
};

module.exports = connectDB;