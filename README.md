# Getting Started
Croods is a library that abstracts most of the details (actions, reducers. etc) needed to integrate a REST API with an react/redux application.
A simple "Hello world" would look like this:

```javascript
// src/App.js

import React from "react";

import { createReducer, List } from "croods";
import { Provider as CroodsProvider } from "croods";
import { Provider as ReduxProvider } from "react-redux";

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
              {list.map((item, index) => (
                <li key={index}>
                  <img src={item} alt="" />
                </li>
              ))}
            </ul>
          </div>
        )}
      />
    </CroodsProvider>
  </ReduxProvider>
);
```
It fetches this ([Dog API](https://dog.ceo/dog-api/)) to show a list of Beagle photos. The boilerplate was created with  [create-react-app](https://github.com/facebook/create-react-app), and we are editing src/App.js file. Click [here](https://hello-beagles.herokuapp.com) to see it running, and [here]() to see the full code.

Now let's take a look at each part.

First we create the reducers and the store. For that, we use crood's [createReducer](http://linkto.docs), and the rest stays pretty much the same as you would in a regular redux app. `createReducer` will take care of creating all actions and reducers to interact with the external api.
```javascript
import { createReducer, List } from "croods";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({ beagle: createReducer("beagle") });
const store = createStore(rootReducer, applyMiddleware(thunk));


```

Now we create the regular redux provider, and inside it, we put crood's provider, passing as `baseUrl` prop the API's url.

```javascript

export default props => (
  <ReduxProvider store={store}>
    <CroodsProvider
      baseUrl="https://dog.ceo/api/breed/beagle"
      parseListResponse={({ message: list }) => ({ list })}
    >
     
    </CroodsProvider>
  </ReduxProvider>
);
```
In `parseListResponse` prop, we are specifying to croods how to handle api responses to our list component. In this example, our api returns a json like this:
```json
{
    "status": "success",
    "message": [
        "https://images.dog.ceo/breeds/beagle/n02088364_10108.jpg",
        "https://images.dog.ceo/breeds/beagle/n02088364_10206.jpg"
    ]}
```
Since the list we want is inside "messages", all we need to do is pass a function to extract that list from the response.

```javascript
parseListResponse={({ message: list }) => ({ list })}
```

Then we create our [List](http://linkto.docs) component: 
```javascript
 <List
        name="beagle"
        path="/images"
        render={list => (
          <div>
            <h1>Hello Beagles!</h1>
            <ul>
              {list.map((item, index) => (
                <li key={index}>
                  <img src={item} alt="" />
                </li>
              ))}
            </ul>
          </div>
        )}
      />

```
`name` defines the actions and reducers being used in the component, the "beagle" we created with `createReducer`. `path` states where to find our  endpoint being used by the component, relative to `baseUrl` passed to crood's provider. Since we want `https://dog.ceo/api/breed/beagle/images`,  we just need to pass it `/images`. 
The last prop is `render`, which, as the name implies, is a function defining the component's output. It receives the list as prop from crood's provider.
