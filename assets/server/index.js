import fetch from './fetch'
//文章
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
//搜索
export const search = (params)=>{ //key查询文章列表
  return fetch('/search',params)
}
//标签
export const tagList = (params)=>{ //获取标签列表
  return fetch('/tag/list',params,'get')
}
export const tagAdd = (params)=>{ //新建标签，title
  return fetch('/tag/add',params)
}
export const tagRearticle = (params)=>{ //修改标签名，_id，title，
  return fetch('/tag/rearticle',params)
}

//登录
export const tagRearticle = (params)=>{ //password
  return fetch('/tag/rearticle',params)
}