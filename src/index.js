import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
//sentry
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
//redux
import { combineReducers,createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './redux/reducer/reducer';
import reducerNotes from './redux/reducer/reducerNotes';
import reducerTemplate from './redux/reducer/reducerTemplate';

const rootReducer = combineReducers({
  reducer,
  reducerNotes,
  reducerTemplate,
})


function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  }
  catch(e) {
    console.log(e)
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) return undefined
    return JSON.parse(serializedState)
  }
  catch(e) {
    console.log(e)
    return undefined
  }
}

const persistedState = loadFromLocalStorage();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,persistedState, composeEnhancers(applyMiddleware(thunk)));
store.subscribe(() => saveToLocalStorage(store.getState()))


// Sentry.init({
//   dsn: "https://7ef71a5f3f434b71ae7860df59699563@o1142479.ingest.sentry.io/6215251",
//   integrations: [new BrowserTracing()],

//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 1.0,
// });


ReactDOM.render(
    <Provider store={store}>
    < BrowserRouter ><App /></ BrowserRouter >
    </Provider>
,
  document.getElementById('root')
);
