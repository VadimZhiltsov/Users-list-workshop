export class UserModel {

    Save(callback){
        var method = typeof(this.id) == "undefined" ? "POST" : "PUT";
        var id = typeof(this.id) == "undefined" ? "" : this.id;
        var data = {   /// добавляем данные к запросу
                name: this.name,
                password: this.pw,
                email: this.email,
                comment: this.comment
            };

        SendRequest(data, method, id, callback);
    }

    static Delete(id,callback){
        SendRequest("","DELETE",id,callback);
    }

    static GetList(pagination,callback){
        SendRequest("","GET",pagination, callback);
    }

    static GetOneUser(id,callback){
        SendRequest("","GET",id, callback);
    }



}
function SendRequest(data,method,parametr_request, callback){
    var url = "http://193.111.63.76:3000/api/v1/Users";

    if(parametr_request){
        url += "/"+parametr_request;
    }
    data == "" ? data = null : data = JSON.stringify(data);
    var myHeaders = new Headers(); // создаём объект заголовков
    myHeaders.append("Content-Type", "application/json","Access-Control-Allow-Origin: *");   /// добавляем заголовок Content-Type чтоб сказать серверу в каком формате данные передаём
    var myInit = {
        method: method, // указываем метод запроса
        headers: myHeaders,  // добавляем заголовки
        mode: 'cors',   // ставим режим кросс доменных запросов
        cache: 'default', // кеширование по умолчанию
        body: data
    };
    var myRequest = new Request(url, myInit); // создаём запрос
    var headersResponse = "";
    fetch(myRequest)   //говорим запросу выполнится
        .then((response)=> {
            headersResponse = response.headers.get("X-Total-Count");
            if(response.status >=200 && response.status < 300){
                if(response.statusText != "No Content") {
                    return response.json(); /// парсим ответ от сервера в json
                }
            }else{
                return Promise.reject();
            }
        })
        .then((json)=> {
              callback(json,headersResponse);
        }).catch(()=>{
        alert("Упс!!! Что-то пошло не так");
    });
}


