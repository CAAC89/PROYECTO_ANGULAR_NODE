const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");


//RUTAS PROTEGIDAS--------------------
// Ruta para obtener todos los usuarios
router.get("/", authMiddleware, userController.getAllUsers);

// Ruta para obtener un usuario específico por su email
router.post("/getUserByEmail", authMiddleware, userController.getUserByEmail);

// Ruta para actualizar un usuario por su email
router.put("/", authMiddleware, userController.updateUser);

// Ruta para eliminar un usuario por su email
router.delete("/", authMiddleware, userController.deleteUser);

//--------------------------------

// Ruta para crear un nuevo usuario
router.post("/", userController.createUser);

// Ruta para login
router.post("/login", userController.login);

// Ruta para logout
router.post("/logout", userController.logout);

module.exports = [router, authMiddleware];