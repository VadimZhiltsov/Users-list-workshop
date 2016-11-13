/**
 * Represents a book.
 * 
 * 
 * @param {string} params.title - The title of the book.
 * @param {string} params.author - The author of the book.
 */
export function performRequest(params) {
	if (!params.method) {
		throw new TypeError('Sorry, but Method is madatory param')
	}

	if (!params.url) {
		throw new TypeError('Sorry, but URL is madatory param')
	}

	var myHeaders = new Headers(); // создаём объект заголовков
	myHeaders.append("Content-Type", "application/json"); /// добавляем заголовок Content-Type чтоб сказать серверу в каком формате данные передаём
	var myInit = {
		method: params.method, // указываем метод запроса
		headers: myHeaders, // добавляем заголовки
		mode: 'cors', // ставим режим кросс доменных запросов
		cache: 'default' // кеширование по умолчанию
	};

	if (params.data) {
		myInit.body = JSON.stringify(params.data);
	}

	var myRequest = new Request(params.url, myInit); // создаём запрос

	return fetch(myRequest).then(function(response) {
		if (params.method !== 'DELETE') {
			return response.json(); /// парсим ответ от сервера в json
		} else {
			return response;
		}
	});
}

