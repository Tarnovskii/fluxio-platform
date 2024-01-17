import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";
import Reducers from "./reducers";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";

const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() || null

const RootReducer = combineReducers(Reducers);
export const store = createStore(
  RootReducer,
  undefined,
  compose(applyMiddleware(thunk), devTools),
)

