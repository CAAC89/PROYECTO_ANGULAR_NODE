const Ticket = require("../models/Ticket");

const createTicket = async (title, description, status, assignedUser) => {
    try {
        const newTicket = new Ticket({ title, description, status, assignedUser });
        await newTicket.save();

        return newTicket;
    } catch (error) {
        throw error;
    }
};


const getAllTickets = async () => {
    try {
        return await Ticket.find();
    } catch (error) {
        throw error;
    }
};


const getTicketByAssignedUser = async (assignedUser) => {
    try {
        return await Ticket.findOne({ assignedUser });
    } catch (error) {
        throw error;
    }
};

const getTicketByStatus = async (status) => {
    try {
        return await Ticket.findOne({ status });
    } catch (error) {
        throw error;
    }
};

const getTicketByAssignedUserAndStatus = async (assignedUser, status) => {
    try {
        return await Ticket.findOne({ assignedUser , status });
    } catch (error) {
        throw error;
    }
};

const getTicketById = async (id) => {
    try {
        return await Ticket.findById({id});
    } catch (error) {
        throw error;
    }
};

const updateTicket = async (_id, updatedData) => {
    try {
        return await Ticket.findOneAndUpdate({ _id }, updatedData, { new: true });
    } catch (error) {
        throw error;
    }
};

const deleteTicket = async (_id) => {
    try {
        return await Ticket.findOneAndDelete({ _id: _id});
    } catch (error) {
        throw error;
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