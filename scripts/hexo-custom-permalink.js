hexo.extend.filter.register('post_permalink', function (data) {
  // shorten posts permalink to :year/:uri which posted after the year 2020
  return data.replace(/^(\d{4})\/(\d{2})\//, ($0, $1, $2) => {
    if (parseInt($1, 10) > 2020) {
      return `${$1}/`
    }
    return $0
  })
});