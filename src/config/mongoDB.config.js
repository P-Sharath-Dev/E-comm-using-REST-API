import { MongoClient } from "mongodb";
import { errorLogger } from "../middlewares/user/logger.middleware.js";

//connection URL
const url = process.env.DB_URL;

const client = new MongoClient(url);

//database name
//const dbName = "Movies";
let db;

//function for client to connect to db
export async function connectToDB() {
  //connect method to connect to db
  try {
    await client.connect();
    console.log("connected successfully to database");
    //const db = client.db(dbName);
    //const db = client.db();
    db = client.db(); //Assign the database instance
  } catch (e) {
    const errorMessage = `Error from mongoDB connection: ${e.message}`;
    errorLogger.error(errorMessage);
    console.log("Error connecting to the database:", e);
  }
  //   const collection = db.collection("highest_rated");
  //   const movies = await collection.find({}).toArray();
  //   console.log("found doucment => : ", movies);
  //   return "done.";
}

export function getDataBase() {
  if (!db) {
    throw new Error("Database is not initialized. Call connectToDB first.");
  }
  return db;
  //return client.db();
}
