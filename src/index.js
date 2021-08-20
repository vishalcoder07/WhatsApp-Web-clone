import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import reducer, { initialState } from './reducer';
import { StateProvider } from "./StateProvider";

ReactDOM.render(
  <React.StrictMode>

    {/* StateProvider basically like a Data layer which surrounds the app */}
    {/* We push information into datalayer and pull into any component */}

    <StateProvider initialState={initialState} reducer={reducer}>

      <App />

    </StateProvider>

  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
