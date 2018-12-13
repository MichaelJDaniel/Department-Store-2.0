import React from "react";
import { Menu, } from "semantic-ui-react";
import { NavLink, } from "react-router-dom";

const Navbar = () => (
  <Menu>
    <Menu.Item>
      <NavLink exact to="/" activeStyle={styles.active}>
        Home
      </NavLink>
    </Menu.Item>
    <Menu.Item>
      <NavLink to="/departments" activeStyle={styles.active}>
        Departments
      </NavLink>
    </Menu.Item>
  </Menu>
);

const styles = {
  active: {
    color: "orange",
    fontWeight: "bold",
  }
};

export default Navbar;
