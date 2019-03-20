import fetch from './fetch'

export const tagList = ()=>{ //获取分类列表
  return fetch('/tag/list')
}
export const articleList = ()=>{ //获取文章列表，参数tag_id(为空不分tag但是分页，不为空需要分页)，page，limit
  return fetch('/article/list')
}
export const addTag = ()=>{ //新增标签name
  return fetch('/addTag')
}
export const reviseTag = ()=>{ //修改标签name
  return fetch('/reviseTag')
}
export const addArticle = ()=>{ //新建文章title，content_md，content_html，tag_id
  return fetch('/addArticle')
}
export const saveArticle = ()=>{ //保存文章，id(可选，如果没有就是新增)，content_html，content_md，存的时候md\html同时存入，改的时候取出md，看的时候取出html，
  return fetch('/article/save')
}
export const getArticle = ()=>{ //保存文章，id(可选，如果没有就是新增)，content_html，content_md，存的时候md\html同时存入，改的时候用md，看的时候用html，
  return fetch('/article/html')
}
export const getDetail = ()=>{ //保存文章，id(可选，如果没有就是新增)，content_html，content_md，存的时候md\html同时存入，改的时候用md，看的时候用html，
  return fetch('/article/detail')
}

export const test = ()=>{ //保存文章，id(可选，如果没有就是新增)，content
  return fetch('/test',{},'get')
}
