import React from 'react'
import { Link } from 'react-router-dom'
import '../index.css'
const Header = () => {
    return (
        <>
      <header>
        <section className="container main-hero-container">
          <div className="row">
            <div className="col-12 col-lg-6 header-left-side d-flex justify-content-center flex-column align-items-start ">
              <h1 className="display-2">
                All your College related work made easy For You.
              </h1>
              <p className="main-hero-para">
                CollegeSpace is a space for students for their College related work. Be it's asking Question, 
                Answering them. Creating their notes with all the symbols, images from anywhere around the Internet, printing your Notes Or to make a Chatroom
                to chat in Group. All things at one place at <b>CollegeSpace 😃  </b>
              </p>
              <h3>Join Now. It's Free</h3>
              <div className="input-group mt-3">
                <input
                  type="text"
                  className="rounded-pill w-50  w-lg-75 me-3 p-2 form-control-text"
                  placeholder="Enter Your Email"
                />
                <div className="input-group-button"><Link to='/signup'>Join Now </Link>
                </div>
              </div>
            </div>
            {/*  --------------- main header right side--------------  */}
            <div className="col-12 col-lg-6 header-right-side d-flex justify-content-center align-items-center main-herosection-images">
              <img
                src="./images/hero5.gif"
                alt="heroimg"
                className="img-fluid"
                style={{"height" : "80%"}}
              />
              {/* <img
                src="./images/hero3.jpeg"
                alt="heroimg4"
                className="img-fluid main-hero-img2"
              /> */}
            </div>
          </div>
        </section>
      </header>
    </>
    )
}

export default Header
