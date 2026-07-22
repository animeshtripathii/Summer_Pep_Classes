import mongoose from "mongoose";

const connectDB = async () => {
   try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("Db is connected");
   } catch (e) {
      console.error(`Error connecting to DB: ${e}`);
   }
};

export default connectDB;