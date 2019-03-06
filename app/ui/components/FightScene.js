import React, { Component } from "react";
import FightMenu from "./FightMenu";

import GameController, { GAME_STATE } from "../../core/game-controller";
import { FIGHT_STATE } from "../../core/fight-controller";

import { Human } from "../../core/roles";

class FightScene extends Component {
  constructor() {
    super();
    this.fightController = GameController.startFight();
    this.player = this.fightController.player;
    this.robot = this.fightController.robot;
    this.state = {
      fightState: FIGHT_STATE.Init,
      abilityDesc: ""
    };
  }

  isEnd = () => !this.player.isAlive() || !this.robot.isAlive();

  endFight = () => {
    if (
      this.state.fightState !== FIGHT_STATE.PlayerDead &&
      this.state.fightState !== FIGHT_STATE.RobotDead
    ) {
      if (!this.player.isAlive()) {
        this.setState({
          fightState: FIGHT_STATE.PlayerDead,
          abilityDesc: "你输了！"
        });
      }

      if (!this.robot.isAlive()) {
        this.setState({
          fightState: FIGHT_STATE.RobotDead,
          abilityDesc: "你赢了！"
        });
        this.player.addExp(this.robot.exp);
        this.player.money += this.robot.money;
      }

      setTimeout(() => {
        this.props.hideFightScene();
      }, 1000);
    }
  };

  handleAbilityClick = index => {
    if (this.state.fightState !== FIGHT_STATE.RobotTurn) {
      const ability = this.player.abilities[index];

      ability.execute(this.player, this.robot);

      if (this.isEnd()) {
        this.endFight();
      } else {
        this.setState({
          abilityDesc: ability.description,
          fightState: FIGHT_STATE.RobotTurn
        });

        console.log("Player attacking:");
        console.log("Player: hp:" + this.player.hp);
        console.log("Robot:  hp:" + this.robot.hp);
      }
    }
  };

  componentDidUpdate() {
    if (this.state.fightState === FIGHT_STATE.RobotTurn) {
      const ability = this.robot.abilities[0];

      ability.execute(this.robot, this.player);

      if (this.isEnd()) {
        this.endFight();
      } else {
        setTimeout(() => {
          this.setState({
            abilityDesc: ability.description,
            fightState: FIGHT_STATE.PlayerTurn
          });

          console.log("Robot attacking:");
          console.log("Player: hp:" + this.player.hp);
          console.log("Robot:  hp:" + this.robot.hp);
        }, 1000);
      }
    }
  }

  render() {
    return (
      <div id="fight-scene">
        <div>
          <div className="fight-role">
            <img src="./assets/fight-warrior.svg" alt="fight-hero" />
          </div>
          <div className="fight-role">
            <img src="./assets/fight-ghost.svg" alt="fight-ghost" />
          </div>
        </div>
        <FightMenu
          player={this.player}
          handleAbilityClick={this.handleAbilityClick}
          abilityDesc={this.state.abilityDesc}
          fightState={this.state.fightState}
        />
      </div>
    );
  }
}

export default FightScene;
