//CALL MONGODB LIBRARY
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const CONSTANTS = require("../utils/Constants");

//SCHEMA
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: [CONSTANTS.USER_ROLES.ADMIN, CONSTANTS.USER_ROLES.USER], default: CONSTANTS.USER_ROLES.USER}
});

//Before of save data, update password with hash method
UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Before updating, check if the password is being modified and hash it
UserSchema.pre("findOneAndUpdate", async function (next) {
  if (this._update.password) {
      const salt = await bcrypt.genSalt(10);
      this._update.password = await bcrypt.hash(this._update.password, salt);
  }
  next();
});

  
//Match the password with the encriptacion, is a compare
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

//EXPORT SCHEMA
module.exports = mongoose.model(CONSTANTS.MODELS.USER, UserSchema);