
import { Book } from "../schema/schema.js";

export const addBook = async (req, res) => {
    try {
        const { title, author, category } = req.body;

        if (!title || !author || !category) {
            return res.status(400).json({
                message: "Empty field"
            });
        }

        const newBook = new Book({
            title,
            author,
            category
        });

        const savedBook = await newBook.save();

        return res.status(201).json({
            message: "Book added successfully",
            book: savedBook
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};

export const updateBook = async (req, res) => {
    try {
        const id = req.params.id;
        const { availability } = req.body;

        const findBook = await Book.findById(id);

        if (!findBook) {
            return res.status(404).json({
                message: "Book doesn't exist"
            });
        }

        if (typeof availability !== "boolean") {
            return res.status(400).json({
                message: "Availability must be true or false"
            });
        }

        if (findBook.availability === availability) {
            return res.status(400).json({
                message: "Book availability is already set to this value"
            });
        }

        findBook.availability = availability;

        const updatedBook = await findBook.save();

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
};


















// import { Book } from "../schema/schema.js";

// export const addBook = async (req, res)=>{
//     const {title, author, category} = req.body
//     if(!title || !author || !category){
//         return res.status(400).json({
//             message: "Empty field"
//         })
//     }

//     const newtitle = await Book.find()


// }
//     export const updateBook = async (req,res)=>{
//         const id = req.params.id;
//         const {availability} = req.body

//         const findtitle = await Book.findById(_id)

//         if(!findtitle){
//             return res.status(400).json(({
//                 message: "Book doesn't exists"
//             }))
//         }

//         if(findtitle.availability === availability){
//             return res.status(400).json("Book already in use")
//         }
//     }
