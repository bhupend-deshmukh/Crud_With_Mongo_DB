const data = require("../model/crud.model");
const express = require("express")
const Router = express.Router();

Router.post("/insertData",async(req,res)=>{
    try {
        const {first_name,last_name,email,password} = req.body
        console.log(first_name,last_name,email,password);
        const result = await data.insertMany([{first_name:first_name,last_name:last_name,email:email,password:password}])
        console.log(result);
        res.send({status:"true",message:"data inserted successfully..",details:result})
    } catch (error) {
        if(error.code === 11000){
            console.log('11000110001100011000110001100011000');
            res.send({status:false,message:error.message})
        }else{
            console.log('else wala part');
            res.send({status:false,message:error.message})
        }
    }
})

Router.get("/getDataByEmail",async(req,res)=>{
    try {
        let email = req.query.email
        const result = await data.findOne({email:email})
        if(result === null){
            res.status(400).send({status:false,message:"this email not found..."})
        }else{
            res.status(200).send({status:true,data:{
                first_name:result.first_name,
                last_name:result.last_name,
                email:result.email,
                password:result.password
            }})
        }
    } catch (error) {
        res.send({status:false,message:error.message})
    }
})

Router.get("/getAllData",async(req,res)=>{
    try {
        const result = await data.find()
        if(result.length > 0){
            res.status(200).send({status:true,message:"data fetched successfully..",count:result.length,data:result})
        }else{
            res.send({status:false,message:"any data not  exists"})
        }
    } catch (error) {
        console.log(error);
    }
})

Router.put("/updateDataByEmail",async(req,res)=>{
    try {
        let email = req.query.email
        const {first_name,last_name} = req.body
        if(first_name === undefined || last_name === undefined || first_name === "" || last_name === ""){
            return res.send({status:false,message:"body id empty..."})
        }
        const result = await data.findOne({email:email})
        if(result != null){
            const updateData = await data.updateOne({email:email},{first_name:first_name,last_name:last_name})
            res.send({status:true,message:"data updated successfully...."})
        }else{
            res.send({status:false,message:"email not found..."})
        }
    } catch (error) {
        res.send({status:false,error:error.message})
    }
})

Router.delete("/deleteDataByEmail",async(req,res)=>{
    try {
        let email = req.query.email
        console.log(email);
        const result = await data.findOne({email:email})
        if(result != null){
            console.log();
            const deleteData = await data.deleteOne({email:email})
            console.log(deleteData);
        }else{
            res.send({status:false,message:"email not found...."})
        }
    } catch (error) {
        res.send({status:false,message:error.message})
    }
})

module.exports = Router