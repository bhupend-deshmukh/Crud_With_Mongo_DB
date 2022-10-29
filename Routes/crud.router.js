const data = require("../model/crud.model");
const express = require("express");
const Router = express.Router();
const { insertData, getDataByEmail, getAllData, updateDataByEmail, deleteDataByEmail } = require("../controllers/crud.controllr");

// Insert details in database
Router.post("/insertData",insertData)

//get users data by Email 
Router.get("/getDataByEmail",getDataByEmail)

// Get all users data 
Router.get("/getAllData",getAllData)

// Update data by Email
Router.put("/updateDataByEmail",updateDataByEmail)

// Delete user data by user Email
Router.delete("/deleteDataByEmail",deleteDataByEmail)

module.exports = Router