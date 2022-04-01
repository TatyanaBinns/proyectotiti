import {Button} from '@material-ui/core';
import "./styles.css";
import Header from "./Header";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from "axios";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import React, {useState } from "react";




function Data() {
 
  const position = [10.633, -75.241];
  
  const [selectedRows, setSelectedRows] = useState([]);
  const [error, setError] = useState("");
  var selectedRowIds = [];
  var selectedRowNames = [];

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
      </div>

    </div>
  );
}
export default Data;
