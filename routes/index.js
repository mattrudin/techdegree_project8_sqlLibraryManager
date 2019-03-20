/************************************************************************************
Require functions
************************************************************************************/
const express = require('express');
const router = express.Router();
const Book = require("../models").Book;

/************************************************************************************
Routes
************************************************************************************/
// Home route should redirect to the /books route.
router.get('/', (req, res) => {
    return res.redirect('/books');
});

// Shows the full list of books.
router.get('/books', (req, res) => {
    Book.findAll({order: [['title']]}).then((books) => {
        res.render('index', {books: books, title: "Books" });
      })
})
// Shows the create new book form.
router.get('/books/new', (req, res) => {
    res.render('new-book',{
        book: Book.build(),
        title: "New book"
    });
})
// Posts a new book to the database.
router.post('/books/new', (req, res) => {
    Book.create(req.body).then(article => res.redirect(`/books/${book.id}`));
})
// Shows book detail form.
router.get('/books/:id', (req, res) => {
    res.render(

    );
})
// Updates book info in the database.
router.post('/books/:id', (req, res) => {
    res.render(

    );
})
// Deletes a book. Careful, this can’t be undone. It can be helpful to create a new “test” book to test deleting.
router.post('/books/:id/delete', (req, res) => {
    res.render(

    );
})


module.exports = router;