const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");
const authMiddleware = require("../middleware/authMiddleware");

//RUTAS PROTEGIDAS--------------------
// Ruta para obtener todos los tickets
router.get("/", authMiddleware, ticketController.getAllTickets);

// Ruta para obtener un tiquete específico por su id
router.get("/getTicketById", authMiddleware, ticketController.getTicketById);

// Ruta para obtener un tiquete específico por su AssignedUser
router.get("/getTicketByAssignedUser", authMiddleware, ticketController.getTicketByAssignedUser);

// Ruta para obtener un tiquete específico por su AssignedUser And Status
router.get("/getTicketByAssignedUserAndStatus", authMiddleware, ticketController.getTicketByAssignedUserAndStatus);

// Ruta para obtener un tiquete específico por su  Status
router.get("/getTicketByStatus", authMiddleware, ticketController.getTicketByStatus);


// Ruta para crear un nuevo tiquete
router.post("/",  authMiddleware, ticketController.createTicket);

// Ruta para actualizar un tiquete por su id
router.put("/", authMiddleware, ticketController.updateTicket);

// Ruta para eliminar un tiquete por su id
router.delete("/", authMiddleware, ticketController.deleteTicket);


module.exports = [router, authMiddleware];