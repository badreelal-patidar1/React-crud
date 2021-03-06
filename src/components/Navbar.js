import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">NCS^</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item hvr-underline-from-center ">
              <Link className="nav-link active" to="/">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item hvr-underline-from-center ">
              <Link className="nav-link hvr-underline-from-center" to="/colleges">College <span className="sr-only"></span></Link>
            </li>
            <li className="nav-item hvr-underline-from-center ">
              <Link className="nav-link hvr-underline-from-center" to="/marksheet">Marksheet <span className="sr-only"></span></Link>
            </li>
            <li className="nav-item hvr-underline-from-center">
              <Link className="nav-link hvr-underline-from-center" to="/role">Role <span className="sr-only"></span></Link>
            </li>
            <li className="nav-item hvr-underline-from-center">
              <Link className="nav-link hvr-underline-from-center" to="/user">User <span className="sr-only"></span></Link>
            </li>
            <li className="nav-item hvr-underline-from-center">
              <Link className="nav-link hvr-underline-from-center" to="/student">Student <span className="sr-only"></span></Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
