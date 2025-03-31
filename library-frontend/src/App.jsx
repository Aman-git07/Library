import { useState } from "react";
import "./App.css";
import axios from "axios";
import { useEffect } from "react";
import Header from "./components/Header/Header";
import TopNav from "./components/Navbar/TopNav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Listing from "./components/Navbar/Listing";
import AddBook from "./components/Navbar/AddBook";
import EditStatus from "./components/Navbar/EditStatus";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Footer from "./components/Footer/Footer";

function App() {
  const [bookList, setBookList] = useState([]);

  const fetchBooks = async () => {
    try {
      const resp = await axios.get("http://localhost:8080/library");
      console.log("fetched data", resp.data);
      setBookList(resp.data);
    } catch (e) {
      console.log("error occured while fetching: ", e);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <Header />
      <Router>
        <TopNav />
        <Routes>
          <Route exact path="/" element={<Listing bookList={bookList} />} />
          <Route
            exact
            path="/add"
            element={<AddBook fetchBooks={fetchBooks} />}
          />
          <Route
            exact
            path="/edit"
            element={
              <EditStatus
                bookList={bookList}
                setBookList={setBookList}
                fetchBooks={fetchBooks}
              />
            }
          />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
