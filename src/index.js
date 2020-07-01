import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react'
import { Users } from './store/users/Users';
import { Rides } from './store/rides/Rides';


const users=new Users()
const rides= new Rides()
const stores = { rides,users }
ReactDOM.render(
    <Provider {...stores}>
    <App   />
    </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();


