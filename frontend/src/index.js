import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// redux 세팅
import { createStore } from "redux";
import sessionStorage from "redux-persist/lib/storage/session";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
// react router dom v6
import { BrowserRouter } from "react-router-dom";
const persistConfig = {
    key: "root",
    storage: sessionStorage,
};

function reducer(currentState, action) {
    if (currentState === undefined) {
        return {
            user: {},
            isLogin: false,
        };
    }
    const newState = { ...currentState };

    if (action.type === "login") {
        newState.user = action.userData;
        console.log(newState.user, "store");
        newState.isLogin = true;
        return newState;
    }

    if (action.type === "socket") {
        newState.socket = action.socket;
        return newState;
    }

    if (action.type === "logout") {
        newState.user = {};
        newState.isLogin = false;
        return newState;
    }
    if (action.type === "register") {
        newState.user = action.userData;
        return newState;
    }
    return newState;
}
const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer, composeWithDevTools());
const persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
