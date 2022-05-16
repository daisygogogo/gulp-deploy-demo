const gulp = require("gulp");
const sftp = require("gulp-sftp-up4");
const { taskDeploy } = require("./builder/task-deploy");
const envConfig = require("./builder/env.config");

gulp.task("test-deploy", function() {
  return gulp.src("dist" + "/**").pipe(
    sftp({
      host: "192.168.2.68", //服务器的IP
      user: "root", //服务器的登录账户
      pass: "123456", //服务器的登录密码
      port: "22", //端口默认值就是22
      remotePath: `/web` //前端文件放置的路径
    })
  );
});

gulp.task("deploy", _callback => taskDeploy(envConfig, _callback));
