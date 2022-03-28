import './styles.css';
import {Box} from '@material-ui/core';
import React from "react";
import {Link} from 'react-router-dom';

function RegisterSuccess() {
  
    return (    
      <div className="Signup">
        <header className="Signup-header">
            <Box color="black" bgcolor="white" p={8} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                <Link to="/login">
                    <div>Acccount successfully created. Click here to return to login.</div>
                </Link>
            </Box>
        </header>
      </div>
    );
  }
  
  export default RegisterSuccess;