import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";
import Reducers from "./reducers";
import { applyMiddleware, combineReducers, createStore } from "redux";

const RootReducer = combineReducers(Reducers);
export const store = createStore(
  RootReducer,
  undefined,
  composeWithDevTools(applyMiddleware(thunk)),
)

