import './styles.css'
import {Box, Button, TextField,Typography} from '@material-ui/core'
import React, { useState } from "react";
import {Link,useNavigate} from 'react-router-dom';

function Forgotpassword() {
  
  const [username, setUsername] = useState("");
  let navigate = useNavigate();

  const submitForm = () => {
    console.log(username);

    if(username != "")
    {
      navigate("/resetpassword");
    }
  };

    return (
      <div className="Forgotpassword">
        <Box color="black" bgcolor="white" p = {8} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        
        <Typography variant="h5">
        Enter Username to Reset Password
          </Typography>

        <TextField
            label="Username"
            variant="outlined"
            fullWidth
            required
            margin = "normal"
            className="form-input"
            value={username}
            onChange={e => setUsername(e.target.value)}
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
            Reset Password
          </Button>
        </Box>
      </div>
    );
  }
  

  export default Forgotpassword;