const FIGHT_STATE = {
  PlayerTurn: 0x00,
  RobotTurn: 0x01,
  PlayerDead: 0x02,
  RobotDead: 0x03,
  Init: 0x04,
  End: 0x05
};

class FightController {
  /**
   *
   * @param {Object} player
   * @param {Object} robot
   */
  constructor(player, robot) {
    this.state = FIGHT_STATE.Init;
    this.player = player;
    this.robot = robot;
  }

  /**
   *
   * @param {Object} action
   * {
   *   id: 1,
   *   ability: "attck | fireball..."
   * }
   */
  nextTurn(action) {
    switch (this.state) {
      case FIGHT_STATE.Init:
      case FIGHT_STATE.PlayerTurn:
        if (!this.player.isAlive()) {
          this.state = FIGHT_STATE.End;
          return;
        }

        if (this.player.hasOwnProperty(action.ability)) {
          console.log("Player action!");
        }
        this.state = FIGHT_STATE.RobotTurn;
        break;
      case FIGHT_STATE.RobotTurn:
        if (!this.robot.isAlive()) {
          this.state = FIGHT_STATE.End;
          return;
        }

        if (this.robot.hasOwnProperty(action.ability)) {
          console.log("Robot action!");
        }
        this.state = FIGHT_STATE.PlayerTurn;
        break;
    }
  }
}

export default FightController;
export { FIGHT_STATE };
