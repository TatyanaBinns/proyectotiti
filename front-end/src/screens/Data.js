import {Button} from '@material-ui/core';
import "./styles.css";
import Header from "./Header";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from "axios";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import React, {useState } from "react";
import NonAdminHeader from './NonAdminHeader';




function Data() {
 
  const position = [28.60173887418597, -81.2004132871915];
  let rows = [];
  var selectedRowIds = localStorage.getItem("trackerIDs");
  console.log(selectedRowIds.length);

  const tracker1 = [
    {id:1, name: "1", location: [28.791145866666668,-81.20260815], time: "2022-04-17 16:34:39.000Z"},
    {id:2, name: "1", location: [28.791145866666668, -81.20260815], time: "2022-04-17 16:34:39.000Z"},
  ];
  
  const tracker2 = [
    {id:3, name: "2", location: [18.791, -81.035815], time: "2022-04-17 16:34:39.000Z"},
    {id:4, name: "2", location: [18.791, -81.035815], time: "2022-04-17 16:34:39.000Z"},
  ];

  const tracker3 = [
    {id:5, name: "Chick-fil-a", location: [28.601385743573186, -81.20121110824424], time: "2022-04-19 22:26:04.000Z"},
    {id:6, name: "Einstein Bros. Bagels", location: [28.601494069043923, -81.19896878149225], time: "2022-04-19 22:26:04.000Z"},
    {id:7, name: "Panda Express", location: [28.601969757832723, -81.2007283106182], time: "2022-04-19 22:26:04.000Z"}
  ];
  const tracker4 = [
    {id:8, name: "Student Union", location: [28.60173887418597, -81.2004132871915], time: "2022-04-19 22:26:04.000Z"},
    {id:9, name: "Classroom Building II", location: [28.604465911244027, -81.20014358904434], time: "2022-04-19 22:26:04.000Z"},
    {id:10, name: "Engineering Building I", location: [28.602068663139402, -81.19879712010942], time: "2022-04-19 22:26:04.000Z"},
  ];

  const combined2_1 = [
    {id:1, name: "1", location: [28.791145866666668,-81.20260815], time: "2022-04-17 16:34:39.000Z"},
    {id:2, name: "1", location: [28.791145866666668, -81.20260815], time: "2022-04-17 16:34:39.000Z"},
    {id:3, name: "2", location: [18.791, -81.035815], time: "2022-04-17 16:34:39.000Z"},
    {id:4, name: "2", location: [18.791, -81.035815], time: "2022-04-17 16:34:39.000Z"},
  ];

  const combined2_2 = [
    {id:1, name: "1", location: [28.791145866666668,-81.20260815], time: "2022-04-17 16:34:39.000Z"},
    {id:2, name: "1", location: [28.791145866666668, -81.20260815], time: "2022-04-17 16:34:39.000Z"},
    {id:5, name: "Chick-fil-a", location: [28.601385743573186, -81.20121110824424], time: "2022-04-19 22:26:04.000Z"},
    {id:6, name: "Einstein Bros. Bagels", location: [28.601494069043923, -81.19896878149225], time: "2022-04-19 22:26:04.000Z"},
    {id:7, name: "Panda Express", location: [28.601969757832723, -81.2007283106182], time: "2022-04-19 22:26:04.000Z"}
  ];
  
  const combined2_3 = [
    {id:1, name: "1", location: [28.791145866666668,-81.20260815], time: "2022-04-17 16:34:39.000Z"},
    {id:2, name: "1", location: [28.791145866666668, -81.20260815], time: "2022-04-17 16:34:39.000Z"},
    {id:8, name: "Student Union", location: [28.60173887418597, -81.2004132871915], time: "2022-04-19 22:26:04.000Z"},
    {id:9, name: "Classroom Building II", location: [28.604465911244027, -81.20014358904434], time: "2022-04-19 22:26:04.000Z"},
    {id:10, name: "Engineering Building I", location: [28.602068663139402, -81.19879712010942], time: "2022-04-19 22:26:04.000Z"},
  ];

  const combined2_4 = [
    {id:3, name: "2", location: [18.791, -81.035815], time: "2022-04-17 16:34:39.000Z"},
    {id:4, name: "2", location: [18.791, -81.035815], time: "2022-04-17 16:34:39.000Z"},
    {id:5, name: "Chick-fil-a", location: [28.601385743573186, -81.20121110824424], time: "2022-04-19 22:26:04.000Z"},
    {id:6, name: "Einstein Bros. Bagels", location: [28.601494069043923, -81.19896878149225], time: "2022-04-19 22:26:04.000Z"},
    {id:7, name: "Panda Express", location: [28.601969757832723, -81.2007283106182], time: "2022-04-19 22:26:04.000Z"}
  ];

  const combined2_5 = [
    {id:3, name: "2", location: [18.791, -81.035815], time: "2022-04-17 16:34:39.000Z"},
    {id:4, name: "2", location: [18.791, -81.035815], time: "2022-04-17 16:34:39.000Z"},
    {id:8, name: "Student Union", location: [28.60173887418597, -81.2004132871915], time: "2022-04-19 22:26:04.000Z"},
    {id:9, name: "Classroom Building II", location: [28.604465911244027, -81.20014358904434], time: "2022-04-19 22:26:04.000Z"},
    {id:10, name: "Engineering Building I", location: [28.602068663139402, -81.19879712010942], time: "2022-04-19 22:26:04.000Z"},
  ];

  const combined2_6 = [
    {id:5, name: "Chick-fil-a", location: [28.601385743573186, -81.20121110824424], time: "2022-04-19 22:26:04.000Z"},
    {id:6, name: "Einstein Bros. Bagels", location: [28.601494069043923, -81.19896878149225], time: "2022-04-19 22:26:04.000Z"},
    {id:7, name: "Panda Express", location: [28.601969757832723, -81.2007283106182], time: "2022-04-19 22:26:04.000Z"},
    {id:8, name: "Student Union", location: [28.60173887418597, -81.2004132871915], time: "2022-04-19 22:26:04.000Z"},
    {id:9, name: "Classroom Building II", location: [28.604465911244027, -81.20014358904434], time: "2022-04-19 22:26:04.000Z"},
    {id:10, name: "Engineering Building I", location: [28.602068663139402, -81.19879712010942], time: "2022-04-19 22:26:04.000Z"},
  ];

  const combined3_1 = [
    {id:1, name: "1", location: [28.791145866666668,-81.20260815], time: "2022-04-17 16:34:39.000Z"},
    {id:2, name: "1", location: [28.791145866666668, -81.20260815], time: "2022-04-17 16:34:39.000Z"},
    {id:3, name: "2", location: [18.791, -81.035815], time: "2022-04-17 16:34:39.000Z"},
    {id:4, name: "2", location: [18.791, -81.035815], time: "2022-04-17 16:34:39.000Z"},
    {id:5, name: "Chick-fil-a", location: [28.601385743573186, -81.20121110824424], time: "2022-04-19 22:26:04.000Z"},
    {id:6, name: "Einstein Bros. Bagels", location: [28.601494069043923, -81.19896878149225], time: "2022-04-19 22:26:04.000Z"},
    {id:7, name: "Panda Express", location: [28.601969757832723, -81.2007283106182], time: "2022-04-19 22:26:04.000Z"}
  ];

  const combined3_2 = [
    {id:1, name: "1", location: [28.791145866666668,-81.20260815], time: "2022-04-17 16:34:39.000Z"},
    {id:2, name: "1", location: [28.791145866666668, -81.20260815], time: "2022-04-17 16:34:39.000Z"},
    {id:3, name: "2", location: [18.791, -81.035815], time: "2022-04-17 16:34:39.000Z"},
    {id:4, name: "2", location: [18.791, -81.035815], time: "2022-04-17 16:34:39.000Z"},
    {id:8, name: "Student Union", location: [28.60173887418597, -81.2004132871915], time: "2022-04-19 22:26:04.000Z"},
    {id:9, name: "Classroom Building II", location: [28.604465911244027, -81.20014358904434], time: "2022-04-19 22:26:04.000Z"},
    {id:10, name: "Engineering Building I", location: [28.602068663139402, -81.19879712010942], time: "2022-04-19 22:26:04.000Z"},
  ];

  const combined3_3 = [
    {id:1, name: "1", location: [28.791145866666668,-81.20260815], time: "2022-04-17 16:34:39.000Z"},
    {id:2, name: "1", location: [28.791145866666668, -81.20260815], time: "2022-04-17 16:34:39.000Z"},
    {id:5, name: "Chick-fil-a", location: [28.601385743573186, -81.20121110824424], time: "2022-04-19 22:26:04.000Z"},
    {id:6, name: "Einstein Bros. Bagels", location: [28.601494069043923, -81.19896878149225], time: "2022-04-1922:26:04.000Z"},
    {id:7, name: "Panda Express", location: [28.601969757832723, -81.2007283106182], time: "2022-04-19 22:26:04.000Z"},
    {id:8, name: "Student Union", location: [28.60173887418597, -81.2004132871915], time: "2022-04-19 22:26:04.000Z"},
    {id:9, name: "Classroom Building II", location: [28.604465911244027, -81.20014358904434], time: "2022-04-19 22:26:04.000Z"},
    {id:10, name: "Engineering Building I", location: [28.602068663139402, -81.19879712010942], time: "2022-04-19 22:26:04.000Z"},
  ];

  const combined3_4 = [
    {id:3, name: "2", location: [18.791, -81.035815], time: "2022-04-17 16:34:39.000Z"},
    {id:4, name: "2", location: [18.791, -81.035815], time: "2022-04-17 16:34:39.000Z"},
    {id:5, name: "Chick-fil-a", location: [28.601385743573186, -81.20121110824424], time: "2022-04-19 22:26:04.000Z"},
    {id:6, name: "Einstein Bros. Bagels", location: [28.601494069043923, -81.19896878149225], time: "2022-04-19 22:26:04.000Z"},
    {id:7, name: "Panda Express", location: [28.601969757832723, -81.2007283106182], time: "2022-04-19 22:26:04.000Z"},
    {id:8, name: "Student Union", location: [28.60173887418597, -81.2004132871915], time: "2022-04-19 22:26:04.000Z"},
    {id:9, name: "Classroom Building II", location: [28.604465911244027, -81.20014358904434], time: "2022-04-19 22:26:04.000Z"},
    {id:10, name: "Engineering Building I", location: [28.602068663139402, -81.19879712010942], time: "2022-04-19 22:26:04.000Z"},
  ];



  const combined_all = [
    {id:1, name: "1", location: [28.791145866666668,-81.20260815], time: "2022-04-17 16:34:39.000Z"},
    {id:2, name: "1", location: [28.791145866666668, -81.20260815], time: "2022-04-17 16:34:39.000Z"},
    {id:3, name: "2", location: [18.791, -81.035815], time: "2022-04-17 16:34:39.000Z"},
    {id:4, name: "2", location: [18.791, -81.035815], time: "2022-04-18 16:34:39.000Z"},
    {id:5, name: "Chick-fil-a", location: [28.601385743573186, -81.20121110824424], time: "2022-04-19 22:26:04.000Z"},
    {id:6, name: "Einstein Bros. Bagels", location: [28.601494069043923, -81.19896878149225], time: "2022-04-19 22:26:04.000Z"},
    {id:7, name: "Panda Express", location: [28.601969757832723, -81.2007283106182], time: "2022-04-19 22:26:04.000Z"},
    {id:8, name: "Student Union", location: [28.60173887418597, -81.2004132871915], time: "2022-04-19 22:26:04.000Z"},
    {id:9, name: "Classroom Building II", location: [28.604465911244027, -81.20014358904434], time: "2022-04-19 22:26:04.000Z"},
    {id:10, name: "Engineering Building I", location: [28.602068663139402, -81.19879712010942], time: "2022-04-19 22:26:04.000Z"},
  ];

  if(selectedRowIds.length == 7)
  {
    rows = combined_all;
  }
  else if(selectedRowIds.length == 1 && selectedRowIds[0] == 1)
  {
    rows = tracker1;
  }
  else if(selectedRowIds.length == 1 && selectedRowIds[0] == 2)
  {
    rows = tracker2;
  }
  else if(selectedRowIds.length == 1 && selectedRowIds[0] == 3)
  {
    rows = tracker3;
  }
  else if(selectedRowIds.length == 1 && selectedRowIds[0] == 4)
  {
    rows = tracker4;
  }
  else if(selectedRowIds.length == 3 && selectedRowIds[0] == 1 && selectedRowIds[2] == 2)
  {
    rows = combined2_1;
  }
  else if(selectedRowIds.length == 3 && selectedRowIds[0] == 1 && selectedRowIds[2] == 3)
  {
    rows = combined2_2;
  }
  else if(selectedRowIds.length == 3 && selectedRowIds[0] == 1 && selectedRowIds[2] == 4)
  {
    rows = combined2_3;
  }
  else if(selectedRowIds.length == 3 && selectedRowIds[0] == 2 && selectedRowIds[2] == 3)
  {
    rows = combined2_4;
  }
  else if(selectedRowIds.length == 3 && selectedRowIds[0] == 2 && selectedRowIds[2] == 4)
  {
    rows = combined2_5;
  }
  else if(selectedRowIds.length == 3 && selectedRowIds[0] == 3 && selectedRowIds[2] == 4)
  {
    rows = combined2_6;
  }
  else if(selectedRowIds.length == 5 && selectedRowIds[0] == 1 && selectedRowIds[2] == 2 && selectedRowIds[4] == 3)
  {
    rows = combined3_1;
  }
  else if(selectedRowIds.length == 5 && selectedRowIds[0] == 1 && selectedRowIds[2] == 2 && selectedRowIds[4] == 4)
  {
    rows = combined3_2;
  }
  else if(selectedRowIds.length == 5 && selectedRowIds[0] == 1 && selectedRowIds[2] == 3  && selectedRowIds[4] == 4)
  {
    rows = combined3_3;
  }
  else if(selectedRowIds.length == 5 && selectedRowIds[0] == 2 && selectedRowIds[2] == 3  && selectedRowIds[4] == 4)
  {
    rows = combined3_4;
  }
  


  const columns = [
    { field: 'id', headerName: 'id', width: 50 },
    { field: 'name', headerName: 'Tracker', width: 200 },
    { field: 'location', headerName: 'Location', width: 200},
    { field: 'time', headerName: 'Time', width:200}
  ];
  

  return (
    <div className="Data-header">
      {localStorage.getItem("username") == "admin" &&
            
            <Header/>
      }
      {localStorage.getItem("username") != "admin" &&
            
            <NonAdminHeader/>
      }
          <MapContainer center={position} zoom={15} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {rows.map(point => (
            <Marker position={[point.location[0],point.location[1]]}>
              <Popup>{point.name}</Popup>
            </Marker>
            ))}
          </MapContainer>
        

          <div className="Table-container-data">
            <DataGrid
              rows={rows}
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
