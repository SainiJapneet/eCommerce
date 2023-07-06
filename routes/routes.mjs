import jwt from 'jsonwebtoken';
import express, { response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/userModel.mjs';
import Products from '../models/productModel.mjs';

const route = express.Router();


route.post('/register', async (request, response) => {
  try {
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    console.log("Hashed Password: " + hashedPassword);

    const user = new User({
      email: request.body.email,
      password: hashedPassword,
      age: request.body.age,
      address: request.body.address,
    });

    const result = await user.save();
    response.status(200).send({
      message: "Created new User",
      result,
    });
  } catch (error) {
    response.status(500).send({
      message: "User not created",
      error,
    });
  }
});

route.post("/login", async (request, response) => {
  try {
    const user = await User.findOne({ email: request.body.email });
    console.log(user);

    const passwordMatch = await bcrypt.compare(request.body.password, user.password);
    console.log(passwordMatch);

    if (!passwordMatch) {
      return response.status(400).send({
        message: "Password doesn't match"
      });
    }

    const token = jwt.sign({
      userId: user._id,
      userEmail: user.email,
      userAge: user.age,
      userAddress: user.address
    }, "RANDOM-TOKEN", { expiresIn: "12h" });

    response.status(200).send({
      message: "Logged In",
      email: user.email,
      token
    });
  } catch (error) {
    response.status(400).send({
      message: "Email not found",
      error
    });
  }
});

export default route;