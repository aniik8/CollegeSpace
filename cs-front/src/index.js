import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Questions from './Component/Questions';
import Notes from './Component/Notes'
//import Chat from './Component/Chatss'
import QnA from './Component/QnA';
import Login from './AuthComp/Login'
import Signup from './AuthComp/Signup';
import Logout from './AuthComp/Logout';
import ViewNotes from './Component/NotesCom/ViewNotes';
import {Example, ViewSNote} from './Component/NotesCom/ViewSNote';
import Chatroom from './Component/Chatroom/Chatroom'
import PrintN from './Component/NotesCom/PrintN';
ReactDOM.render(
  <BrowserRouter>
  
  <Switch>
    <Route path='/' component={App} exact />
    <Route path='/questions' exact component={Questions} />
    <Route path='/print' exact component={PrintN}/>
    {/* <Route path='/chat'  component={Chat} /> */}
    <Route path='/question/:slug/:id'  component={QnA} />
    <Route path='/Signup' component={Signup}/>
    <Route path='/Login' component={Login}/>
    <Route path='/Logout' component={Logout}/>
    <Route path='/Notes' component={ViewNotes}/>
    <Route path='/:slug/:id' component={Example} exact/>
    <Route path='/chat' component={Chatroom} exact/>
    </Switch>
  
</BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
