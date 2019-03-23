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
router.get('/', (req, res, next) => {
    return res.redirect('/books');
});

// Shows the full list of books. -- DONE
router.get('/books', (req, res, next) => {
    Book.findAll({order: [['title']]}).then(books => {
        res.render('index', {books: books, title: "Books" });
      }).catch(error => {
        res.send(500, error);
     });
})
// Shows the create new book form. -- DONE
router.get('/books/new', (req, res, next) => {
    res.render('new-book',{
        book: Book.build(),
        title: "New Book"
    })
})
// Posts a new book to the database. -- DONE
router.post('/books/new', (req, res, next) => {
    Book.create(req.body).then(book => {
        res.redirect(`/books/${book.id}`);
    }).catch(error => {
        if(error.name === "SequelizeValidationError") {
          res.render("new-book", {
            book: Book.build(req.body), 
            errors: error, 
            title: "New Book"})
        } else {
          throw error;
        }
    }).catch(error => {
        res.status(500).send(error);
     });
})
// Shows book detail form. -- DONE
router.get('/books/:id', (req, res, next) => {
    Book.findByPk(req.params.id).then(book => {
        if(book) {
          res.render("update-book", {book: book, title: "Book Detail"});  
        } else {
          res.send(404);
        }
      }).catch(error => {
        res.send(500, error);
     });

});
// Updates book info in the database. -- DONE
router.put('/books/:id', (req, res, next) => {
      Book.findByPk(req.params.id).then(book => {
        return book.update(req.body);
      }).then(book => {
        res.redirect(`/books/${book.id}`)
      }).catch(error => {
        if(error.name === "SequelizeValidationError") {
          res.render("new-book", {
            book: Book.build(req.body), 
            errors: error, 
            title: "Edit Book"})
        } else {
          throw error;
        }
    }).catch(error => {
        res.send(500, error);
     });
})
// Deletes a book. Careful, this can’t be undone. It can be helpful to create a new “test” book to test deleting. -- DONE
router.post('/books/:id/delete', (req, res, next) => {
  Book.findByPk(req.params.id).then(book => {
    return book.destroy();
  }).then(() => {
    res.redirect('/books');
  }).catch(error => {
    res.send(500, error);
 });
})


module.exports = router;