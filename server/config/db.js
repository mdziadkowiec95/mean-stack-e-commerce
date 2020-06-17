const path = require('path');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

const { MONGO_USER, MONGO_PASSWORD, MONGO_DBNAME } = process.env;

const mongoURI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.bkkod.mongodb.net/${MONGO_DBNAME}?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    console.log(mongoURI);

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    console.log("Mongo DB connected with SUCCESS!");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;