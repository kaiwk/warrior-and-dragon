import React, { Component } from "react";

class Hero extends Component {
  render() {
    return (
      <img
        id="hero"
        src="./assets/fight-warrior.svg"
        alt="hero"
        style={{
          top: this.props.top,
          left: this.props.left
        }}
      />
    );
  }
}

export default Hero;
