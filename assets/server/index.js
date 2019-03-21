import fetch from './fetch'

export const tagList = ()=>{ //获取分类列表
  return fetch('/tag/list')
}
export const articleList = (params)=>{ //获取文章列表，参数tag_id(为空不分tag但是分页，不为空需要分页)，page，limit
  return fetch('/article/list',params,'get')
}
export const articleDetail = (params)=>{ //根据文章_id获取文章详情接口
  return fetch('/article/detail',params,'get')
}
export const articleRetitle = (params)=>{ //根据文章_id获取文章详情接口
  return fetch('/article/retitle',params)
}
export const articleRearticle = (params)=>{ //根据文章_id获取文章详情接口
  return fetch('/article/rearticle',params)
}
export const articleAdd = (params)=>{ //根据文章_id获取文章详情接口
  return fetch('/article/add',params)
}
