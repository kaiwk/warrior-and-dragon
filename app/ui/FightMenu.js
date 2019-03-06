import React, { Component } from "react";
import { StateMap as RoleStateMap } from "../core/roles";
import { FIGHT_STATE } from "../core/fight-controller";

const FightMenu = ({ player, handleAbilityClick, abilityDesc, fightState }) => {
  return (
    <div id="fight-menu">
      <img className="hero-avatar" alt="avatar" />
      <ul className="hero-state">
        <li>生命:{player.hp}</li>
        <li>攻击:{player.ad}</li>
        <li>魔法:{player.mp}</li>
        <li>法术:{player.ap}</li>
      </ul>
      <ul className="hero-state vertical-line">
        <li>状态:{RoleStateMap[player.state]}</li>
        <li>金钱:{player.money}</li>
        <li>等级:{player.level}</li>
        <li>经验:{player.exp}</li>
      </ul>
      <div className="hero-ability vertical-line">
        <table>
          <tbody>
            <tr>
              <td>
                <button
                  className="hero-ability-btn"
                  onClick={() => handleAbilityClick(0)}
                >
                  {player.abilities[0].name}
                </button>
              </td>
              <td>
                <button
                  className="hero-ability-btn"
                  onClick={() => handleAbilityClick(1)}
                >
                  {player.abilities[1].name}
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button
                  className="hero-ability-btn"
                  onClick={() => handleAbilityClick(2)}
                >
                  {player.abilities[2].name}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="fight-description">
        {fightState === FIGHT_STATE.Init ||
        fightState === FIGHT_STATE.PlayerDead ||
        fightState === FIGHT_STATE.RobotDead
          ? ""
          : fightState === FIGHT_STATE.RobotTurn
          ? "你"
          : "怪物"}
        {abilityDesc}
      </p>
    </div>
  );
};

export default FightMenu;
