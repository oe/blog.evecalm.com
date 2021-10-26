---
title: "[建站]为自己的网站在Chrome中添加语音输入"
date: 2011-12-15 19:00:08
uri: chrome-speech-to-text
tags: 
- 教程
- 网站
- 语音
- 谷歌浏览器
categories: 
- 建站
---

在用[谷歌浏览器（Chrome）](http://www.evecalm.com/2011/05/chrome-download.html)浏览网站时，你会发现有些网站（比如1616网站导航）的文本输入框的右侧有一个麦克风，点击之后可以进行语音输入（Speech to Text）。其实这是使用了谷歌浏览器的语音输入API。如果要为自己的网站也加入语音，只需要在需要输入文本的地方加入以下一行代码即可：

> speech="speech" x-webkit-speech="x-webkit-speech" x-webkit-grammar="builtin:translate"

范例如下：

> &lt;input type="text" class="gspeech" name="test" speech="speech" x-webkit-speech="x-webkit-speech" x-webkit-grammar="builtin:translate" /&gt;

效果如图：

![](https://yqmfyg.bn1.livefilestore.com/y2pCidhySRybvDRG6Hj0pWXi-UkS9QtNoUTwNgJf5vg9DSGeRXBv_Q2i2b_FPdQtAiL9X5kaF2GHwMsvrLEQIgu3JZ7RH2xI4euCzABfeqaktw/voiceinput.jpg?psid=1)

只能在谷歌浏览器中才可以使用语音输入，非谷歌浏览器则会忽略所添加的属性，不会影响网页显示。

在使用谷歌浏览器时，如果也想在其他网站也使用语音输入，则可以安装[语音输入扩展](http://www.evecalm.com/2011/06/chrome-plugin-voice-input.html)。更多谷歌浏览器精选扩展，请[点击这里](http://www.evecalm.com/2011/05/chrome-extention-recommend.html)。
