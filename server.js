const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;


// Books for bookstore API
let books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        copiesAvailable: 5
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        copiesAvailable: 3
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian Fiction",
        copiesAvailable: 7
    }
    // Add more books if you'd like!
];


app.listen(port, () => {
    console.log(`Book API Server running at http://localhost:${port} `);
});

/* Create your REST API here with the following endpoints:
    'GET /api/books': 'Get all books',
    'GET /api/books/:id': 'Get a specific book',
    'POST /api/books': 'Add a new book',
    'PUT /api/books/:id': 'Update a book',
    'DELETE /api/books/:id': 'Delete a book'
*/

app.get("/api/books", (req, res) => {
    res.json(books); //gets all books
});

app.get("/api/books/:id", (req, res) => {
    const bookId = parseInt(req.params.id); //returns specific book using id
    const book = books.find(b => b.id === bookId);

    if (book) { //give error if book can't be found through id
        res.json(book); //returns as long as book is found
    } else {
        res.status(404).json({ error: "Book Not Found"});
    }

});


app.post("/api/books", (req, res) => {
    const { title, author, genre, copiesAvailable } = req.body; //extracts data from the request body

    //creates the new book
    const newBook = {
        id: books.length + 1,
        title,
        author,
        genre,
        copiesAvailable
    };

    books.push(newBook);
    res.status(201).json(newBook); //return 201 status


});


app.put("/api/books/:id", (req, res) =>{ //allows changes to be made to book based on id
    const bookId = parseInt(req.params.id); 
    const { title, author, genre, copiesAvailable } = req.body;
    //finds the specific book
    const bookIndex = books.find(b => b.id === bookId);

    if (bookIndex == -1) {
        return res.status(404).json({ error: "Book Not Found" }); //returns 404 status and an error if book cant be found
    }

    books[bookIndex] = {
        id: bookId,
        title,
        author,
        genre,
        copiesAvailable
    };

    res.json(books[bookIndex]);

});

app.delete("/api/books/:id", (req, res) => {
    const bookId = parseInt(req.params.id);

    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({ error: "Book Not Found" }); //checks if book exists
    }

    const deletedBook = books.splice(bookIndex, 1)[0]; //deletes book from array

    //returns deleted book wilth message
    res.json({ message: "Book Deleted Successfully", book:deletedBook});
});

module.exports = app;



