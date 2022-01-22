import React, {useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EditorToolbar, { modules, formats } from "../EditorToolbar";
import axiosInstance from '../AuthComp/AxiosInstance';
import Modal from '@material-ui/core/Modal';

const UpdateQ = (props) => {
    const [ques, setques] = useState(props.q)
    const [open, setOpen] = React.useState(props.clickeed);

    const handleClose = () => {
        setOpen(false);
        window.location.reload();
      };
    const [ques_dta, setques_dta] = useState(props.qd)
    
    const sendData = () => {
        axiosInstance.post(`update-question/${props.qslug}/${props.qid}`, {
            question : ques,
            question_data : ques_dta ,
            user : (JSON.parse(atob(localStorage.getItem('access_token').split('.')[1])).user_id)
        }).then((res) =>{alert("Updated"); window.location.reload()}).catch((err) => console.log(err))
    }
    return(
    <>
    { props.q !== undefined ? 
    <>
    <div style={{ display: 'block', padding: 30 }} className='shadow p-3 mb-5 bg-white rounded'>
            <Modal
                onClose={handleClose}
                open={open}
                style={{ position: 'absolute', border: "1px solid", boxShadow: '3px #888888', height:"80%", width: "70%", margin: 'auto',backgroundColor : "white"}}>
                <div className='container shadow p-3 mb-5 bg-white rounded' style={{"height" : "100%"}}>
                <h2 style={{"textAlign" : "center", "fontFamily" : "serif"}}>Update your Question</h2>
                <br/>
            <form onSubmit={(e) => {e.preventDefault(); }}>
                
                <div className="form-group form-group-lg">
                    <label style={{"fontSize" : "10px"}} htmlFor="exampleInputPassword1">Title</label>
                    <input type="text" name='q_title' style={{"height" : "30px"}} value={ques} onChange={(e) => setques(e.target.value)}
                      className="form-control input-lg"
                     id="exampleInputPassword1" placeholder="Note Title"/>
                </div>
                </form>
                <br/>
                <h5>Additional</h5>
{/* value={} onChange={} */}
                <EditorToolbar className='Editor-1' toolbarId={'t9'}/>
                    <ReactQuill 
                    theme="snow"
                    modules={modules('t9')}
                    formats={formats}
                    style={{"height" : "40%"}}
                    value={ques_dta} onChange={(event) => setques_dta(event)} 
                    />
                    <br/>
                <button className='btn btn-outline-primary' style={{"width" : "48%"}} onClick={sendData}>Update</button>
                <button className='btn btn-outline-danger' style={{"marginLeft" : "4%" ,"width" : "48%"}} onClick={handleClose}>Cancel</button>
                </div>
        
            </Modal>
    </div>
    </>
    : <h1>Data Not available</h1>}
    
    </>
    )
}


export default UpdateQ




