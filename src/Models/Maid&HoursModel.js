const mongoose = require("mongoose");

const MaidAndHoursSchema = new mongoose.Schema({

    maid: { type: Number, require: true },
    hours: { type: Number, require: true },
    descriptions: { type: String, require: true },
    date: { type: String, require: true },
    time: { type: String, require: true },
    

}, { timestamps: true });

module.exports = mongoose.model("Maid&Hours", MaidAndHoursSchema)



