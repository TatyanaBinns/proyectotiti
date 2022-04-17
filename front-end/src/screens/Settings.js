import './styles.css'
import {Box, Button, TextField,Typography} from '@material-ui/core'
import React, { useState } from "react";
import {Link} from 'react-router-dom';



function Settings() {
 
  return (
    <div className="Settings-header">
      <Header/>
      <Box color="black" bgcolor="white" p = {8} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <Link to="/resetpassword">
          <Button
            variant="contained"
            color="primary"
            style={{
              backgroundColor: "#4cc638",
            }}
            margin = "normal"
            className="form-input"
            size="large"
          >
            Reset Password 
          </Button>
        </Link>
      </Box>
    </div>
  );
}
export default Settings;