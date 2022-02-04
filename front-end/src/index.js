import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './index.css';
import Landing from './screens/Landing';
import Login from './screens/Login';
import Signup from './screens/Signup';


ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path='/signup' element={<Signup />}/>
    </Routes>
  </BrowserRouter>
 ,
  document.getElementById('root')
);
