import React, { useState } from 'react'
import { useEffect } from 'react'
import { BaseUrl } from '../BaseUrl'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EditorToolbar, { modules, formats } from '../../EditorToolbar';
import { NavLink } from 'react-router-dom';
import Error from '../Error'
const ViewUNotes = () => {

    const [notes, setusernotes] = useState([]);
    
    const u_id = (((localStorage.getItem('access_token'))) !== null) ? (JSON.parse(atob(localStorage.getItem('access_token').split('.')[1])).user_id) : null
    const getUserData = async() => {
        const data = await fetch(`${BaseUrl}view-user-notes/${u_id}`)
        const note = await data.json()
        setusernotes(note)
    }
    
    useEffect(() => {
        getUserData();    
    }, [setusernotes])
    return (
        <div className='row'>

        <div className='col-sm-3'>
        </div>
        <div className='col-md-6'>
        <div className='container'>
        
        {notes.length === 0 || u_id === null ?<><Error/> 
        {u_id === null ? <h4 style={{"textAlign" : "center"}}>And View/Create Your Notes.</h4> : 
       <>
        <h4 style={{"textAlign" : "center", "fontFamily" : "sans-serif"}}>
            Hey! It seems you've no notes here. <br/>Create Your first Note, By clicking on Create Button Above
        </h4>
        
         </>} 
        
        <p></p></>  : 
            <>
            <div className='container' style={{"width" : "90%", "margin" : "auto"}}>

            {notes.map((item, index) => {
                return(
                    <div className="card" style={{"width" : "100%", "margin" : "auto", "marginBottom" : "10px"}}>
                                <div className="card-body">
                    <NavLink to={`${item.slug}/${item.id}`} className="card-title" style={{"color" : "black", "fontSize" : "1.5em"}}>{item.notes_title}</NavLink>
                
                
                <EditorToolbar toolbarId={`t-${index}`}/>
                    <ReactQuill
                        theme="bubble"
                        readOnly={true}
                        modules={modules(`t-${index}`)}
                        formats={formats}
                        value={item.notes_content}
                        
                        /><NavLink to={`${item.slug}/${item.id}`} className="card-body" style={{"color" : "black"}}>Read more.....</NavLink>
                        <p>Posted On : {Date(item.created).substr(0,16)}</p>
                </div>
                </div>
                )
            })}
            </div>
            </>    
            }
</div>
        </div>
        </div>
    )
}

export default ViewUNotes
