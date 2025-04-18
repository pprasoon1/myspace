import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string || "mongodb+srv://prasu202324:prasu202324@cluster0.3un6vxy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

if (!MONGODB_URI) throw new Error("Please define the MONGODB_URI environment variable");

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "portfolio_blog",
      bufferCommands: false,
    }).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
