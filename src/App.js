import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { Provider as CroodsProvider } from "croods";
import { createReducer, List } from "croods";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import "./App.css";

const rootReducer = combineReducers({ beagle: createReducer("beagle") });
const store = createStore(rootReducer, applyMiddleware(thunk));

export default props => (
  <ReduxProvider store={store}>
    <CroodsProvider
      baseUrl="https://dog.ceo/api/breed/beagle"
      parseListResponse={({ message: list }) => ({ list })}
    >
      <List
        name="beagle"
        path="/images"
        render={list => (
          <div>
            <h1>Hello Beagles!</h1>
            <ul>
              {list.map((item, index) => {
                return index < 10 ? (
                  <li key={index}>
                    <img  src={item} alt=""/>
                  </li>
                ) : null ;
              })}
            </ul>
          </div>
        )}
      />
    </CroodsProvider>
  </ReduxProvider>
);
