// Description:
//   腹筋したことを記録します
//
// Commands:
//   hubot 腹筋n回する - 腹筋する回数を設定 (nには数字が入る、n回の後はどんな文章を書いてもいい)
//   hubot 腹筋した - 腹筋したことを記録
//

"use strict";

const Situp = require("./lib/situp");

module.exports = (robot) => {
  const situp = new Situp(robot, { brainName: "situp" });

  robot.respond((/腹筋(\d+)回/i), (message) => {
    const targetTimes = Number(message.match[1]);
    situp.setSitup(targetTimes);
    message.send(`これから腹筋${targetTimes}回がんばって♥`);
  });

  robot.respond((/腹筋した/i), (message) => {
    situp.addStreak();
    situp.addTotalCount();
    const data = situp.getData();
    message.send(`
腹筋${data.targetTimes}回お疲れさま♥
${data.streaks}日連続で腹筋して、合計${data.totalCount}回腹筋したよ！
    `);
  });
};
