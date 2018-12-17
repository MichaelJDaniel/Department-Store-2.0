import React from "react";
import axios from "axios";
import { Form, } from "semantic-ui-react";

class ProductForm extends React.Component {
  state = { name: "", description: "", price: "", };

  componentDidMount() {
    const { id, productId } = this.props.match.params;
    if (productId)
      axios.get(`/api/departments/${id}/products/${productId}`)
        .then( res => this.setState({ ...res.data, }))
  }

  handleChange = (e) => {
    const { name, value, } = e.target;
    this.setState({ [name]: value, });
    
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { match: { params: {id, productId} }, history: { push, } } = this.props;

    if (productId) {
      axios.put(`/api/departments/${id}/products/${productId}`, {...this.state})
        .then( res => console.log(res))
    } else {
      axios.post(`/api/departments/${id}/products`, { ...this.state })
        .then( res => console.log(res))
    }
  }

  render() {
    const { name, description, price, } = this.state;
    const { id, productId } = this.props.match.params;

    return (
      <div>
        <h1>{productId ? "Edit Item" : "Add Item"}</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input 
              name="name"
              placeholder="Name"
              label="Name"
              required
              value={name}
              onChange={this.handleChange}
            />
            <Form.Input 
              name="description"
              placeholder="Description"
              label="Description"
              required
              value={description}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input 
              name="price"
              placeholder="Price"
              label="Price"
              required
              value={price}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Button color="green">
            Submit
          </Form.Button>
        </Form>
      </div>
    )
  }
}

export default ProductForm;
