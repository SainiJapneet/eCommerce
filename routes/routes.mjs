import jwt from 'jsonwebtoken';
import express, { response } from 'express';
import bcrypt from 'bcrypt';
import dbConnect from '../models/dbConnect.mjs';
import User from '../models/userModel.mjs';
import Products from '../models/productModel.mjs';

const route = express.Router();
dbConnect();

route.post('/register', (request, response) => {
    bcrypt.hash(request.body.password, 10).then((hashedPassword) => {
      console.log("Hashed Password: " + hashedPassword);
  
      const user = new User({
        email: request.body.email,
        password: hashedPassword
      });
  
      user.save().then((result) => {
        response.status(200).send({
          message: "Created new User",
          result
        });
      }).catch((error) => {
        response.status(500).send({
          message: "User not created",
          error
        });
      });
    }).catch((error) => {
      response.status(500).send({
        message: "Password hashing failed",
        error
      });
    });
  });

route.post("/login", (request, response) =>{
    User.findOne({
        email: request.body.email
    }).then((user) => {
        console.log(user);

        bcrypt.compare(request.body.password, user.password).then((passwordMatch) => {
            console.log(passwordMatch);

            if(!passwordMatch){
                return response.status(400).send({
                    message: "Password doesn't match"
                })
            }

            const token = jwt.sign({
                userId : user._id,
                userEmail: user.email
            }, "RANDOM-TOKEN", {expiresIn: "12h"})

            response.status(200).send({
                message: "Logged In",
                email: user.email,
                token
            })
        }).catch((error) => {
            response.status(400).send({
                message: "Email not found",
                error
            })
        })
    })
})

export default route;