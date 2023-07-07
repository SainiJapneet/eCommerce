import jwt from 'jsonwebtoken';
import express, { response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/userModel.mjs';
import Products from '../models/productModel.mjs';
import Orders from '../models/orderModel.mjs';

const route = express.Router();

//Sign Up
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

//Sign In
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

//getUsers
route.get("/getUser", async (request, response) => {
  try{
    const user = await User.find();
    response.json(user);
    console.log("List of Users");
    console.log(user);
  }catch(error){
    response.status(500).json({message: error.message});
  }
})

//getUserByID
route.get("/getUser/:id", async (request, response) => {
  try{
    const id = request.params.id;
    const user = await User.findById(id);
    response.json(user);
    console.log("User with id : " + id);
    console.log(user);
  }catch(error){
    response.status(500).json({message: error.message});
  }
})

//updateUserByID
route.patch("/updateUser/:id",async (request,response)=>{
  try{
    const id = request.params.id;
    const updatedUser = request.body;
    const options = {new : true};
    const result = await User.findByIdAndUpdate(id , updatedUser, options);
    response.send(result);
    console.log("Updated User");
    console.log(result);
  }catch(error){
    response.status(500).json({message : error.message});
  }
})

//deleteUserByID
route.delete("/deleteUser/:id",async (request,response)=>{
  try{
    const id = request.params.id;
    const userDelete = await User.findByIdAndRemove(id);
    response.send(userDelete);
    console.log("Deleted User");
    console.log(userDelete);
  }catch(error){
    response.status(500).json({message : error.message});
  }
})

//AddProduct
route.post("/addProduct",async (request,response)=>{
  const product = new Products({
    name: request.body.name,
    description: request.body.description,
    price: request.body.price,
    quantity: request.body.quantity,
    other: request.body.other
  })
  try{
    const newProduct = await product.save();
    response.status(200).json(newProduct);
    console.log("New Product Added");
    console.log(newProduct)
  }catch(error){
    response.status(500).json({message : error.message});
  }
})

//GetProduct
route.get("/getProduct",async (request,response)=>{
  try{
    const prod = await Products.find();
    response.json(prod);
    console.log("List of Products");
    console.log(prod);
  }catch(error){
    response.status(500).json({message : error.message});
  }
})

//GetProductByID
route.get("/getProduct/:id", async (request, response) =>{
  try{
    const id = request.params.id;
    const prod = await Products.findById(id);
    response.json(prod);
    console.log("Product with id : " + id);
    console.log(prod);
  }catch(error){
    response.status(500).json({message: error.message});
  }
})

//UpdateProductByID
route.patch("/updateProduct/:id",async (request,response)=>{
  try{
    const id = request.params.id;
    const newProduct = request.body;
    const options = {new : true};
    const result = await Products.findByIdAndUpdate(id, newProduct, options);
    response.send(result);
    console.log("Updated Product");
    console.log(result);
  }catch(error){
    response.status(500).json({message : error.message});
  }
})

//DeleteProductByID
route.delete("/deleteProduct/:id",async (request,response)=>{
  try{
    const id = request.params.id;
    const deleteProduct = await Products.findByIdAndRemove(id);
    response.send(deleteProduct);
    console.log("Deleted Product : ");
    console.log(deleteProduct);
  }catch(error){
    response.status(500).json({message : error.message});
  }
})

//OrderProduct
route.post("/addOrder",async (request,response)=>{
  const order = new Orders({
    userName: request.body.userName,
    products: request.body.products,
    quantity: request.body.quantity,
    price: request.body.price
  })
  try{
    const newOrder = await order.save();
    response.status(200).json(newOrder);
    console.log("Added new order");
    console.log(newOrder);
  }catch(error){
    response.status(500).json({message : error.message});
  }
})

//GetOrders
route.get("/getOrder", async (request, response) =>{
  try{
    const order = await Orders.find();
    response.json(order);
    console.log("List of Orders");
    console.log(order);
  }catch(error){
    response.status(500).json({message: error.message});
  }
})

//GetOrderByID
route.get("/getOrder/:id", async (request, response) =>{
  try{
    const id = request.params.id;
    const order = await Orders.findById(id);
    response.json(order);
    console.log("Order with id : " + id);
    console.log(order);
  }catch(error){
    response.status(500).json({message: error.message});
  }
})

//UpdateOrderByID
route.patch("/updateOrder/:id",async (request,response)=>{
  try{
    const id = request.params.id;
    const updatedOrder = request.body;
    const options = {new : true};
    const result = await Orders.findByIdAndUpdate(id, updatedOrder, options);
    response.send(result);
    console.log("Updated Order");
    console.log(result);
  }catch(error){
    response.status(500).json({message : error.message});
  }
})

//DeleteOrderByID
route.delete("/deleteOrder/:id",async (request,response)=>{
  try{
   const id = request.params.id;
   const deleteOrder = Orders.findByIdAndRemove(id);
   response.send(deleteOrder);
   console.log("Order Deleted");
   console.log(deleteOrder);   
  }catch(error){
    response.status(500).json({message : error.message});
  }
})

User.collection.createIndex({ email: 1 }, { unique: true });

export default route;