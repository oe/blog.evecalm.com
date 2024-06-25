---
title: "Tech Issue #3"
date: 2024-05-05 01:15:11
uri: tech-issue-3
categories: 
  - Tech-Issue
---

> 有两年没更新博客了, 坚持做一件事情真的很需要毅力. 随缘更新, 对最近学到看到的技术相关的内容做一些记录.


## Typescript 将字符串枚举转换为字符串联合类型

```ts
enum Weekday {
    MONDAY = 'mon',
    TUESDAY = 'tue',
    WEDNESDAY = 'wed'
}
type WeekdayType = `${Weekday}`
```

参考: [https://stackoverflow.com/questions/52393730/typescript-string-literal-union-type-from-enum](https://stackoverflow.com/questions/52393730/typescript-string-literal-union-type-from-enum)

## 更新yarn.lock 中的依赖版本

`yarn upgrade-interactive`

参考: [https://github.com/yarnpkg/yarn/issues/2788](https://github.com/yarnpkg/yarn/issues/2788)

## jest typescript 测试报告的未覆盖行数不准确

tsconfig.json 中增加 `"sourceMap": true`即可

参考: [https://github.com/kulshekhar/ts-jest/issues/378#issuecomment-979098060](https://github.com/kulshekhar/ts-jest/issues/378#issuecomment-979098060)

## macOS 上快速预览代码文件

[Syntax Highlight](https://github.com/sbarex/SourceCodeSyntaxHighlight) 是Mac上为代码文件提供预览支持的软件, 支持绝大多数常见的代码文件, 还支持预览主题定义.

地址: [https://github.com/sbarex/SourceCodeSyntaxHighlight](https://github.com/sbarex/SourceCodeSyntaxHighlight)

这里要特殊说一下前端使用的`.ts` 文件: `.ts` 文件是macOS上内置的视频文件类型, 不允许被直接修改, 但实际上这种视频文件比较少见, 以至于安装了上述应用也无法支持 `.ts` 代码文件的预览. 可按链接 [https://stackoverflow.com/a/47240412](https://stackoverflow.com/a/47240412) 说明来操作修正.

## 如何更高效的调整论文格式
写过毕业论文的人一定知道, 调整论文格式是一件非常繁琐的事情. 这里提供一个简单的思路, 用于更高效的调整论文格式:
* 使用 `markdown` 或 `latex` 写论文, 注意按照语法标记好标题、段落、引用等
* 使用 `pandoc` 将 `markdown` 或 `latex` 转换为 `docx` 格式
* 使用 `word` 调整格式, 注意使用工具栏中的样式统一调整 标题、段落、引用等的样式, 而不是逐行调整

latex 是一种专业的排版语言, 但是学习曲线较陡, 对数学公式支持表较好; markdown 是一种轻量级的排版语言, 语法简单, 可通过插件支持各种功能(数学公司、图表、脑图等等), 更适合写论文.


## 如何提供用户友好的错误信息

原文: [https://www.sketch.com/blog/2022/03/09/how-to-write-user-friendly-error-messages/](https://www.sketch.com/blog/2022/03/09/how-to-write-user-friendly-error-messages/)

## 如何变富

原文: [https://www.bmpi.dev/self/how-to-get-rich/](https://www.bmpi.dev/self/how-to-get-rich/)

### shell 脚本最佳实践

原文: [https://sharats.me/posts/shell-script-best-practices/](https://sharats.me/posts/shell-script-best-practices/)

### 代码可读性的重要性

![quote about code readability](./code-readability.png)

原文: [https://jrsinclair.com/articles/2022/what-if-the-team-hates-my-functional-code/](https://jrsinclair.com/articles/2022/what-if-the-team-hates-my-functional-code/)

## 你为何不离职

离职时会有离职面谈, 作者认为公司也应当定期对不离职的员工面谈,问问为何留下来, 下边是一些常见问题:

- 你上次想离职是什么时候, 是什么让你有这种冲动?
- 是什么让你在这里日复一日工作, 为何还不走?
- 你的工作有哪些让你期待和厌烦的地方?
- 你有学到你想学的东西么?
- 怎么做可以让你更想留下来?

原文: [https://critter.blog/2021/06/02/stay-interviews-the-opposite-of-exit-interviews/](https://critter.blog/2021/06/02/stay-interviews-the-opposite-of-exit-interviews/)

## WTF 笔记

每加入一个新团队, 都应当写一页 **WTF-[团队名]** 笔记, 每当遇到问题(让自己惊叹What's the fuck)时, 都可以在上面记录下来, 同时记录下自己觉得可以改变的地方. 在入职两周内, 保持记录的习惯, 观察团队, 记录所有觉得不合适的地方(以及大家这么做的原因), 不要着急去提出意见.  划掉清单中有这些情况的条目:

1. 有充分理由这么做的
2. 团队已经在修复的
3. 团队不关心的
4. 很容易修复的

剩下的就是可以着手去改善的, 这对你融入团队、改进团队、领导团队会有很大帮助.

原文: [https://www.simplermachines.com/why-you-need-a-wtf-notebook/](https://www.simplermachines.com/why-you-need-a-wtf-notebook/)

