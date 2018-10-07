import React from 'react';

import requester from '../../../utilities/api/requester';
import { fetchBooksAPI } from '../apis';

// import BookCard from 'components/shared/BookCard';

export default class SuggestedBooks extends React.Component {
  state = {
    books: [],
    config: {
      pageNumber: Math.floor(Math.random() * 9 + 1), // get random number from 1 -> 9
      pageSize: 3,
    },
  };

  componentDidMount() {
    const { config } = this.state;
    requester(
      {
        url: fetchBooksAPI,
        method: 'GET',
        params: config,
      },
      response => {
        this.setState({
          books: response.data.books,
        });
      },
    );
  }

  render() {
    const { books } = this.state;

    const bookCards = books.map(book => {
      return (
        <div className="column" key={book.id}>
          {/* <BookCard book={book} key={book.id} /> */}
        </div>
      );
    });

    return <div className="columns is-multiline is-desktop">{bookCards}</div>;
  }
}
