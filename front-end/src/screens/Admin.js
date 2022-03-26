import {Box} from "@material-ui/core";
import "./styles.css";
import Header from "./Header";
import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import axios from "axios";



function Admin() {  
  return (
    <div className="Settings-header">
      <Header/>
      <div className="leaflet-container">
      <MaterialTable
        title="Simple Action Preview"
        columns={[
          { title: 'Name', field: 'name' },
          { title: 'Surname', field: 'surname' },
          { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
         {
           title: 'Birth Place',
            field: 'birthCity',
           lookup: { 34: 'İstanbul', 63: 'Şanlurfa' },
          },
        ]}
       data={[
          { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
          { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
        ]}          
        actions={[
          {
            icon: 'save',
            tooltip: 'Save User',
           onClick: (event, rowData) => alert("You saved " + rowData.name)
          }
        ]}
      />
    </div>
    </div>
  );
}
export default Admin;