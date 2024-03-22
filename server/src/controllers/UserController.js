const UserModel = require('../models/User.Model');
const AuthService = require('../Helpers/AuthService');
const {sendMail} = require('../Helpers/MailService');
const fs = require('fs');
const cloudinary = require('../utils/Cloudinary');
const {validateFirstName,validateLastName,validateEmail,validatePassword} = require('../Validations/auth.validator');


//post method
exports.register = async(req,res) => {
    try{
        const {firstName,lastName,email,password} = req.body;
        
        //validate form
        validateFirstName(firstName);
        validateLastName(lastName);
        validateEmail(email);
        validatePassword(password);

        //hash user password
        const hashedPassword = await AuthService.hashPassword(password);

        //form object
        const user = new UserModel({
            firstName:firstName,
            lastName:lastName,
            email:email,
            password: hashedPassword
        });

        //save to the database
        const savedUser = await user.save();

        //send mail
        await sendMail({
            from: process.env.MAIL,
            to: user.email,
            subject: 'Registration Successful',
            html:`
                <h1>Hey ${firstName} , Welcome to the Envough Company </h1>
                <p>Your registration was successful</p>
                <p>Best Regards ,</p>
                <p>Envough Team</p>
            `,
        });

        res.status(200).json({
            message: 'Registration Successful',
            data: savedUser
        });
    }catch (err){
        res.status(500).json({
            message: err.message
        });
    }
     
};


//login user

exports.Login = async (req,res) =>{
    try {
        const {email,password} = req.body;

        //check form validate
        validateEmail(email);
        validatePassword(password);
        //get user by email from db
        const user = await UserModel.findOne({email:email});
        if(!user) throw new Error('User not found');

        //compare passwords 
        const passwordMatch = await AuthService.comparePassword(password,user.password);
        if(!passwordMatch) throw new Error('Invalid password');
        //create and return jsonwebtoken
        const token = await AuthService.generateToken(user);
        res.cookie('token', token).json(user);
        res.status(200);
        

    } catch (err) {
        res.status(500).json({message:'internel server error', err});
        console.log (err);
    }
};



//log out the user
exports.Logout=async (req,res)=>{
    try{
        res.clearCookie('token');
        res.status(200).json({message:'Logout successful'});
    }catch(err){
        res.status(500).json({message:'internal server error',err});
    }
};


//update user profile
exports.UpdateProfile = async (req,res) =>{
    try{
        const { id } = req.params;
        const {firstName,lastName,email} = req.body;

        //check imagePath in body
        let imagePath = req.file ? req.file.path : null;

        //find the user 
        const user = await UserModel.findById(id);
        if (!user) throw new Error ('User not found');

        //delete the image if user already uploaded
        if(user.cloudinary_id){
            await cloudinary.uploader.destroy(user.cloudinary_id);
        }
        //update the user 
        const updatedUser = {
            firstName: firstName || user.firstName,
            lastName: lastName || user.lastName,
            email: email || user.email,
            imagePath: imagePath || user.imagePath,
            cloudinary_id: imagePath ? null : user.cloudinary_id
        };
        const result = await UserModel.findByIdAndUpdate(id ,updatedUser ,{new:true});

        //delete local storage file
        if(req.file) {
            fs.unlinkSync(req.file.path);
        }

        res.status(200).json({message:'User updated successfully',data:result});
        
    }catch(err){
        res.status(500).json({message:'internal server error',err});
    }
};


//delete user 
exports.DeleteUser = async(req,res) =>{
    try{
        const {id} = req.params;
        const user = await UserModel.findById(id);
        if(!user) throw new Error('User not found');

        //remove from cloudinary    
        if(user.cloudinary_id){
            await cloudinary.uploader.destroy(user.cloudinary_id);
        }

        //remove from db
        await UserModel.findByIdAndRemove(id);
        res.status(200).json({message:'User deleted successfully'});
    }catch(err){
        res.status(500).json({message:'internal server error',err});
    }
};