import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
// import { BrowserRouter as Router } from 'react-router-dom';
import './sass/style.scss';
import App from './App';
// import reportWebVitals from './reportWebVitals';

// console fun
const consoleStyle = (background, color, border) => {
  return (
    `padding: 7px 0;` +
    `background: ${background};` +
    `color: ${color};` +
    `border-top: 1px solid ${border};` +
    `border-bottom: 1px solid ${border}`
  );
};

console.log(
  '\n\n%c %c  Designed & Coded by Ian Espanto  %c \n\n\n',
  consoleStyle('#E4C1F9', '#fff', '#D0B0E3'),
  consoleStyle('#F694C1', '#FEF5F9', '#E087B0'),
  consoleStyle('#E4C1F9', '#fff', '#D0B0E3')
);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
