import React, { Component } from "react";
import Hero from "./Hero";
import Dragon from "./Dragon";
import FightScene from "./FightScene";

import { Human, Warrior, Monster } from "../core/roles";

class Graph extends Component {
  role = new Human("人类");

  state = {
    // hero position
    heroTop: 0,
    heroLeft: 0,
    // hero moveCount
    moveCount: 0,
    // FightScene
    isFighting: false
  };

  handleKeyDown = e => {
    switch (e.key) {
      case "w":
        this.setState(preState => ({
          heroTop: preState.heroTop - 2
        }));
        console.log("move up");
        break;
      case "a":
        this.setState(preState => ({
          heroLeft: preState.heroLeft - 2
        }));
        console.log("move left");
        break;
      case "s":
        this.setState(preState => ({
          heroTop: preState.heroTop + 2
        }));
        console.log("move down");
        break;
      case "d":
        this.setState(preState => ({
          heroLeft: preState.heroLeft + 2
        }));
        console.log("move right");
        break;
    }
    this.setState(preState => ({
      moveCount: preState.moveCount + 2
    }));
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    /* each 3 step, we encounter a monster to fight */
    if (this.state.moveCount === 5 && !this.state.isFighting) {
      this.setState({ isFighting: true });
    }
  }

  render() {
    return (
      <div id="graph" tabIndex="0" onKeyDown={this.handleKeyDown}>
        <Hero top={this.state.heroTop + "%"} left={this.state.heroLeft + "%"} />
        <Dragon />
        <FightScene isFighting={this.state.isFighting} />
      </div>
    );
  }
}

export default Graph;
