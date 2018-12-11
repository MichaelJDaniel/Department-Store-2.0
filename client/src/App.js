import React, { Fragment, } from 'react';
import { Route, Switch, } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import NoMatch from './components/NoMatch';
import NavBar from './components/NavBar';

const App = () => (
  <>
  <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route component={NoMatch} />
    </Switch>
  </>
);

export default App;


