import { RoleState } from "./roles";

const ABILITIES = {
  // snake
  poison: {},
  // dragon
  dragonBreath: {
    name: "巨龙吐息",
    effect:
      "龙喷射大量火焰和毒液，对所有敌人造成200法术伤害，并进入中毒状态，每回合减5点生命值。",
    description: "喷射大量火焰和毒液，造成伤害"
  },
  dragonFly: {
    name: "飞龙在天",
    effect:
      "龙高高飞翔在天空，然后重重的落地，对单个敌人造成250的物理伤害，并眩晕敌人两回合。",
    description: "高高飞翔在天空，然后重重的落地，造成伤害"
  }
};

class Ability {
  constructor(name, effect, description) {
    this.name = name;
    this.effect = effect;
    this.description = description;
  }

  execute(self, enemy) {
    console.log("execute " + this.name);
  }
}

class Attack extends Ability {
  constructor(
    name = "攻击",
    effect = "普通攻击，造成和攻击力数值一样的物理伤害",
    description = "发动了普通攻击，造成伤害"
  ) {
    super(name, effect, description);
  }

  execute(self, enemy) {
    const damage = self.ad - enemy.ar;
    enemy.hp -= damage > 0 ? damage : 1;
  }
}

class SpurOn extends Ability {
  constructor(
    name = "背水一战",
    effect = "损伤10生命值，增加10攻击力。",
    description = "发动背水一战"
  ) {
    super(name, effect, description);
  }

  execute(self, enemy) {
    self.hp -= 10;
    self.ad += 10;
  }
}

class Smash extends Ability {
  constructor(
    name = "奋力一击",
    effect = "蓄力发出猛击，对敌人造成（40+物理攻击）的物理伤害。",
    description = "发动奋力一击，造成伤害"
  ) {
    super(name, effect, description);
  }

  execute(self, enemy) {
    const damage = 40 + self.ad - enemy.ar;
    enemy.hp -= damage > 0 ? damage : 1;
  }
}

class Bless extends Ability {
  constructor(
    name = "祝福",
    effect = "恢复自身的异常状态，并且增加（50+法术攻击*0.5）的生命值。",
    description = "发动祝福，恢复生命值"
  ) {
    super(name, effect, description);
  }

  execute(self, enemy) {
    self.state = RoleState.Normal;
    self.hp += 50 + self.ap * 0.5;
  }
}

class Fireball extends Ability {
  constructor(
    name = "火球术",
    effect = "释放火球，造成（20+法术攻击*0.8)的单体法术伤害。",
    description = "发动了火球术，造成伤害"
  ) {
    super(name, effect, description);
  }

  execute(self, enemy) {
    const damage = 20 + self.ap * 0.8 - enemy.mr;
    enemy.hp -= damage > 0 ? damage : 1;
  }
}

class Sprint extends Ability {
  constructor(
    name = "陷阵冲锋",
    effect = "向敌人发起冲锋，造成（20+物理攻击）的群体伤害。",
    description = "向敌人发起冲锋，造成伤害"
  ) {
    super(name, effect, description);
  }

  execute(self, enemy) {
    const damage = 20 + self.ad - enemy.mr;
    enemy.hp -= damage > 0 ? damage : 1;
  }
}

class Shackle extends Ability {
  constructor(
    name = "画地为牢",
    effect = "禁锢对方两个回合。",
    description = "发动禁锢，对方被禁锢两个回合"
  ) {
    super(name, effect, description);
  }

  execute(self, enemy) {
    enemy.state = RoleState.Vertigo;
  }
}

class Poison extends Ability {
  constructor(
    name = "毒咬",
    effect = "猛咬一口，造成（25+法术攻击）的单体伤害，并导致其进入中毒状态，每回合减5点生命值。",
    description = "发起毒咬，进入中毒状态，并造成伤害"
  ) {
    super(name, effect, description);
  }

  execute(self, enemy) {
    const damage = 25 + self.ap - enemy.mr;
    enemy.hp -= damage > 0 ? damage : 1;
    enemy.state = RoleState.Poison;
  }
}

class DragonBreathe extends Ability {
  constructor(
    name = "巨龙吐息",
    effect = "喷射大量火焰和毒液，对所有敌人造成200法术伤害，并进入中毒状态，每回合减5点生命值。",
    description = "喷射大量火焰和毒液，造成伤害"
  ) {
    super(name, effect, description);
  }

  execute(self, enemy) {
    const damage = 200 - enemy.mr;
    enemy.hp -= damage > 0 ? damage : 1;
    enemy.state = RoleState.Poison;
  }
}

class DragonFly extends Ability {
  constructor(
    name = "飞龙在天",
    effect = "龙高高飞翔在天空，然后重重的落地，对单个敌人造成250的物理伤害，并眩晕敌人两回合。",
    description = "高高飞翔在天空，然后重重的落地，造成伤害"
  ) {
    super(name, effect, description);
  }

  execute(self, enemy) {
    const damage = 250 - enemy.ar;
    enemy.hp -= damage > 0 ? damage : 1;
    enemy.state = RoleState.Vertigo;
  }
}

export {
  Attack,
  SpurOn,
  Smash,
  Bless,
  Fireball,
  Sprint,
  Shackle,
  DragonBreathe
};
