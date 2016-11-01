export class User {
	constructor(name, password, email, comment) {
		this.name = name;
		this.password = password;
		this.email = email;
		this.comment = comment;
	}

}

export default function initPage() {
	var editURL_id = window.location.href.split('?id=')[1];
	console.log(editURL_id);


	fetch(`http://193.111.63.76:3000/api/v1/Users/${editURL_id}`)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			console.log(data);
			document.querySelector('.name').value = data.name;
			document.querySelector('.password').value = data.password;
			document.querySelector('.email').value = data.email;
			document.querySelector('.comment').value = data.comment;
			document.querySelector('.submit').disabled = false;
		});

	document.querySelector('.form').addEventListener('submit', function(event) {
		event.preventDefault();
		
	});

	document.querySelector('.form').addEventListener('submit', function(event) {
		event.preventDefault();

		var newUser = new User(	document.querySelector('.name').value,
										document.querySelector('.password').value,
										document.querySelector('.email').value,
										document.querySelector('.comment').value);

		var myHeaders = new Headers(); // создаём объект заголовков
		myHeaders.append("Content-Type", "application/json");   /// добавляем заголовок Content-Type чтоб сказать серверу в каком формате данные передаём
		var myInit = {
               method: 'PUT', // указываем метод запроса
               headers: myHeaders,  // добавляем заголовки
               mode: 'cors',   // ставим режим кросс доменных запросов
               cache: 'default', // кеширование по умолчанию
               body: JSON.stringify({   /// добавляем данные к запросу
                  name: newUser.name,
                  password: newUser.password,
                  email: newUser.email,
                  comment: newUser.comment
               })               
 		};

		var myRequest = new Request(`http://193.111.63.76:3000/api/v1/Users/${editURL_id}`, myInit); // создаём запрос

		fetch(myRequest)   			//говорим запросу выполнится
		.then(function(response) {
			if(response.status >= 200 && response.status < 300) {
				
				return response.json();
			} else {
				alert('Error');
				return Promise.reject();
			}
     		// return response.json(); /// парсим ответ от сервера в json
		})
		/*.then(function(json) {		 /// здесь ответ json от сервера
     		alert(JSON.stringify(json));
		});*/
		.then(function(json) {
            window.location.href = "../pages/list-page.html";
        });
		
	});

}