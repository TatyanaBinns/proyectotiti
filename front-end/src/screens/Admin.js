import {Box} from "@material-ui/core";
import "./styles.css";
import Header from "./Header";
import React, { useEffect, useState } from "react";
import Table from "./Table";
import axios from "axios";



function Admin() {  
  return (
    <div className="Settings-header">
      <Header/>
      <Box color="black" bgcolor="white" p={25} display="flex" justifyContent="center" alignItems="center" flexDirection="column" width = "50%" height= "80%" position= "absolute" left = "50px" top = "105px"> 
            <Table/>
        </Box>
    </div>
  );
}
export default Admin;