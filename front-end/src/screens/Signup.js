import './styles.css';
import {Box, Button, TextField,Typography} from '@material-ui/core';
import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

function Signup() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFname] = useState("");
  const [last_name, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [signInError, setSignInError] = useState("");

  let navigate = useNavigate();

  const submitForm = () => {

    if(username == '' || password == '' || first_name == '' || last_name == '')
    {
      setSignInError("All fields required");
    }
    else
    {
      setSignInError("");
      
      var body = {
        username: username,
        password: password,
        first_name: first_name,
        last_name: last_name
      }

      axios.post('https://proyectotiti.herokuapp.com/register',body)
          .then(function (response) {
            if(response.status == 200)
            {
              navigate("/registersuccess");
            }
          })
    }


  };
  
  return (    
    <div className="Signup">
      <header className="Signup-header">
        <div>
        <Box color="black" bgcolor="white" p={8} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <form className='form'>
          <Typography variant="h5">
            Signup
          </Typography>
          <TextField
            label="First Name"
            variant="outlined"
            required
            className="form-input"
            margin="normal"
            value={first_name}
            onChange={e => setFname(e.target.value)}
          />
         <TextField
            label="Last Name"
            variant="outlined"
            required
            margin = "normal"
            className="form-input"
            value={last_name}
            onChange={e => setLname(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            required
            margin = "normal"
            className="form-input"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            label="Username"
            variant="outlined"
            required
            margin = "normal"
            className="form-input"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            required
            margin = "normal"
            className="form-input"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {signInError.length > 0 &&
            
            <Typography>{signInError}</Typography>
          }
          <Button
            variant="contained"
            color="primary"
            style={{
              backgroundColor: "#4cc638",
            }}
            margin = "normal"
            className="form-input"
            size="large"
            onClick={submitForm}
          >
            Register
          </Button>

        </form>
      </Box>
            
        </div>
        
      </header>
    </div>
  );
}

export default Signup;
