import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Navbar from '../Navbar';
import { withStyles } from "@material-ui/core/styles";
import Footer from '../Footer';
const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textTransform: "none"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    textTransform: "none"
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    textTransform: "none"
  },
  root: {
    boxShadow: '5px',
  },
  button: {
    textTransform: "none"
  }
});

class Chatroom extends Component {

  state = {
    isLoggedIn: false,
    messages: [],
    value: '',
    name: '',
    room: 'default',
  }

  client = new W3CWebSocket('ws://127.0.0.1:8000/ws/chat/' + this.state.room);

  onButtonClicked = (e) => {
    this.client.send(JSON.stringify({
      type: "message",
      message: this.state.value,
      name: this.state.name
    }));
    this.state.value = ''
    e.preventDefault();
  }

  componentDidMount() {
    
    this.client.onopen = () => {
      
    };
    this.client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      
      if (dataFromServer) {
        this.setState((state) =>
          ({
            messages: [...state.messages,
            {
              msg: dataFromServer.message,
              name: dataFromServer.name,
            }]
          })
        );
      }
    };
  }

  render() {
    const { classes } = this.props;
    return (<>
      <Navbar/>
      <Container component="main" maxWidth="sm">
        {this.state.isLoggedIn ?
          <div style={{ marginTop: 50, }}>
           <h4 style={{"textAlign" : "center"}}> Room Name: {this.state.room}</h4>
            {(((localStorage.getItem('access_token'))) === null) 
            ? <h4>Please Login to Continue messaging or You'll not able to message </h4>
            :<></>
            }
            <Paper style={{ height: 500, maxHeight: 500, overflow: 'auto', boxShadow: 'none', }}>
              {this.state.messages.map(message => <>
                <Card className={classes.root}>
                  <CardHeader
                    avatar={
                      <Avatar className={classes.avatar}>
                        {this.state.name.charAt(0)}
                  </Avatar>
                    }
                    title={message.name}
                    subheader={message.msg}
                  />
                </Card>
              </>)}
            </Paper>

            <form className={classes.form} noValidate onSubmit={this.onButtonClicked}>
              <TextField
                id="outlined-helperText"
                label="Make a comment"
                variant="outlined"
                value={this.state.value}
                fullWidth
                onChange={e => {
                  this.setState({ value: e.target.value });
                  this.value = this.state.value;
                }}
              />
              <Button
                type="submit"
                fullWidth

                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Start Chatting
                </Button>
            </form>
          </div>
          :
          <div>
            <CssBaseline />
            <div className={classes.paper}>
              <Typography component="h1" variant="h3" style={{"marginBottom" : "20px"}}>
                CollegeSpace Chatroom
                </Typography>
              <form className={classes.form} noValidate onSubmit={value => this.setState({ isLoggedIn: true })}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  size="medium"
                  label="Chatroom Name"
                  name="Chatroom Name"
                  autoFocus
                  
                  value={this.state.room}
                  onChange={e => {
                    this.setState({ room: e.target.value });
                    this.value = this.state.room;
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="Username"
                  label="Username"
                  type="Username"
                  id="Username"
                  value={this.state.name}
                  onChange={e => {
                    this.setState({ name: e.target.value });
                    this.value = this.state.name;
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Start Chatting
                  </Button>
               
              </form>
            </div>
            <div className='container' style={{"marginTop" : "80px"}}>
        <h3 style={{"textAlign" : "center", "textDecoration" : "underline"}}>How to Use It 🤔?</h3>
        <ul style={{"marginTop" : "10px", "fontSize" : "12px"}}>
        <li style={{"align" : "center"}}>Enter the random room name and your username.</li> 
        <li>(By default, it's name is default. You can change it)</li>
        <li>Share the roomname with your friends/family or anyone</li>
         <li>Chat in group 😃 😃</li></ul>
      </div>
          </div>
          }
      </Container>
      <div style={{"marginTop" : "80px"}}>
      <Footer/>
      </div>
      </>
    )

  }
}
export default withStyles(useStyles)(Chatroom)