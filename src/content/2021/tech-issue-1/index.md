---
title: "Tech Issue #1"
date: 2021-12-25 16:54:11
uri: tech-issue-1
tags:
categories: Tech-Issue
---

因日常工作忙碌、个人时间太少, 故我将日常工作遇到的问题、上网学到的知识记录下来, 形成下面这样技术类的笔记, 希望能通过这种方式, 能每周能有所记录分享.

## 开发问题
### 在 Nodejs 中发起HTTP请求遇到 `unable to verify the first certificate`错误
近期有用户反馈： 同一个API接口，在浏览器、安卓客户端、iOS客户端、小程序里都能正常调用，但是在Nodejs 中却遇到了  `unable to verify the first certificate` 错误。

经过一番研究，发现这是目标网站证书配置错误导致的问题，在Nodejs这一侧解决的方案也很简单，有两个方法：
* 使用第三方包 [ssl-root-cas](https://www.npmjs.com/package/ssl-root-cas): `require('https').globalAgent.options.ca = require('ssl-root-cas/latest').create()`  让 Nodejs 能正确校验网站证书
* 设置环境变量: `process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0` ，禁用 Nodejs 对 HTTPS 网站证书的校验。不推荐，有安全风险

这个问题的根本原因在于网站的证书证书配置错误：证书信息不完整，一般是缺少中级证信息，而 Nodejs 会严格校验证书信息，导致了该错误。其他端不会出问题，则是因为他们会智能的尝试补全缺失的证书信息，反而惯坏了网站的配置管理员😒。

相关参考资料：
* https://stackoverflow.com/questions/31673587/error-unable-to-verify-the-first-certificate-in-nodejs
* https://www.npmjs.com/package/ssl-root-cas
* https://badssl.com 


### 一个NPM包如何同时支持小程序和Web
如果你有一个UI组件包或者一个工具包想要在小程序和Web上都可以用上，这个包大部分代码共享，只有少部分代码针对特定平台编写，那如何通过一个NPM包同时支持Web呢？
小程序官方支持在NPM包中通过package.json的`miniprogram`字段来特别指定包在小程序中的入口文件所在的文件夹（注意，是文件夹而不是文件）,  与标准的 `main` 字段含义类似。这样我们可以这样来声明package.json, 并保证打包后的目录和声明的一样：
```json
{
	"name": "my-fancy-packge",
	// web 的入口
	"main": "dist/index.js",
	// 小程序入口，确保有文件 dist/miniapp/index.js
	"miniprogram": "dist/miniapp",
	"files": ["dist/**"],
  ...
}

```

参考链接： https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html
## 工具分享
### iRingo: 解锁完整的 Apple功能和集成服务
苹果的服务和功能因为各种原因会在基于地理位置进行阉割, 使用该配置可绕过相关限制.

链接: [iRingo: 解锁完整的 Apple功能和集成服务](https://github.com/VirgilClyne/iRingo)

### Webpack 的替代工具
Webpack 是前端常用的构建工具, 功能强大、无所不能, 但其配置复杂、性能低下也常被人诟病, 下边推荐一些非主流的构建工具(其实都已经非常出名了)供你选择,  不同场景选择最适合的工具, 能大大提高你的工作效率.
* [Parcel](https://parceljs.org/)([GitHub](https://github.com/parcel-bundler/parcel)):  更符合直觉构建工具, 使用非常简单(甚至可以做到0配置).  可以用于打包 web 项目、JS库、electron应用、浏览器扩展等, 支持各种前端技术, 非常推荐
* [rollup.js](https://rollupjs.org/guide/zh/)([GitHub](https://github.com/rollup/rollup)): 轻量级的构建工具, 也支持各种插件, 可用于替代Webpack, 更擅长打包各种库, 性能效率要比Webpack高很多. 最近新起的的构建工具[Vite](https://vitejs.dev/)就是基于 rollup 二次封装的.
* [SWC](https://swc.rs/)([GitHub](https://github.com/swc-project/swc)): 使用 rust 语言 开发Javascript / Typescript 编译工具, 可用于替代 babel / typescript，编译速度是他们的几倍到几十倍. 上面 提到的 Parcel 的 js/ts 编译就是使用 swc
* [esbuild](https://esbuild.github.io/)([GitHub](https://github.com/evanw/esbuild)): 使用 go 语言开发的 Javascript / Typescript 编译工具，功能与上面的 swc一样，编译速度也非常快。
* [Nx](https://nx.dev/) ([GitHub](https://github.com/nrwl/nx)):  高效快速的打包工具, 原生支持 monorepo, 我暂时还未深入了解

## 文章分享
### Against 3X Speed - 抵制三倍速
我觉得大家(现代人类)注意力越来越涣散, 3x速、快餐文化并不是啥好事,  什么东西都是浅尝辄止、浮于表面，很难长时间集中注意力，也很难专注的去做一件事。
3倍速听书，并不会提高你的学习速度，因为人脑需要时间去理解和记忆，3倍速也只会让你听到的东西变成短暂的记忆，很难被你吸收，最后变成过眼云烟。同样的，3倍速看剧也有同样的问题，更糟糕的是，3倍速会让人物的语气、背景乐变得诡异，也将进一步让你难以理解剧情（国产注水电视剧不在讨论之列，4x看国产剧都不过分）、降低看剧的体验。
如果你觉得3倍速、看电影解说、听别人讲书籍精华等等快餐式文化消费并没有让你收获更多，那不妨试试 静下来、慢下来，用正常的速度好好看一部剧、看一本书。看的数量、速度并不是我们应当追求的，看的质量才是最重要的。

原文:  [Against 3X Speed - 抵制三倍速](https://perell.com/essay/against-3x-speed/)

### 我们为什么仍然允许吸烟
吸烟有害个人身体健康、容易上瘾，且危害社会公共卫生。如果当代有人发现了类似烟草的对身体有害且容易上瘾的产品，想在市场上销售，应当没有国家会允许。那为何我们没有禁止吸烟呢？主要有两个原因：
1. 经济原因：一方面，大部分国家会对香烟课以重税，香烟为国家带来巨额的财政收入；另一方面，因为吸烟有害身体健康，吸烟者会因吸烟而患上相关致命癌症，寿命会大大减少，也能为社会减少医疗、养老负担（虽然听起来很冷血，但却是事实）。基于上述原因，甚至有人调侃说吸烟的人才是真正的爱国者🤪
2. 历史原因：吸烟有害健康是很晚才被发现的，那时候香烟已经在全球流行起来，形成了成熟的产业链，受众很多，贸然禁止吸烟会引起极大的社会问题。

故，现代国家通过重税、限制吸烟场所、香烟包装盒写警示语或贴恐怖图片、禁止香烟广告等措施在逐步限制抽烟。

原文: [美国卫生研究所: Why do we still permit tobacco use?](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4631133/)

## 影音分享
* 音乐: **Study Music Project** 系列, 目前共有一百多首曲子, 该系列是由华裔音乐家 *Dennis Kuo* 创作的一系列轻音乐, 非常适合舒缓放松心情. 收听地址: [QQ音乐](https://i.y.qq.com/n2/m/share/details/taoge.html?hosteuin=owEsNK4l7Kni&id=8054496786&appversion=110005&ADTAG=wxfshare&appshare=iphone_wx), [网易云音乐](https://y.music.163.com/m/playlist?app_version=8.6.45&id=5011309788&userid=1809975&creatorId=382957814 ), [Apple Music](https://music.apple.com/us/album/study-music-project-6-memory-palace/1378626219).  如果你想了解这个音乐家, 可以查看[对他的专访](https://zhuanlan.zhihu.com/p/52486242)
* 公开课: [哈佛大学公开课：公正-该如何做是好？-网易公开课](https://open.163.com/newview/movie/courseintro?newurl=M6GOB7TT6),  这是一门入门级的政治哲学课程, 能让你对社会的公平正义有一定的认识. 该课程在全球备受好评, 讲师 Michael J. Sandel 的授课过程也非常的生动有趣. 课程上与学生互动很多, 他并不像传统课程那样照本宣科, 也没有给出任何官方、标准的见解, 而是通过不断的提问让学生进行思考、讨论, 所以整个课程是非常浅显易懂的.

