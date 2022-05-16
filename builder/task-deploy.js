const { execSync } = require("child_process");
const prompts = require("prompts");
const gulp = require("gulp");
const sftp = require("gulp-sftp-up4");

//deploy task
const taskDeploy = ({ listLocal, setEnv, mode }, _callback) => {
  if (mode !== null) {
    return Promise.resolve()
      .then(() => console.log(`Deploy starting...`))
      .then(() => setEnv(mode)) // 设置环境变量
      .then(() => {
        return buildApp({ mode }); //打包项目
      })
      .then(() => {
        return deploy();
      })
      .catch(_error => console.log(`❌ ${_error.message && _error}`))
      .finally(_callback);
  } else {
    // 没有指定打包环境，就执行下面这段代码，下面这段代码的实际作用就是根据命令行中的选择，构建出每个环境最终的gulp deploy task命令，
    // 执行命令的时候，因为mode不为空了，就会执行上面if中的代码了
    chooseEnviroments({ envs: listLocal })
      .then(({ environments }) => batchDeploy({ environments }))
      .catch(_error => console.log("error", _error))
      .finally(_callback);
  }
};

//使用prompts，在部署过程中提供友好的交互式命令行提示
const chooseEnviroments = ({ envs }) => {
  return prompts([
    {
      type: "multiselect",
      name: "environments",
      message: "Which environments do you want to deploy?",
      choices: envs.map(i => ({ title: i, value: i })),
      validate: environments =>
        environments.length === 0 ? "environments is required" : true
    }
  ]);
};

//循环获取之前选择要部署的环境，挨个部署这些环境，这里如果不需要分环境打包，可以优化一下不用重复打包
const batchDeploy = ({ environments }) => {
  let envDeploySuccess = [];
  environments.forEach(_env => {
    let cmd = `gulp deploy --mode ${_env}`;

    let execResult = execCommandSync(cmd).toString();
    console.log(execResult);

    if (execResult.includes("Deploy Succeeded")) envDeploySuccess.push(_env);
    console.log("exec", cmd, "done");
  });
};

//执行gulp deploy task
const execCommandSync = _cmd => {
  console.log("exec command:", _cmd);
  try {
    return execSync(_cmd)
      .toString()
      .trim();
  } catch (e) {
    return null;
  }
};

// 使用 vue cli 编译打包项目
const buildApp = ({ environment }) => {
  console.log(`Vue Cli Building for ${environment} ...`);
  let execResult = execCommandSync(
    `vue-cli-service build --mode ${environment}`
  ).toString();
  console.log(execResult);
  return Promise.resolve();
};

//使用sftp上传文件到服务器
const deploy = () => {
  gulp.src("dist" + "/**").pipe(
    sftp({
      host: process.env.HOST,
      user: process.env.USER,
      pass: process.env.PASSWORD,
      port: "22", //默认值就是22
      remotePath: process.env.REMOTE_PATH
    })
  );
};

module.exports = { taskDeploy };
