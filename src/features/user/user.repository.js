import ApplicationError from "../../error_handler/app.error.js";
import { getDataBase } from "../../config/mongoDB.config.js";
import { errorLogger } from "../../middlewares/user/logger.middleware.js";

class UserRepository {
  static async signUp(newUser) {
    try {
      console.log("newUser from UserRepository : ", newUser);
      //1 get E-Commerce db
      const db = getDataBase();
      //2. get collection
      const collection = db.collection("users");
      //3 insert new user to User collection in E-Commerce db
      const createdUser = await collection.insertOne(newUser);
      console.log("createdUser from repository", createdUser);
      //users.push(newUser);
      return createdUser;
    } catch (e) {
      const errorMessage = `Error in UserRepository signUp: ${e.message}`;
      errorLogger.error(errorMessage);
      throw new ApplicationError(500, "something went wrong");
    }
  }
}

export default UserRepository;
