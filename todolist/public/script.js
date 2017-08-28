/**
 * Created by chavaharish on 28-08-2017.
 */
// console.log('loaded succesfully');
const ID = 'todos_div';
var data;
const RESPONSE_DONE = 4;
const STATUS_OK = 200;

function add_todo_element(id, todos__data__json) {
    var parent = document.getElementById( id );
    parent.innerText = todos__data__json;
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