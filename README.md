# cg-market
为小孩子打造的一个积分商城，通过日常锻炼打卡，收获积分。


# get started


yarn install

调试项目

```bash
# 执行调试命令
$ npm run dev:weapp
or
yarn dev:weapp
```



使用小程序开发者工具打开项目下的 `dist` 目录

## 构建

```bash
# 执行构建命令
$ npm run build:weapp
or
$ yarn build:weapp
```

使用小程序开发者工具打开项目下的 `dist` 目录，上传代码即可。



# 项目进度

## 2024/111/05

1. 添加任务提交的交互功能，`我的`页面的积分显示与交互
2. 试运行。

## 2024/11/07

1. 添加管理员审核任务页面
2. bug: 角色只要不是monkey都是可以审核，后期通过接口去判断是否能够审核
3. 添加未登录页面