const { createUser, findUserByEmail, } = require("../model/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  try {
    const userExists = await findUserByEmail(email);
    if (userExists) {
      return res.status(400).json({ message: "User Already Exists" });
    }
    const user = await createUser(name, email, password);
    res.status(201).json({ message: "User Created Successfully", user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      } else {
        generateToken(res, user.id);
        res.status(200).json({ message: "Login Successful" });
      }
    }
  } catch (error) {}
};

const logoutUser = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logout Successful" });
};

module.exports = { registerUser, loginUser, logoutUser };
