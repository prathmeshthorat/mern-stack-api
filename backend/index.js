import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./model/BookModel.js";
import BooksRoute from "./routes/BooksRoute.js";
import cors from "cors";

// To create a app server with express as backend
const app = express();

// To parse request body as JSON with express
app.use(express.json());

// Register books route
app.use("/books", BooksRoute);

// Allow custom cors policy with cors module
app.use(cors());

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "PUT", "POST", "DELETE"],
//     allowedHeaders: ["Authorization", "Content-Type"],
//   })
// );

// Get route with Home
app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send("<< This is a Home page >>");
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("MongoDB connection successful!");
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
