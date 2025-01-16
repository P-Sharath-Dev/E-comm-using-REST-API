import { ObjectId } from "mongodb";
import { getDataBase } from "../../config/mongoDB.config.js";

export default class CartItemRepository {
  async add(userId, productId, quantity) {
    try {
      //get db
      const db = getDataBase();
      //get collection
      const collection = db.collection("cart_items");
      //using upsert... it can either insert or update document. here it checking if userId and poductId
      // if both are present in database it will only update quantity else
      // it will insert document
      // without upsert we need to check if userid and productid are present and then write db query based on that
      return await collection.updateOne(
        { userId: new ObjectId(userId), productId: new ObjectId(productId) },
        { $inc: { quantity } },
        { upsert: true }
      );
    } catch (e) {
      const errorMessage = `Error in cartRepository: ${e.message}`;
      errorLogger.error(errorMessage);
      //console.log(e);
      throw new ApplicationError(500, "something went wrong");
    }
  }

  async get(userId) {
    try {
      //get db
      const db = getDataBase();
      //get collection
      const collection = db.collection("cart_items");
      const result = await collection
        .find({ userId: new ObjectId(userId) })
        .toArray();

      // if (result.length == 0) {
      //   return "no cart items found";
      // }
      return result;
    } catch (e) {
      const errorMessage = `Error in cartRepository: ${e.message}`;
      errorLogger.error(errorMessage);
      //console.log(e);
      throw new ApplicationError(500, "something went wrong");
    }
  }
  async delete(cartItemId, userId) {
    try {
      //get db
      const db = getDataBase();
      //get collection
      const collection = db.collection("cart_items");
      const result = await collection.deleteOne({
        _id: new ObjectId(cartItemId),
        userId: new ObjectId(userId),
      });
      return result;
    } catch (e) {
      const errorMessage = `Error in cartRepository: ${e.message}`;
      errorLogger.error(errorMessage);
      //console.log(e);
      throw new ApplicationError(500, "something went wrong");
    }
  }
}
