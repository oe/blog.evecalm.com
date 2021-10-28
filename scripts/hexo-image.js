const isDev = process.env.npm_lifecycle_script === 'hexo server'
const path = require('path')
const fs = require('fs-extra')

const CDN_PREFIX = 'https://cdn.jsdelivr.net/gh/oe/blog.evecalm.com/'

// match markdown image and covert to asset_img 
hexo.extend.filter.register('before_post_render', function (data) {
  const sourceDir = this.source_dir
  const postPath = data.source
  const publicDir = this.public_dir
  data.content = data.content.replace(/(?<=!\[[^\[\]]*\]\()(\S+)(?=\s?(".*")?\))/g,
    function (match_str, imagePath) {
      if (!shouldProcess(imagePath)) return match_str
      const result = convertPath({
        sourceDir,
        postPath,
        imagePath,
        publicDir,
        isInServer: isDev
      })
      copyImage(result.imageAbsPath, result.imageDest, isDev)
      return result.imageURI
    });

  return data;
});

// ignore http and abs path(starts with /)
function shouldProcess(imgPath) {
  return /^(\.|[^/])/.test(imgPath) && !/\/\//.test(imgPath)
}

// convert
function convertPath({ sourceDir, postPath, imagePath, publicDir, isInServer } ) {
  const imageAbsPath = path.resolve(path.dirname(path.join(sourceDir, postPath)), imagePath)

  if (!fs.existsSync(imageAbsPath)) {
    throw new TypeError(`${imagePath} not exists in ${postPath}`)
  }

  const urlPrefix = isInServer ? '/' : CDN_PREFIX;
  let imageDest = path.join(postPath.split(path.sep)[1], 'image-assets', path.basename(imagePath))
  const imageURI = encodeURI(urlPrefix + imageDest)
  imageDest = path.join(publicDir, imageDest)
  return {
    imageAbsPath,
    imageDest,
    imageURI
  }
}

async function copyImage(src, dest, isInServer) {
  // use symbol link instead of copy when dev
  if (isInServer) {
    const isExists = await fs.exists(dest)
    if (isExists) return
    await fs.ensureSymlink(src, dest)
  } else {
    await fs.ensureDir(path.dirname(dest))
    await fs.copyFile(src, dest)
  }
}
