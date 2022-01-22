import React, { useState } from 'react'
import './signup.css'

import {useHistory} from 'react-router-dom'
import axiosInstance from './AxiosInstance'
const styles =  {"minHeight": "100vh",
"display": "flex",
"justifyContent": "center",
"alignItems": "center",
"backgroundImage" : "url('https://image.freepik.com/free-vector/business-man-working-hard-stock-financial-trade-market-diagram-vector-illustration-flat-design_1150-39773.jpg')",
"height" : "100%",
"backgroundRepeat": "no-repeat",
"backgroundSize" : "cover",
"backgroundPosition" : "center"
}

const link = {textColor :"black"}
//Here by using useState true and false, we can have this sliding functionality here
const Login = () =>  {
	const history = useHistory();
    	const[inputtext,setinputtext]=useState({email_address:"", password:""});
		
		const[warnemail,setwarnemail]=useState(false);
		const[warnpassword,setwarnpassword]=useState(false);
		
		const[eye,seteye]=useState(true);
		const[password,setpassword]=useState("password");
		const[type,settype]=useState(false);
		
		const inputEvent=(e)=>{
		setinputtext({
			...inputtext, 
			[e.target.name] : e.target.value.trim()
		})
	}
		const submitForm=(e) => 
		{
			e.preventDefault();
				setwarnemail(false);
				setwarnpassword(false);
				
		if(inputtext.email==="")
		{
			setwarnemail(true);
		}
		else if(inputtext.password===""){
		setwarnpassword(true);
		}

		axiosInstance.post(`api/token`, {
			email_address : inputtext.email_address,
			password : inputtext.password
		}).then((res) => {
			console.log(res)
			localStorage.setItem('access_token', res.data.access);
            localStorage.setItem ('refresh_token', res.data.refresh);
            localStorage.setItem('user', inputtext.email_address);
            axiosInstance.defaults.headers['Authorization'] =
					'JWT ' + localStorage.getItem('access_token');
            
			history.push(`/`)
          
		}).catch((err) => alert(`${Object.values(err.response.data)[0]} Please Change the Credentials to continue`))
		}
		
		const Eye=()=>{
		if(password==="password"){
		setpassword("text");
		seteye(false);
		settype(true);
		}
		else{
		setpassword("password");
		seteye(true);
		settype(false);
		}
		}
		
		
		return(
		<>
			<div className="container vh-100 bg-image" style={styles}>
				<div className="card" id='cardId' style=
				{{"height": "400px",	"width": "400px", "backgroundColor": "#fff", "position": "relative", "boxShadow": "0 15px 30px rgba(0, 0, 0, 0.1)",
    "fontFamily": "'Poppins', sans-serif",
    "borderRadius": "10px",
    "padding": "20px", }}>

					<div className="text" id="textField1">
					<br/>
						<h3>Welcome Back</h3>
						<br/>
						<p>Enter your credentials to access your account.</p>
						<br/>
					</div>
					<form onSubmit={submitForm}>
						<div className="input-text">
							<input type="text" id="textField" className={` ${warnemail ? "warning" : "" }`} placeholder="Enter your email" value={inputtext.email_address} onChange={inputEvent} name="email_address" />
							
		
						</div>
						<div className="input-text" id="inputText">
							<input type={password} id="passwordField" className={` ${warnpassword ? "warning" : "" } ${type ? "type_password" : "" }`} placeholder="Enter your password" value={inputtext.password} onChange={inputEvent} name="password" />
							
							<i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye" }`}></i>
						</div>
						<div className="buttons" id="Btn">
							<button id="Btnn" type="submit">Sign in</button>
						</div>
						<div className='forgot'>
							<p>Don't have an account?
							<button className="btun" style={{marginBottom  : "2.5px"}} className='btn' onClick={() => history.push('/signup') }>Signup Here</button></p>
						</div> 
						
					</form>
					
				</div>
			</div>
		
		</>
		
		);
		
}

export default Login