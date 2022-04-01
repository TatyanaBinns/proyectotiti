import {Button} from '@material-ui/core';
import "./styles.css";
import Header from "./Header";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from "axios";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import React, {useState } from "react";




function Data() {
 
  const position = [10.633, -75.241];
  
  var selectedRowIds = [];
  var selectedRowNames = [];

  const columns = [
    { field: 'id', headerName: 'Tracker ID', width: 200 },
    { field: 'trackerName', headerName: 'Tracker Name', width: 200}
  ];
  
  const rows = [
    { id: 1, trackerName: "UCF Buildings"},
    { id: 2, trackerName: "Resturants"},
    { id: 3, trackerName: "Random Points"},
  ];

  return (
    <div className="Data-header">
      <Header/>
          <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          </MapContainer>
        

          <div className="Table-container-data">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
              autoHeight
              components={{ Toolbar: GridToolbar }}
        />
          </div>

    </div>
  );
}
export default Data;
