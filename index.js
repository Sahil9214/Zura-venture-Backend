const express = require("express");
const UserModel = require("../model/user.Model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const { email, password, cnfpassword } = req.body;
//   console.log(req.body);
//   console.log("Password:", password);
//   console.log("Confirm Password:", cnfpassword);
  if (password == cnfpassword) {
    try {
      bcrypt.hash(password, 5, async (err, security) => {
        if (err) {
          console.log(err);
        } else {
            // console.log(password,cnfpassword);
          const user = new UserModel({
            email,
            password: security,
            cnfpassword: security,
          });
          
          await user.save();
          res.json(user)
          // console.log(user);
        }
      });
    } catch (error) {
      res.send({ message: "error in registering the user" });
      // console.log(error.message);
    }
  } else {
    res.send({ message: "password and conform password not matching.Try Again" });
  }
});

userRouter.post("/login", async (req, res) => {
    let { email, password } = req.body;
    try {
      let user = await UserModel.findOne({ email });
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            let token = jwt.sign({ authorId: user._id },process.env.key);
            res.send({ msg:  "Login Successful", token: token });
          } else {
            res.send({ msg: "Invalid Credentials ,please Login Again" });
          }
        });
      } else {
        res.send({ msg: "please signup first and proceed" });
      }
    } catch (error) {
      res.send(error);
    }
  });

module.exports = { userRouter };