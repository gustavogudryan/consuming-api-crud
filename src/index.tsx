// @ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRoutes } from './routes/AppRoutes';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux'
import store from "./store/index";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline/>
      <AppRoutes />
    </Provider>
  </React.StrictMode>
);
