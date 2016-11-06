import {UserModel} from "../src/user-model.js"

export class ListPage {

	constructor(){
		this.userQtty = 0;
		this.DecodeUrl();
		this.GetUserList();
	}

	/**
	 * Определяем skip и limit из адресной строки
	 * @constructor
     */
	DecodeUrl(){
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
		});
		this.skip = vars.skip ? vars.skip : 0;
		this.limit = vars.limit ? vars.limit : document.querySelector("#pageQtty").value;
	}

	/**
	 * Подготавливаем блок пагинации
	 * @constructor
     */
	PreparePagination(){
		console.log('this1', this);
		var qttyPages = Math.floor(this.userQtty/this.limit)  + 1;
		for(var i=1;i<=qttyPages;i++){
			var elementA = document.createElement("a");
			elementA.href = "?skip="+parseInt( (i-1)*this.limit )+"&limit="+this.limit;
			var elementLi = document.createElement("li");
			elementA.innerText = i;
			document.querySelector(".hor_nav").appendChild(elementLi.appendChild(elementA));
		}
	}

	/**
	 * Навешивание событий
	 */
	submitButton() {
		/**
		 * Переход на страницу создания пользователя
		 */
		document.querySelector("input[name=createUser]").addEventListener("click", function () {
			window.location.href = "create-page.html";
		});
		/**
		 * Вызов удаление пользователя
		 */
		Array.from(document.querySelectorAll("img")).forEach((element)=> {
			element.addEventListener("click", (event)=> {
				event.preventDefault();
				if (confirm("Удалить пользователя?")) {
					var id = event.target.parentNode.getAttribute("data-id");
					UserModel.Delete(id,()=> {
						alert("Пользователь удален!");
						window.location.reload();
					});
				}
			});
		});
		/**
		 * Переход на страницу редактирования
		 */
		Array.from(document.querySelectorAll(".link")).forEach((element)=> {
			element.addEventListener("click", (event)=> {
				event.preventDefault();
				var id = event.target.getAttribute("data-id");
				var url = "?id="+id;
				window.location.href = "edit-page.html"+url;
			})
		});

		document.querySelector("#pageQtty").addEventListener("change",(event)=>{
			this.limit = event.target.value;
			window.location = "list-page.html?skip="+this.skip+"&limit="+this.limit;
		});
		this.DecodeUrl();
		if(typeof(this.limit) != "undefined")
			document.querySelector("#pageQtty").value = this.limit;
		return this;
	}

	/**
	 * Получение списка пользователей
	 * @constructor
     */
	GetUserList() {
		var pagination = "?skip="+this.skip+"&limit="+this.limit;
		UserModel.GetList(pagination,(data,header)=>{
			this.AppendData(data);
			this.submitButton();
			this.userQtty = header;
			this.PreparePagination();
		});

		return this;
	}

	/**
	 * Создание элемента tr
	 * @returns {ListPage} возвращаем this класса
	 */
	CreateTr(){
		this.tr = document.createElement("tr");
		return this;
	}

	/**
	 * Создание элемента td
	 * @param data Данные для отображения в html формате
	 * @returns {ListPage}
	 */
	CreateTd(data){
		this.td = document.createElement("td");
		this.td.innerHTML = data;
		return this;
	}

	/**
	 *Добавляем созданные элементы в таблицу
	 */
	AppendInTable(){
		document.querySelector("table").appendChild(this.tr).appendChild(this.td);
	}

	/**
	 * Перебор списка пользователей и формирование результирующей таблицы
	 * @param data Данные ввиде объекта
	 */
	AppendData(data){
		data.forEach((item)=>{
			this.CreateTr().CreateTd(item.name).AppendInTable();
			this.CreateTd(item.email).AppendInTable();
			this.CreateTd("<a class='link' data-id='"+item._id+"' href='javascript:void(0)' data-username='"+item.name+"'>"+item._id+"</a>").AppendInTable();
			this.CreateTd(item.comment).AppendInTable();
			this.CreateTd("<a href='javascript:void(0)' data-id='"+item._id+"'><img src='../img/drop.png'></a>").AppendInTable();
		})
	}
}

export default function initPage() {
	new ListPage();
}