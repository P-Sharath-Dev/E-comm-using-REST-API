import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";

export default class userController {
  login(req, res) {
    const { email, password } = req.body;
    const user = UserModel.login(email, password);
    if (user) {
      //create token (when user email and password are correct)
      const token = jwt.sign(
        { id: user.id, email: user.email },
        "LJ6jaSuuScTh3xPSS5xkhZJx1gmMWm05",
        { expiresIn: "1h" }
      );
      return res.status(200).send({ token, msg: "logged in successfully" });
    }
    return res.status(400).send("invalid data");
  }
  async signup(req, res, next) {
    try {
      const { name, email, password, type } = req.body;
      const user = new UserModel(name, email, password, type);
      const createdUser = await UserRepository.signUp(user);
      console.log("createdUsed from user.controller : ", createdUser);
      return res.status(201).send(createdUser);
    } catch (e) {
      next(e);
    }
  }
}
