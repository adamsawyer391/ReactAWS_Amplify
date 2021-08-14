import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//amplify configuration
import Amplify from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

