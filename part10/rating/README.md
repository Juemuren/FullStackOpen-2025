# 注意事项

[rate-repository-api](https://github.com/fullstack-hy2020/rate-repository-api) 这个项目的依赖我开始时始终无法正确安装。有时候报错和网络有关，比如 `prebuild-install warn install connect ECONNREFUSED 127.0.0.1:443` 和 `prebuild-install warn install Request timed out `，有时报错和代理有关，比如 `npm error prebuild-install warn install unable to verify the first certificate`，有时又是兼容性问题，比如 `npm error prebuild-install warn This package does not support N-API version undefined`。

总之，由于无法下载可用的预编译二进制文件，`node-gyp` 插件会尝试本地编译。但即使安装了 VS，并进入了 VS 的编译环境，仍然会出现错误。我不清楚具体原因，也许是因为这个项目里使用了一堆已经弃用的依赖。反复看着安装过程中抛出的一堆 `deprecated` 警告和 `gyp` 错误，真是让人难以忍受。

最后我关闭了 SSL 证书验证下载了依赖。不过又出现了新的问题，GITHUB_API 总是会莫名其妙的失效，开始能用后来就不能用了。于是我只能无奈放弃这些练习。

因此，本练习最终停止在 [Exercise 10.11: fetching repositories with Apollo Client](https://fullstackopen.com/en/part10/communicating_with_server#exercise-10-11)。我想我未来大概率不会再回来做道题了，配置环境和 API 失效真是最令人痛苦的东西。

如果你想尝试验证作业是否有效的话，请在项目根目录创建一个 `.env` 文件，然后将 `EXPO_PUBLIC_IP` 的值设为你的 IP 地址，并按照 [rate-repository-api](https://github.com/fullstack-hy2020/rate-repository-api) 的说明启动本地服务器。反正我无法验证了，我只会收到 `GITHUB_API_FAILURE` 这几个令人绝望的字符。