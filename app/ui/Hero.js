import React, { Component } from "react";

class Hero extends Component {
  render() {
    return (
      <div
        id="hero"
        style={{
          top: this.props.top,
          left: this.props.left
        }}
      >
        hero
      </div>
    );
  }
}

export default Hero;
