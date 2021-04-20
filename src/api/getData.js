import fetch from './fetch';

// *** 公共 ***
export const login = data => fetch('/users/login', data, 'POST'); // 登录 
export const logout = data => fetch('/user/logout', data, 'POST'); // 退出登录
export const uploadImg = data => fetch('/upload', data, 'POST', 'httprequest', true); // 上传附件返回对应的文件名
export const editAttachment = (data) => fetch('/attachment', data, 'POST'); // 上传|删除指定模块的附件
export const uploadToken = data => fetch('/uploadtoken', data); // 七牛云直接上传token
export const deleteData = data => fetch('/setenable', data, 'POST'); // 通用删除

export const getSwiperCount = data => fetch('/carousels/count', data); // 轮播数据条数
export const getSwiperList = data => fetch('/carousels', data); //轮播数据获取
export const addSwiper = data => fetch('/carousels', data, 'POST'); //新增轮播
export const updateSwiper = (id,data) => fetch('/carousels/' + id, data, 'POST'); //修改轮播