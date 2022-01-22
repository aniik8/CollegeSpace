import React from 'react'
import Navbar from './Navbar'
import {BaseUrl} from './BaseUrl'

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../AuthComp/AxiosInstance'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ReactQuill from 'react-quill';
import Footer from './Footer'
import 'react-quill/dist/quill.snow.css';
import EditorToolbar, { modules, formats } from "../EditorToolbar";
import Error from './Error';

const Questions = () => {
    const [questions, setquestions]  = React.useState([])
    const [questionD, setquestionD] = React.useState({
        question : ""
    });
    const [questiond, setquestiond] = useState("")
    
    const [clicked, setClicked] = useState(false);
    useEffect(()=>{
        fetch(`${BaseUrl}questions`)
        .then((data) => data.json()).then((response)=> setquestions(response))}, [setquestions])

    const submitQ = () => {
        
        axiosInstance.post(`create-question`, {
            question : questionD.question,
            question_data : questiond,
            user : (JSON.parse(atob(localStorage.getItem('access_token').split('.')[1])).user_id) 
        }).then((res) => {alert("Submitted"); window.location.reload()});
        }
const handleChange = (event) => setquestiond(event)

    return (
        <>
        <Navbar/>
        <div className='container-md' style={{"marginTop" : "3rem", width : "75%"}} >
            <h1 style={{textAlign:"center"}}>Recently asked questions</h1>
            {clicked === true ? 
                <div className='container' style={{"marginTop" : "3%"}} >
                <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                
                <label htmlFor="exampleInputEmail1" style={{"fontSize" : "12px", "textAlign" : "center"}} >Question</label>
                <br/>
                <input type="text" value={questionD.question} onChange={(e) => setquestionD({question : e.target.value})} className="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Question"/>
                    <br/>
                    
                </div>
                </form>
                <>
                <EditorToolbar toolbarId={'t1'}/>
                    <ReactQuill
                        theme="snow"
                        placeholder={"Additional info of Q. here (Can be blank too)"}
                        modules={modules('t1')}
                        formats={formats}
                        value={questiond}
                        onChange={handleChange}
                        style={{"width" : "100%", "height" : "80%"}}
                        /> </>
                <br/>
                <button type='button' style={{"width" : "48%", "borderRadius" : "15px"}} className='btn btn-outline-success' onClick={submitQ}>Submit</button>
                <button type='submit' style={{"width" : "48%", "marginLeft" : "4%", "borderRadius" : "15px" }} className='btn btn-outline-danger' onClick={() => setClicked(false)}>Cancel</button>
                

            </div>:
            <>
            <p style={{"textAlign" : "center"}}>
            <button type='button' style={{"margin" : "auto 0", "fontSize" : "15px"}} className='btn btn-link' onClick={() => 
            {(((localStorage.getItem('access_token'))) !== null) ? setClicked(true) :<>{alert("Please Login/Signup to Access this")}</>}    
            }>Ask Question</button>
            </p>
            </>
         }
            <hr style={{"height":"2px", "width":"90%", "borderWidth":"0"}} />
            <div className='container-md' style={{width:"100%"}}>
            {((questions.length) !== 0) ? questions.map((item, index)=> 
           {
               return(
                   <> 
                   <div className="card"  style={{"width" : "85%", "margin" : "auto", "marginBottom" : "10px"}}>
                        <div className="card-body" key={item.id}>
                            <div key={index}>
                                <Link to={`/question/${item.slug}/${item.id}`}><h4> {item.question}</h4></Link>
                                <br/>
                                <p>Asked On : {Date(item.question_date).substr(0,16)}</p>
                            </div>
                        </div>
                    </div>
                    </>
                    )
            })
           : <Error/>}
           </div>
           
           </div>
           <div style={{"marginTop" : "120px"}}>
           <Footer/>
           </div>
           </>
)
}
export default Questions
