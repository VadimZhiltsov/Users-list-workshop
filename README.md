
# About

### Initial setup

```bash
# Clone the repo...
git clone git@github.com:VadimZhiltsov/Users-list-workshop.git
cd Users-list-workshop

# Then, you need to install all the dependencies...
npm install
npm install -g gulp
```

### Running in the browser
```bash
# If you wanna Gulp to re-build on every change...
gulp watch
```


### What are all the pieces involved?

#### [Babel]
Transpiles ES6 code into regular ES5 (today's JavaScript) so that it can be run in a today browser. Like traceur but doesn't need a runtime to work. Formerly known as 6to5.

#### [CommonJS]
Babel is configured to transpile ES6 modules into CommonJS syntax and we use browserify to bundle the code into one file to deliver it to the browser.

#### [Browserify]
Browserify walks through all files and traces down all `require()`s to bundle all files together.  

#### [Gulp]
Task runner to make defining and running the tasks simpler.

[ES6]: http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts
[Babel]: http://babeljs.io/
[CommonJS]: http://wiki.commonjs.org/wiki/CommonJS
[Browserify]: http://browserify.org/
[Gulp]: http://gulpjs.com/





# Task



### What you need to do:

1. Create login page
  1. using ajax send request and verify credentials
     1. if credentials are correct, send user to list page
     2. if credentials are wrong, show message

2. Create user list page:
  1. show all users from http://193.111.63.76:3000/api/v1/Users in table
  2. each user should have link to edit page
  3. each user should have delete button
  4. page must have create user link

3. Create user creation page
  1. page must have form:
    1. page must have email field (unique) (required)
    2. page must have password field (required)
    3. page must have name field (required)
    4. page must have comment field
    5. page must have simple validation
  2. page should be submited by ajax
  3. when form submited successefully, user should be redirected to list page

4. Create edit user page
  1. page must have the same form as for Create page, but with preloaded data
  2. submit button should be disabled untill user data is loaded
  3. when form submited successefully, user should be redirected to list page




# API

### Get user list
GET requst to URL: http://193.111.63.76:3000/api/v1/Users

### Create user
POST request to URL:
http://193.111.63.76:3000/api/v1/Users
With JSON data:
```
{
	name: "Vadim",
	password: "ЕхалиМедведиНаВелосипеде",
	email: "vadim.zhiltsov@mail.ru",
	comment: "Лабудибудилабуда",
}
```

### Edit user 
PUT request to URL:
http://193.111.63.76:3000/api/v1/Users/user_id
WARN: user_id need to be replaced
With changed data:
```
{
  "name":"Vadimz"

}
```

### Delete user 
DELETE request to URL:
http://193.111.63.76:3000/api/v1/Users/user_id
WARN: user_id need to be replaced


Страница создания:
1. Сверстать форму
2. Обработчик submit
  2.1. Прервать default event
3. СОбрать данные с формы
4. Отправить данные на сервер
5. Проверить ответ сервера
6. Если статус >=200 и <300, то редирект на list
7. Если нет, то показать ошибку.

Удаление пользователя:
1. Кнопка в списке
  1.1. Добавить атрибут с id
2. Навесить обработчик событий
3. Считать атрибут с id
4. Delete запрос