const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const UserModel = require("./models/user.models.js");
const UserLoginModel = require("./models/login.model.js");
const jwt  = require( 'jsonwebtoken');
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://root:1234@soen341.4bcqb8l.mongodb.net/SOEN341");

mongoose.connection.once("open", () => {
  console.log("connected to database");
});

app.post("/api/register", async (req, res) => {
  try {
    await UserModel.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
    return;
  }

  res.json({ status: "success" });
});

app.post("/api/login", async (req, res) => {
  console.log(req.body)
    const user_data_from_DB = await UserLoginModel.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (!user_data_from_DB) {
      res.json({ status: "error", error: "Invalid username/password" });
      return;
    }else{
      const token = jwt.sign({
        name : user_data_from_DB.username,
        email : user_data_from_DB.email,
      },"secretkey");
      res.json({ status: "success" , token : token});
    }
   
});

app.listen(1337, () => {
  console.log("server started on port 1337");
});
