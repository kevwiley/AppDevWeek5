const request = require("supertest");
const app = require("../server.js");

describe("Books API Tests", () => {

    test("Should return all books", async () => {
        const response = await request(app).get("/api/books");
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(3);//three books should be returned
    });

    test("Should return book by ID", async () => {
        const response = await request(app).get("/api/books/1");
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id", 1);
        expect(response.body).toHaveProperty("title");//book should have at least an id and title
    });

    test("POST creates new book", async () => {
        const newBook = {
            title: "NewBook",
            author: "AuthorGuy",
            genre: "Fiction",
            copiesAvailable: 5
        };
        const response = await request(app).post("/api/books").send(newBook);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id", 4);
        expect(response.body.title).toBe("NewBook"); //new book should have new id and coorect title
    });

    test("PUT updates book", async () => {
        const updateBook = {
            id: 1,
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            genre: "Tragedy",
            copiesAvailable: 5
        };

        const response = await request(app).put("/api/books/1").send(updateBook);
        expect(response.status).toBe(200);
        expect(response.body.genre).toBe("Tragedy"); //should update genre
    });

    test("Should delete existing book", async () => {
        const response = await request(app).delete('/api/books/1');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("book") //should be deleted
    });

        test("Should retrun 404 error when given non existant id", async () => {
        const response = await request(app).get("/api/books/50");
        expect(response.status).toBe(404); //404 means an error is returned because of invalid id
    });

});