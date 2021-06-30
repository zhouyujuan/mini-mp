const ci = require('miniprogram-ci');
const fs = require('fs');
const inquirer = require('inquirer');

const projectConfig = require('./project.config.json');

const project = new ci.Project({
    appid: projectConfig.appid,
    type: 'miniProgram',
    projectPath: './',
    privateKeyPath: './private.wx3c13c274592b1af5.key',
    ignores: ['node_modules/**/*']
});

async function upload({version = '0.0.0', desc = 'test'}) {
    try {
        await ci.upload({
            project,
            version,desc,
            setting: {
                es7: true,
                minify: true,
                autoPrefixWXSS: true
            },
            onProgressUpdate: console.log
        })
    }
    catch (error) {
        console.log(error);
    }

}

function inquirerResult() {
  return inquirer.prompt([
      // 设置版本号
      {
        type: 'input',
        name: 'version',
        message: `设置上传的版本号:`,
    },

    // 设置上传描述
    {
        type: 'input',
        name: 'desc',
        message: `写一个简单的介绍来描述这个版本的改动过:`,
    },
]);
}

async function init() {
    let versionData = await inquirerResult();
    await upload(versionData);
    fs.writeFileSync('./version.config.json', JSON.stringify(versionData), err => {
        if(err) {
            console.log('自动写入app.json文件失败，请手动填写，并检查错误');
        }
    });
}

init();
