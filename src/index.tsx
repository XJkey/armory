// import React from 'react';
// import ReactDOM from 'react-dom';
// import './style/index.scss';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// serviceWorker.unregister();


import React from 'react';
import './style/index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');

const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
  //严格模式
  //<React.StrictMode>
  <App />,
  //</React.StrictMode>
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();