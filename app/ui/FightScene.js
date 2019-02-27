import React, { Component } from "react";
import FightMenu from "./FightMenu";

class FightScene extends Component {
  render() {
    return (
      <div
        id="fight-scene"
        style={
          {
            /* TODO: fighting scene */
            /* display: this.props.isFighting ? "block" : "none" */
          }
        }
      >
        <FightMenu />
      </div>
    );
  }
}

export default FightScene;
