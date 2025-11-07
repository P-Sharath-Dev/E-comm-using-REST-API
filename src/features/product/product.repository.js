import { ObjectId } from "mongodb";
import { getDataBase } from "../../config/mongoDB.config.js";
import ApplicationError from "../../error_handler/app.error.js";
import { errorLogger } from "../../middlewares/user/logger.middleware.js";

export default class ProductRepository {
  //constructor(parameters) {}

  //***add product***
  async addProduct(product) {
    try {
      //get database
      const db = getDataBase();
      //create collection
      const collection = db.collection("products");
      //inserting product
      const createdProduct = await collection.insertOne(product);
      //console.log("createdProduct", createdProduct);
      return createdProduct;
    } catch (e) {
      const errorMessage = `Error in ProductRepository addProduct: ${e.message}`;
      errorLogger.error(errorMessage);
      //console.log(e);
      throw new ApplicationError(500, "something went wrong");
    }
  }

  //***get all products***
  async getAllProducts() {
    try {
      //get database
      const db = getDataBase();
      //get collection
      const collection = db.collection("products");
      //inserting product into collection
      const products = await collection.find().toArray();
      //console.log("products : ", products);
      return products;
    } catch (e) {
      const errorMessage = `Error in ProductRepository get all products: ${e.message}`;
      errorLogger.error(errorMessage);
      //console.log(e);
      throw new ApplicationError(500, "something went wrong");
    }
  }

  //***get product by id***
  async getProductById(id) {
    try {
      // Validate if the product ID is a valid ObjectId
      if (!ObjectId.isValid(id)) {
        return false;
      }

      //get database
      const db = getDataBase();
      //get collection
      const collection = db.collection("products");

      // Check if the product exists with the given ID
      const product = await collection.findOne({
        _id: ObjectId.createFromHexString(id),
      });
      if (!product) {
        //console.log("Product not found");
        throw new ApplicationError(404, "product not found");
        // return null;
      }

      //console.log("Product found:", product);
      return product;
    } catch (e) {
      const errorMessage = `Error in ProductRepository get product by id: ${e.message}`;
      errorLogger.error(errorMessage);
      //console.log(e);
      throw new ApplicationError(500, "something went wrong");
    }
  }

  //***filtering products***
  async getFilteredProducts(minPrice, maxPrice, category) {
    try {
      //get database
      const db = getDataBase();
      //get collection
      const collection = db.collection("products");
      // Dynamically construct the query
      const query = {};
      if (minPrice) {
        query.price = { $gte: minPrice };
      }

      if (maxPrice) {
        // (in DB we have price only, not min, max price.) so used spread operator so that minPrice will not be overidden by maxPrice.
        query.price = { ...query.price, $lte: maxPrice };
      }

      if (category) {
        // query.category = category;

        // Convert category string (expected as JSON array, e.g. '["electronics","clothing"]')
        // into a JavaScript array, so we can use it with MongoDB's $in operator.

        query.category = { $in: JSON.parse(category) };
      }
      const result = await collection.find(query).project({ _id: 0 }).toArray();

      if (result.length === 0) {
        return null;
      }
      return result;
    } catch (e) {
      const errorMessage = `Error in ProductRepository - get filtered products: ${e.message}`;
      errorLogger.error(errorMessage);
      //console.log(e);
      throw new ApplicationError(500, "something went wrong");
    }
  }

  //***rate product***
  // async rateProduct(userId, productId, rating, productFound) {
  //   try {
  //     //get database
  //     const db = getDataBase();
  //     //get collection
  //     const collection = db.collection("products");

  //     // const productFound = await collection.findOne({
  //     //   _id: ObjectId.createFromHexString(productId),
  //     // });
  //     if (!productFound) {
  //       throw new ApplicationError(404, "product not found");
  //     }

  //     const userRating = productFound.ratings?.find(
  //       (ratingObj) => ratingObj.userId == userId
  //     );

  //     if (userRating) {
  //       // User already rated → update rating
  //       await collection.updateOne(
  //         {
  //           _id: ObjectId.createFromHexString(productId), //productFound._id is an object but ObjectId.createFromHexString() requires
  //           "ratings.userId": ObjectId.createFromHexString(userId), // string to check and then returns a new ObjectId.
  //         },
  //         { $set: { "ratings.$.rating": rating } }
  //       );
  //     } else {
  //       // User hasn't rated → push new rating
  //       await collection.updateOne(
  //         { _id: ObjectId.createFromHexString(productId) },
  //         {
  //           $push: {
  //             ratings: { rating, userId: ObjectId.createFromHexString(userId) },
  //           },
  //         }
  //       );
  //     }
  //   } catch (e) {
  //     const errorMessage = `Error in ProductRepository - rate product: ${e.message}`;
  //     errorLogger.error(errorMessage);
  //     //console.log(e);
  //     throw new ApplicationError(500, "something went wrong");
  //   }
  // }

  //clean version of rateProduct. above one is not that easy to understand
  async rateProduct(userId, productId, rating) {
    try {
      //get database
      const db = getDataBase();

      //get collection
      const collection = db.collection("products");

      //rate product
      //******pull(remove) existing rating
      await collection.updateOne(
        { _id: ObjectId.createFromHexString(productId) },
        {
          $pull: { rating: { userId: ObjectId.createFromHexString(userId) } }, // removes rating if user tries to rate again and
        }
      );
      //******push new rating
      await collection.updateOne(
        { _id: ObjectId.createFromHexString(productId) },
        {
          $push: {
            // adds new rating for the product
            rating: {
              rating: rating,
              userId: ObjectId.createFromHexString(userId),
            },
          },
        }
      );
    } catch (e) {
      const errorMessage = `Error in ProductRepository - rate product: ${e.message}`;
      errorLogger.error(errorMessage);
      //console.log(e);
      throw new ApplicationError(500, "something went wrong");
    }
  }

  //***updating product***
  async updateProduct(id, data) {
    try {
      // Validate if the product ID is a valid ObjectId
      if (!ObjectId.isValid(id)) {
        return false;
      }

      //get database
      const db = getDataBase();
      //get collection
      const collection = db.collection("products");
      const updatedProduct = await collection.updateOne(
        { _id: ObjectId.createFromHexString(id) },
        { $set: data }
      );
      return updatedProduct;
    } catch (e) {
      const errorMessage = `Error in ProductRepository - update product: ${e.message}`;
      errorLogger.error(errorMessage);
      //console.log(e);
      throw new ApplicationError(500, "something went wrong");
    }
  }

  //***deleting products***
  async deleteProduct(id) {
    try {
      // Validate if the product ID is a valid ObjectId
      if (!ObjectId.isValid(id)) {
        return false;
      }

      //get database
      const db = getDataBase();
      //get collection
      const collection = db.collection("products");
      //inserting product into collection
      //console.log("id from repository : ", id);
      const result = await collection.deleteOne({
        _id: ObjectId.createFromHexString(id),
      });

      // Check if any document was deleted
      if (result.deletedCount > 0) {
        //console.log("Product deleted successfully");
        return true; // Product was deleted
      } else {
        //console.log("No product found to delete");
        return false; // No product matched the ID
      }
    } catch (e) {
      const errorMessage = `Error in ProductRepository - delete product: ${e.message}`;
      errorLogger.error(errorMessage);
      //console.log(e);
      throw new ApplicationError(500, "something went wrong");
    }
  }
}
