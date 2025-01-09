//database
import { MongoClient } from "mongodb";

//********************database starts Here***

//creating connection to database
const client = new MongoClient("mongodb://localhost:27017/");

//database name
const dbName = "Movies";

//function for client to connect to db
async function main() {
  //connect method to connect to db
  await client.connect();
  console.log("connected successfully to database");
  const db = client.db(dbName);
  const collection = db.collection("highest_rated");
  const movies = await collection.find({}).toArray();
  console.log("found doucment => : ", movies);
  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close);

//**********************database ends Here***
