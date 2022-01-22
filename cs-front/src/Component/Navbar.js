import React, {useState} from 'react'
import { NavLink, useHistory } from 'react-router-dom';

const Navbar = () => {
    const [show, setShow] = useState(false);
    const history = useHistory()
    console.log();
    return (
        <>
        <section className="navbar-bg">
            <nav className="navbar navbar-expand-lg navbar-light ">
          <div className="container">
            <a className="navbar-brand" href="/">
              Collegespace
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => setShow(!show)}>
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse ${show ? "show" : ""}`}>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link active" aria-current="page" to='/'>
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to='/questions'>
                    Questions
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to='/notes'>
                    Notes
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to='/chat'>
                    Chatroom
                  </NavLink>
                </li>
              </ul>
              <form className="d-flex">
              {(localStorage.getItem('access_token'))===null ? <><button className="btn  btn-style" type="submit" onClick={() => history.push('/Signup')}>
                  Sign Up
                </button>
                <button className="btn  btn-style btn-style-border" type="submit" onClick={() => history.push('/Login')}>
                  Log in
                </button></>
              : <button className="btn  btn-style btn-style-border" type="submit" onClick={() => history.push('/Logout')}>
                  Log out
                </button>}
                
              </form>
            </div>
          </div>
        </nav>
      </section>
    </>
  );
};

export default Navbar
