import React from 'react'
import Navbar from '../Navbar'

const Chat = () => {
    const [clicked, setClicked] = React.useState(true)
    const [chatData, setChatData] = React.useState({
        messages : [], 
        roomName : "",
        msgvalue : "",
        userName : ""
    })
    console.log(clicked)
    const showData = () => {
        console.log(chatData.msgvalue)
    }
    return (
        <>
        <Navbar/>
          {clicked === true ? 
          <>
          <div className='container' style={{"width" : "50%", margin : "auto", marginTop : "20px"}}>
                <h3 style={{"textAlign" : "center"}}>CollegeSpace Chatroom</h3>
                <div className='container' style={{"marginTop" : "10%"}}>
                <form onSubmit={(e) => {e.preventDefault(); setClicked(false)}}>
                <input type="text" style={{"width": "80%", "margin" : "auto", "height" : "40%"}} placeholder='Enter Room Name' className="form-control"
                 value={chatData.roomName} onChange={(e) => setChatData({roomName : e.target.value})} />
                 <br/>
                 </form>
                <button className='btn btn-outline-success' style={{"width": "50%", "margin" : "auto"}} type='submit'>Enter Chatroom</button>
                <button className='btn btn-outline-danger' style={{"width": "50%", "margin" : "auto"}} type='submit'>Cancel</button>
                </div>
            </div>
          </> : 
          <>
          <br/>
          <div className='container' style={{"margin" : "auto 20", width : "50%", "height" : "70%" ,"background" : "#FFF8DC"}} >
            <h5 style={{"textAlign" : "center"}}>Room Name : </h5>
            <div className='container'>
                <h4>Message is here</h4>
            </div>
            <input type="text" className="form-control" 
            style={{"width" : "100%", "marginTop" : "55em", "height" : "30px"}} placeholder='Enter the message' value = {chatData.msgvalue} onChange={(e) => setChatData({msgvalue : e.target.value})}/>
            <button type="submit" className='btn btn-outline-primary' style={{"width" : "50%", "marginTop" : "20px"}} onClick={showData}>Send</button>
            <button type="submit" className='btn btn-outline-danger' style={{"width" : "50%", "marginTop" : "20px"}} >Cancel</button>
          </div>
          </> }  
        </>
    )
}

export default Chat
