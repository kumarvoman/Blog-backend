import User from "../model/User.js";
import bcrypt from "bcryptjs";

export const getAllUser = async(req, res, next) => {
    let users;
    try{
        users = await User.find();
        //res.json(users); //not in the video
    } catch(err){
        console.log(err);
    }

    if(!users){
        res.status(404).json({message: "No users found"});
    }
    return res.status(200)
    .json({users});
}

export const signup = async(req, res, next) => { 
    const {name, email, password} = req.body;

    let existinguser;
    try{
        existinguser = await User.findOne({email});
    }catch(err) {
        return console.log(err);
    }

    if(existinguser) {
        return res
        .status(400)
        .json({message: "user already available, login instead" });
    }

    const hashedPassword = bcrypt.hashSync(password);

    const user = new User({
        name,
        email,
        password : hashedPassword,
        blogs:[],
    });


    try{
        await user.save();
    } catch(err) {
        return console.log(err);
    }

    return res.status(201).json({user});
}


export const login = async (req, res, next ) => {
    const { email, password} = req.body;
    let existinguser;
    try{
        existinguser = await User.findOne({email});
    }catch(err) {
        return console.log(err);
    }

    if(!existinguser) {
        return res
        .status(404)
        .json({message: "couldn't find this user by email" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existinguser.password);

    if(!isPasswordCorrect) {
        return res
        .status(400)
        .json({message: "password is incorrect"});
    }
    return res.status(200).json({message : "login successfull"});
}