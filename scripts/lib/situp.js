"use strict";

class Situp {
  constructor(robot, options) {
    this.robot = robot;
    this.brainName = options.brainName;
  }

  setData(data) {
    this.robot.brain.set(this.brainName, data);
  }

  getData() {
    if (!this.robot.brain.get(this.brainName)) {
      this.robot.brain.set(this.brainName, {});
    }

    return this.robot.brain.get(this.brainName);
  }

  setSitupCount(userName, targetTimes) {
    if (typeof targetTimes !== "number") {
      throw new Error("腹筋をする回数は数字で書いてください");
    }

    const data = this.getData();

    if (!data[userName]) {
      data[userName] = {
        streaks: 0,
        targetTimes: 0,
        totalCount: 0
      };
    }

    data[userName].targetTimes = targetTimes;
    this.setData(data);
  }

  addStreak(userName) {
    const data = this.getData();
    data[userName]["streaks"] = data[userName]["streaks"] + 1;
    this.setData(data);
  }

  addTotalCount(userName) {
    const data = this.getData();
    data[userName]["totalCount"] = data[userName]["totalCount"] + data[userName]["targetTimes"];
    this.setData(data);
  }
}

module.exports = Situp;
