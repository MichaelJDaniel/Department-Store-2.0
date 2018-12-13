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
    // [name] is allowing name to be used as a object key instead of a string
    this.setState({ [name]: value, });
    // looooooooong way to do this code
    // switch(name) {
    //   case "name":
    //     this.setState({ name: value, });
    //   case "description":
    //     this.setState({ description: value, });
    //   case "price":
    //     this.setState({ price: value, });
    //   case "image_url":
    //     this.setState({ image_url: value, });
    // }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // const { id, itemId, } = this.props.match.params;
    // const { push } = this.props.history;
    // This is the two lines of code above but combined into one
    const { match: { params: {id, productId} }, history: { push, } } = this.props;

    if (productId) {
      axios.put(`/api/departments/${id}/products/${productId}`, {...this.state})
        .then( res => push(`/departments/${id}`))
    } else {
      axios.post(`/api/departments/${id}/products`, { ...this.state })
        .then( res => push(`/departments/${id}`))
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
