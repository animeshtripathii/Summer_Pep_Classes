import mongoose from "mongoose";
import { Schema } from "mongoose";
const userSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  level: {
    type: String,
    enum: ["beginner", "intermedite", "advance"],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});
