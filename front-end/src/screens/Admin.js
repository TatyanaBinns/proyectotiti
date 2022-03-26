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
      <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          columns={[
            { title: 'Ad', field: 'name' },
            { title: 'Soyad', field: 'surname' },
            { title: 'Doğum Y', field: 'birthYear', type: 'numeric' },
            { title: 'Doğum Yeri', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlurfa' } }
          ]}
          data={[{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 }]}
          title="Demo Title"
        />
      </div>
    </div>
  );
}
export default Admin;