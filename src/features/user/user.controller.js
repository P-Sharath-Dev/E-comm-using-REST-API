import UserModel from "./user.model.js";
export default class userController{

    login(req, res){
        const {email, password} = req.body;
        const user = UserModel.login(email, password);
        if(user){
            return res.status(200).send("logged in successfully");
        }
        return res.status(400).send("invalid data");
    }
    signup(req, res){
        const{name, email, password, type} = req.body;
        const user = UserModel.signUp(name, email, password, type);
        return res.status(201).send( user);
    }
}