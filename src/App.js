import React from 'react';
import { Provider } from 'react-redux';

import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './config/reactotron';
import store from './store';

import Map from './components/Map';
import DevList from './components/DevList';

import GlobalStyle from './styles/global';

const App = () => (
  <Provider store={store}>
    <GlobalStyle />
    <Map />
    <DevList />
    <ToastContainer />
  </Provider>
);

export default App;
