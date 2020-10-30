/*
File name: books.js
Author name: Joseph Volpe
Student ID: 301118010
Web App name: Mid-Term-JFV
*/

// modules required for routing
const { Console } = require('console');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const books = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  books.Model.find( (err, books) => {
    if (err) {
      console.log("test");
      return console.error(err);
      
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GETs the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
      res.render('books/details.ejs', {title: 'Add a book', books:''});
});

// POSTs process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
  // instantiate a new object of type Component
  let Book = books.Model({
    "Title": req.body.title,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
  });

  //Creates model and redirects on success
  books.Model.create(Book, (err, Books) => {

    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.redirect('/books');
    }
  });
});

// GETs the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  //Finds book based on ID then renders ID page
  books.Model.findById(id, (err, BooksToEdit) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    res.render('books/details.ejs', { title: 'Edit Books', books: BooksToEdit });
   
    }
 )
});

// POSTs - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) =>
{
  let id = req.params.id;
  let updateBooks = books.Model({
    "_id": id,
    "Title": req.body.title,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
  });
  
  //Updates the book information for specific ID
  books.Model.updateOne({ _id: id }, updateBooks, (err) => {
    if (err)
    {
      console.log(err);
      res.end(err);
    }
    res.redirect('/books')
  })


});

// GETs - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;
  
  //Removes book from database using ID, then redirects on success
  books.Model.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    res.redirect('/books');
  });
});


module.exports = router;
