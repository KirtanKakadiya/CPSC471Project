import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import  store  from './app/store'
import { Provider } from 'react-redux'
import {PersistGate} from "redux-persist/integration/react"
import { persistStore } from 'redux-persist';

let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>

);
