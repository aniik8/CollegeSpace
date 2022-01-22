import React, { useEffect, useState } from 'react'
import Footer from '../Footer'
import  Navbar  from '../Navbar'
import CreateN from './CreateN'
import ViewAll from './ViewAll'
import ViewUNotes from './ViewUNotes'
const ViewNotes = () => {
    const [showM, setShow] = useState({showCreate : false, showaLL: false});

    
    return (
        <>
        <Navbar/>
            <div className='container-md' style={{"marginTop" : "3rem"}} >
                <h2 style={{"textAlign" : "center"}}>Notes 😃</h2>
                
                <p style={{"textAlign" : "center", "marginTop" : "2em"}}>
                {(((localStorage.getItem('access_token'))) !== null) ? 
                <button className='btn btn-outline-success' style={{"width" : "20%"}} onClick={() => setShow({ showCreate : true})}>Create</button>
                : <></>}
                <button className='btn btn-outline-primary' style={{"marginLeft" : "1%", "width" : "20%"}} onClick={() => setShow({showaLL : false})}>Your Notes</button>
                <button className='btn btn-outline-info' style={{"marginLeft" : "1%", "width" : "20%"}} onClick={() => setShow({showaLL : true})}>All Notes</button>
                </p>
                <hr style={{"width":"70%", "margin": "auto"}}/>
                <br/>
                {showM.showCreate === true ? <CreateN show={true}/> : <></>}    
                
                <div>
                {showM.showaLL === false ? <ViewUNotes/> : <ViewAll/>}
                </div>
            </div>
            <div style={{"marginTop" : "80px"}}>
           <Footer/>
           </div>  
        </>
    )
}

export default ViewNotes
