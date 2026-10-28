
import { Router } from "express"

import mongoose from "mongoose"
import { Book } from "../schema/schema.js";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const { title, author, category } = req.body
        if (!title || !author || !category) {
            return res.status(400).json({
                message: "Title, author and category are required"
            });
        }

        const book = new Book({
            title,
            author,
            category
        });

        const savedBook = await Book.save();

        return res.status(201).json({
            message: "Book created successfully",
            book: savedBook
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.max(1, parseInt(req.query.limit) || 10);

        const skip = (page - 1) * limit;

        const books = await Book.find()
            .skip(skip)
            .limit(limit);

        const total = await Book.countDocuments();

        return res.status(200).json({
            books,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalBooks: total
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { availability } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid book ID"
            });
        }

        if (typeof availability !== "boolean") {
            return res.status(400).json({
                message: "Availability must be true or false"
            });
        }

        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { availability },
            { new: true, runValidators: true }
        );

        if (!updatedBook) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        return res.status(200).json({
            message: "Book availability updated successfully",
            book: updatedBook
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
});

export default router;
