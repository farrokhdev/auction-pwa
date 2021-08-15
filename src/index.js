import React,{Suspense} from 'react';
import { Provider } from 'react-redux';
import store, {persistor} from '../src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css'
// import './assets/css/custom.scss';
import './assets/css/style.scss';
import './assets/css/fontawesome-all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';

ReactDOM.render(
  <Suspense fallback={null}>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
  </Provider>
  </Suspense>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
