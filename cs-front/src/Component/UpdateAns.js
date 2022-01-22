import React, {useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EditorToolbar, { modules, formats } from "../EditorToolbar";
import {BaseUrl} from './BaseUrl'
import Modal from '@material-ui/core/Modal';
import axiosInstance from '../AuthComp/AxiosInstance';
import {useHistory} from 'react-router-dom'
const UpdateAns = (props) => {
    const history = useHistory()
    const [open, setOpen] = React.useState(props.show);
    const [answr, setanswr] = useState({
        answer : "",
        question : Number,
        user : Number
    });
    
  const handleClose = () => {
    setOpen(false);
    history.push('/questions')
  };
  const getAnswer = async () => {
    const data = await fetch(`${BaseUrl}view-answer/${props.aid}`)
    const answers = await data.json()
   
    setanswr({
        answer : answers.answer,
        question : answers.question,
        user : answers.user
    })
    
    
  }
  // question and user is showing none. Possible reason can be because of the usage of state as object.
  
  const sendAnswer = () => {
          
    axiosInstance.post(`${BaseUrl}update-answer/${props.aid}`, {
        answer : answr.answer,
        user : props.uid,
        question : props.qid
    }).then((res) => {alert("Updated"); window.location.reload()})
  }

   useEffect(() => getAnswer(), [setanswr]);   
  return (
    <div style={{ display: 'block', padding: 30 }} className='shadow p-3 mb-5 bg-white rounded'>
      <Modal
        onClose={handleClose}
        open={open}
        style={{ position: 'absolute',
        border: "1px solid",
        boxShadow: '3px #888888',
          height:700,
          height:"80%",
          width: "70%",
          margin: 'auto',
        backgroundColor : "white"  
        }}>
        <div className='container shadow p-3 mb-5 bg-white rounded' style={{"height" : "100%"}}>
        <h2 style={{"textAlign" : "center", "fontFamily" : "serif"}}>Update your Answer</h2>
        <br/>
        <EditorToolbar className='Editor-7' toolbarId={'t5'}/>
                            <ReactQuill 
                            theme="snow"
                            style={{"height" : "70%"}}
                            value={answr.answer}
                            modules={modules('t5')}
                            formats={formats}
                            onChange={(event) => setanswr({answer : event})}    
                            /> 
                            <br/>
        <button className='btn btn-outline-primary' style={{"width" : "50%"}} onClick={sendAnswer}>Update</button>
        <button className='btn btn-outline-danger' style={{"width" : "50%"}} onClick={handleClose}>Cancel</button>
        </div>
        
      </Modal>
    </div>
  );
    
}

export default UpdateAns
