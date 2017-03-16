const truncate = require('truncate-html')

hexo.extend.generator.register('excerpt', function (db) {
  let len = 50
  const config = this.config
  
  if (config && config.excerpt_length) {
    len = parseInt(config.excerpt_length)
  }

  return db.posts.map( post => {
    if (!/<!-- more -->/.test(post.content)) {
      post.excerpt = truncate(post.content, {
        length: len,
        excludes: ['img', 'figure']
      })
    }
    return {
      path: post.path,
      data: post,
      layout: post.layout
    }
  })
})