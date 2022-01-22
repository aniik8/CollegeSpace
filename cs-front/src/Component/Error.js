import React from 'react'
import Navbar from './Navbar'

const Error = () => {
    return (
        <>
        <div id="wrapper">
            <img className='center' src="https://i.imgur.com/qIufhof.png" style={{"height" : "60%", width : "50%","display" : "block","marginRight" : "auto", "marginLeft" : "auto"}} alt='error'/>
            <div id="info">
            {(((localStorage.getItem('access_token'))) === null) 
            ? <h4 style={{"textAlign" : "center"}}>Please Login or SignUp to Continue </h4>
            :<>
            <h4 style={{"textAlign" : "center"}}>Sorry the data isn't available right now. Please Wait for some time.</h4>   
           
            </>
            }
            
            </div>
        </div>
        
        </>
    )
}

export default Error
