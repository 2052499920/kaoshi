// 基本请求网站

let imgUrl = 'http://dangjian.gendoucloud.com/';
let baseUrl;
let routerMode = 'hash';

if( process.env.NODE_ENV == 'development' ) {
	baseUrl = 'http://47.93.237.233/dangjian';
	// baseUrl = 'http://192.168.3.6:7000/webapi';
	// baseUrl = 'http://192.168.0.103:7000/webapi';
} else {
	baseUrl = 'http://47.93.237.233/dangjian';
	// baseUrl = 'http://192.168.3.3:7000/webapi';
}

const uploadurl = baseUrl + '/upload';

export {
	baseUrl,
	imgUrl,
	routerMode,
	uploadurl
}

