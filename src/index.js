import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import reducer from "./reducers";
import App from "./components/App";
import logger from "redux-logger";
import NavBar from "./components/navBar";
import ImgsPage from "./components/imgs";
import thunk from "redux-thunk";
import ImgForm from "./components/imgForm";
import 'semantic-ui-css/semantic.min.css';

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div className="ui container">
        <NavBar />
        <Switch>
          <Route path="/imgs/:id" component={ImgForm} />
          <Route path="/imgs" component={ImgsPage} />
          <Route path="/" component={App} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);
