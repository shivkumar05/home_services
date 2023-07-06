const mongoose = require("mongoose");

const UserRegistrationSchema = new mongoose.Schema({

    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    mobile_number: { type: Number, require: true, unique: true },
    password: { type: String, require: true },
    address: { type: String, require: true },
    token: { type: String, require: true },

}, { timestamps: true });

module.exports = mongoose.model("UserRegistration", UserRegistrationSchema)



