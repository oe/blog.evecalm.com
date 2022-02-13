---
title: "Tech Issue #2"
date: 2022-02-13 17:38:11
uri: tech-issue-2
tags:
categories: Tech-Issue
---

> 距离上一篇issue 已经块两月时间, 断更也主要是因为工作太忙.  由于工作忙碌, 业余也不再有啥有意思的个人项目了. 果然, 摸鱼才是第一创造力🤪

## 低代码的下一阶段：元编程

当前各家低码平台(这里讨论的是lowcode 非 [nocode](https://github.com/kelseyhightower/nocode) )技术上一般是使用结构由结构化json描述用户通过可视化编辑产生的应用, 然后再通过编译或者运行时动态将json转换成可执行代码, 这种方式技术门槛低, 生成出的产物勉强可用, 但是体验性能堪忧, 相比开发人员开发的应用, 缺陷主要在于:

1. 固化、臃肿的低代码框架代码: 一个简单的hello world应用可能就有几mb之巨, 大量无用代码难以优化
2. 冗余的包裹和嵌套: 为方便做逻辑控制、UI布局处理, 在技术实现上, 低码应用会比正常开发的代码多出很多容器、函数嵌套, 进一步损耗性能
3. 额外的学习成本: 低代码在我们常见的技术之上做了包装, 产生了一套自己的技术体系, 然而这一套技术体系并不是一个行业标准, 你需要为这个低码平台学习一套一次性的知识, 如果你要更换到另一个低码平台, 不好意思你得重新再学习一遍
4. 难以复用现有的组件库: 在低码平台中, 组件库的开发工作占的比重比较大, 由于低码平台大多是有一套自己私有的组件开发规范, 导致你必须将自己已有的组件库重新包装甚至重写才能在低码平台中使用
5. 难以实现自定义业务: 由于低码平台内部技术自成体系, 平台不支持的特性你很难用自定义代码实现; 由于其组件实现层层嵌套, 本来简单的样式风格调整在低码平台中也异常困难

所以现在低码平台面临的状况比较尴尬: 会写代码的人不会用它, 因为会显著降低开发效率; 不会写代码的人很难用起来, 处处遇到技术壁垒, 稍微有点自定义的需求即一筹莫展.

目前仅垂直领域的低码产品比较成熟, 如面向 地产、电商、OA、运维管理的产品, 特定领域有其特定的使用场景、要解决的问题、固定的交互模式及组件等, 这种平台开发起来要简单很多, 也的确能解决实际问题. 而那些愿景是大而全(什么都能做)的低码平台反而没有什么能实际落地使用的场景, 解决不了任何实际问题, 还处于玩具阶段.

即使各种低代码平台目前都不成熟, 但它依旧会继续发展、向前进步, 毕竟它的确能解决部分场景的问题、降低成本、提升效率, 未来很诱人. 说回低码的技术上, 目前出现了一些元编程的低码平台, 能有效的解决上述的五个弊端. 所谓低代码元编程, 即将源代码作为低代码可视化编辑器的产物, 而非冗长的结构化JSON对象, 同时也可以直接修改生成的源代码, 可视化编辑器会跟随动态变化. 这样的平台已经有几家了:

* [https://github.com/imcuttle/mometa](https://github.com/imcuttle/mometa) 由国人业余开发, 基于 vue, 可以阅读一下它的[实现原理](https://github.com/imcuttle/mometa/blob/master/docs/how-to-work.md)
* [https://github.com/BuilderIO/builder](https://github.com/BuilderIO/builder) 国外商业公司开发, 支持各种主流框架, 已经商用

元编程 听起来很玄乎, 但这类产品早就面世了, Adobe 在 2005 发布的 Dreamweaver 即是这种产品: 你可以完全通过可视化界面来开发网页, 也可以直接编辑它生成的代码(它生成的代码和手写代码无异, 甚至质量更高). 另外 Visual Studio / Xcode / Android Studio 等原生客户端IDE自带的可视化开发工具也是元编程的理念. 而低码的元编程与 Dreamweaver 并无本质差异, Dreamweaver 编辑的是原生的标签、属性, 而低码元编程则是要编辑自定义标签(自定义组件)、自定义属性等. 当然低码元编程除了需要使用到最基础的语法分析技术, 还需要解决各类框架、预处理语言的问题, 有更高的技术门槛.

## 在产品中更好的使用组件库

一般在一个设计良好的产品中, 会有统一且一致的设计风格, 这个风格可能和我们现有(或第三方)组件库风格有差异, 而组件库为了更通用更灵活会有多种风格和用法, 但我们通常只会使用组件库的某一种风格或用法, 又或者需要一种新的风格或用法. 这里有一种更好的使用方式, 能大大提高开发效率, 这也是大家很容易想到也很容易忽略的方式:

* 针对组件的样式、风格问题, 可以统一编写专门的样式文件去覆盖组件样式, 很多组件库都提供了less 或 sass 变量文件, 可以非常方便地修改整个组件库的样式风格
* 针对特定组件的用法问题(如表格组件只使用带边框风格的), 可以统一编写默认属性文件, 去定义组件的默认属性, 如react 支持使用 [defaultProps](https://reactjs.org/docs/typechecking-with-proptypes.html#default-prop-values) 来组件属性的默认值, 这样在使用具体组件时则可以省略掉这些本需要反复书写的默认值

### 重写NPM包依赖的依赖版本

日常开发中, 经常会遇到使用的npm包依赖的npm包版本过时了, 此时除了给npm包的作者提PR, 貌似就束手无策了. 其实, 我们可以在项目的package.json中重写依赖的版本, yarn 和 npm (不思进取的npm在 [8.3 才开始支持](https://github.com/npm/cli/releases/tag/v8.3.0) ) 分别以不同的方式支持了:

*yarn*  在package.json 中声明 `resolutions` 字段,  [参考文档](https://classic.yarnpkg.com/lang/en/docs/selective-version-resolutions/):

```javascript
{
  "resolutions": {
    "package-a": "2.0.0",
    "package-b": "5.0.0",
    "package-c": "1.5.2"
  }
}
```

*npm* 则使用 `overrides`  字段, [官方文档](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#overrides):

```javascript
{
  "overrides": {
    "foo": "1.0.0"
  }
}
```

## 为何会无法捕获异步函数调用中的错误

最近在工作中发现一个偶发问题, 一个异步函数明明已经在使用时 try-catch,  但总是无法捕获住其内的异常. 精简后的示例代码如下:

```javascript
async function task() {
  try {
    return someAsyncSubTask()
  } catch(e) {
    console.log('unexpected exception', e)
  }
}
```

观察了好久才意识到调用 `someAsyncSubTask`时未添加 `await`关键字,  导致其根本无法捕获其内抛出的错误.

这种错误其实可以通过添加下述代码(最好添加到所有代码执行之前)来监控到:

```javascript
// nodejs 中
import process from 'process'
// 未处理的错误
process.on('uncaughtException', (err, origin) => {
  console.log('Caught exception:', err, 'origin:', origin)
})

// 为处理的 promise 异常
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});


// 浏览器中
window.addEventListener("unhandledrejection", event => {
  console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
});
```

### Javascript Booster(VSCode 插件)

[JavaScript Booster - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=sburg.vscode-javascript-booster)

这是一个可以为Javascript/Typescript代码提供书写建议的插件, 可以快速完成一些常见的机械化操作:

* 将函数改写为具名/匿名函数
* 将代码块提取成独立的函数
* 把 if-else 转换为三元表达式(?:)
* 将字符串转换为模版字符串(即使用 ``` 包裹)
* 将TS的枚举转换为字符串枚举(即为每个枚举赋值为其字符串字面量本身)
* … 还有很多好用的功能, 详情[查看其仓库](https://github.com/xsburg/vscode-javascript-booster#features)

Tips: VSCode 中触发代码建议的快捷键是 `CMD + .`(macOS) / `CTRL + .`(windows, 没有尝试过, 应该默认是该快捷键😬), 你也可以在VSCode 的设置中搜索 `editor.action.quickFix` 来修改该快捷键

### Quikka.js(VSCode 插件)

[Quokka.js - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=WallabyJs.quokka-vscode)

日常开发Js/Ts 时, 如果要快速测试函数功能, 常见做法是使用chrome开发工具的console 或者 编写一个单独 nodejs 脚本用于测试. 该插件可以在VSCode中快速新建JS/TS 的 playground, 可即时查看执行结果及代码块是否执行到, 能极大的提高开发效率.

使用方法: 按快捷键 `cmd + shift + p` (windows下则使用 ctrl + shift + p)打开命令面板, 输入 `Quikka`, 选择 `Quokka.js: New File`, 再根据自己需要选择自己需要的语言来新建playground.

## 文章分享

### 针对Web开发者的rust教程

[rust](https://www.rust-lang.org/) 是由 Mozilla 创建的内存安全编程语言, 近年来受欢迎程度逐年攀升, 作为低级语言, 大有替代 C语言的趋势, Linux 和 Android 都已经支持使用 rust 进行内核开发. 作者针对前端开发人员编写了一份rust交互式学习教程, 由浅入深, 很容易上手. 学习 rust  可使用其来开发 [webassembly](https://rustwasm.github.io/docs/book/) , 也可以拓展自己的眼界、突破思维局限.

文章地址: [codeamigo](https://codeamigo.dev/lessons/preview/161)

### 为什么应当将 node_modules 提交到代码仓库中

Google 的 Chrome DevTools 开发工程师提了以上建议, 理由如下:

* 代码克隆下来后 无需 npm  install
* 可以保证大家的 node_modules 完全一致, 即使各种包管理工具有lock 文件, 但基于lock 安装的依赖依旧会有细微差异
* 添加/更新依赖时可以留意到依赖的变更内容, 能避免依赖包引入不安全的内容(比如最近的 fakerjs 投毒事件, 或者更新一个包却导致了与包不相关的文件产生了变化), 也会留意到依赖对产品包大小的影响
* 添加依赖会更加谨慎, 因为它不再被忽略了

虽然有以上这么多好处, 但是我目前不会采取该策略, 毕竟node_modules 中的内容实在太大了, 而手中的项目也没有如此重要, 工作团队中其他成员也大概也很难接受😄

文章地址: [Why you should check-in your node dependencies - Jack Franklin](https://www.jackfranklin.co.uk/blog/check-in-your-node-dependencies/)

### 五个迹象表明你应当辞职了

当你有如下迹象时, 你该考虑了:

* 你想成长, 但你无法学习到新知识
* 你一直在学习流程性的内容, 而非技能, 被工具绑架了
* 不认同公司/产品的价值理念, 与自己的价值观发生冲突
* 你的工作导致你不自信(总是遇挫, 或者总被上级/同事否定等)
* 你的工作影响到你的身体健康(比如受不了996)

文章地址: [5 Signs It’s Time to Quit Your Job – Accidentally in Code](https://cate.blog/2021/11/29/5-signs-its-time-to-quit-your-job/)

### 为你的付费软件创建更安全的激活码

很多软件的激活码就是32位或64位的序列号, 很容易找找到各种破解工具, 可以直接产生随意数量的能正常激活软件的序列号. 作者提出了使用 RSA 非对称加密算法来产生激活码, 这样即使客户端软件被破解(甚至直接开源), 也难以制作出可以随便生成激活码的工具. 本篇文章是讲如何用 Swift 来实现这个思路.

文章地址: [Creating a licensing system for paid apps in Swift](https://swiftrocks.com/creating-a-license-system-for-paid-apps-in-swift)

### 如何使用MDX、Next.js 构建富有交互的博客

这个前端开发者的博客非常精美, 博客中有可演示代码效果的 playground, 也有可直接操作的组件. 这篇文章讲他如何做到的. 他的博客其他文章也挺好的, 推荐添加到 rss 订阅列表.

文章地址:  [How I Built my Blog using MDX, Next.js, and React](https://www.joshwcomeau.com/blog/how-i-built-my-blog/)

