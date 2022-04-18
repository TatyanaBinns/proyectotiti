import './styles.css';
import {Box, Button, TextField,Typography} from '@material-ui/core'
import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';

function Login() {
    let navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const axios = require('axios');
  
    const submitForm = () => {
      if (username == '' || password == '')
        {
          console.log("Required")
        }
      else
        { 
          Promise.all
          ([
            axios.post('https://proyectotiti.herokuapp.com/login', {username, password}),
            axios.get('https://proyectotiti.herokuapp.com/trackers/-1')
          ])
        .then(response => {
          const login_success_code = response[0].status;
          const trackers = JSON.parse(response[1].data);

          
          if(login_success_code == 200)
          {
            localStorage.setItem('username', username);
            localStorage.setItem('trackers', trackers);
            navigate("/home");
          }
        })
        .catch(error => {
          console.log(error);
        }); 

        }
    };
    
    return (
      <div className="Login">
        <header className="Login-header">
        <Box color="black" bgcolor="white" p={8} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <form className='form'>
          <Typography variant="h5">
            Login
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            required
            className="form-input"
            margin="normal"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
         <TextField
            label="Password"
            variant="outlined"
            fullWidth
            required
            margin = "normal"
            className="form-input"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{
              backgroundColor: "#299846",
            }}
            margin = "normal"
            className="form-input"
            size="large"
            onClick={submitForm}
          >
            Login
          </Button>

        </form>
      </Box>
        </header>
      </div>
    );
  }
  

  export default Login;
