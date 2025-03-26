require("dotenv").config();
const createError = require('http-errors');
const express = require('express');
const db = require("./config/db");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const errorHandler = require("./middleware/errorHandler");
const cors = require('cors');

// Rutas
const userRoutes = require("./routes/userRoutes");
const ticketRoutes = require("./routes/ticketRoutes");

const app = express();

// Permitir solicitudes desde localhost:4200
app.use(cors({
  origin: 'http://localhost:4200',
}));

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Llamada a la base de datos
db();

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de la API
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler general
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderizar la página de error
  res.status(err.status || 500);
  res.json({ message: 'Error en el servidor', error: err });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
/*app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});*/

console.log(`Servidor corriendo en el puerto ${PORT}`);

module.exports = app;
