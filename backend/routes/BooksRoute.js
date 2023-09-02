import express from "express";
import { Book } from "../model/BookModel.js";
import cors from "cors";

const router = express.Router();

const respHeaders = {
  "Content-Type": "application/json",
  ETag: "12345",
  "Access-Control-Allow-Origin": "*",
};

// Very Important to have cors at route level
router.options("/*", cors());

// Get all books
router.get("/", async (req, res) => {
  try {
    // Why await ??
    const books = await Book.find({});
    res.set(respHeaders);
    return res.status(200).send({
      message: "Books retrived successfully",
      count: books.length,
      response: books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Get book by Id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // Why await ??
    const book = await Book.findById(id);
    if (!book) {
      res.status(404).send({
        message: "Book not found",
      });
    }
    res.set(respHeaders);
    return res.status(200).send({
      message: "Book retrived successfully",
      response: book,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Create a book
router.post("/", async (req, res) => {
  try {
    console.log("Req: ", req.body);
    // Request body validation check

    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    // Create local Variable
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    // User Mongoose Book Schema to create book in MongoAtlas
    const book = await Book.create(newBook);
    res.set(respHeaders);
    return res
      .status(201)
      .send({ message: "Book created successfully", response: book });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Update book by Id
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    } else if (id.length != 24) {
      res.status(400).send({
        message: "Incorrect id format",
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(id, req.body);

    if (!updatedBook) {
      res.status(404).send({
        message: "Book not found.",
      });
    } else {
      res.set(respHeaders);
      return res.status(200).send({ message: "Book updated successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Delete book by Id
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      res.set(respHeaders);
      res.status(404).send({
        message: "Book not found.",
      });
    } else {
      res.set(respHeaders);
      return res.status(200).send({ message: "Book deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

export default router;
