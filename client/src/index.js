import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AuthProvider, } from "./providers/AuthProvider";
import { FlashProvider, } from "./providers/FlashProvider";

ReactDOM.render(
  <FlashProvider>
    <AuthProvider>
      <App /> 
    </AuthProvider>
  </FlashProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
