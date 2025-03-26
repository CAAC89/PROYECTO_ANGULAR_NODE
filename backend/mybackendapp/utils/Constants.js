
const CONSTANTS = {
    // Mensajes de error
    ERRORS: {
        TICKET_NOT_FOUND: "Ticket not found",
        USER_NOT_FOUND:"User not found",
        INVALID_CREDENTIALS:"Invalid credentials"
    },
    
    // Mensajes de éxito
    SUCCESS: {
        TICKET_DELETED: "Ticket deleted successfully" ,
        USER_DELETED:"User deleted successfully" ,
        LOGIN_SUCESSFUL:"Login successful",
        LOGOUT_SUCESSFUL:"Logout successful. Remove the token on the client side."
    },

    // Códigos de estado HTTP
    HTTP_STATUS: {
        OK: 200,
        CREATED: 201,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        INTERNAL_SERVER_ERROR: 500
    },

    // Roles de usuario
    ROLES: {
        ADMIN: "admin",
        USER: "user",
        SUPPORT: "support"
    },

    MODELS: {
        USER: "user",
        TICKET: "ticket"
    },

    TICKET_STATUS: {
        OPEN: "open",
        IN_PROGRESS: "in progress",
        RESOLVED: "resolved"
    },

    REFERENCIES: {
        USER: "User"
    },
    
    USER_ROLES: {
        ADMIN: "admin",
        USER: "user"
    }
};

module.exports = CONSTANTS;
