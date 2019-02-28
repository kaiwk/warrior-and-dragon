import React, { Component } from "react";
import Hero from "./Hero";
import Dragon from "./Dragon";
import FightScene from "./FightScene";

import { Human, Warrior, Robot } from "../core/roles";
import GameController, { GAME_STATE } from "../core/game-controller";

class Graph extends Component {
  constructor() {
    super();
    this.player = null;
    this.state = {
      // hero position
      heroTop: 0,
      heroLeft: 0,
      // hero moveCount
      moveCount: 0,
      // FightScene
      gameState: GAME_STATE.Normal
    };
  }

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
      moveCount: preState.moveCount + 1
    }));
  };

  componentDidMount() {
    this.player = new Human("player", 100, 50, 0, 0, 0, 1, 1, 1, 1);
    GameController.player = this.player;
  }

  componentWillUnmount() {
    this.player = null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    /* each 3 step, we encounter a Robot to fight */
    if (
      this.state.moveCount === 5 &&
      this.state.gameState === GAME_STATE.Normal
    ) {
      this.setState({ gameState: GAME_STATE.Fighting });
    }
  }

  render() {
    return (
      <div id="graph" tabIndex="0" onKeyDown={this.handleKeyDown}>
        <Hero top={this.state.heroTop + "%"} left={this.state.heroLeft + "%"} />
        <Dragon />
        <FightScene gameState={this.state.gameState} />
      </div>
    );
  }
}

export default Graph;
