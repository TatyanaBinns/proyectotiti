import {Box} from "@material-ui/core";
import "./styles.css"
import Header from "./Header"



function Admin() {
 
  return (
    <div className="Settings-header">
      <Header/>
      <Box color="black" bgcolor="white" p={25} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
            <div>Admin</div>
        </Box>
    </div>
  );
}
export default Admin;