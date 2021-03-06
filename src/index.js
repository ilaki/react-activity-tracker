import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "typeface-oswald";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <App id = "app"/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
