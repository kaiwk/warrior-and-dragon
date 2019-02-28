import React, { Component } from "react";

class FightMenu extends Component {
  render() {
    return (
      <div id="fight-menu">
        <img className="hero-avatar" alt="avatar" />
        <ul className="hero-state vertical-line">
          <li>生命:100</li>
          <li>魔法:50</li>
          <li>攻击:10</li>
          <li>法术:10</li>
          <li>状态:正常</li>
        </ul>
        <div className="hero-ability vertical-line">
          <table>
            <tbody>
              <tr>
                <td>
                  <button className="hero-ability-btn">攻击</button>
                </td>
                <td>
                  <button className="hero-ability-btn">禁锢</button>
                </td>
              </tr>
              <tr>
                <td>
                  <button className="hero-ability-btn">陷阵冲锋</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="fight-description">xxx开始蓄力，向敌人发起了猛击！</p>
      </div>
    );
  }
}

export default FightMenu;
