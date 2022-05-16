const glob = require("glob");
const fs = require("fs");
const dotenv = require("dotenv");
const gutil = require("gulp-util");

const argv = Object.assign({ mode: null }, gutil.env);

//列出.local文件，用于第一步询问需要部署哪个环境
const listLocal = glob.sync(".env.*.local").map(i => {
  const [lenPrefix, lenSuffix] = [".env.".length, ".local".length];
  return i.substr(lenPrefix, i.length - lenSuffix - lenPrefix);
});

//把env文件中的设置的参数放入process.env
const setEnv = mode => {
  let envSetting = getEnv(mode);
  Object.keys(envSetting).forEach(
    _key => (process.env[_key] = envSetting[_key])
  );
};

//合并.local文件， 比如合并 .env.dev 和 .env.dev.local， .local文件的配置会覆盖前面的
const getEnv = mode => {
  let data = [`.env.${mode || ""}`, `.env.${mode || ""}.local`];
  console.log("data11", data);
  data = data.filter(i => fs.existsSync(i));
  console.log("data", data);
  data = data.map(i => dotenv.config({ path: i }).parsed);
  return Object.assign.apply(this, data);
};

module.exports = { mode: argv.mode, listLocal, getEnv, setEnv };
