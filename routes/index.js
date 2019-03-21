/************************************************************************************
Require functions
************************************************************************************/
const express = require('express');
const router = express.Router();
const Book = require("../models").Book;

/************************************************************************************
Routes
************************************************************************************/
// Home route should redirect to the /books route. -- DONE
router.get('/', (req, res) => {
    return res.redirect('/books');
});

// Shows the full list of books. -- DONE
router.get('/books', (req, res) => {
    Book.findAll({order: [['title']]}).then(books => {
        res.render('index', {books: books, title: "Books" });
      }).catch(error => {
        res.send(500, error);
     });
})
// Shows the create new book form. -- DONE
router.get('/books/new', (req, res) => {
    res.render('new-book',{
        book: Book.build(),
        title: "New book"
    })
})
// Posts a new book to the database.
router.post('/books/new', (req, res) => {
    Book.create(req.body).then(book => {
        res.redirect(`/books/${book.id}`)
    }).catch(error => {
        if(error.name === "SequelizeValidationError") {
          res.render("new-book", {book: Book.build(req.body), errors: error.errors, title: "New Book"})
        } else {
          throw error;
        }
    }).catch(error => {
        res.status(500).send(error);
     });
})
// Shows book detail form. -- DONE
router.get('/books/:id', (req, res) => {
    Book.findByPk(req.params.id).then(book => {
        if(book) {
          res.render("update-book", {book: book, title: book.title});  
        } else {
          res.send(404);
        }
      }).catch(error => {
        res.send(500, error);
     });

});
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