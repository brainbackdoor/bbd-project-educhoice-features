import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import { AppContainer } from "react-hot-loader";
import makeInspectable from "mobx-devtools-mst";
// import whyDidYouUpdate from "why-did-you-update";

import Store from "stores/Store";
import ecFetch from "helper/ecFetch";

import "semantic-ui-css/semantic.min.css";
import "react-datetime/css/react-datetime.css";

import App from "./App";

const store = Store.create({}, { ecFetch });

if (process.env.NODE_ENV !== "production") {
  // whyDidYouUpdate(React);
  makeInspectable(store);
}

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById("root")
  );
};

render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept("./App", () => {
    render(App);
  });
}
