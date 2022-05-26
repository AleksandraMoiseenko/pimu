import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { GlobalProvider } from './providers/GlobalProvider';
import { AppRouter } from './router/Router';

ReactDOM.createRoot(document.getElementById('root')!).render(<AppRouter />);
