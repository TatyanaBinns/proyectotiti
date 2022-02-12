import {Box} from "@material-ui/core";
import "./styles.css"
import Header from "./Header"



function Home() {
 
  return (
    <div className="Home-header">
      <Header/>
        <Box color="black" bgcolor="white" p={25} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
            <div>home</div>
        </Box>
    </div>
  );
}
export default Home;