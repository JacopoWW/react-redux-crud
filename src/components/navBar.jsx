import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <div className="ui three item menu">
        <NavLink exact activeClassName="active" className="item" to="/">
          Home
        </NavLink>
        <NavLink exact activeClassName="active" className="item" to="/imgs">
          Games
        </NavLink>
        <NavLink activeClassName="active" className="item" to="/imgs/new">
          Add New Game
        </NavLink>
      </div>
    );
  }
}

export default NavBar;
