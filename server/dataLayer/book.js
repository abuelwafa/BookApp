const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const _includes = require('lodash/includes');
const _size = require('lodash/size');

const adapter = new FileSync('server/database/books.json');
const db = low(adapter);

const authorDL = require('./author');

function getBooks(pageNumber, pageSize) {
  var books = db.get('books');
  return {
    totalCount: 100,
    books: books.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize),
  };
}

function getBookById(id) {
  return db.get('books').find({ id: id });
}

function searchForBook(query) {
  const author = authorDL.getAuthorByName(query);
  const authorId = author && author.id;

  const _query = authorId || query;

  return db.get('books').find(function(book) {
    return (
      _includes(book.title, _query) ||
      _includes(book.author, _query) ||
      _includes(book.isbn, _query)
    );
  });
}

// title
// author

// isbn

exports.getBooks = getBooks;
exports.getBookById = getBookById;
exports.searchForBook = searchForBook;