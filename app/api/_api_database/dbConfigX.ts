import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!; // Replace with your MongoDB connection string
const dbName = "mdb_ramportfolio100"; // Replace with your database name

let client: MongoClient;
let clientPromise: Promise<any>; // Type can be improved based on your database schema

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a new connection for each request
  clientPromise = MongoClient.connect(uri) // Removed useNewUrlParser and useUnifiedTopology options
    .then((c) => {
      client = c;
      return client.db(dbName);
    });
} else {
  // In production mode, use a global connection pool
  client = new MongoClient(uri);
  clientPromise = client.connect().then((c) => {
    client = c;
    return client.db(dbName);
  });
}

export default clientPromise;
