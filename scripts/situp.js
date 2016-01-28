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

  robot.respond((/^腹筋(\d+)回/i), (message) => {
    const targetTimes = Number(message.match[1]);
    const userName = message.message.user.name;

    situp.setSitupCount(userName, targetTimes);
    message.reply(`これから腹筋${targetTimes}回がんばって♥`);
  });

  robot.respond((/^腹筋(?:し|やっ)た/i), (message) => {
    const userName = message.message.user.name;
    situp.addStreak(userName);
    situp.addTotalCount(userName);

    const data = situp.getData();
    message.reply(`
腹筋${data[userName]["targetTimes"]}回お疲れさま♥
${data[userName]["streaks"]}日連続で腹筋して、合計${data[userName]["totalCount"]}回腹筋したよ！
    `);
  });
};
