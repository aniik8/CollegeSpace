import React, { useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EditorToolbar, { modules, formats } from '../../EditorToolbar';
//"../EditorToolbar"
import Modal from '@material-ui/core/Modal';

import axiosInstance from '../../AuthComp/AxiosInstance'
import {BaseUrl} from '../BaseUrl'
const CreateN = (props) => {
    const history = useHistory();
    const [open, setOpen] = React.useState(props.show);
    const [notes, setnotes] = useState("");
    const [notes_ct, setNotesct] = useState({
        notes_title : ""
    })
    const handleClose = () => {
        setOpen(false);
        window.location.reload()
      };
    const sendNotes = () => {
        axiosInstance.post(`${BaseUrl}create-note`, {
            notes_title : notes_ct.notes_title,
            notes_content : notes,
            user : (JSON.parse(atob(localStorage.getItem('access_token').split('.')[1])).user_id) 
        }).then((res) => {alert("Created") ; window.location.reload()})
    }
    const changeEvent = (e) => {
        setNotesct({
            ...notes_ct,
            [e.target.name] : e.target.value
        })
    }
    return (
        <div>
          <div style={{ display: 'block', padding: 30 }} className='shadow p-3 mb-5 bg-white rounded'>
            <Modal
                onClose={handleClose}
                open={open}
                style={{ position: 'absolute', border: "1px solid", boxShadow: '3px #888888', height:"80%", width: "70%", margin: 'auto',backgroundColor : "white"}}>
                <div className='container shadow p-3 mb-5 bg-white rounded' style={{"height" : "100%"}}>
                <h2 style={{"textAlign" : "center", "fontFamily" : "serif"}}>Update your Notes</h2>
                <br/>
            <form onSubmit={(e) => {e.preventDefault(); }}>
                
                <div className="form-group form-group-lg">
                    <label style={{"fontSize" : "10px"}} htmlFor="exampleInputPassword1">Title</label>
                    <input type="text" name='notes_title' style={{"height" : "30px"}} value={notes_ct.notes_title} onChange={changeEvent} className="form-control input-lg" id="exampleInputPassword1" placeholder="Note Title"/>
                </div>
                </form>
                <br/>
                <h5>Notes Content</h5>

                <EditorToolbar className='Editor-1' toolbarId={`t96`}/>
                    <ReactQuill 
                    theme="snow"
                    modules={modules('t96')}
                    formats={formats}
                    value={notes}
                    style={{"height" : "42%"}}
                    onChange={(event) => setnotes(event)}
                    />
                    <br/>
                <button className='btn btn-outline-primary' style={{"width" : "48%", "borderRadius" : "30px"}} onClick={sendNotes}>Create</button>
                <button className='btn btn-outline-danger' style={{"marginLeft" : "4%","width" : "48%", "borderRadius" : "30px"}} onClick={handleClose}>Cancel</button>
                </div>
        
            </Modal>
    </div>  
        </div>
    )
}

export default CreateN
/*
    </div> */