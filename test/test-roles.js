import { Warrior, Robot, ShortSword } from "../app/core/roles";

test("warrior(ad:10) attack robot(hp: 80, ar: 1), after that robot hp should be 70.", () => {
  const warrior = new Warrior("jack", 100, 50, 200, 1, 0, 10, 5, 1, 1);
  const robot = new Robot("robot", 80, 0, 10, 2, 1, 1);
  warrior.attack(robot);
  expect(robot.hp).toBe(71);
});

test("warrior(ad: 50) attack robot(hp: 40), after that robot should be dead.", () => {
  const warrior = new Warrior("jack", 100, 50, 200, 1, 0, 50, 5, 1, 1);
  const robot = new Robot("robot", 40, 0, 10, 2, 1, 1);
  warrior.attack(robot);
  expect(robot.isAlive()).toBe(false);
});

test("warrior(exp: 310, level: 4), get 30 exp, he should level up.", () => {
  const warrior = new Warrior("jack", 150, 50, 310, 4, 0, 10, 10, 20, 30);
  warrior.addExp(30);
  expect(warrior.exp).toBe(340);
  expect(warrior.level).toBe(5);
});

test("warrior(money: 10), add 20, he should have 30.", () => {
  const warrior = new Warrior("jack", 150, 50, 310, 4, 10, 10, 10, 20, 30);
  warrior.addMoney(20);
  expect(warrior.money).toBe(30);
});

test("warrior(ad: 10), equip short sword(ad: 10), he should has 20 ad.", () => {
  const warrior = new Warrior("jack", 150, 50, 310, 4, 10, 10, 10, 20, 30);
  const shortSword = new ShortSword(10, 0, 0, 0);
  warrior.equipArm(shortSword);
  expect(warrior.ad).toBe(20);
  expect(warrior.armedWith).toEqual([shortSword]);
  warrior.removeArm(shortSword);
  expect(warrior.ad).toBe(10);
  expect(warrior.armedWith).toEqual([]);
});
