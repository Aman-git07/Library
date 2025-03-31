import "./TopNav.css";

function Listing({ bookList }) {
  if (bookList.length === 0) {
    return <h3>No books available.</h3>;
  }
  return (
    <>
      <h5>All Books</h5>
      <div className="book-list">
        {bookList.map((book, index) => (
          <div className="book-card" key={index}>
            <h6 title={book.name}>{book.name}</h6>
            <p title={book.author}>Author: {book.author}</p>
            <p title={book.genre}>Genre: {book.genre}</p>
            <p>Status: {book.status ? "Read" : "Unread"}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Listing;
