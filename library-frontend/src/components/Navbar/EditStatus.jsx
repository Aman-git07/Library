import { useState } from "react";
import axios from "axios";
import "./EditStatus.css";

function EditStatus({ bookList, setBookList, fetchBooks }) {
  const [selectedBook, setSelectedBook] = useState(null);
  const [editName, setEditName] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [editGenre, setEditGenre] = useState("");
  const [editStatus, setEditStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successText, setSuccessText] = useState(null);

  if (bookList.length === 0) {
    return <h3>No books available.</h3>;
  }

  const handleDeleteClick = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`http://localhost:8080/library/${id}`);
      fetchBooks();
      setSuccessText("Book deleted successfully.");
    } catch (err) {
      setError("Failed to delete the book. Please try again.");
      console.error("Error updating book:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (book) => {
    setSelectedBook(book);
    setEditName(book.name);
    setEditAuthor(book.author);
    setEditGenre(book.genre);
    setEditStatus(book.status);
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    setError(null);
    setSuccessText(null);

    const updatedBook = {
      ...selectedBook,
      name: editName,
      author: editAuthor,
      genre: editGenre,
      status: editStatus,
    };

    try {
      await axios.put("http://localhost:8080/library", updatedBook);

      const updatedBookList = bookList.map((book) =>
        book.id === selectedBook.id ? updatedBook : book
      );
      setBookList(updatedBookList);

      fetchBooks();

      setSelectedBook(null);
      setSuccessText("Book updated successfully.");
    } catch (err) {
      setError("Failed to update the book. Please try again.");
      console.error("Error updating book:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h5>Edit Status</h5>
      <div className="book-list">
        {bookList.map((book, index) => (
          <div className="book-card" key={index} id={`book-card-${index}`}>
            <h6 title={book.name}>{book.name}</h6>
            <p title={book.author}>Author: {book.author}</p>
            <p title={book.genre}>Genre: {book.genre}</p>
            <p>Status: {book.status ? "Read" : "Unread"}</p>
            <div className="hover-info">
              <div className="btn-div">
                <button
                  className="btn editBtn btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                  onClick={() => handleEditClick(book)}
                >
                  Edit
                </button>
                <button
                  className="btn editBtn btn-sm"
                  onClick={() => handleDeleteClick(book.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fs-5" id="editModalLabel">
                Edit Book Entry
              </h5>
            </div>
            <div className="modal-body">
              {selectedBook ? (
                <div>
                  <div className="mb-3">
                    <label htmlFor="bookName" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control modal-input"
                      id="bookName"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="bookAuthor" className="form-label">
                      Author
                    </label>
                    <input
                      type="text"
                      className="form-control modal-input"
                      id="bookAuthor"
                      value={editAuthor}
                      onChange={(e) => setEditAuthor(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="bookGenre" className="form-label">
                      Genre
                    </label>
                    <input
                      type="text"
                      className="form-control modal-input"
                      id="bookGenre"
                      value={editGenre}
                      onChange={(e) => setEditGenre(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <div>
                      <input
                        type="radio"
                        id="read"
                        name="status"
                        value="Read"
                        checked={editStatus}
                        onChange={() => setEditStatus(true)}
                      />
                      <label htmlFor="read" className="me-3">
                        Read
                      </label>
                      <input
                        type="radio"
                        id="unread"
                        name="status"
                        value="Unread"
                        checked={!editStatus}
                        onChange={() => setEditStatus(false)}
                      />
                      <label htmlFor="unread">Unread</label>
                    </div>
                  </div>
                </div>
              ) : (
                <p>Select a book to edit.</p>
              )}
            </div>
            <div className="modal-footer">
              <button
                className="saveBtn"
                onClick={handleSaveChanges}
                data-bs-dismiss="modal"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save changes"}
              </button>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successText && <p style={{ color: "green" }}>{successText}</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default EditStatus;
