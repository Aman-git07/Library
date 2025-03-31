import { Link } from "react-router-dom";
import "./TopNav.css";

function TopNav() {
  return (
    <>
      <nav id="top-nav" className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-ul">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  My Books
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add">
                  Add Book
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/edit">
                  Edit Status
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default TopNav;
