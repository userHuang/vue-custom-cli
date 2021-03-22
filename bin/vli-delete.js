#!/usr/bin/env node
// 交互式命令行
const inquirer = require('inquirer')
// 修改控制台字符串的样式
const chalk = require('chalk')
// node 内置文件模块
const fs = require('fs')
// 读取根目录下的 template.json
const tplObj = require(`${__dirname}/../template`)

// 自定义交互式命令行的问题及简单的校验
let question = [{
  name: 'name',
  type: 'input',
  message: '请输入要删除的模板名称',
  validate (val) {
    if (!val) {
      return 'Name is required'
    } else if (!tplObj[val]) {
      return 'Template does not existed!'
    } else {
      return true
    }
  }
}]

inquirer.prompt(question).then(answers => {
  // answers 就是用户输入的内容，是个对象
  const { name } = answers
  delete tplObj[name]
  fs.writeFile(`${__dirname}/../template.json`, JSON.stringify(tplObj), 'utf-8', err => {
    if (err) {
      console.log(err)
    } else {
      console.log('\n')
      console.log(chalk.green('Added successfully!\n'))
      console.log(chalk.grey('The latest template list is: \n'))
      console.log(tplObj)
      console.log('\n')
    }
  })
})