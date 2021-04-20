import { baseUrl } from './env'

export default async(url = '', data = {}, type = 'GET', method = 'fetch', formdata = false) => {
	type = type.toUpperCase();

	// 判断社区获取数据
	var shequ = localStorage.getItem('shequ');
	url = baseUrl + url;
	
	var timestamp = Date.now();
	if (type == 'GET') {
		if ([null, undefined, ''].indexOf(shequ) == -1) {
	   	data['shequ'] = shequ;
	   }
		let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		})

		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
	}

	var idx = url.indexOf('?');
	url += ((idx == -1 ? '?' : '&') + 'timestamp=' + timestamp);

	if ( type == 'POST' && ( [null, undefined, ''].indexOf(shequ) == -1) ) {
		// var data = new FormData();
		if ( formdata == false ) {
			data.shequ = shequ;
		} else {	
			data.append('shequ', shequ);
		}
	}

	// 这里没有登录返回 token 数据，对数据的获取好像有影响
	var token = localStorage.getItem("token");
	if (window.fetch && method == 'fetch') {
		
		let requestConfig = {
			// credentials: 'include',
			method: type,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'token': token
			},
			mode: "cors",
			cache: "force-cache"
		}

		if (type == 'POST') {
			Object.defineProperty(requestConfig, 'body', {
				value: JSON.stringify(data)
			})
		}
		
		try {
			const response = await fetch(url, requestConfig);
			const responseJson = await response.json();
			// console.log(responseJson);
			return responseJson
		} catch (error) {
			// throw new Error(error)
		}
	} else {
		return new Promise((resolve, reject) => {
			let requestObj;
			if (window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest();
			} else {
				requestObj = new ActiveXObject;
			}

			
			let sendData = data;
			if (type == 'POST' && !formdata) {
				sendData = JSON.stringify(data);
			}
			
			requestObj.open(type, url, true);
			if (!formdata) {
				requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");	
			}

			requestObj.setRequestHeader('token', token);
			
			requestObj.send(sendData);

			requestObj.onreadystatechange = () => {
				if (requestObj.readyState == 4) {
					if (requestObj.status == 200) {
						let obj = requestObj.response
						if (typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}

					
						resolve(obj)
					} else {
						reject(requestObj)
					}
				}
			}
		})
	}
}