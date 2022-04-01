import {Button} from '@material-ui/core';
import "./styles.css";
import Header from "./Header";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from "axios";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import React, {useState } from "react";




function Data() {
 
  const position = [10.633, -75.241];
  const rows = [];
  var selectedRowIds = localStorage.getItem("trackerIDs");

  const rows_ucf = [
    {id:1, name: "Student Union", location: [28.60173887418597, -81.2004132871915]},
    {id:2, name: "Classroom Building II", location: [28.604465911244027, -81.20014358904434]},
    {id:3, name: "Engineering Building I", location: [28.602068663139402, -81.19879712010942]}
  ];
  
  const rows_resturants = [
    {id:4, name: "Chick-fil-a", location: [28.601385743573186, -81.20121110824424]},
    {id:5, name: "Einstein Bros. Bagels", location: [28.601494069043923, -81.19896878149225]},
    {id:6, name: "Panda Express", location: [28.601969757832723, -81.2007283106182]}
  ];

  let combined = Object.assign(rows_ucf, rows_resturants);

  if(selectedRowIds.length > 1)
  {
    console.log(combined);
  }
  else if(selectedRowIds.length == 1 && selectedRowIds[0] == 1)
  {
    console.log(rows_ucf);
  }
  else if(selectedRowIds.length == 1 && selectedRowIds[0] == 2)
  {
    console.log(rows_resturants);
  }

  const columns = [
    { field: 'id', headerName: 'id', width: 200 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'location', headerName: 'Location', width: 200}
  ];
  
  
  const [activePark, setActivePark] = useState(null);
  

  return (
    <div className="Data-header">
      <Header/>
          <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          
          </MapContainer>
        

          <div className="Table-container-data">
            <DataGrid
              rows={rows_ucf}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              autoHeight
              components={{ Toolbar: GridToolbar }}
        />
          </div>

    </div>
  );
}
export default Data;
