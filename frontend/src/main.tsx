import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {AppRouter} from "./router/Router";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AppRouter/>
    ,
);
