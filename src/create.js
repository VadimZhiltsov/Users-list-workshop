import {UserModel} from "../src/user-model.js"

export class CreatePage {
	constructor(){
		this.submitButton();
	}

	/**
	 * Установка события отправки формы, Отмена отправки формы по умолчанию
	 */
	submitButton(){
		document.querySelector("#form").addEventListener("submit",(event)=>{
			event.preventDefault();
			this.GetDataForm();
			if( this.pw && this.pw != this.pw2 ){
				alert("Пароли не совпадают");
				event.preventDefault();
			}
			UserModel.prototype.Save.call(this,()=>{
				window.location = "list-page.html";
			});
		})
	}

	/**
	 * Вывод данных в таблицу
	 * @constructor
     */
	GetDataForm(){
		this.name = document.querySelector("input[name=name]").value;
		this.pw = document.querySelector("input[name=pw]").value;
		this.pw2 = document.querySelector("input[name=pw2]").value;
		this.email = document.querySelector("input[name=email]").value;
		this.comment = document.querySelector("input[name=comment]").value;
		return this;
	}
}

export default function initPage() {
	new CreatePage();
}
