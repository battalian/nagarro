/**
 * Created by chavaharish on 28-08-2017.
 */
// console.log('loaded succesfully');

//var db = require(__dirname + '../data.js');

const ID = 'todos_div';
var data;
const RESPONSE_DONE = 4;
const STATUS_OK = 200;


function changeStatusToComplete(key) {

    console.log('AJAX called'+ key);
    var xhr = new XMLHttpRequest();
    // app.put('/todos/complete/:id'
    xhr.open('PUT', '/todos/complete/'+key, true);
    xhr.onreadystatechange = function () {
        if(xhr.readyState == RESPONSE_DONE ){
            if(xhr.status == STATUS_OK){
                console.log(xhr.responseText);
                add_todo_element(key, xhr.responseText);
            }
        }
    }
    xhr.send(data==null);
}


function changeStatusToDelete(key) {

    console.log('AJAX called'+ key);
    var xhr = new XMLHttpRequest();
    // app.put('/todos/complete/:id'
    xhr.open('DELETE', '/todos/'+key, true);
    xhr.onreadystatechange = function () {
        if(xhr.readyState == RESPONSE_DONE ){
            if(xhr.status == STATUS_OK){
                console.log(xhr.responseText);
                add_todo_element(key, xhr.responseText);
            }
        }
    }
    xhr.send(data==null);
}

function add_todo_element(id, todos__data__json) {
    var parent = document.getElementById( ID );
    todos__data = JSON.parse(todos__data__json);
    console.log(todos__data[1].title);

    var html_string="";
    for (var key in todos__data) {
        if (todos__data.hasOwnProperty(key)) {
            //console.log(key + " -> " + todos__data[key]);
            if( todos__data[key].status != 'DELETED' ){
                if( todos__data[key].status == 'ACTIVE' )
                {
                    html_string += "<h5 style='color:blue;'>" + todos__data[key].title + "</h5>";
                    // console.log(key);

                    html_string += '<button onclick="changeStatusToComplete(' + key + ')"> Mark as done </button>';
                    html_string += '<button onclick="changeStatusToDelete(' + key + ')"> Delete </button>';

                }
                else{
                    html_string += "<h5 style='color:green;'>" + todos__data[key].title + "</h5>";
                }
            }
        }
    }

    console.log( html_string);

    parent.innerHTML = html_string;
}

 function getTodosAJAX()  {
    console.log('AJAX called');
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/todos', true);
    xhr.onreadystatechange = function () {
        if(xhr.readyState == RESPONSE_DONE ){
            if(xhr.status == STATUS_OK){
                console.log(xhr.responseText);
                add_todo_element(ID, xhr.responseText);
            }
        }
    }
     xhr.send(data==null);
}

// PostTodosAJAX()

function PostTodosAJAX()  {
    console.log('AJAX called');
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/addNewTodo', true);
    xhr.onreadystatechange = function () {
        if(xhr.readyState == RESPONSE_DONE ){
            if(xhr.status == STATUS_OK){
                console.log(xhr.responseText);
                add_todo_element(ID, xhr.responseText);
            }
        }
    }
    xhr.send(data==null);
}