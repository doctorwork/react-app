import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './redux/store';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import './styles/reset.css';
import './utils/rem';
import 'core-js/fn/object/entries';

document.title = '企鹅医生';

const store = createStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// registerServiceWorker();
