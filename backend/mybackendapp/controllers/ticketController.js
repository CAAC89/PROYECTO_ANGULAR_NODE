const ticketService = require("../services/ticketService");
const CONSTANTS = require("../utils/Constants");
const ErrorHandler = require("../utils/ErrorHandler");

const createTicket = async (req, res, next) => {
    try {
        const { title, description, status, assignedUser } = req.body;
        return res.status(201).json(await ticketService.createTicket(title, description, status, assignedUser));
    } catch (error) {
        next(error); // Pass error to the error handling middleware
    }
};

const getAllTickets = async (req, res, next) => {
    try {
        return res.status(200).json(await ticketService.getAllTickets());
    } catch (error) {
        next(error); // Pass error to the error handling middleware
    }
};


const getTicketByStatus = async (req, res, next) => {
    try {
        const ticket = await ticketService.getTicketByStatus(req.body.status);
        if (ticket) {
            return res.status(200).json(ticket);
        }
        return next(new ErrorHandler(CONSTANTS.ERRORS.TICKET_NOT_FOUND, CONSTANTS.HTTP_STATUS.NOT_FOUND));
    } catch (error) {
        next(error); // Pass error to the error handling middleware
    }
};

const getTicketByAssignedUser = async (req, res, next) => {
    try {
        const ticket = await ticketService.getTicketByAssignedUser(req.body.assignedUser);
        if (ticket) {
            return res.status(200).json(ticket);
        }
        return next(new ErrorHandler(CONSTANTS.ERRORS.TICKET_NOT_FOUND,  CONSTANTS.HTTP_STATUS.NOT_FOUND));
    } catch (error) {
        next(error); // Pass error to the error handling middleware
    }
};

const getTicketByAssignedUserAndStatus = async (req, res, next) => {
    try {
        const ticket = await ticketService.getTicketByAssignedUserAndStatus(req.body.assignedUser, req.body.status);
        if (ticket) {
            return res.status(200).json(ticket);
        }
        return next(new ErrorHandler(CONSTANTS.ERRORS.TICKET_NOT_FOUND,  CONSTANTS.HTTP_STATUS.NOT_FOUND));
    } catch (error) {
        next(error); // Pass error to the error handling middleware
    }
};

const getTicketById = async (req, res, next) => {
    try {
        const ticket = await ticketService.getTicketById(req.body.id);
        if (ticket) {
            return res.status(200).json(ticket);
        }
        return next(new ErrorHandler(CONSTANTS.ERRORS.TICKET_NOT_FOUND,  CONSTANTS.HTTP_STATUS.NOT_FOUND));
    } catch (error) {
        next(error); // Pass error to the error handling middleware
    }
};

const updateTicket = async (req, res, next) => {
    try {
        const updatedTicket = await ticketService.updateTicket(req.body._id, req.body);
        if (updatedTicket) {
            return res.status(200).json(updatedTicket);
        }
        return next(new ErrorHandler(CONSTANTS.ERRORS.TICKET_NOT_FOUND,  CONSTANTS.HTTP_STATUS.NOT_FOUND));
    } catch (error) {
        next(error); // Pass error to the error handling middleware
    }
};

const deleteTicket = async (req, res, next) => {
    try {
        const deletedTicket = await ticketService.deleteTicket(req.body._id);
        if (deletedTicket) {
            return res.status(200).json({ message: CONSTANTS.SUCCESS.TICKET_DELETED});
        }
        return next(new ErrorHandler(CONSTANTS.ERRORS.TICKET_NOT_FOUND,  CONSTANTS.HTTP_STATUS.NOT_FOUND));
    } catch (error) {
        next(error); // Pass error to the error handling middleware
    }
};

module.exports = {
    createTicket,
    getAllTickets,
    getTicketByStatus,
    getTicketByAssignedUser,
    getTicketByAssignedUserAndStatus,
    getTicketById,
    updateTicket,
    deleteTicket
  };