import {Box} from "@material-ui/core";
import "./styles.css"
import Header from "./Header"



function Data() {
 
  return (
    <div className="Data-header">
      <Header/>
        <Box color="black" bgcolor="white" p={25} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
            <div>Data</div>
        </Box>
    </div>
  );
}
export default Data;