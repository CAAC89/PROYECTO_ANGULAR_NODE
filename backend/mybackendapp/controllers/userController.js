const userService = require("../services/userService");
const CONSTANTS = require("../utils/Constants");
const ErrorHandler = require("../utils/ErrorHandler");
const bcrypt = require("bcrypt");

const createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    return res.status(201).json(await userService.createUser(name, email, password, role));
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    return res.status(200).json(await userService.getAllUsers());
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
};

const getUserByEmail = async (req, res, next) => {
  try {
    const user = await userService.getUserByEmail(req.body.email);
    if (user) {
      return res.status(200).json(user);
    } 
    return next(new ErrorHandler(CONSTANTS.ERRORS.USER_NOT_FOUND, CONSTANTS.HTTP_STATUS.NOT_FOUND));
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
};

const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await userService.updateUser(req.body._id, req.body);
    if (updatedUser) {
      return res.status(200).json(updatedUser);
    } 
    return next(new ErrorHandler(CONSTANTS.ERRORS.USER_NOT_FOUND, CONSTANTS.HTTP_STATUS.NOT_FOUND));
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await userService.deleteUser(req.body._id);
    if (deletedUser) {
      return res.status(200).json({ message: CONSTANTS.SUCCESS.USER_DELETED });
    } 
    return next(new ErrorHandler(CONSTANTS.ERRORS.USER_NOT_FOUND, CONSTANTS.HTTP_STATUS.NOT_FOUND));
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userService.getUserByEmail(email);

    if (!user) {
      return next(new ErrorHandler(CONSTANTS.ERRORS.INVALID_CREDENTIALS, CONSTANTS.HTTP_STATUS.UNAUTHORIZED));
    }

    // Verificar contraseña
    if (!await bcrypt.compare(password, user.password)) {
      return next(new ErrorHandler(CONSTANTS.ERRORS.INVALID_CREDENTIALS, CONSTANTS.HTTP_STATUS.UNAUTHORIZED));
    }

    // Generar token JWT
    const token = userService.generateToken(user);

    return res.json({ message: CONSTANTS.SUCCESS.LOGIN_SUCESSFUL, token });
  } catch (error) {
    next(error);
  }
};

// Cerrar sesión (manejado en el cliente eliminando el token)
const logout = (req, res) => {
  return res.json({ message: CONSTANTS.SUCCESS.LOGOUT_SUCESSFUL });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserByEmail,
  updateUser,
  deleteUser,
  login,
  logout
};