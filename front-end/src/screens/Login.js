import './styles.css';
import {Box, Button, TextField,Typography} from '@material-ui/core'
import React, { useState } from "react";
import {Link,useNavigate} from 'react-router-dom';
import axios from "axios";

function Login() {

    let navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const axios = require('axios');

    const baseurl = "https://proyectotiti.herokuapp.com/";
  
    const submitForm = () => {
      if (username == '' || password == '')
        {
          console.log("Required")
        }
      else
        {
          navigate("/home");
        } 
      /*
        else
      {
        axios.post('https://proyectotiti.herokuapp.com/login', {
        username, password
      })
          .then(function (response) {
            if(response.data.status == "success")
            {
              localStorage.setItem('username', username);
              navigate("/home");
            }
            else
              {
                console.log(response);
              }
          })       
      }
      */
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
          <Link to="/forgotpassword">
            <div>Forgot Password?</div>
          </Link>

        </form>
      </Box>
        </header>
      </div>
    );
  }
  

  export default Login;
