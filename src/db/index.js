import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    // const connectionDB = await mongoose.connect(
    //   `${process.env.MONGODB_URI}/${DB_NAME}`
    // );
    const connectionDB = await mongoose.connect(
      process.env.MONGODB_URI,
      {
        dbName: DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    console.log(
      `/n MongoDB Connect !! DB HOST ${connectionDB.connection.host}`
    );
  } catch (error) {
    console.error("DB Connection Failed : ", error);
    process.exit(1);
  }
};

export default connectDB;
