# 注意事项

如果需要参考的话，这里列出部分可能需要注意的东西

- [10.11](#1011)
- [10.17](#1017)
- [10.24](#1024)

## 10.11

[rate-repository-api](https://github.com/fullstack-hy2020/rate-repository-api) 这个项目的依赖我开始时始终无法正确安装。有时候报错和网络有关，比如 `prebuild-install warn install connect ECONNREFUSED 127.0.0.1:443` 和 `prebuild-install warn install Request timed out `，有时报错和代理有关，比如 `npm error prebuild-install warn install unable to verify the first certificate`，有时又是兼容性问题，比如 `npm error prebuild-install warn This package does not support N-API version undefined`。

总之，由于无法下载可用的预编译二进制文件，`node-gyp` 插件会尝试本地编译。但即使安装了 VS，并进入了 VS 的编译环境，仍然会出现错误。我不清楚具体原因，也许是因为这个项目里使用了一堆已经弃用的依赖。反复看着安装过程中抛出的一堆 `deprecated` 警告和 `gyp` 错误，真是让人难以忍受。

最后我关闭了 SSL 证书验证下载了依赖。不过又出现了新的问题，GITHUB_API 总是会莫名其妙的失效，开始能用后来就不能用了。更换网络环境后总算解决了。

如果你想尝试验证作业是否有效的话，请在项目根目录创建一个 `.env` 文件，然后填写 `EXPO_PUBLIC_APOLLO_URI` 的值，并按照 [rate-repository-api](https://github.com/fullstack-hy2020/rate-repository-api) 的说明启动本地服务器。

## 10.17

由于 *10.19* 题中的 [RepositoryItemPressable](src/components/RepositoryList/RepositoryItemPressable.jsx) 这个组件用到了 `react-router-nativegate`，出现了 `import * as React from 'react'` 这种导入语法，而 Jest 并不支持这种语法，因此测试 [RepositoryList.test.jsx](src/__tests__/RepositoryList.test.jsx) 炸了。

我用了一种非常丑陋的方法解决了这个问题，即增加了如下代码

```js
jest.mock('react-router-native', () => ({
  useNavigate: () => jest.fn(),
}));
```

## 10.24

### 搜索功能实现

对仓库用关键字进行筛选时，我并没有在 **graphQL** 查询中使用 `searchKeyword` 这个变量，而是选择了另一种实现方式。

我直接对已经保存的 `repositories` 数组进行 `filter`，我认为这种实现是更直接、更简单省事的，还能少很多网络请求。

### 防抖动

很奇怪的是，我使用 `useDebounce` 时会出现吞输入的情况。这种情况在 Web、Andorid 端都可以轻易复现（我没有苹果设备）。

因此相关代码已被注释，最终的实现没有防抖动功能。


