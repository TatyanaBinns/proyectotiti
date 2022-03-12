import './styles.css';
import {Button} from '@material-ui/core';
import {Link} from 'react-router-dom';


function Landing() {
  return (    
    <div className="Landing">
      <header className="Landing-header">
        <div className="Landing-form">
          
          <div className='Button-top'>
            
            <Link to="/login">
              <Button color="primary" variant="contained" size='large' style={{maxWidth: '200px', maxHeight: '50px', minWidth: '200px', minHeight: '50px',backgroundColor: "#4cc638"}}>
              Login
              </Button>
            </Link>
          </div>
          
    
          <div className='Button-bottom'>
            
            <Link to="/signup">
              <Button color="primary" variant="contained" size='large' style={{maxWidth: '200px', maxHeight: '50px', minWidth: '200px', minHeight: '50px',backgroundColor: "#4cc638"}}>
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
