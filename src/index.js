import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import {createStore,compose,applyMiddleware,combineReducers} from 'redux';
import {Provider} from 'react-redux';
import burgerBuilderReducer from './Store/reducers/burgerBuilder';
import thunk  from 'redux-thunk';
import orderReducer from './Store/reducers/order';
import authReducer from './Store/reducers/auth';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReduder = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order : orderReducer,
    auth : authReducer
})

const store = createStore(rootReduder,composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
     <BrowserRouter>
        <App/>
     </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
