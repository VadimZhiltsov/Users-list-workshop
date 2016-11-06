import {CreatePage} from "../src/create.js";
import {UserModel} from "../src/user-model.js"

class EditPage {
	constructor(){
		this.setupButton();
		this.DecodeUrl().GetUserData();
	}

	DecodeUrl(){
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
		});
		this.id = vars.id;
		return this;
	}
	GetUserData(){
		UserModel.GetOneUser(this.id,(userData)=>{
			this.id = userData._id;
			this.name = userData.name;
			this.email = userData.email;
			this.comment = userData.comment;
			this.SetDataForm();
		})
	}

	setupButton(){
		document.querySelector("#form").addEventListener("submit",(event)=>{
			event.preventDefault();
			var DataForm = new CreatePage();
			var data = DataForm.GetDataForm();
			data.id = this.id;
			if( data.pw && data.pw != data.pw2 ){
				alert("Пароли не совпадают");
				event.preventDefault();
			}
			UserModel.prototype.Save.call(data,()=>{
				window.location = "list-page.html";
			});
		})
	}

	/**
	 * Задание полученныз данных пользователя
	 * @constructor
	 */
	SetDataForm(){
		document.querySelector("input[name=name]").value = this.name;
		document.querySelector("input[name=email]").value = this.email;
		document.querySelector("input[name=comment]").value = this.comment;
	}

}

export default function initPage() {
	new EditPage();
}