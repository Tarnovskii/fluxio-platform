import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";
import Reducers from "./reducers";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";

const RootReducer = combineReducers(Reducers);

export const store = createStore(
  RootReducer,
  undefined,
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) : compose(applyMiddleware(thunk)),
)

