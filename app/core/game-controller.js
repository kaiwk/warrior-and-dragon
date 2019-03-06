import FightController from "./fight-controller";
import { Robot } from "./roles";

const GAME_STATE = {
  Normal: 0x01,
  Fighting: 0x02,
  EndFight: 0x03
};

const GameController = {
  player: null,

  state: GAME_STATE.Normal,
  /**
   * @returns {FightController} fightController
   */
  startFight: function() {
    const robot = new Robot("robot", 100, 10, 5, 2, 2, 2);
    const fightController = new FightController(this.player, robot);
    console.log("fight start!");
    return fightController;
  }
};

export default GameController;
export { GAME_STATE };
