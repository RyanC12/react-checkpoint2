import React from "react";
import { Provider } from "react-redux";
import store from "../Redux/store";
import Router from "./Router";
import Nav from "../components/Nav";
import { BrowserRouter } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Nav />
        <Router />
      </BrowserRouter>
    </Provider>
  );
}

export default App;