import './styles.css';
import {Box, Button, TextField,Typography} from '@material-ui/core';
import React, { useState } from "react";
import axios from "axios";


function Signup() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");

  const submitForm = () => {
      axios.post('https://proyectotiti.herokuapp.com/register', {
        username, password, fname, lname
      })
          .then(function (response) {
            console.log(response);
          })
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
            value={fname}
            onChange={e => setFname(e.target.value)}
          />
         <TextField
            label="Last Name"
            variant="outlined"
            required
            margin = "normal"
            className="form-input"
            value={lname}
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
