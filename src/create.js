export class User {
	constructor(name, password, email, comment) {
		this.name = name;
		this.password = password;
		this.email = email;
		this.comment = comment;
	}
}

export default function initPage() {
	document.querySelector('.form').addEventListener('submit', function(event) {
		event.preventDefault();
/*		fetch('http://193.111.63.76:3000/api/v1/Users')
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
		console.log(data);
		});*/

		var newUser = new User(	document.querySelector('.name').value,
										document.querySelector('.password').value,
										document.querySelector('.email').value,
										document.querySelector('.comment').value);

		var myHeaders = new Headers(); // создаём объект заголовков
		myHeaders.append("Content-Type", "application/json");   /// добавляем заголовок Content-Type чтоб сказать серверу в каком формате данные передаём
		var myInit = {
               method: 'POST', // указываем метод запроса
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

		var myRequest = new Request('http://193.111.63.76:3000/api/v1/Users', myInit); // создаём запрос

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
	// alert('create page');
	// window.location.href = "../pages/list-page.html";

}




/*var fielValue1 = document.querySelector('style[type='text']').value;
var fielValue2 = document.querySelector('style[type='password']').value;
var fielValue3 = document.querySelector('style[type='email']').value;
var fielValue4 = document.querySelector('style[type='comment']').value;

var payload = {
	fielValue1: fielValue1,
	fielValue2: fielValue2,
	fielValue3: fielValue3,
	fielValue4: fielValue4
};

var data = new FormData();
data.append("json", JSON.stringify(payload));

fetch('http://193.111.63.76:3000/api/v1/Users', {
	method: "POST",
	body: data
})
.then(function(res){return res.json();})
.then(function(data){JSON.stringify(data)})*/

