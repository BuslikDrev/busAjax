# busAjax (v0.1) - замена библиотеки ajax jQuery, чтобы быстрее отказаться от jQuery.

# Установка
Подключите скрипт, установив в ```<head></head>```:
```
<script src="busAjax.js" type="text/javascript"></script>
```

# Пример работы:
```
busAjax('https://mysite.com/form.php', {
	metod: 'POST',
	data: {'debug':{'param1':'1','param2':'2'}},
	success:function(json, xhr) {
		console.log(json, xhr);
	},
	error: function(xhr, ajaxOptions, thrownError) {
		console.log('Error ', {xhr, ajaxOptions, thrownError);
		alert('Error ' + xhr.status);
	}
});

/*
В php мы получим:
$_POST['debug'] = array('param1' => '1', 'param2' => '2');
*/
```

# Обозначения параметров настроек:
	'metod' - 'POST', 'GET' - по умолчанию;
	'responseType' - получаемые данные от сервара 'text', 'arraybuffer', 'blob', 'document', 'json' - по умолчанию;
	'dataType' - отправление данных на сервер 'json', 'text' - по умолчанию;
	'data' - данные которые хотим послать в виде строки или json массива,
	'async' - 'true' - по умолчанию, 'false';
	'user' - Отправка логина авторизации в заголовоке запроса,
	'password' - Отправка пароля авторизации в заголовоке запроса,
 	'success' - функция для получения данных от сервера и выполнения другого кода;
 	'error' - функция для получения данных в результате ошибки и выполнения другого кода;
