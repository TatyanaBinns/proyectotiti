import './Landing.css';
import {Button} from '@material-ui/core';
import {Link} from 'react-router-dom';



function Landing() {
  return (    
    <div className="Landing">
      <header className="Landing-header">
        <div className="Landing-form">
          
          <div className='Button-top'>
            
            <Link to="/login">
              <Button color="primary" variant="contained" size='large'>
              Login
              </Button>
            </Link>
          </div>
          
    
          <div className='Button-bottom'>
            
            <Link to="/signup">
              <Button color="primary" variant="contained" size='large'>
              Sign Up
              </Button>
            </Link>
          </div>
          
        </div>
        
      </header>
    </div>
  );
}

export default Landing;
