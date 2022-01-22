import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import {useHistory} from 'react-router-dom'
import { BaseUrl } from '../BaseUrl'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EditorToolbar, { modules, formats } from '../../EditorToolbar';
import UpdateN from './UpdateN';
import DeleteN from './DeleteN';
import Error from '../Error';
import UserDet from './UserDet';
import { useRef } from "react";
import ReactToPrint from 'react-to-print';

const ViewSNote = React.forwardRef((props, ref) => {
    
   const  history = useHistory()
    const [notes, setnotes] = useState([])
    
    const [showupdate, setupdate] = useState({update : false, delete : false, s : false})
    const getNotes = async () => {
        const data = await fetch(`${BaseUrl}view-notes${history.location.pathname}`)
        const note = await data.json()
        setnotes(note)
       }
    useEffect(() => {
        getNotes();
    }, [setnotes])
    const [isOpen, setIsOpen] = useState(false)
    const toggleOpen = () => setIsOpen(!isOpen);
    const toggleClose = () => setIsOpen({isOpen : !isOpen})
    const menuClass = `dropdown-menu${isOpen ? " show" : ""}`;

  
    return (
        <>
        
        <div className='container'>
        <div className='row row-fluid'>
        
        <div className='col-lg-6 offset-md-3' >
        <div className='container-md' style={{"marginTop" : "3rem", "width" : "100%"}}>
        
        {typeof notes !== undefined ?
            <div id="printNote">
            <br/>
                {(((localStorage.getItem('access_token'))) !== null) &&
                  notes.user === (JSON.parse(atob(localStorage.getItem('access_token').split('.')[1])).user_id) ?
                
                <div className="dropdown" onClick={toggleOpen} onDoubleClick={toggleClose} style={{"marginLeft": "1%", "width" : "20px"}} >
        <button
          className="btn btn-outline-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
        ></button>
        <div className={menuClass} aria-labelledby="dropdownMenuButton" style={{"width" : "5%"}}>
          <button className='dropdown-item btn btn-outline-primary'  onClick={() => setupdate({update:true})}>Update</button>
          <button className='dropdown-item btn btn-outline-danger'  onClick={() => setupdate({ delete : true})}>Delete</button>
          </div>
      </div>
                
                
                
                 : <></>}
                
                <div ref={ref}>
                <h1 key={notes.id} style={{"textAlign" : "center"}}>{notes.notes_title}</h1>
                <p style={{"textAlign":"center"}}>Posted On : {Date(notes.created).substr(0,16)}</p>
                
                <hr style={{"width" : "100%", "margin" : "auto"}}/>
                
                <EditorToolbar toolbarId={'t2'}/>
                    <ReactQuill
                        theme="bubble"
                        readOnly={true}
                        modules={modules('t2')}
                        formats={formats}
                        value={notes.notes_content}
                        style={{"marginLeft" : "auto", "marginRight" : "auto", "marginTop" : "2rem", "width" : "100%", "fontFamily" : "serif", "fontSize" : "16px"}}
                    />
                {/* <button className='btn btn-outline-success' onClick={printNotes} style={{"width" : "100%"}}>Print</button> */}
          </div></div>
         : <h5><Error/></h5>}
        </div>
        </div>
        
        <div className='col' style={{"marginTop" : "130px"}}>
            {typeof notes !== "undefined" ? <UserDet/> : <h5> No data available</h5>}
        </div>
        {showupdate.update === true ?<>
            <UpdateN note_t = {notes.notes_title} note_con={notes.notes_content} show={true} user_id={notes.user}/>
        </> :<></> }
        {showupdate.delete === true ?<>
            <DeleteN del={true} id={notes.id}/>
        </> :<></> }
        </div>
        </div>
        </>
    )
}
)
const Example = () => {
    const componentRef = useRef();
  
    return (
      <div>
      <Navbar/>
      <ViewSNote ref={componentRef} />
        <ReactToPrint
          trigger={() => 
          <button className='btn btn-outline-success' style={{"width" : "20%", "marginLeft" : "40%"}}>Print this out!</button>
          
          }
          content={() => componentRef.current}
        />
        
      </div>
    );
  };

export {ViewSNote, Example}
{/* style={{"width": "20%", "marginRight" : "10%"}} style={{"width": "20%", "margin" : "auto"}}*/}