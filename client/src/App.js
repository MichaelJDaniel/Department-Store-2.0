import React, { Fragment, } from 'react';
import { Route, Switch, } from "react-router-dom";
import Home from "./components/Home";
import NoMatch from "./components/NoMatch";
import Navbar from "./components/Navbar";
import Departments from "./components/Departments";
import Department from "./components/Department";
import DepartmentForm from "./components/DepartmentForm";
import ProductForm from "./components/ProductForm";
import Product from "./components/Product";
import { Container, } from "semantic-ui-react";

const App = () => (
  <Fragment>
    <Navbar />
    <Container>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/departments" component={Departments} />
        <Route exact path="/departments/new" component={DepartmentForm} />
        {/* You dont have to do it this way but this another way to render a component */}
        <Route exact path="/departments/:id/edit" render={props => <DepartmentForm edit {...props} />} />
        <Route exact path="/departments/:id" component={Department} />
        <Route exact path="/departments/:id/products/new" component={ProductForm} />
        <Route exact path="/departments/:id/products/:productId" component={Product} />
        <Route exact path="/departments/:id/products/:productId/edit" component={ProductForm} />
        <Route component={NoMatch} />
      </Switch>
    </Container>
  </Fragment>
);

export default App;

