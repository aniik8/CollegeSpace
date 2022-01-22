import React, { useEffect, useState } from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import Navbar from './Navbar';
import Error from './Error';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EditorToolbar, { modules, formats } from "../EditorToolbar";
import CreateAns from './CreateAns';
import UpdateQ from './UpdateQ';
import UpdateAns from './UpdateAns';
import DeleteQ from './DeleteQ';
import DeleteAns from './DeleteAns';
import Footer from './Footer';

const QnA = () => {
    const BaseUrl = `http://127.0.0.1:8000`
    const history = useHistory();
    const [question, setQuestion] = useState([])
    const [ans, setans] = useState([])
    const [clicked, setclicked] = useState({clicked4ans : false, clicked4update : false, answer : false, upVal : null, clicked4ansUp : false, 
        userid : null, deleteAns : false, delQ: false, qid : null, showbtn : false});
        
    const getData = async () => {
        const data = await fetch(`${BaseUrl}${history.location.pathname}`)
        const resdata = await data.json()
        setQuestion(resdata)
        setans(resdata)
    }
    
    useEffect(() => {
        getData(); 
    }, [])
    return (
        <>
        <Navbar/>
        
        <div>
        {typeof question[0] === "undefined"  ? <Error/> : 
            question.map((item, index)=> {
                    return(<>
                        
                        <> {clicked.clicked4update === true ?
                        <UpdateQ q={item.question} qd={item.question_data} qid={item.id} qslug={item.slug} clickeed={clicked.clicked4update}/> : 
                        <>
                        <div className='container' style={{width : "75%","marginTop" : "5%"}}  key={index}>
                        <h1 style={{"fontFamily" :"Arial"}}>{item.question}</h1>
                        <br/>
                        {item.question !== undefined ? <>
                            <EditorToolbar className='Editor-1' toolbarId={'t1'}/>
                            <ReactQuill 
                            theme="bubble"
                            readOnly={true}
                            value={item.question_data}
                            modules={modules('t1')}
                            formats={formats}/> </>:<></>} 
 
                        {(((localStorage.getItem('access_token'))) !== null) ? item.question !== undefined && item.user === (JSON.parse(atob(localStorage.getItem('access_token').split('.')[1])).user_id)
                        ?<>
                        <button type='button' style={{"width" : "48%", "borderRadius" : "20px"}} className='btn btn-outline-success' onClick={()=> setclicked({clicked4update:true})}>Update</button> 
                        <button type='button' className='btn btn-outline-danger' style={{"width" : "48%", "marginLeft" : "4%" , "borderRadius" : "20px"}} onClick={()=> setclicked({delQ:true, qid : item.id})}>Delete</button> 
                        </>: <></> 
                        :<></>
                          }
                        </div>
                        </>
                        }
                        
                        </>   </>
                    
                    )
                })}
           
        </div> 
        <hr style={{"width" : "80%", "margin" : "auto"}}/>
        <h2 style={{textAlign : 'center'}}>{ans[1] !== undefined ? ans[1].length : " "}{" "} Answers</h2>
        <p style={{"textAlign" : "center"}}>Can You answer It? </p>
        {(((localStorage.getItem('access_token'))) !== null) ? <p style={{"textAlign" : "center"}}>
        <button type='button' style={{"width" : "50%"}} className='btn btn-outline-primary' onClick={() => setclicked({answer : true})}>Answer</button>
        </p> : <h5 style={{"textAlign" : "center"}}>Please <NavLink style={{"color" : "grey"}} to='/login'>Login</NavLink> Or <NavLink style={{"color" : "grey"}} to='/register'>Signup</NavLink> to answer </h5>}
        <div className='container' style={{"alignItems" : 'center', "width" : "80%"}}>
        
            {typeof ans[1] === "undefined" || ans[1].length === 0 || ans[0] === undefined ? 
            <div className='container'>                
                
                
            </div> :
            <div className='container' style={{"width": "100%", "height": "60%", "marginTop" : "8rem"}}>
            {ans[1].map((item, index) => {
               return( <>
               <div className='shadow p-3 mb-5 bg-white rounded' style={{width:"100%"}} key={index} >
                <EditorToolbar className="Editor-10" toolbarId={`t-${item.id}`}/>
                            <ReactQuill 
                            theme="bubble"
                            readOnly={true}
                            value={item.answer}
                            modules={modules(`t-${item.id}`)}
                            formats={formats}
                                style={{"fontWeight" : "initial"}}
                            />
                            <p>Answered on : {Date(item.answered_date).substr(0,16)}</p>
         {(((localStorage.getItem('access_token'))) !== null) ? item.user === (JSON.parse(atob(localStorage.getItem('access_token').split('.')[1])).user_id) ?
             <><button type='button' id={item.id} className='btn btn-outline-primary' style={{"width" : "30%", "margin" : "auto"}} onClick={() => setclicked({upVal: item.id, clicked4ansUp : true, userid : item.user})}>
                    Update Answer
                </button>
                <button type='button' className='btn btn-outline-danger' style={{"width" : "30%", "marginLeft" : "40%"}} onClick={()=> setclicked({deleteAns:true, upVal : item.id})}>Delete</button>
                </>
                : <></>  : <></>}
                </div>
                </> 
                )
                })}
    
        </div>}
        </div>
            
        {clicked.clicked4ansUp === true ? <UpdateAns aid={clicked.upVal} show={true} qid={question[0].id} uid={clicked.userid}/> : <>{clicked.clicked4ansUp}</>}
    {clicked.delQ === true ? <DeleteQ id={clicked.qid} show={true} /> : <></>}
    {clicked.deleteAns === true ? <DeleteAns id={clicked.upVal} show={true} /> : <></>}
    {clicked.answer === true ? <CreateAns qid={(ans[0].id).toString()} open={true}/> : <></>}
    <div style={{"marginTop" : "80px"}}>
           <Footer/>
           </div>
         </>    
    )
}

export default QnA
