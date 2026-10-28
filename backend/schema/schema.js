
import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        required: true,
        default: true
    },
    creationDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

export const Book = mongoose.model("Book", BookSchema);


