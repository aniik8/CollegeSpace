import React from "react";
import './Footer.css'
import {Link} from 'react-router-dom'
const Footer = () => {
return (
<div className="footer" style={{"marginTop" : "40px"}}>
        <div className="container">
            <div className="row">
                <div className="col-md-4 col-xs-12">
                    <div className="first">
                        <h4>Features</h4>
                        <p> Ask/Answer Questions</p>
                        <p> Create Your Notes</p>
                        <p> Update Delete them</p>
                        <p> Make their Pdfs</p>
                        <p> Chat in Groups</p>
                        <p> Easy to use </p>
                    </div>
                </div>

                <div className="col-md-4 col-xs-12">
                    <div className="second">
                        <h4> Navigate</h4>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/chat">Chatroom</Link></li>
                            <li><Link to="/questions">Questions</Link></li>
                            <li><Link to="/notes">Notes</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="col-md-4 col-xs-12">
                    <div className="third">
                        <h4> Contact</h4>
                        <ul>
                            <li>Aniket Sharma </li>
                            <li>
                                Github : aniik8
                            </li>


                          <li><i className="far fa-envelope"></i>Gmail : aniketmessi3@gmail.com</li>
                            <li><i className="far fa-envelope"></i> L.In : Aniket Sharma</li>


                          <li><i className="fas fa-map-marker-alt"></i> India </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="line"></div>
                    <div className="second2">
                        <a href="https://codepen.io" target="_blank" rel="noopener noreferrer"> <i className="fab fa-codepen fa-2x margin"></i></a>
                        <a href="https://github.com/aniik8" target="_blank" rel="noopener noreferrer"> <i className="fab fa-github fa-2x margin"></i></a>
                        <a href="https://in.linkedin.com/in/aniket-sharma-a72054100" target="_blank" rel="noopener noreferrer"> <i className="fab fa-linkedin fa-2x margin"></i></a>
                        <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube fa-2x margin" ></i></a>
                        <p style={{"textAlign" : "center", "marginTop" : "35px"}}>2022 CollegeSpace 😉</p>
                    </div>
                        
                </div>
            </div>
            </div>
    </div>
   



);
};
export default Footer;

