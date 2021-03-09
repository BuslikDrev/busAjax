/*	Аўтар: "БуслікДрэў" ( http://buslikdrev.by/ )
	© 2016-2021; BuslikDrev - Усе правы захаваныя. 
	busCarousel v0.1 */
  
	var busAjax = function(url, setting) {
		if (typeof setting['metod'] === 'undefined') {
			setting['metod'] = 'GET';
		}
		if (typeof setting['responseType'] === 'undefined') {
			setting['responseType'] = 'json';
		}
		if (typeof setting['dataType'] === 'undefined') {
			setting['dataType'] = 'text';
		}
		if (typeof setting['data'] === 'undefined') {
			setting['data'] = '';
		}
		if (typeof setting['async'] === 'undefined') {
			setting['async'] = true;
		}
		if (typeof setting['user'] === 'undefined') {
			setting['user'] = null;
		}
		if (typeof setting['password'] === 'undefined') {
			setting['password'] = null;
		}
		if (typeof setting['success'] === 'undefined') {
			setting['success'] = function(json) {};
		}
		if (typeof setting['error'] === 'undefined') {
			setting['error'] = function(error) {};
		}
		var datanew;
		if (setting['data']) {
			if (setting['dataType'] == 'json') {
				datanew = JSON.stringify(setting['data']);
			} else {
				if (typeof FormData !== 'undefined') {
					datanew = new FormData();
					if (typeof setting['data'] == 'object') {
						for (var i in setting['data']) {
							if (typeof setting['data'][i] == 'object') {
								for (var i2 in setting['data'][i]) {
									datanew.append(i + '[' + i2 + ']', setting['data'][i][i2]);
								}
							} else {
								datanew.append(i, setting['data'][i]);
							}
						}
					} else {
						datanew = setting['data'];
					}
				} else {
					datanew = [];
					if (typeof setting['data'] == 'object') {
						for (var i in setting['data']) {
							if (typeof setting['data'][i] == 'object') {
								for (var i2 in setting['data'][i]) {
									datanew.push(encodeURIComponent(i) + '[' + encodeURIComponent(i2) + ']=' + encodeURIComponent(setting['data'][i][i2]));
								}
							} else {
								datanew.push(encodeURIComponent(i) + '=' + encodeURIComponent(setting['data'][i]));
							}
						}
					} else {
						datanew = setting['data'];
					}

					datanew = datanew.join('&').replace(/%20/g, '+');
				}
			}
		}

		var xhr = new XMLHttpRequest();
		xhr.open(setting['metod'], url, setting['async'], setting['user'], setting['password']);
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		if (typeof FormData === 'undefined') {
			if (setting['dataType'] == 'json') {
				xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
			} else if (setting['dataType'] == 'text') {
				xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
			}
		}
		if (setting['responseType']) {
			xhr.responseType = setting['responseType']; //"text" – строка,"arraybuffer", "blob", "document", "json" – JSON (парсится автоматически).
		}
		xhr.send(datanew);
		xhr.onload = function(oEvent) {
			if (xhr.status == 200) {
				return setting['success'](xhr.response, xhr);
			} else {
				var ajaxOptions = setting;
				var thrownError = false;
				return setting['error'](xhr, ajaxOptions, thrownError);
			}
		};
	}
