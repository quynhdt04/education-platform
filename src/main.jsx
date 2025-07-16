import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from "react-router-dom";
import { configureStore } from '@reduxjs/toolkit';
import { allReducers } from './reducers/index.js';
import { Provider } from "react-redux";

const store = configureStore({
  reducer: allReducers
});


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
