const express = require('express');
const router = express.Router();

/************************************************************************************
Routes
************************************************************************************/
// Home route should redirect to the /books route.
router.get('/', (req, res) => {
    return res.redirect('/books');
});

// Shows the full list of books.
router.get('/books', (req, res) => {
    res.render('index', {title: "Books"});
})
// Shows the create new book form.
router.get('/books/new', (req, res) => {
    res.render(
        'new-book'
    );
})
// Posts a new book to the database.
router.post('/books/new', (req, res) => {
    res.render(
        'new-book'
    );
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