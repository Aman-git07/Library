import { useState } from "react";
import axios from "axios";
import "./AddBook.css";

function AddBook({ fetchBooks }) {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [read, setRead] = useState(false);
  const [error, setError] = useState(null);
  const [successText, setSuccessText] = useState(null);
  const [loading, setLoading] = useState(false);

  const addBook = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Book name cannot be empty");
      return;
    }

    if (!author.trim()) {
      setError("Book author cannot be empty");
      return;
    }

    if (!genre.trim()) {
      setError("Genre cannot be empty");
      return;
    }

    setError(null);
    setSuccessText(null);
    setLoading(true);

    try {
      await axios.post("http://localhost:8080/library", {
        name,
        author,
        genre,
        read,
      });
      fetchBooks();

      setName("");
      setAuthor("");
      setGenre("");
      setRead(false);
    } catch (err) {
      setError("Failed to add book. Please try again.");
      console.error("Error adding book:", err);
    } finally {
      setLoading(false);
      setSuccessText("Book added successfully.");
    }
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ marginTop: "1%" }}
      >
        <form className="w-50">
          <div className="row mb-3">
            <label htmlFor="bookTitle" className="col-sm-4 col-form-label">
              Title of the book:
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="bookTitle"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="bookauthor" className="col-sm-4 col-form-label">
              Author:
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="bookauthor"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="genre" className="col-sm-4 col-form-label">
              Genre:
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="bookGenre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
            </div>
          </div>
          <fieldset className="row mb-3">
            <legend className="col-form-label col-sm-4 pt-0">
              Have you read the book?
            </legend>
            <div className="col-sm-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gridRadios"
                  id="readRadio"
                  value="true"
                  checked={read}
                  onChange={() => setRead(true)}
                />
                <label className="form-check-label" htmlFor="readRadio">
                  Read
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gridRadios"
                  id="unreadRadio"
                  value="false"
                  checked={!read}
                  onChange={() => setRead(false)}
                />
                <label className="form-check-label" htmlFor="unreadRadio">
                  Unread
                </label>
              </div>
            </div>
          </fieldset>
          <button className="addBtn" onClick={addBook} disabled={loading}>
            Add
          </button>
        </form>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {loading && <p>Loading...</p>}
      {successText && <p style={{ color: "green" }}>{successText}</p>}{" "}
    </>
  );
}

export default AddBook;
