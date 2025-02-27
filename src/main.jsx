import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { FirebaseProvider } from './firebase/Context';
// import { CartProvider } from './components/Store/context-api/Cart';
// import { BuyProvider } from './components/Store/context-api/Buy';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(

        <FirebaseProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </FirebaseProvider>
     
 
);
