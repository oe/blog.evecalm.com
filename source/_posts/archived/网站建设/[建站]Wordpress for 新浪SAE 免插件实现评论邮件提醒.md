---
title: "[建站]Wordpress for 新浪SAE 免插件实现评论邮件提醒"
date: 2011-11-28 21:38:47
uri: wordpress-for-sae-mail-comment
tags: 
- 主机
- 网站
- 邮件
categories: 
- 建站
---

新浪SAE可以比较好的运行wordpress，但是由于它不同于一般主机，功能上有些限制，比如不能在wordpress后台直接修改主题代码，不支持wordpress默认的邮件函数，而，官方给出的解释都是出于安全原因。

对于在线修改wordpress主题及其他代码，可以登录SAE后进入相关应用打开代码管理，即可在线修改所有的代码。对于邮件功能，wordpress for SAE 里有一个WP-Mail-SMTP插件，但是其功能差强人意，并不能实现评论邮件提醒访客，只能提醒站长。而SAE本身就封装了一个邮件函数，使用该函数的范例代码如下

> 最大可发送1MB大小的邮件（含附件

>

> &lt;?ph

> $mail = new SaeMail()

> $mail-&gt;setAttach( array( 'my_photo' =&gt; '照片的二进制数据' ) )

> $ret = $mail-&gt;quickSend( 'to@sina.cn' , '邮件标题' , '邮件内容' , 'smtpaccount@gmail.com' , 'password' )

>

> //发送失败时输出错误码和错误信

> if ($ret === false

> var_dump($mail-&gt;errno(), $mail-&gt;errmsg())

>

> $mail-&gt;clean(); // 重用此对

> $ret = $mail-&gt;quickSend( 'to@sina.cn' , '邮件标题' , '邮件内容' , 'smtpaccount@unknown.com' , 'password' , 'smtp.unknown.com' , 25 ); // 指定smtp和端

>

> //发送失败时输出错误码和错误信

> if ($ret === false

> var_dump($mail-&gt;errno(), $mail-&gt;errmsg())

> ?&gt

> 更多相关说明可以看[官方文档](http://apidoc.sinaapp.com/sae/SaeMail.html

如果你对php比较了解的话，完全可以参照以上代码为自己的Wordpress for SAE添加邮件评论提醒功能，否则的话，可以使用下面的代码(本站的邮件提醒即用以下代码实现的)

> //comment_mail_notify(所有的回复都会发邮件通知

> function comment_mail_notify($comment_id) 

> $admin_email = get_bloginfo ('admin_email'); // $admin_email 可改為你指定的 e-mail

> $comment = get_comment($comment_id)

> $comment_author_email = trim($comment-&gt;comment_author_email)

> $parent_id = $comment-&gt;comment_parent ? $comment-&gt;comment_parent : ''

> $to = $parent_id ? trim(get_comment($parent_id)-&gt;comment_author_email) : ''

> $spam_confirmed = $comment-&gt;comment_approved

> if (($parent_id != '') &amp;&amp; ($spam_confirmed != 'spam') &amp;&amp; ($to != $admin_email)&amp;&amp;isset($_POST['comment_mail_notify'])) 

> /* 上面是判断是否发出邮件

> ($spam_confirmed != 'spam'): 不给垃圾评论发送邮件提醒，必需!

> ($to != $admin_email) : 不发送邮件给站

> ($comment_author_email == $admin_email) : 只有站长评论时才发送邮件提

> isset($_POST['comment_mail_notify']) :接收邮件提醒的复选框被选中则发送邮

> 以上可视个人情况修

> *

> $wp_email = '你的邮箱地址';// . preg_replace('#^www.#', '', strtolower($_SERVER['SERVER_NAME'])); // e-mail 發出點, no-reply 可改為可用的 e-mail

> $subject = '您在[' . get_option("blogname") . ']的留言有新回复'

> $message = 

> &lt;div style="margin: 1em 40px 1em 40px;background-color:#eef2fa;border:1px solid #d8e3e8;color:#111;padding: 0 15px;-moz-border-radius:5px;-webkit-border-radius:5px;-khtml-border-radius:5px;border-radius:5px;"&gt

> &lt;p&gt;' . trim(get_comment($parent_id)-&gt;comment_author) . '，您好！&lt;/p&gt

> &lt;p&gt;您在&lt;strong&gt;《' . get_the_title($comment-&gt;comment_post_ID) . '》&lt;/strong&gt;的留言：&lt;/p&gt

> &lt;p&gt; ' . trim(get_comment($parent_id)-&gt;comment_content) . '&lt;/p&gt

> &lt;p&gt;&lt;strong&gt;' . trim($comment-&gt;comment_author) . '&lt;/strong&gt;给您的回复：&lt;/p&gt

> &lt;p&gt; ' . trim($comment-&gt;comment_content) . '&lt;/p&gt

> &lt;p&gt;您可以点击&lt;a href="' . htmlspecialchars(get_comment_link($parent_id)) . '"&gt;查看完整的內容&lt;/a&gt;&lt;/p&gt

> &lt;p&gt;欢迎再度光临 &lt;a href="' . get_option('home') . '"&gt;' . get_option('blogname') . '&lt;/a&gt;&lt;/p&gt

> &lt;p&gt;来自' . get_option('blogname') . '的诚挚问候.&lt;/p&gt;&lt;/div&gt

> '

> $mail = new SaeMail()

> $options = array("from"=&gt;$wp_email, "to"=&gt;$to, "smtp_host"=&gt;'邮箱的smtp服务器地址',"smtp_username"=&gt;'你的邮箱地址',"smtp_password"=&gt;'邮箱密码',"subject"=&gt;$subject,"content"=&gt;$message,"content_type"=&gt;'HTML')

> $ret=false

> if($mail-&gt;setOpt($options)

> $ret=$mail-&gt;send()

>

> //发送失败时输出错误码和错误信

> if ($ret === false

> var_dump($mail-&gt;errno(), $mail-&gt;errmsg())

> 

> 

> add_action('comment_post', 'comment_mail_notify')

> // -- END ---------------------------------------

>

> //在评论框下面添加一个复选框,由访客决定是否接收邮件提醒，默认选

> function add_checkbox() 

> echo 

> &lt;input id="comment_mail_notify" style="margin-left: 20px;" type="checkbox" name="comment_mail_notify" value="comment_mail_notify" checked="true" /&gt;&lt;label for="comment_mail_notify"&gt;邮件通知对方&lt;/label&gt;'

> 

> add_action('comment_form', 'add_checkbox')

以上代码转自[hanolex](http://hanolex.org/archives/420.html)，代码相关说明:

1、需要修改的地方有四处，“你的邮箱地址 ”（两处必须一致），“邮箱的smtp服务器地址”（需邮箱支持smtp，并已启用，smtp地址形如smtp.qq.com）和“邮箱密码

 2、如果想去掉复选框，可以删除最后七行代码，然后去掉以上代码第八行中的“&amp;&amp;isset($_POST['comment_mail_notify'])”

注意,请不要将以上代码与其他有类似功能的代码或者插件一起启用,会产生冲突导致功能失效.如果你确定要使用本代码,请删除相关代码,停用相关插件,并上传Clean Options插件，清理因启用相关插件而残留下来的信息。

祝你好运！如还有任何疑问，请[留言](#respond)。

最后，再次劝告大家，SAE已经修改了云豆赠送规则，完全商业运营了，不再适合普通的小网站，而我在不久的将来也会再次搬家。不过，如果你是一个高级的程序开发者，那么你可以为新浪微博开发一款应用（最好是客户端应用），并申请新浪开发者认证，这样每个月都可以补足一万个豆豆，可以让你在SAE长久呆着，除非新浪再次修改规则。
