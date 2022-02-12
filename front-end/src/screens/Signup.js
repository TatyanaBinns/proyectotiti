import './styles.css';
import {Box, TextField, Button} from '@material-ui/core';
import {Link} from 'react-router-dom';


function Signup() {
  return (    
    <div className="Signup">
      <header className="Signup-header">
        <div>
            <Box color="black" bgcolor="white" p={5} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                <div>Sign Up</div>
                <TextField id="fname" label="First Name" variant="outlined" margin='normal' />
                <TextField id="lname" label="Last Name" variant="outlined" margin='normal' />
                <TextField id="email" label="Email" variant="outlined" margin='normal' />
                <TextField id="password" label="Password" variant="outlined" margin='normal'/>
                
                <Link to="/login">
                <Button color="primary" variant="contained" size='large'>Register</Button>
                </Link>
            </Box>
            
        </div>
        
      </header>
    </div>
  );
}

export default Signup;
