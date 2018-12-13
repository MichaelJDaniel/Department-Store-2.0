import React from "react";
import axios from "axios";
import { Form, } from "semantic-ui-react";

class DepartmentForm extends React.Component {
  state = { name: "", description: "", };

  componentDidMount() {
    if (this.props.edit)
      axios.get(`/api/departments/${this.props.match.params.id}`)
        .then( res => this.setState({ ...res.data, }))
  }

  handleChange = (e) => {
    const { name, value, } = e.target;
    this.setState({ [name]: value, });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.edit) {
      axios.put(`/api/departments/${this.props.match.params.id}`, { ...this.state })
        .then(res => this.props.history.push(`/departments/${res.data.id}`))
    } else {
      axios.post(`/api/departments`, { ...this.state })
        .then( res => this.props.history.push(`/departments/${res.data.id}`))
    }
  }

  render() {
    const { name, description, } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input 
          name="name"
          placeholder="Name"
          label="Name"
          value={name}
          onChange={this.handleChange}
        />
        <Form.Input 
          name="description"
          placeholder="Description"
          label="Description"
          value={description}
          onChange={this.handleChange}
        />
        <Form.Button color="green">
          Submit
        </Form.Button>
      </Form>
    )
  }
}

export default DepartmentForm;
