import React from "react";
import { BrowserRouter, Route } from "react-router-dom";


import Landing from "pages/landing";
import Search from "pages/search";

import Header from "common/Header";

import "./App.css";

const App = _props => (
  <BrowserRouter>
    <div>
      <Header />
      <Route exact path="/" component={Landing} />
      <Route path="/search/:query" component={Search} />
    </div>
  </BrowserRouter>
);

export default App;
