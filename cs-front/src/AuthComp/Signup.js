import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import axiosInstance from './AxiosInstance';

const Signup = () => {   
    const history = useHistory()
    const initialData = Object.freeze({
      'email_address' : "",
      "username" : "",
      "first_name" : "",
      "last_name": "",
      "password" : ""
    })
    const [userData, setUserData] = React.useState(initialData)

    const changeForm = (e) => {
      
      setUserData({
        ...userData, 
        [e.target.name] : e.target.value.trim()
      })

    }

    const formSubmit = (e) => {
      e.preventDefault()
      axiosInstance.post(`register`, {
        email_address : userData.email_address,
        username : userData.username,
        first_name : userData.first_name,
        last_name : userData.last_name,
        password : userData.password
      }).then((res)=> {console.log(res); history.push('/login')}).catch((err)=> alert(`${Object.values(err.response.data)[0]} Please Change the ${Object.keys(err.response.data)}`))

    }
      return (
        <section className="vh-100 bg-image" style={{"backgroundImage" : "url('https://www.tradefinanceglobal.com/wp-content/uploads/2019/06/Clean-Data-Sets-for-AI-in-trade-finance--1024x768.jpg')",
         "backgroundRepeat": "no-repeat", "backgroundSize" : "cover",
"backgroundPosition" : "center"
      }}>
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{"borderRadius": "15px", "width" :"90%"}}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>
      
                    <form onSubmit={formSubmit}>
      
                      <div className="form-outline mb-2">
                        <input type="text" id="form3Example1cg" className="form-control form-control-lg" value={userData.first_name} onChange={changeForm} />
                        <label className="form-label" htmlFor="form3Example1cg" name="first_name" >First Name</label>
                      </div>
                      <div className="form-outline mb-2">
                     
                        <input type="text" id="form5Example1cg" name="last_name" value={userData.last_name} onChange={changeForm} className="form-control form-control-lg" />
                        <label className="form-label" htmlFor="form5Example1cg" >Last Name</label>
                      </div>
                      
      
                      <div className="form-outline mb-4">
                        <input type="email" id="form3Example3cg" name="email_address" value={userData.email_address} onChange={changeForm} className="form-control form-control-lg" />
                        <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                      </div>
                      
                      <div className="form-outline mb-4">
                        <input type="text" id="form3Eample3cg" name="username" value={userData.username} onChange={changeForm} className="form-control form-control-lg" />
                        <label className="form-label" htmlFor="form3Eample3cg">Pick a username</label>
                      </div>
      
                      <div className="form-outline mb-4">
                        <input type="password" id="form3Example4cg" name="password" value={userData.password} onChange={changeForm} className="form-control form-control-lg" />
                        <label className="form-label" htmlFor="form3Example4cg">Password</label>
                      </div>
      
                      <div className="d-flex justify-content-center">
                        <button type="submit" style={{"width" : "30%"}} className="btn btn-success btn-block btn-lg gradient-custom-4 text-body but-hover">Register</button>
                      </div>
      
                      <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to='/login' style={{"fontSize" : "15px"}} className="fw-bold text-body"><u>Login here</u></Link></p>
      
                    </form>
      
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      );
}

export default Signup
