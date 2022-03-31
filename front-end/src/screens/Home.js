import {Box,Typography, Button} from '@material-ui/core';
import "./styles.css";
import Header from "./Header";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import React, {useState } from "react";
import {useNavigate} from 'react-router-dom';



function Home() {
  let navigate = useNavigate();

  const columns = [
    { field: 'id', headerName: 'Tracker ID', width: 200 },
  ];
  
  const rows = [
    { id: 1},
    { id: 2},
    { id: 3},
  ];

  const [selectedRows, setSelectedRows] = useState([]);

  const submitForm = () => {
    if(selectedRows == [])
    {
      console.log("No rows Selected");
    }
    else
    {
      localStorage.setItem("trackerId", selectedRows);
      navigate("/data");
    }
    
    
  };

  return (
    <div className="Settings-header">
      <Header/>
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