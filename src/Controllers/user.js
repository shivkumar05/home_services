const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegistration = require("../Models/UserRegistration")
const maidAndHours = require("../Models/Maid&HoursModel")


//=======================[ User Registration ]========================

const UserRegistration = async function (req, res) {
  try {
    let data = req.body;
    let { first_name, last_name, mobile_number, email, password, address } = data;

    // Check if mobile number or email already exist in the database
    const existingMobileUser = await userRegistration.findOne({ mobile_number: mobile_number });
    const existingEmailUser = await userRegistration.findOne({ email: email });

    if (!/^([0|\+[0-9]{1,5})?([0-9][0-9]{9})$/.test(mobile_number)) {
      return res.status(400).send({ status: false, message: "Mobile Number is not valid" })
    }

    if (existingMobileUser) {
      return res.status(400).send({ status: false, message: "Mobile Number already exists" });
    }

    if (existingEmailUser) {
      return res.status(400).send({ status: false, message: "Email already exists" });
    }

    // if (/^[A-Za-z0-9]{4}$/.test(password)) {
    //   return res.status(400).send({ status: false, message: `password should be minimum 4 characters which contain at least numeric digit and letter` })
    // }

    const encryptedPassword = await bcrypt.hash(password, 10);
    data.password = encryptedPassword;

    const token = jwt.sign(
      {
        userId: userRegistration._id,
      },
      "project"
    );

    data.token = token;

    let savedData = await userRegistration.create(data);
    res.status(201).send({
      status: true,
      msg: "User Register Successful",
      data: savedData,
    });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};


//=======================[ User Login ]=============================

const UserLogin = async function (req, res) {
  try {
    let data = req.body;
    let { email, password } = data;

    let userExists = await userRegistration.findOne({ email: email });

    if (!userExists) {
      return res.status(400).send({
        status: false,
        msg: "Email and Password is Invalid",
      });
    }

    let compared = await bcrypt.compare(password, userExists.password);
    if (!compared) {
      return res.status(400).send({
        status: false,
        message: "Your password is invalid",
      });
    }
    var token = jwt.sign(
      {
        userId: userExists._id,
      },
      "project"
    );

    let updateToken = await userRegistration.findByIdAndUpdate(
      { _id: userExists._id },
      { token },
      { new: true }
    );
    userExists.token = updateToken.token;

    return res.status(200).send({
      status: true,
      msg: "Super Admin Login successfully",
      data: userExists,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      msg: error.message,
    });
  }
};

//=======================[ Maid & Hours ]==============================

// const MaidAndHours = async function (req, res) {
//   try {
//     const data = req.body;
//     let { maid, hours, descriptions,date,time } = data

//     const MaidAndHours = await maidAndHours.create(data);
//     const createdRecord = await MaidAndHours.save();

//     res.status(201).json(createdRecord);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// };
const MaidAndHours = async function (req, res) {
  try {
    const { id } = req.params; // Assuming the ID of the record to update is passed in the URL params
    const data = req.body;
    let { maid, hours, descriptions, date, time } = data;

    // Find the record by ID and update it
    const updatedRecord = await maidAndHours.findByIdAndUpdate(
      id,
      { $set: data }, // Use $set to update specific fields in the record
      { new: true } // Return the updated record
    );

    if (!updatedRecord) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.status(200).json(updatedRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};






module.exports = { UserRegistration, UserLogin, MaidAndHours };
