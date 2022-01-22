import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../BaseUrl'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EditorToolbar, { modules, formats } from '../../EditorToolbar';
import { NavLink } from 'react-router-dom';
import Error from '../Error'
const ViewAll = () => {
    const [notes, setAllnotes] = useState([])
    
    const getAllNotes = async () => {
        const data = await fetch(`${BaseUrl}view-notes`)
        const note = await data.json()
        setAllnotes(note)
       
    }
    useEffect(() => {
        getAllNotes();
    }, [setAllnotes])
    return (
        
        <>
            {notes.length === 0 ? <Error/> : 
            <>
            <div className='container' style={{"width" : "70%", "margin" : "auto"}}>
            {notes.map((item, index) => {
                return(
                <>
                    <div className="card" style={{"width" : "90%", "margin" : "auto", "marginBottom" : "10px"}}>
                                <div className="card-body">
                                    <NavLink to={`${item.slug}/${item.id}`} className="card-title" style={{"color" : "black", "fontSize" : "1.5em"}}>{item.notes_title}</NavLink>
                                    
                                    <EditorToolbar toolbarId={`t-${item.id}`}/>
                                        <ReactQuill
                                            theme="bubble"
                                            readOnly={true}
                                            modules={modules(`t-${item.id}`)}
                                            formats={formats}
                                            value={item.notes_content.substr(0,40)}
                                            style={{"fontSize" : "1.3em"}}
                                            /><NavLink to={`${item.slug}/${item.id}`} className="card-body" style={{"color" : "black"}}>Read more.....</NavLink>
                                    
                                    <p>Posted On : <b>{Date(item.created).substr(0,16)}</b></p>
                                </div>
                        </div>
                        
                            
                
                </>
                )
            })
            }
            </div>
            
            
            </>}
            </>
       
    )
}

export default ViewAll
