import Student from "../models/StudentSchema.js";
import Admin from "../models/AdminSchema.js";
import Mentor from "../models/MentorSchema.js";
import Recruitor from "../models/RecruitorSchema.js";

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = user=>{
    //how to make secret key in env 
    //on terminal write -> node
    //on entering write -> crypto.randomBytes(256).toString('base64')
    return jwt.sign({id:user._id,role:user.role}, process.env.JWT_SECRET_KEY,{
        expiresIn:'30d',
    })
    
}

export const register = async(req,res)=>{
    const {email,password,role} = req.body

    try {
        let user = null
        if(role==='student'){
            user = await Student.findOne({email})
        }else if(role==='admin'){
            user = await Admin.findOne({email})
        }else if(role==='mentor'){
            user = await Mentor.findOne({email})
        }else if(role==='recruitor'){
            user = await Recruitor.findOne({email})
        }
        //chk if user exist
        if(user){
            return res.status(400).json({message:"User already exist"})
        }

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        if(role==='student'){
            user = new Student({
                email,
                password:hashPassword,
                role
            })
        }
        if(role==='admin'){
            user = new Admin({
                email,
                password:hashPassword,
                role
            })
        }
        if(role==='mentor'){
            user = new Mentor({
                email,
                password:hashPassword,
                role
            })
        }
        if(role==='recruitor'){
            user = new Recruitor({
                email,
                password:hashPassword,
                role
            })
        }

        await user.save()

        res.status(200).json({success:true,message:'User successfully created'})


    } catch (error) {
        res.status(500).json({success:false,message:'Internal server error, Try again'})
    }
}

export const login = async(req,res) => {
    
    const {email} = req.body;
    try {
        let user = null

        const student = await Student.findOne({email})
        const mentor = await Mentor.findOne({email})
        const admin = await Admin.findOne({email})
        const recruitor = await Recruitor.findOne({email})

        if(student){
            user=student
        }
        if(mentor){
            user=mentor
        }
        if(admin){
            user=admin
        }
        if(recruitor){
            user=recruitor
        }
        //chk if user exists or not
        if(!user){
            return res.status(404).json({message:"User not found"}); 
        }
        //if user found chk if provided password matches the hashedpassword
        const isPasswordMatch = await bcrypt.compare(req.body.password,user.password)
        
        if(!isPasswordMatch){
            return res.status(400).json({status:false,message:"Invalid Credentials"})
        }
        //if password matches we will generate authentication token
        const token = generateToken(user);

        const {password,role,...rest} = user._doc

        res.status(200).json({status:true,message:"Successfully loggedIn", token, data:{...rest}, role})
    } catch (error) {
        res.status(500).json({status:false,message:"Failed to login"})
    }
}