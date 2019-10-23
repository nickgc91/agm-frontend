import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from './components/NavBar'

import { Provider } from "react-redux";
import store from "./store";


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div style={{ position: 'relative', 'min-height': '100vh' }}>
      <NavBar />
      <App />
      <div style={{   position: 'absolute', bottom: '0', width: '100%', height: '5rem' }} className="grid-item77">
            <h1>AGM All Rights Reserved</h1>
      </div>
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
