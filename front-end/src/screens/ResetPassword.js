import './styles.css'
import {Box, Button, TextField,Typography} from '@material-ui/core'
import React, { useState } from "react";

function Resetpassword() {
  
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const submitForm = () => {
    if(password1 == password2){
        console.log(password1);
    }
  };

    return (
      <div className="Forgotpassword">
        <Box color="black" bgcolor="white" p = {8} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        
        <Typography variant="h5">
        Enter New Password to Reset Password
          </Typography>

        <TextField
            label="Password"
            variant="outlined"
            fullWidth
            required
            margin = "normal"
            className="form-input"
            value={password1}
            onChange={e => setPassword1(e.target.value)}
          />
          <TextField
            label="Re-enter Password"
            variant="outlined"
            fullWidth
            required
            margin = "normal"
            className="form-input"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
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
  

  export default Resetpassword;