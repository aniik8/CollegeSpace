import React, {useEffect, useState} from 'react'
import { BaseUrl } from '../BaseUrl';
import Avatar from '@material-ui/core/Avatar';
import {useHistory} from 'react-router-dom'
const UserDet = () => {
    const [user, setUser] = useState("")
    const history = useHistory()
    const [praise, setPraise] = useState("Praise 👏")
    const [color, setColor] = useState("primary")
    useEffect(() => {
        fetch(`${BaseUrl}view-notes${history.location.pathname}`)
        .then((res) => res.json())
        .then((data)=> {
            const uid = data.user;
            return fetch(`${BaseUrl}get_user/${uid}`);
        }).then((response) => response.json()).then((udata) => setUser(udata))
}, [setUser])

    return (
        <>
        
        {typeof user === undefined ? <>
            <h1>No data</h1>
        </> : <>
        
        {/* <h2 style={{"fontWeight" : "lighter"}}>About the Author</h2>
        <hr style={{"width" : "80%", "margin" : "auto"}}/>
        
        {console.log(typeof user.first_name)}
        <Avatar style={{ height: '70px', width: '70px' }}>{user.first_name}</Avatar>        
        <h3>Name : {user.first_name} {" "} {user.last_name}</h3>
        <h4>Username : {user.username}</h4> */}
        <div className="card" style={{"width" : "70%", "position" : "relative"}}>
            <img className="card-img-top" src="https://random.imagecdn.app/500/150" alt="Oops"/>
             <div className="card-body">
            <h3 className="card-title" style={{"textAlign" : "center"}}>About the author</h3>
            <hr style={{"width" : "100%"}}/>
            <h5 className="card-text">Name : {user.first_name} {" "} {user.last_name}</h5>
            <br/>
            <h5 className='cart-text'>Username : {user.username}</h5>
            <br/>
            <h5 className='cart-text'>Email : {user.email_address}</h5>
            <br/>
            <button className={`btn btn-${color}`} style={{"textColor" : "white", "width" : "100%", "borderRadius" : "50px"}}
             onClick={() => {setPraise("Praised 😃"); setColor("success")}}>{praise}</button>

            </div>
            </div>

        
        
        </>}
        </>
    )
}
// https://gomakethings.com/how-to-use-the-fetch-method-to-make-multiple-api-calls-with-vanilla-javascript/

export default UserDet

//1. fOooter 
//2. Pdf
//3. Chat room things, like helping others