import React from "react";
import axios from "axios";
import { Link, } from "react-router-dom";
import { Card, Button, Icon, } from "semantic-ui-react";

class Departments extends React.Component {
  state = { deps: [], };

  componentDidMount() {
    axios.get("/api/departments")
      .then( res => this.setState({ deps: res.data, }));
  }

  renderDepartments = () => {
    return this.state.deps.map( d => (
      <Card>
        <Card.Content>
          <Card.Header>{d.name}</Card.Header>
          <Card.Description>{d.description}</Card.Description>
        </Card.Content>
        <Card.Content textAlign="center">
          <Link to={`/departments/${d.id}`}>
            <Button color="blue">
              View
            </Button>
          </Link>
        </Card.Content>
      </Card>
    ))
  }

  render() {
    return (
      <div>
        <h1>Departments</h1>
        <br />
        <Link to="/departments/new">
          <Button icon color="green">
            <Icon name='add' />
            Add Department
          </Button>
        </Link>
        <br />
        <br />
        <Card.Group itemsPerRow={3}>
          { this.renderDepartments() }
        </Card.Group>
      </div>
    )
  }
}

export default Departments;
