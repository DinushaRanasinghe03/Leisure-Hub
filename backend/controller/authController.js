import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const {
      fname,
      lname,
      email,
      phone,
      address1,
      address2,
      dob,
      password,
      membership,
    } = req.body;

    //validation
    if (!fname) {
      return res.send({ message: "First name is Required" });
    }
    if (!lname) {
      return res.send({ message: "Last name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!address1) {
      return res.send({ message: "Address1" });
    }
    if (!address2) {
      return res.send({ message: "Address2" });
    }
    if (!dob) {
      return res.send({ message: "Date of birth is Required" });
    }
    if (!password) {
      return res.send({ message: "A password is Required" });
    }
    if (!membership) {
      return res.send({ message: "A membership type is Required" });
    }

    // // Validation
    // if (!fname || !lname || !email || !addressLine1 || !addressLine2 || !dob || !password) {
    //     return res.status(400).send({ error: "All fields are required" });
    // }

    //Check user
    const existingUser = await userModel.findOne({ email });
    //Existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered please Login",
      });
    }

    //register user
    const hashedPassword = await hashPassword(password);

    //save
    const user = await new userModel({
      fname,
      lname,
      email,
      phone,
      address1,
      address2,
      dob,
      password: hashedPassword,
      membership,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: true,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successful",
      user: {
        _id: user._id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        phone: user.phone,
        address1: user.address1,
        address2: user.address2,
        dob: user.dob,
        membership: user.membership,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
