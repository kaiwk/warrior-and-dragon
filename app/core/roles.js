import { Attack, SpurOn, Smash, Bless, Shackle } from "./ability";

// Each level need exponentially increased experience.
const expBase = level => 10 * 2 ** level;
// 0 20 40 80 160 320 640 1280

const RoleState = {
  Normal: 0x00,
  Poison: 0x01, // reduce 5 hp each round.
  Vertigo: 0x02 // pause two round.
};

const RoleStateMap = {
  [RoleState.Normal]: "正常",
  [RoleState.Poison]: "中毒",
  [RoleState.Vertigo]: "眩晕"
};

class Human {
  /**
   * All user characters are humans.
   * Both Human and Robot has property hp.
   *
   * @param {String} name
   * @param {Number} hp hit point
   * @param {Number} mp magic point
   * @param {Number} exp experience
   * @param {Number} level
   * @param {Number} ad attack damage
   * @param {Number} ap attack power
   * @param {Number} ar Armor
   * @param {Number} mr Magic Resistance
   *
   */
  constructor(
    name,
    hp = 100,
    mp = 50,
    exp = 0,
    level = 0,
    money = 0,
    ad = 1,
    ap = 1,
    ar = 1,
    mr = 1
  ) {
    this.name = name;
    this.hp = hp;
    this.mp = mp;
    this.exp = exp;
    this.level = level;
    this.money = money;
    this.ad = ad;
    this.ap = ap;
    this.ar = ar;
    this.mr = mr;
    this.state = RoleState.Normal;
    this.abilities = [new Attack()];
    this.armedWith = [];
  }

  attack(robot) {
    robot.hp -= this.ad - robot.ar;
  }

  isAlive() {
    return this.hp > 0;
  }

  addExp(exp) {
    this.exp += exp;
    if (this.exp >= expBase(this.level)) {
      this.level += 1;
    }
  }

  addMoney(money) {
    this.money += money;
  }

  equipArm(weapon) {
    this.ad += weapon.ad;
    this.ap += weapon.ap;
    this.ar += weapon.ar;
    this.mr += weapon.mr;
    this.armedWith.push(weapon);
  }

  removeArm(weapon) {
    this.ad -= weapon.ad;
    this.ap -= weapon.ap;
    this.ar -= weapon.ar;
    this.mr -= weapon.mr;
    this.armedWith.splice(this.armedWith.indexOf(weapon), 1);
  }
}

class Warrior extends Human {
  constructor(
    name,
    hp = 120,
    mp = 50,
    exp = 0,
    level = 0,
    money = 0,
    ad = 10,
    ap = 0,
    ar = 5,
    mr = 5
  ) {
    super(name, hp, mp, exp, level, money, ad, ap, ar, mr);
    this.abilities.push(new SpurOn());
    this.abilities.push(new Smash());
  }
}

class SwordMan extends Human {
  constructor(
    name,
    hp = 100,
    mp = 50,
    exp = 0,
    level = 0,
    money = 0,
    ad = 8,
    ap = 0,
    ar = 8,
    mr = 8
  ) {
    super(name, hp, mp, exp, level, money, ad, ap, ar, mr);
  }
}

class Wizard extends Human {
  constructor(
    name,
    hp = 100,
    mp = 80,
    exp = 0,
    level = 0,
    money = 0,
    ad = 2,
    ap = 10,
    ar = 2,
    mr = 2
  ) {
    super(name, hp, mp, exp, level, money, ad, ap, ar, mr);
  }
}

class Robot {
  constructor(
    name,
    hp = 50,
    mp = 50,
    exp = 20,
    level = 1,
    money = 0,
    ad = 5,
    ap = 5,
    ar = 5,
    mr = 5
  ) {
    this.name = name;
    this.hp = hp;
    this.mp = mp;
    this.exp = exp;
    this.level = level;
    this.money = money;
    this.ad = ad;
    this.ap = ap;
    this.ar = ar;
    this.mr = mr;
    this.state = RoleState.Normal;
    this.abilities = [new Attack()];
  }

  isAlive() {
    return this.hp > 0;
  }
}

class Weapon {
  constructor(ad, ap, ar, mr) {
    this.ad = ad;
    this.ap = ap;
    this.ar = ar;
    this.mr = mr;
  }
}

class ShortSword extends Weapon {
  constructor(ad, ap, ar, mr) {
    super(ad, ap, ar, mr);
  }
}

class LongSword extends Weapon {
  constructor(ad, ap, ar, mr) {
    super(ad, ap, ar, mr);
  }
}

export {
  Human,
  Warrior,
  SwordMan,
  Wizard,
  Robot,
  ShortSword,
  RoleStateMap as StateMap,
  RoleState
};
