import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController=async(req,res)=>{
    try {
        const {fname,lname,email,phone,addressLine1,addressLine2,dateOfBirth,password}=req.body;

        //validation
        if(!fname){
            return res.send({error:"First name is Required"});
        }
        if(!lname){
            return res.send({error:'Last name is Required'});
        }
        if(!email){
            return res.send({error:'Email is Required'});
        }
        if(!phone){
            return res.send({error:'Phone no is Required'});
        }
        if(!addressLine1){
            return res.send({error:'Address is Required'});
        }
        if(!addressLine2){
            return res.send({error:'Address is Required'});
        }
        if(!dateOfBirth){
            return res.send({error:'Date of birth is Required'});
        }
        if(!password){
            return res.send({error:'A password is Required'});
        }

                // // Validation
                // if (!fname || !lname || !email || !addressLine1 || !addressLine2 || !dateOfBirth || !password) {
                //     return res.status(400).send({ error: "All fields are required" });
                // }

        //Check user
        const existingUser=await userModel.findOne({email})
        //Existing user
        if(existingUser){
            return  res.status(200).send({
                success:true,
                message:'Already Registered please Login',
            });       
        }

        //register user
        const hashedPassword=await hashPassword(password)

        //save
        const user=await new userModel({
            fname,
            lname,
            email,
            phone,
            addressLine1,
            addressLine2,
            dateOfBirth,
            password:hashedPassword
        }).save()

        res.status(201).send({
            success:true,
            message:'User Registered Successfully',
            user,
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Registration',
            error
        })
    }
};

//POST LOGIN
export const loginController=async(req,res)=>{
    try {
        const {email,password}=req.body
        //validation
        if(!email || !password){
            return res.status(404).send({
                success:true,
                message:'Invalid email or password'
            })
        }
        //check user
        const user=await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Email is not registered'
            })
        }
        const match= await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Invalid password", 
            });
        }
        //token
        const token= await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
            expiresIn:"7d",
        });
        res.status(200).send({
            success:true,
            message:"login successful",
            user:{
                fname:user.fname,
                lname:user.lname,
                email:user.email,
                phone:user.phone,
                addressLine1:user.addressLine1,
                addressLine2:user.addressLine2,
                dateOfBirth:user.dateOfBirth,
                role:user.role,

            },
            token,
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in login',
            error
        })        
    }
};

//test controller
export const testController=(req,res)=>{
    try {
        res.send("Protected Routes");    
    } catch (error) {
        console.log(error);
        res.send({error});
    }
    
};


