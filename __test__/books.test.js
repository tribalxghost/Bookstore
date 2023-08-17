
const request = require("supertest");


const app = require("../app");
const db = require("../db");
const Book = require("../models/book");



describe("Test Book class", function () {
    beforeEach(async function () {
        await db.query('DELETE FROM books')
        let b = await Book.create({
            "isbn": "0691161518",
            "amazon_url": "http://a.co/eobPtX2",
            "author": "Matthew Lane",
            "language": "english",
            "pages": 264,
            "publisher": "Princeton University Press",
            "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
            "year": 2017

        });
    });


        test("Create Book", async function () {
            let b = await Book.create({
                "isbn": "0000000000",
                "amazon_url": "http://a.co/test",
                "author": "Tester",
                "language": "english",
                "pages": 122,
                "publisher": "Tester1",
                "title": "BigTest",
                "year": 2023
            });
    
            expect(b.isbn).toBe("0000000000");
            expect(b.year).toBe(2023);
        });
   
        test("Gets all books", async function () {
        let b = await Book.findAll()
        expect(b).toEqual([{
            "isbn": "0691161518",
            "amazon_url": "http://a.co/eobPtX2",
            "author": "Matthew Lane",
            "language": "english",
            "pages": 264,
            "publisher": "Princeton University Press",
            "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
            "year": 2017

        }])
    })

    test("GET all books", async function(){
        let response = await request(app)
        .get("/books")
        expect(response.statusCode).toEqual(200)
        expect(response.body.books).toEqual(
        [{"isbn": "0691161518",
        "amazon_url": "http://a.co/eobPtX2",
        "author": "Matthew Lane",
        "language": "english",
        "pages": 264,
        "publisher": "Princeton University Press",
        "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
        "year": 2017}])
    })
    test("GET book by id", async function(){
        let response = await request(app)
        .get('/books/0691161518')
        expect(response.statusCode).toEqual(200)
        expect(response.body.book).toEqual(
            {"isbn": "0691161518",
            "amazon_url": "http://a.co/eobPtX2",
            "author": "Matthew Lane",
            "language": "english",
            "pages": 264,
            "publisher": "Princeton University Press",
            "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
            "year": 2017}

        )
    })
    test("UPDATE book", async function(){
        let response = await request(app)
        .put("/books/0691161518")
        .send({
            "isbn": "0691161518",
            "amazon_url": "http://a.co/eobPtX2",
            "author": "Andrew",
            "language": "english",
            "pages": 264,
            "publisher": "TEEEEEESSSTTT",
            "title": "DREW AND DREW",
            "year": 2017
        })

        expect(response.body.book).toEqual({
            "isbn": "0691161518",
            "amazon_url": "http://a.co/eobPtX2",
            "author": "Andrew",
            "language": "english",
            "pages": 264,
            "publisher": "TEEEEEESSSTTT",
            "title": "DREW AND DREW",
            "year": 2017
        })
    })

    test("DELETE book", async function(){
        let response = await request(app)
        .delete("/books/0691161518")
        expect(response.body.message).toEqual("Book deleted")
    })

   
})

afterAll(async function() {
    await db.end();
  });