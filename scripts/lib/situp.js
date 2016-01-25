"use strict";

class Situp {
  constructor(robot, options) {
    this.robot = robot;
    this.brainName = options.brainName;
  }

  /**
   * @private
   */
  saveData(data) {
    this.robot.brain.set(this.brainName, data);
  }

  getData() {
    if (!this.robot.brain.get(this.brainName)) {
      this.robot.brain.set(this.brainName, {
        streaks: 0,
        targetTimes: 0,
        totalCount: 0
      });
    }

    return this.robot.brain.get(this.brainName);
  }

  setSitup(targetTimes) {
    if (typeof targetTimes !== "number") {
      throw new Error("腹筋をする回数は数字で書いてください");
    }

    const data = this.getData();
    data.targetTimes = targetTimes;
    this.saveData(data);
  }

  addStreak() {
    const data = this.getData();
    data.streaks = data.streaks + 1;
    this.saveData(data);
  }

  addTotalCount() {
    const data = this.getData();
    data.totalCount = data.totalCount + data.targetTimes;
    this.saveData(data);
  }
}

module.exports = Situp;
