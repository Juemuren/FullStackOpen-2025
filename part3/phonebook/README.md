# Part3 练习

## 待解决的问题
- [3.10 phonebook backend step10](https://fullstackopen.com/zh/part3/%E6%8A%8A%E5%BA%94%E7%94%A8%E9%83%A8%E7%BD%B2%E5%88%B0%E7%BD%91%E4%B8%8A#exercises-3-9-3-11)
由于部署应用到Heroku上需要绑定信用卡，故暂时无法完成此题。
- [3.21 Deploying the database backend to production](https://fullstackopen.com/zh/part3/es_lint%E4%B8%8E%E4%BB%A3%E7%A0%81%E6%A3%80%E6%9F%A5#exercises-3-19-3-21)
由于部署应用到 H**eroku/Fly.io/Render** 上需要绑定信用卡，故暂时无法完成此题。

## 注意事项
- [3.12: Command-line database](https://fullstackopen.com/zh/part3/%E5%B0%86%E6%95%B0%E6%8D%AE%E5%AD%98%E5%85%A5_mongo_db#exercise-3-12)
如需测试 `mongo.js` 程序是否正确，请在本目录下创建 `.env` 文件并将`DATABASE_USERNAME`、`DATABASE_CLUSTER`、`DATABASE_APPNAME` 这3个环境变量设为你的数据库 **URL** 中对应的值。出于隐私原因，我没有将它们硬编码在文件中。
- [3.22: Lint configuration](https://fullstackopen.com/zh/part3/es_lint%E4%B8%8E%E4%BB%A3%E7%A0%81%E6%A3%80%E6%9F%A5#exercise-3-22)
本人的开发环境是Windows平台。如果使用别的操作系统，请在[eslint.config.mjs](/part3/phonebook/eslint.config.mjs)中修改 `@stylistic/js/linebreak-style` 这条规则，否则lint仍有报错。