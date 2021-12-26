import React, { Component } from 'react';
// require('dotenv').config();
import './styles.css';

import Clock from './clock';
import Weather from './weather';
import APOD from './apod';
import { StylesContext } from '@material-ui/styles';

export default function WeatherApp() {
  return (
    <div className="App">
      <div className="row1">
        <Clock />
        <Weather />
      </div>
      {/* <div className="row2">
        <APOD />  
      </div>         */}
    </div>
  );
}