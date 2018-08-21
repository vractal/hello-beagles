import React from "react";
import { createReducer } from "croods";
import { combineReducers } from "redux";
import "./App.css";

const rootReducer = combineReducers({ beagle: createReducer("beagle") });

export default props => <h1>Hello, Beagles!</h1>;
