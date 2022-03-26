import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './index.css';
import Data from './screens/Data';
import Forgotpassword from './screens/Forgotpassword';
import Home from './screens/Home';
import Landing from './screens/Landing';
import Login from './screens/Login';
import Settings from './screens/Settings';
import Signup from './screens/Signup';
import Admin from './screens/Admin';


ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path='/signup' element={<Signup />}/>
      <Route path="/home" element={<Home />}/>
      <Route path="/data" element={<Data/>}/>
      <Route path="/settings" element={<Settings/>}/>
      <Route path="/forgotpassword" element={<Forgotpassword/>}/>
      <Route path="/admin" element={<Admin/>}/>
    </Routes>
  </BrowserRouter>
 ,
  document.getElementById('root')
);
