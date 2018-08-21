import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { Provider as CroodsProvider } from "croods";
import { createReducer } from "croods";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import "./App.css";

const rootReducer = combineReducers({ beagle: createReducer("beagle") });
const store = createStore(rootReducer, applyMiddleware(thunk));

export default props => (
  <ReduxProvider store={store}>
    <CroodsProvider baseUrl="https://dog.ceo/api/breed/beagle">
      <h1>Hello, Beagles!</h1>
    </CroodsProvider>
  </ReduxProvider>
);
