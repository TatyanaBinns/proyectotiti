import {Button} from '@material-ui/core';
import "./styles.css";
import Header from "./Header";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from "axios";



function Data() {
 
  const position = [10.633, -75.241];
  
  axios.get('https://proyectotiti.herokuapp.com/listpings')
          .then(function (response) {
            if(response.status == 200)
            {
              console.log(response);
            }
          })

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
    </div>
  );
}
export default Data;
