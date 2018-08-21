import React from "react";
import { createReducer } from "croods";
import { combineReducers, createStore, applyMiddleware, } from "redux";
import thunk from "redux-thunk";
import "./App.css";

const rootReducer = combineReducers({ beagle: createReducer("beagle") });
const store = createStore(rootReducer, applyMiddleware(thunk));



export default props => <h1>Hello, Beagles!</h1>;
