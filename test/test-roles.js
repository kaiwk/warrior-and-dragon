import { Warrior, Monster } from "../app/core/roles";

test("warrior(ad:10) attack monster(hp: 80, ar: 1), after that monster hp should be 70.", () => {
  const warrior = new Warrior("jack", 100, 50, 200, 1, 10, 5, 1, 1);
  const monster = new Monster("monster", 80, 10, 2, 1, 1);
  warrior.attack(monster);
  expect(monster.hp).toBe(71);
});

test("warrior(ad: 50) attack monster(hp: 40), after that monster should be dead.", () => {
  const warrior = new Warrior("jack", 100, 50, 200, 1, 50, 5, 1, 1);
  const monster = new Monster("monster", 40, 10, 2, 1, 1);
  warrior.attack(monster);
  expect(monster.isAlive()).toBe(false);
});

test("warrior(exp: 310, level: 4), get 30 exp, he should level up.", () => {
  const warrior = new Warrior("jack", 150, 50, 310, 4, 10, 10, 20, 30);
  warrior.addExp(30);
  expect(warrior.exp).toBe(340);
  expect(warrior.level).toBe(5);
});
