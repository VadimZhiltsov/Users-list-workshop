export class User {
	constructor(name, password, email, comment) {
        this.name = name;
        this.password= password;
        this.email = email;
        this.comment = comment;
    }

    save() {

    }

    delete(userIdURL) {
    var myHeaders = new Headers(); // создаём объект заголовков
		myHeaders.append("Content-Type", "application/json");   /// добавляем заголовок Content-Type чтоб сказать серверу в каком формате данные передаём
    var myInit = {
			method: 'DELETE', // указываем метод запроса
			headers: myHeaders,  // добавляем заголовки
			mode: 'cors',   // ставим режим кросс доменных запросов
			cache: 'default' // кеширование по умолчанию

/*			body: JSON.stringify({   /// добавляем данные к запросу
				name: newUser.name,
				password: newUser.password,
				email: newUser.email,
				comment: newUser.comment
			})   */            
 	};
	var myRequest = new Request(userIdURL, myInit); // создаём запрос
    

	fetch(myRequest)
	.then(function(response) {
		window.location.href = "../pages/list-page.html";
		return response.json();
	})
	.then(function(json) {
		// alert(JSON.stringify(json));
	});


    }

    static find(id) {
        var data = getDataFromServer('URL/id')

        return new User(data);
    }
}

export default function initPage() {
	var table = document.createElement('table');

	fetch(`http://193.111.63.76:3000/api/v1/Users`)
	.then(function(response) {
		return response.json();
	})
	.then(function(data) {
		console.log(data);
		var row = table.insertRow(-1);
		for (var key in data[1]) {
			
			var cell = row.insertCell(-1);
			cell.innerHTML = key;
			document.body.appendChild(table);
			console.log(key);
		}

		for (var i = 0; i < data.length; i++) {
			var row = table.insertRow(-1);
			
			for (var key in data[i]) {
				var cell = row.insertCell(-1);
				cell.innerHTML = data[i][key];
			}

			var cell = row.insertCell(-1);
			cell.innerHTML = `<button class="edit_button" id="${data[i]._id}">Edit</button>`;
			cell.querySelector('.edit_button').addEventListener('click', function(event) {
			event.preventDefault();
			console.log(54321);
			});

			var idOfUser = data[i]._id;
			var cell = row.insertCell(-1);
			cell.innerHTML = `<button class="del_button" id="${idOfUser}">Delete</button>`;
			cell.querySelector('.del_button').addEventListener('click', function(event) {
			event.preventDefault();
			// console.log(12345);
			var userIdURL = `http://193.111.63.76:3000/api/v1/Users/${event.currentTarget.id}`;
			var delUser = new User();
			delUser.delete(userIdURL);
			});

			document.body.appendChild(table);

		}
	});
	// alert('list page');
}