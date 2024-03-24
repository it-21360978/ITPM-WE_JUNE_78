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
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                    <img src="https://example.com/path/to/your/logo.png" alt="Envough Textiles Logo" style="display: block; margin: 0 auto; max-width: 200px; height: auto; margin-bottom: 20px;">
                    <h1 style="color: #333333; font-size: 24px; margin-bottom: 20px;">Hey ${firstName}, Welcome to Envough Textiles</h1>
                    <p style="color: #666666; font-size: 16px; margin-bottom: 15px;">Your registration was successful. We're thrilled to have you on board!</p>
                    <p style="color: #666666; font-size: 16px; margin-bottom: 15px;">Best Regards,</p>
                    <p style="color: #666666; font-size: 16px; margin-bottom: 15px;">Envough Team</p>
                </div>
            `
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


//get all users
exports.GetUsers = async(req,res) =>{
    try{
        const users = await UserModel.find();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json({message:'internal server error',err});
    }
};

//get single user by id and update




//reset password
exports.resetPassword = async (req,res) =>{
    const {token} = req.params;
    const {password} = req.body;

    try {
        //veryfy token
        const decodeToken = await AuthService.verifyToken(token);
        console.log('decoded token:', decodeToken);

        //if token not verify
        if(!decodeToken) throw new Error('Invalid or expired token');
       
        //update the password in database
        const userId = decodeToken.id;
        const hashedPassword = await AuthService.hashPassword(password);

        await UserModel.findByIdAndUpdate(userId,{password:hashedPassword});
       
        //get updated details 
        const updatedUser = await UserModel.findById(userId);
        res.status(200).json({message:'Password updated successfully',data:updatedUser});
        

    } catch (error) {
        console.error('token verify error', error);
        res.status(500).json({message:'internal server error',error});
        
    }
};



//forgot password
exports.forgotPassword = async(req, res) => {
    try {
        const {email} = req.body;
        const user = await UserModel.findOne({ email });

        //check user from db
        if (!user) throw new Error('User not found');
        
        //generate random reset token
        const token = await AuthService.generateToken(user);
        //send mail with token
        await sendMail({
            from: process.env.MAIL,
            to: user.email,
            subject: 'Reset Password',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                    <img src="https://example.com/path/to/your/logo.png" alt="Envough Textiles Logo" style="display: block; margin: 0 auto; max-width: 200px; height: auto; margin-bottom: 20px;">
                    <h1 style="color: #333333; font-size: 24px; margin-bottom: 20px;">Hey ${user.firstName}, Reset Your Password</h1>
                    <p style="color: #666666; font-size: 16px; margin-bottom: 15px;">Click the link below to reset your password</p>
                    <a href="http://localhost:5173/reset/${token}" style="display: inline-block; padding: 10px 20px; background-color: #333333; color: #ffffff; text-decoration: none; border-radius: 5px;">Reset Password</a>
                    <p style="color: #666666; font-size: 16px; margin-bottom: 15px;">Best Regards,</p>
                    <p style="color: #666666; font-size: 16px; margin-bottom: 15px;">Envough Team</p>
                </div>
            `
        });
        res.status(200).json({
            token,
            message: 'Reset link sent to email'
        });
    
    } catch (error) {
        console.error('forgot password error:', error);
        res.status(500).json({message:'internal server error',error});
        
    }
};