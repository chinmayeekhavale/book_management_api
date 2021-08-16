require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");

//Database
const database = require("./database/database");

//Models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");

//Initialize express
const booky = express();

booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());

//mongoose connect------------------------------------------------------------------------------------------------------------------------
mongoose.connect(process.env.MONGO_URL,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}
).then(() => console.log("Connection Established"));


//BOOKS METHOD-----------------------------------------------------------------------------------------------------------------------------------

//GETTING ALL THE EXISTING BOOKS
/*
 Route          /
 Description    Get All the Books
 Access         Public
 Parameter      None
 Methods        Get
*/
booky.get("/",async (req,res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});

//GETTING A SPECIFIC BOOK BASED ON ISBN
/*
 Route          /is
 Description    Get specific book on isbn
 Access         Public
 Parameter      isbn
 Methods        Get
*/
booky.get("/is/:isbn", async (req,res) => {
    const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn});
    
    //null !0=1, !1=0
    if(!getSpecificBook) {
        return res.json({error: `No Book Found For The ISBN of ${req.params.isbn}`});
    }
    return res.json({book: getSpecificBook});
});

//GETTING A SPECIFIC BOOK BASED ON CATEGORY
/*
 Route          /c
 Description    Get specific book on category
 Access         Public
 Parameter      category
 Methods        Get
*/
booky.get("/c/:category", async (req,res) => {
    const getSpecificBook = await BookModel.findOne({category: req.params.category});

    //null !0=1 !1=0
    if(!getSpecificBook) {
        return res.json({error: `No Book Found For The Category of ${req.params.category}`})
    }
    
    return res.json({book: getSpecificBook});
});

//GETTING A SPECIFIC BOOK BASED ON LANGUAGE
/*
 Route          /l
 Description    Get specific book on language
 Access         Public
 Parameter      language
 Methods        Get
*/
booky.get("/l/:language", async (req,res) => {
    const getSpecificBook = await BookModel.findOne({language: req.params.language});

    if(!getSpecificBook) {
        return res.json({error: `No Book Found For The Language of ${req.params.language}`})
    }
    return res.json({book: getSpecificBook});
});



//AUTHORS METHOD---------------------------------------------------------------------------------------------------------------------------------

//GET ALL EXISTING AUTHORS
/*
 Route          /author
 Description    Get all author
 Access         Public
 Parameter      None
 Methods        Get
*/
booky.get("/author", async (req,res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors);
});

//GETTING AUTHOR RESPECT TO BOOKS WRITTEN
/*
 Route          /author/book 
 Description    Get all authors based on books
 Access         Public
 Parameter      isbn
 Methods        Get
*/
booky.get("/author/book/:isbn", async (req,res) => {
    const getSpecificAuthor = await AuthorModel.findOne({books: req.params.isbn});

    if(!getSpecificAuthor) {
        return res.json({error: `No Author found for the book: ${req.params.isbn}`})
    }
    return res.json({author: getSpecificAuthor});
});

//GETTING A SPECIFIC AUTHOR RESPECT TO NAME
/* 
 Route          /author/name
 Description    Get specific Author
 Access         Public
 Parameter      author name
 Methods        Get
*/
booky.get("/author/name/:name", async (req,res) => {
    const getSpecificAuthor = await AuthorModel.findOne({name: req.params.name});

    if(!getSpecificAuthor) {
        return res.json({error: `No Author found having Name: ${req.params.name}`})
    }
    return res.json({author: getSpecificAuthor});
});


//PUBLICATIONS METHOD---------------------------------------------------------------------------------------------------------------------------

//GET ALL EXISTING PUBLICATIONS
/* 
 Route          /publications
 Description    Get all publications
 Access         Public
 Parameter      None
 Methods        Get
*/
booky.get("/publications", async (req,res) => {
    const getAllPublications = await PublicationModel.find();
    return res.json(getAllPublications);
});

//GETTING PUBLICATION RESPECT TO THEIR NAMES
/* 
 Route          /publications/name
 Description    Get specific publication
 Access         Public
 Parameter      publication name
 Methods        Get
*/
booky.get("/publications/name/:name", async (req,res) => {
    const getSpecificPublication = await PublicationModel.findOne({name: req.params.name});

    if(!getSpecificPublication) {
        return res.json({error: `No Publication found having Name: ${req.params.name}`})
    }
    return res.json({publication: getSpecificPublication});
});

//GETTING PUBLICATION BASED ON BOOKS THAT WERE PUBLISHED
/*
 Route          /publications/pub
 Description    Get list of publication based on book
 Access         Public
 Parameter      books
 Methods        Get
*/
booky.get("/publications/pub/:isbn", async (req,res) => {
    const getSpecificPublication = await PublicationModel.findOne({books: req.params.isbn});

    if(!getSpecificPublication) {
        return res.json({error: `No Publication found on book: ${req.params.isbn}`})
    }
    return res.json({publication: getSpecificPublication});
});



//POST METHOD-------------------------------------------------------------------------------------------------------------------------------------
//ENTRERING NEW BOOK
/*
 Route          book/new
 Description    Add New Books
 Access         Public
 Parameter      None
 Methods        Post
*/
booky.post("/book/new", async (req,res) => {
    const { newBook } = req.body;
    const addNewBook = BookModel.create(newBook);
    return res.json({
        books: addNewBook,
        message: "Book was Added!!!"
    });
});

//ENTERING NEW AUTHOR
/*
 Route          author/new
 Description    Add New Authors
 Access         Public
 Parameter      None
 Methods        Post
*/
booky.post("/author/new", async (req,res) => {
    const { newAuthor } = req.body;
    const addNewAuthor = AuthorModel.create(newAuthor);
    
    return res.json(
        {
            author: addNewAuthor,
            message: "Author was added!!!"
        }
    );
});

//ENTERING NEW PUBLICATION
/*
 Route          publications/new
 Description    Add New Publications
 Access         Public
 Parameter      None
 Methods        Post
*/
booky.post("/publications/new", async (req,res) => {
    const {newPublication} = req.body;
    const addNewPublication = PublicationModel.create(newPublication);

    return res.json({
        publication: addNewPublication,
        message: "Publication was added!!!"
    });
});

//PUT METHOD-----------------------------------------------------------------------------------------------------------------------------
//UPDATE BOOK
/*
 Route          /book/update
 Description    Update book on isbn
 Access         Public
 Parameter      isbn
 Methods        Put
*/
booky.put("/book/update/:isbn", async (req,res) => {
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            title: req.body.bookTitle
        },
        {
            new: true
        }
    );
    return res.json({
        books: updatedBook
    });
});

//UPDATING AUTHOR
/*
 Route          /book/author/update
 Description    Update/add new author
 Access         Public
 Parameter      isbn
 Methods        Put
*/

booky.put("/book/author/update/:isbn", async (req,res) => {
    //update book database
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            $addToSet: {
                authors: req.body.newAuthor
            }
        },
        {
            new: true
        }
    );

    //Update the author database
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: req.body.newAuthor
        },
        {
            $addToSet: {
                books: req.params.isbn
            }
        },
        {
            new: true
        }
    );
    return res.json(
        {
            books: updatedBook,
            author: updatedAuthor,
            message: "New author was added"
        }
    )
});

//UPDATE PUBLICATION
/*
 Route          /book/publications/update
 Description    Update/add new author
 Access         Public
 Parameter      isbn
 Methods        Put
*/
booky.put("/book/publications/update/:isbn", async (req,res) => {
    //Update Book Database
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN : req.params.isbn
        },
        {
            $addToSet: {
                books: req.params.isbn
            }
        },
        {
            new: true
        }
    );
    return res.json({
        books: updatedBook,
        author: updatedPublication,
        message: "New publication was added"
    });
});


//DELETE METHOD---------------------------------------------------------------------------------------------------------------------------
//DELETING BOOK
/*
 Route          /book/delete
 Description    Delete a book
 Access         Public
 Parameter      isbn
 Methods        delete
*/

booky.delete("/book/delete/:isbn", async (req,res) => {
    //whichever book that doesn't mathch with the isbn, just send it to an updatedBookDatabase array and rest will be filtered out

    const updatedBookDatabase = await BookModel.findOneAndDelete(
        {
            ISBN: req.params.isbn
        }
    );

    return res.json({
        books: updatedBookDatabase
    });
});

//DELETING AUTHOR
/*
 Route          /author/delete
 Description    Delete a author
 Access         Public
 Parameter      isbn
 Methods        delete
*/
booky.delete("/author/delete/:id", async (req,res) => {
    const updatedAuthorDatabase = await AuthorModel.findOneAndDelete({
        id: req.params.id
    });

    return res.json({
        authors: updatedAuthorDatabase
    });
});

//DELETE PUBLICATION
/*
 Route          /publication/delete
 Description    Delete a author
 Access         Public
 Parameter      isbn
 Methods        delete
*/
booky.delete("/publication/delete/:id", async (req,res) => {
    const updatedPublicationDatabase = await PublicationModel.findOneAndDelete({
        id: req.params.id
    });

    return res.json({
        publication: updatedPublicationDatabase
    });
});

//DELETE THE BOOK AND AUTHOR RELATED TO HIM
/*
 Route          /book/author/delete/
 Description    Delete a author from book and vice versa
 Access         Public
 Parameter      isbn,authorId
 Methods        delete
*/
booky.delete("/book/author/delete/:isbn/:authorId", async (req,res) => {
    //update Book database
    const updatedBookDatabase = await BookModel.findOneAndDelete({
        ISBN: req.params.isbn
    });

    //update Author database
    const updatedAuthorDatabase = await AuthorModel.findOneAndDelete({
        id: req.params.authorId
    });

    return res.json({
        books: updatedBookDatabase,
        authors: updatedAuthorDatabase,
        message: "Book & Author is deleted!!!"
    });
});

booky.listen(3000, () => {
    console.log("Server is up and running");
    
});