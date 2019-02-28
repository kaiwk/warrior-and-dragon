// Each level need exponentially increased experience.
const expBase = level => 10 * 2 ** level;
// 0 20 40 80 160 320 640 1280

const ABILITIES = {
  // common
  attack: {
    name: "攻击",
    description: "普通攻击，造成和攻击力数值一样的物理伤害"
  },
  // wizard
  fireball: {
    name: "火球术",
    description: "释放火球，造成（20+等级*5+法术攻击*0.8)的单体法术伤害。"
  },
  bless: {
    name: "祝福",
    description: "恢复全体队友的异常状态，并且增加（50+法术攻击*0.5）的生命值。"
  },
  // warrior
  spuron: {
    name: "背水一战",
    description: "损伤10生命值，增加10攻击力。"
  },
  smash: {
    name: "奋力一击",
    description: "蓄力发出猛击，对敌人造成（40+物理攻击）的物理伤害。"
  },
  // swordman
  shackle: {
    name: "画地为牢",
    description: "禁锢对方两个回合。"
  },
  sprint: {
    name: "陷阵冲锋",
    description: "向敌人发起冲锋，造成（20+物理攻击）的群体伤害。"
  },
  // snake
  poison: {
    name: "毒咬",
    description:
      "猛咬一口，造成（25+法术攻击）的单体伤害，并导致其进入中毒状态，每回合减5点生命值。"
  },
  // dragon
  dragonBreath: {
    name: "巨龙吐息",
    description:
      "龙喷射大量火焰和毒液，对所有敌人造成200法术伤害，并进入中毒状态，每回合减5点生命值。"
  },
  dragonFly: {
    name: "飞龙在天",
    description:
      "龙高高飞翔在天空，然后重重的落地，对单个敌人造成250的物理伤害，并眩晕敌人两回合。"
  }
};

const RoleState = {
  Normal: 0x00,
  Poison: 0x01, // reduce 5 hp each round.
  Vertigo: 0x02 // pause two round.
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
    this.abilityList = [];
    this.armedWith = [];
  }

  attack(target) {
    target.hp -= this.ad - target.ar;
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
  }

  spuron() {}

  smash() {}
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

  shackle() {}

  sprint() {}
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

  fireball(robot) {}

  bless(robot) {}
}

class Robot {
  constructor(name, hp = 50, money = 0, ad = 5, ap = 5, ar = 5, mr = 5) {
    this.name = name;
    this.hp = hp;
    this.money = money;
    this.ad = ad;
    this.ap = ap;
    this.ar = ar;
    this.mr = mr;
  }

  attack(target) {
    target.hp -= this.ad - target.ar;
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

export { Human, Warrior, SwordMan, Wizard, Robot, ShortSword };
