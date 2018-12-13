import React from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { Link, } from "react-router-dom";
import { Card, Icon, Button, } from "semantic-ui-react";

class Department extends React.Component {
  state = { dep: {}, products: [], };

  componentDidMount() {
    const { id, } = this.props.match.params;
    axios.get(`/api/departments/${id}`)
      .then( res => this.setState({ dep: res.data, }))
    axios.get(`/api/departments/${id}/products`)
      .then( res => this.setState({ products: res.data, }))
  }

  handleDelete = (id) => {
    const remove = window.confirm("Are you sure you want to delete this department?")
    if (remove)
      axios.delete(`/api/departments/${id}`)
        .then( res => this.props.history.push("/departments"))
  }

  renderProducts = () => {
    return this.state.products.map( i => (
      <ProductCard key={i.id} { ...i } remove={this.removeProduct} />
    ))
  }

  removeProduct = (id) => {
    const remove = window.confirm("Are you sure you want to delete this item?");
    const dId = this.props.match.params.id;
    if (remove)
      axios.delete(`/api/departments/${dId}/products/${id}`)
        .then( res => {
          const products = this.state.products.filter( i => {
            if (i.id !== id)
              return i;
          })
          this.setState({ products, });
        })
  }

  render() {
    const { dep: { id, name, description, }, } = this.state;
    
    return (
      <div>
        <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
          <h1>{ name }</h1>
          <div>
            <Link to={`/departments/${id}/edit`}>
              <Button icon color="blue">
                <Icon name="pencil" />
                Edit
              </Button>
            </Link>
            <Button icon color="red" onClick={() => this.handleDelete(id)}>
              <Icon name="trash" />
              Delete
            </Button>
          </div>
        </div>
        <br />
        <h4>{ description }</h4>
        <br />
        <br />
        <Link to={`/departments/${id}/products/new`}>
          <Button icon color="green">
            <Icon name="add" />
            Add Product
          </Button>
        </Link>
        <br />
        <br />
        <Card.Group itemsPerRow={4}>
          { this.renderProducts() }
        </Card.Group>
      </div>
    )
  }
}

export default Department;
