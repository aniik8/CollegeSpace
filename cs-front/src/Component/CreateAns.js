import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axiosInstance from '../AuthComp/AxiosInstance';
import EditorToolbar, { modules , formats} from "../EditorToolbar";

import { Modal } from '@material-ui/core';
const CreateAns = (props) => {
    
    const [answer, setAnswer] = useState({ answers : " "});
    const [open, setOpen] = useState(props.open);
    const handleClose = () => {
        setOpen(false);
        window.location.reload()
      };
    const submitAnswer = () => {
        axiosInstance.post(`create-answer` , {
            answer : answer.answers,
            question : props.qid,
            user : (JSON.parse(atob(localStorage.getItem('access_token').split('.')[1])).user_id)
        }).then((res) => {alert("Answered"); window.location.reload()})
    }

    const answerChange = (event) => setAnswer({ answers : event})
    
    return (
        
        <>
            <div style={{ display: 'block', padding: 30 }} className='shadow p-3 mb-5 bg-white rounded'>
            <Modal
                onClose={handleClose}
                open={open}
                style={{ position: 'absolute', border: "1px solid", boxShadow: '3px #888888', height:"80%", width: "70%", margin: 'auto',backgroundColor : "white"}}>
                <div className='container shadow p-3 mb-5 bg-white rounded' style={{"height" : "100%"}}>
                <h2 style={{"textAlign" : "center", "fontFamily" : "serif"}}>Write your Answer</h2>
                <EditorToolbar className='Editor-1' toolbarId={'t9'}/>
                    <ReactQuill 
                    theme="snow"
                    modules={modules('t9')}
                    formats={formats}
                    value={answer.answers}
                    style={{"height" : "42%"}}
                    onChange={answerChange}
                    />
                    <br/>
                <button className='btn btn-outline-primary' style={{"width" : "50%"}} onClick={submitAnswer}>Create</button>
                <button className='btn btn-outline-danger' style={{"width" : "50%"}} onClick={handleClose}>Cancel</button>
                </div>
        
            </Modal>
    </div> 
        </>
    )
}

export default CreateAns

//fixing some bugs like
//1 . redirecting user to login page if not logged in --> checking for token in error. if yes then okay :DONE
// 2. refreshing done
//3.2 removing console .log 
//3 . testing and deploying
//