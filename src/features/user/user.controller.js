import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";

export default class userController{

    login(req, res){
        const {email, password} = req.body;
        const user = UserModel.login(email, password);
        if(user){
            //create token (when user email and password are correct)
            const token = jwt.sign({id : user.id, email : user.email}, 'LJ6jaSuuScTh3xPSS5xkhZJx1gmMWm05', {expiresIn : '1h'});
            return res.status(200).send({token, msg : "logged in successfully"});
        }
        return res.status(400).send("invalid data");
    }
    signup(req, res){
        const{name, email, password, type} = req.body;
        const user = UserModel.signUp(name, email, password, type);
        return res.status(201).send( user);
    }

    
}