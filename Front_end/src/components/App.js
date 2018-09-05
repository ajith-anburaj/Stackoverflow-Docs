import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import Docs from "./Docs";
import Topics from './Topics'
import Examples from './Examples'

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/docs" component={Docs} />
          <Route exact path="/topics/:doc_id" component={Topics} />
          <Route exact path="/examples/:topic_id" component={Examples} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;