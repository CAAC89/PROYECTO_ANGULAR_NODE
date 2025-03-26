const mongoose = require("mongoose");
const CONSTANTS = require("../utils/Constants");

const TicketSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { 
      type: String, 
      enum: [CONSTANTS.TICKET_STATUS.OPEN, CONSTANTS.TICKET_STATUS.IN_PROGRESS, CONSTANTS.TICKET_STATUS.RESOLVED], 
      default: CONSTANTS.TICKET_STATUS.OPEN
    },
    assignedUser: { type: String, default:"" }, // Referencia a la colección de usuarios
  },
  { timestamps: true } // Crea automáticamente los campos "createdAt" y "updatedAt"
);

module.exports = mongoose.model(CONSTANTS.MODELS.TICKET, TicketSchema);