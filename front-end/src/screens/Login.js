import './Login.css';
import {Box, Button, TextField} from '@material-ui/core'
import { useState } from "react";

function Login() {

    const [email, setValue] = useState("");
    
    
    return (
      <div className="Login">
        <header className="Login-header">
          <div>
            <Box color="black" bgcolor="white" p={5} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                <div>Login</div> 
                <TextField id="email" label="Email" variant="outlined" margin='normal' value={email} onChange={(e) => {setValue(e.target.value);}}/>
                <TextField id="password" label="Password" variant="outlined" margin='normal'/>
                <Button color="primary" variant="contained" size='large' onClick={console.log(email)}>Login</Button>
            </Box>
            
          </div>
        
        </header>
      </div>
    );
  }
  

  export default Login;