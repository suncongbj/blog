import fetch from './fetch'

export const List = ()=>{ //判断用户是否登录
  return fetch('/List')
}