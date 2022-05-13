import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import './assets/js/vendor/modernizr-2.8.3.min.js';
// import './assets/js/vendor/jquery-3.5.1.min.js';
// import './assets/js/vendor/jquery-migrate-3.3.0.min.js';
// import './assets/js/plugins/plugins.js';
// import './assets/js/main.js';
import './assets/css/vendor/vendor.min.css'
import './assets/css/plugins/plugins.min.css'
import './assets/css/style.min.css'
import './assets/css/custom.css'
import store from "./store/index"
import { Provider } from "react-redux";

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
