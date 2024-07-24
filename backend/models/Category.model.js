import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    
  },
  status: {
    type: String,
    required: true,
   
  }
});

export const Category = mongoose.model("Category", userSchema)

 

