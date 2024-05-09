---
title: "[建站]blog.cd博客绑定.tk域名并使用DnsPod解析域名教程"
date: 2011-05-02 00:51:45
uri: blog-cd-blog-bind-tk-domain-name-and-use-dnspod-analysis-tutorial
tags: 
- 域名
- 绑定
- 网站
- 解析
categories: 
- 建站
---

如果你在使用其他支持域名绑定的博客也遇到这个问题，也可以看看本教程。

blog.cd是一个不错的wordpress博客，其功能没有什么限制，唯一的不足就是免费空间有点小，只有500M。

最近申请了一个blog.cd博客，因为blog.cd支持域名绑定，于是又在dot.tk上申请了一个免费的.tk顶级域名，并使用了.tk免费提供的域名解析服务绑定了自己的博客，但在完成后测试发现其域名解析极不稳定，很容易就打开的是一个未激活的的广告网页，而非自己绑定的博客。而dot.tk支持自定义域名解析服务器，于是想使用第三方免费的dns服务器。在网上搜了一下很多人推荐使用免费的DnsPod（[dnspod.com](http://www.dnspod.com "dnspod")），但是网上的教程太粗糙了，不够详细，自己在设置的时候老是提示域名解析有问题，试了好几次，最终，大功告成。现在分享一下经验，希望对你有所帮助。

一、你应该在.blog.cd注册了自己的博客，在dot.tk申请了免费域名。

二、在dnspod.com上注册。注册完成之后会有一个首次使用向导。这里是关键！

①输入自己申请的.tk域名（saiya.tk是本人的域名）

![](https://yqmfyg.bn1.livefilestore.com/y2pOYxHRJ5Wf921yyNrvN3hF337i_SmKqUB3psGCUpuq39Q7Wb7q9KzFpYC3eAydDh3MQESXibtOjA9VQGS_w_CdTQFUq3v8AiJu-qcPVoAy0Q/blogcd1.jpg?psid=1)

②这一步默认即可

（因为我的已经设置成功了，不想再重新设置，于是便随手输入了saiiya.tk做示范）

![](https://yqmfyg.bn1.livefilestore.com/y2pjuPXWZMZRBZpzexrnkN7WVwadTSlWvKuCyOBfNdNvHCQXFnAm6y27louisoyFyuQve_WloKbn84qozEx9lc9YPiIFrHB6yeV1TehvQmP0vM/blogcd2.jpg?psid=1)

③这个ip地址就是blog.cd的地址，和我填一样就行

![](https://yqmfyg.bn1.livefilestore.com/y2pCHFntMYumPyCeD88Uo-uJ-ho-w8M0l8kYhgD7CChI9BKQhCRnGZyDjyOG6t8UNtxznbmN7aVhGp4eX_nk3NFw3SRuo2DBtr6hS1xjQVnlHs/blogcd3.jpg?psid=1)

④这一步你可以选择否也可以选择其他

（如果你和我选择的一样，那你得注册腾讯企业邮箱，网址exmail.qq.com。 注册之后输入你申请的域名就会得到形如qqmaile123456a的CNAME验证地址）

![](https://yqmfyg.bn1.livefilestore.com/y2pnTWOJSX3ryfkfXHjHElgky14-vqBLeHZXVquvUDeq5WnNd26_dtYfWlm9dpGwGd03HJ2nmyRHM1-8dC6wPONb26bfbIcbQ3n1dw7IKNhozo/blogcd4.jpg?psid=1)

⑤点击生成记录即可

![](https://yqmfyg.bn1.livefilestore.com/y2pT0W0nE0ov4aFP-gS3fxOBGkGWO0J5oPC9nOe9rtA4kelAjkq59XwMOILVK0bCZ5V5vT8nkmBeGMLYWW8l5oss2UZrlnkHue3El1LTYTf2RY/blogcd5.jpg?psid=1)

⑥到了这一步就完成了一大半了

（如果你现在点击查看记录，会提示完全无法解析的，先别管它）

![](https://yqmfyg.bn1.livefilestore.com/y2pn57XaNwsFq1DLVs_1k0TYu0FMnK9MSESJNBDqUswWmfZv06FuoNb5tRdJVWsgWzvOiGAuRVuCXmSnG_p5ijJPyZ5Fxd8FRlum393XVvDGxg/blogcd6.jpg?psid=1)

三、到dot.tk上修改dns域名解析设置

①登录后点击修改域名，修改

![](https://yqmfyg.bn1.livefilestore.com/y2p7oUa8i9y61d0NXwbn16h9bss0a8p7O15eFoOU3NYNK55aY6GKy0p-QZszwOmpuwMwZivT3lKJyoK-pKsKv3InJnhOZj3yf6267Oa79NmS48/blogcd7.jpg?psid=1)

②

选择使用自定义dns服务器之后，在点击设定，输入刚刚的那两个dns服务器名称即可，不需要输入ip地址，你也没法输入。前面三个服务器最好添加上。

![](https://yqmfyg.bn1.livefilestore.com/y2pIXizKDHPIj1izXoQsl8XMLfDtgZTIyy9cV-qXqPueqfvd3iYqGAfK6z65ScOHqTTco1RuhWdpXPBBFsM0lqASqmIMh-jmEjJs_uM4BC2UG8/blogcd8.JPEG?psid=1)

③

设置完成后，右下角有个下一步，点击后，当你看到成功更新时，你的设置就成功了！

不过还差最后一步。

![](https://yqmfyg.bn1.livefilestore.com/y2p9H3HuF4ohSst7zUHCIFoG8ndQsuPOgED6RXJFKzXd1owz3sk1IOi_ydM_eS6S9LylmDL-08ktIHtJb1YnK0ft5TOuWN_nZ70DLepubVW0bg/blogcd9.jpg?psid=1)

四、到blog.cd上绑定域名

①登录blog.cd，账户中心，域名绑定，域名绑定

![](https://yqmfyg.bn1.livefilestore.com/y2pzNLChLUWh8FUxPcOQ5KqpE0RhWe7RAPUwPiV_y1TLMVr-I1FehGFu0rbLNdpvJERxDQQ2yTOyAwLeRqerlMCRIcj3QVtvYtT_33QKKe0dI4/blogcd10.jpg?psid=1)

②

输入不带www.的（saiya.tk）域名以及带www.的（[www.saiya.tk](http://www.saiya.tk/)）域名（两个哦），这样你的域名有没有www.都能打开了

![](https://yqmfyg.bn1.livefilestore.com/y2p1R96INuxQKE1Z1XbrFVvnwmmjvXuId_d1yRhvARretolNLbbAEX1QanmZwHZfMqgDNTFZkoNjTfm-CEJyRd2AylwKH7ok197cg18ZX_Z1RE/blogcd11.JPEG?psid=1)

![](https://yqmfyg.bn1.livefilestore.com/y2pAG8qMZBOd5uNcrilSRZwn5fUlqNs0-F1V2gJU1r99Nq9b2neeTH_gWXdPN_xL-2nkV2249-K2jJ1HxXLf1_v5oR6Bals3NPjVN_bZAWBru4/blogcd12.JPEG?psid=1)

③完成之后就是这样了

![](https://yqmfyg.bn1.livefilestore.com/y2pNgVTGyJvzMwtmXc_hHDGlqr8O67eQy4wE8mXBvtCUOlKn4wm2HAguI-uPE2G6LTv1_skpZ5nrtqenM60XKLEHHjKMTL-OofyUIh6MSLTmtQ/blogcd13.jpg?psid=1)

这样，就大功告成了！这些设置不会立即生效，据说得半个小时，耐心啊！如果你立马输入你的.tk域名很有可能浏览器给的提示是找不到该页面，因为刚刚设置的域名解析还没正式生效呢。如果你登录dnspod账户，管理页面也会提示dns设置有误，让你到注册域名的地方修改dns服务器，别管它，耐心等待即可。

如果你想多注册几个.tk域名绑定你的blog.cd博客，那你得相应的多注册几个dnspod，因为免费版的dnspod一个账户只能给一个域名提供域名解析。.tk、blog.cd、dnspod免费网站的最佳组合啊！

祝你好运！
