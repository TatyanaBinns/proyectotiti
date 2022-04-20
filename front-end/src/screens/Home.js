import {Box,Typography, Button} from '@material-ui/core';
import "./styles.css";
import Header from "./Header";
import NonAdminHeader from './NonAdminHeader';
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import React, {useState } from "react";
import {useNavigate} from 'react-router-dom';




function Home() {
  let navigate = useNavigate();
  const axios = require('axios');

  const columns = [
    { field: 'id', headerName: 'Tracker ID', width: 200 },
    { field: 'animalID', headerName: 'Animal ID', width: 200}
  ];
  
  const rows = [
    { id: 1, animalID: "-1"},
    { id: 2, animalID: "-1"},
    { id: 3, animalID: "-1"},
    { id: 4, animalID: "-1"}
  ];

  const [selectedRows, setSelectedRows] = useState([]);
  const [error, setError] = useState("");
  var selectedRowIds = [];
  var selectedRowNames = [];


  const submitForm = () => {
    if(JSON.stringify(selectedRows) == '[]')
    {
      setError("Please Select a Row");
    }
    else
    {
      selectedRows.map(tracker => (
        selectedRowIds.push(tracker.id)
      ));
      selectedRows.map(tracker => (
        selectedRowNames.push(tracker.trackerName)
      ));
      localStorage.setItem("trackerIDs", selectedRowIds);
      localStorage.setItem("trackerNames", selectedRowNames);

      axios.get('https://proyectotiti.herokuapp.com/pings/',{ params: { trackerId: 1 } })
      .then(function (response) {
        console.log(response);
      })
      navigate("/data");
    }
    
    
  };

  return (
    <div className="Settings-header">
      
      {localStorage.getItem("username") == "admin" &&
            
            <Header/>
      }
      {localStorage.getItem("username") != "admin" &&
            
            <NonAdminHeader/>
      }
      
      <div className="Table-container">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          autoHeight
          disableMultipleSelection={true}
          components={{ Toolbar: GridToolbar }}
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRows = rows.filter((row) =>
              selectedIDs.has(row.id),
            );
  
            setSelectedRows(selectedRows);
          }}
        />
        {error.length > 0 &&
            
            <Typography align='center'>{error}</Typography>
          }
        <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{
              backgroundColor: "#299846",
            }}
            margin = "normal"
            className="form-input"
            size="large"
            onClick={submitForm}
          >
            View Selected Tracker Data
          </Button>  
      </div>
    </div>
  );
}
export default Home;