import React, { Component } from "react";
import FightMenu from "./FightMenu";

import GameController, { GAME_STATE } from "../core/game-controller";
import FightController from "../core/fight-controller";

class FightScene extends Component {
  constructor() {
    super();
    this.fightController = null;
  }

  componentDidUpdate() {
    if (
      this.props.gameState === GAME_STATE.Fighting &&
      this.fightController == null
    ) {
      this.fightController = GameController.startFight();
    }
  }

  render() {
    return (
      <div
        id="fight-scene"
        style={{
          /* TODO: fighting scene */
          display:
            this.props.gameState === GAME_STATE.Fighting ? "block" : "none"
        }}
      >
        <div>
          <div className="fight-hero">
            <img src="./assets/fight-hero.svg" alt="fight-hero" />
          </div>
          <div className="fight-robot">
            <img src="./assets/fight-ghost.svg" alt="fight-ghost" />
          </div>
        </div>
        <FightMenu />
      </div>
    );
  }
}

export default FightScene;
