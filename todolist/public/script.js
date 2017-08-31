/**
 * Created by chavaharish on 28-08-2017.
 */
// console.log('loaded succesfully');

//var db = require(__dirname + '../data.js');

const ID = 'todos_div';
var data;
const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const newTodoId = 'newTodoId';


window.onload = getTodosAJAX();


function addTodosAJAX() {

    var title = document.getElementById(newTodoId).value;
    document.getElementById(newTodoId).value = '';
    // var bodyData =

    console.log('AJAX called');
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/addNewTodo', true);

    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    var data = 'todoTitle=' + encodeURI(title);
    console.log(data);

    xhr.onreadystatechange = function () {
        if(xhr.readyState == RESPONSE_DONE ){
            if(xhr.status == STATUS_OK){
                console.log(xhr.responseText);
                add_todo_element(ID, xhr.responseText);
            }
        }
    }
    xhr.send(data);

}

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



function changeStatusToActive(key) {

    console.log('AJAX called'+ key);
    var xhr = new XMLHttpRequest();
    // app.put('/todos/complete/:id'
    // '/todos/complete/:id
    xhr.open('PUT', '/todos/active/'+key, true);
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

function createTodoElement(id, todo_object) {
    var todo_element = document.createElement("div");
    // todo_element.innerText = todo_object.title;
    todo_element.setAttribute("data-id", id);
    todo_element.setAttribute('class', 'todoStatus'+ todo_object.status);
    if(todo_object.status == 'ACTIVE')
    {

        var checkBox = document.createElement("input");
        checkBox.setAttribute("type","checkbox");
        checkBox.setAttribute("onchange", 'changeStatusToComplete('+id+')' );
        checkBox.setAttribute("class", "checkBoxClass");
        // <input type="checkbox" name="cb" onchange="alert(this.checked)" />


        // checkBox.innerHTML = '<p>'+ todo_object.title+ '</p>';

        var titlePara = document.createElement("text");
        titlePara.innerText = todo_object.title;
        titlePara.setAttribute('class', 'textClass');


        var deleteElement = document.createElement('text');
        deleteElement.innerText = 'x';
        deleteElement.setAttribute("onclick", 'changeStatusToDelete('+id+')' );
        deleteElement.setAttribute("class", "deleteClass");

        todo_element.appendChild(checkBox);
        todo_element.appendChild(titlePara);
        todo_element.appendChild(deleteElement);
        // var complete_button = document.createElement("button");
        // complete_button.innerText = 'Mark as complete';
        // complete_button.setAttribute('onclick', 'changeStatusToComplete('+id+')');
        //
        // var delete_button = document.createElement("button");
        // delete_button.innerText = 'Delete';
        // delete_button.setAttribute('onclick', 'changeStatusToDelete('+id+')');


        // todo_element.appendChild(complete_button);
        // todo_element.appendChild(delete_button);
    }

    else if(todo_object.status == 'COMPLETE')
    {
        var checkBox = document.createElement("input");
        checkBox.setAttribute("type","checkbox");
        checkBox.setAttribute("checked", '');
        checkBox.setAttribute("onchange", 'changeStatusToActive('+id+')' );
        checkBox.setAttribute("class", "checkBoxClass");

        // checkBox.innerHTML = '<p>'+ todo_object.title+ '</p>';

        var titlePara = document.createElement("text");
        titlePara.innerText = todo_object.title;
        titlePara.setAttribute('class', 'textClass');

        var deleteElement = document.createElement('text');
        deleteElement.innerText = 'x';
        deleteElement.setAttribute("onclick", 'changeStatusToDelete('+id+')' );
        deleteElement.setAttribute("class", "deleteClass");

        todo_element.appendChild(checkBox);
        todo_element.appendChild(titlePara);
        todo_element.appendChild(deleteElement);
        //
        //
        //
        //
        // todo_element.innerText = todo_object.title;
        //
        // var delete_button = document.createElement("button");
        // delete_button.innerText = 'Delete';
        // delete_button.setAttribute('onclick', 'changeStatusToDelete('+id+')');
        //
        // todo_element.appendChild(delete_button);
    }


    else if(todo_object.status == 'DELETED')
    {
        // todo_element.innerText = todo_object.title;
        var titlePara = document.createElement("text");
        titlePara.innerText = todo_object.title;
        titlePara.setAttribute('class', 'textClass');

        // todo_element.appendChild(checkBox);
        todo_element.appendChild(titlePara);
    }


    return todo_element;
}

function add_todo_element(id, todos__data__json) {
    var activeParent = document.getElementById( 'checkBoxDivActive' );
    var completeParent = document.getElementById( 'checkBoxDivComplete' );
    var deleteParent = document.getElementById( 'checkBoxDivDelete' );

    todos__data = JSON.parse(todos__data__json);
    if(activeParent && completeParent && deleteParent){
        activeParent.innerHTML = '';
        completeParent.innerHTML='';
        deleteParent.innerHTML='';

        Object.keys(todos__data).forEach(
            function (key) {
                var todo_element = createTodoElement(key, todos__data[key]);
                console.log(todo_element);
                if(todos__data[key].status == 'ACTIVE')
                {

                   // activeParent.innerText = todos__data[key].title;
                    activeParent.appendChild( todo_element );
                }
                else if(todos__data[key].status == 'COMPLETE') {
                    completeParent.appendChild(todo_element);
                    //completeParent.innerText = todos__data[key].title;
                }
                    else if(todos__data[key].status == 'DELETED') {
                    deleteParent.appendChild(todo_element);
                    //deleteParent.innerText = todos__data[key].title;
                }
            }
        )
    }
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

// toggleDiv
function toggleDiv(divId, hideId) {
    var x = document.getElementById(divId);
    var hide = document.getElementById(hideId);
    console.log(hide.innerText);
    console.log(hide);
    if (x.style.display === 'none') {
        x.style.display = 'block';
        if(hideId == 'hideId1')
            hide.innerText = 'Hide Completed';
        else
            hide.innerText = 'Hide Deleted'
        }
    else {
        x.style.display = 'none';
        // hide.innerText = 'show';
        if(hideId == 'hideId1')
            hide.innerText = 'Show Completed';
        else
            hide.innerText = 'Show Deleted'
    }
}
