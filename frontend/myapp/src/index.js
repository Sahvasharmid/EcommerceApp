import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import Authcontext from './utils/Authcontext';

import "antd/dist/reset.css";
import { SearchProvider } from './utils/SearchContext';
import CartContext from './utils/CartContext';


ReactDOM.createRoot(document.getElementById('root')).render(<BrowserRouter><Authcontext><SearchProvider><CartContext><App></App></CartContext></SearchProvider></Authcontext></BrowserRouter>);


