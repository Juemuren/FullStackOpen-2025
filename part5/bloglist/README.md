# 注意事项

- [5.12: Blog List Frontend, step 12](https://fullstackopen.com/zh/part5/props_children_%E4%B8%8E_proptypes#exercise-5-12)
**React 19** 取消了对 **PropTypes** 的支持，即使定义了 propTypes 也不会对组件的 prop 进行任何检查（包括使用 prop-types 包）。React 官方推荐的做法是使用 **TypeScript** 进行替代。更多内容请查阅[官方文档](https://react.dev/blog/2024/04/25/react-19-upgrade-guide#removed-proptypes-and-defaultprops)。本项目的 React 版本是 18.2.0，勉强还能使用。总之这是一个要被淘汰的技术，不值得花时间研究。
