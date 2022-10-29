const data = require("../model/crud.model");

const insertData = async(req,res)=>{
    try {
        const {first_name,last_name,email,password} = req.body
        if(first_name,last_name,email,password) return res.send({status:false,message:"body data is empty..."})
        const result = await data.insertMany([{first_name:first_name,last_name:last_name,email:email,password:password}])
        res.send({status:"true",message:"data inserted successfully..",details:result})
    } catch (error) {
        if(error.code === 11000){
            res.send({status:false,message:error.message})
        }else{
            res.send({status:false,message:error.message})
        }
    }
}

const getDataByEmail = async(req,res)=>{
    try {
        let email = req.query.email
        if(email === undefined) return res.send({status:false,message:'body data is empty...'})
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
}

const getAllData = async(req,res)=>{
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
}

const updateDataByEmail = async(req,res)=>{
    try {
        let email = req.query.email
        const {first_name,last_name} = req.body
        if(first_name === undefined || last_name === undefined || first_name === "" || last_name === "",email === undefined){
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
}


const deleteDataByEmail = async(req,res)=>{
    try {
        let email = req.query.email
        if(email === undefined){
            return res.send({status:false,message:"please pass the query or params data"})
        }
        const result = await data.findOne({email:email})
        if(result != null){
            const deleteData = await data.deleteOne({email:email})
            res.send({status:true,message:"data deleted successfully..."})
        }else{
            res.send({status:false,message:"email not found...."})
        }
    } catch (error) {
        res.send({status:false,message:error.message})
    }
}


module.exports = {insertData,getDataByEmail,getAllData,updateDataByEmail,deleteDataByEmail}