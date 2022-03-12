import './styles.css'
import {Box, Button, TextField,Typography} from '@material-ui/core'
import React, { useState } from "react";

function Forgotpassword() {
  
  const [email, setEmail] = useState("");

  const submitForm = () => {
    console.log(email)
  };

    return (
      <div className="Forgotpassword">
        <Box color="black" bgcolor="white" p = {8} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        
        <Typography variant="h5">
        Enter email to reset password
          </Typography>

        <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            margin = "normal"
            className="form-input"
            value={email}
            onChange={e => setEmail(e.target.value)}
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
            Send Email
          </Button>
        </Box>
      </div>
    );
  }
  

  export default Forgotpassword;