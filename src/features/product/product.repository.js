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
        _id: new ObjectId(id),
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

      if (minPrice !== null) {
        query.price = { ...query.price, $gt: minPrice };
      }

      if (maxPrice !== null) {
        query.price = { ...query.price, $lt: maxPrice };
      }

      if (category) {
        query.category = category;
      }
      const result = await collection.find(query).toArray();

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
  async rateProduct() {
    try {
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
        { _id: new ObjectId(id) },
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
        _id: new ObjectId(id),
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
