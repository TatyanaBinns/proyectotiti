import {Box, Button, TextField,Typography} from '@material-ui/core'
import "./styles.css"
import Header from "./Header"



function Home() {
 
  return (
    <div className="Home-header">
      <Header/>
        <Box color="black" bgcolor="white" p={8} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <Typography variant="h5">
            Welcome {localStorage.getItem('username')}
          </Typography>
        </Box>
    </div>
  );
}
export default Home;