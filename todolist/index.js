/**
 * Created by chavaharish on 28-08-2017.
 */
var express = require('express');
// var morgan = require('morgan');
var bodyParser = require('body-parser');

var data = require('./data.js');


var app = express();

// app.use(morgan('combined'));
app.use('/', express.static(__dirname + '/public') );
// app.use('/', bodyParser.urlencoded({extended:false}));

app.use("/", bodyParser.urlencoded( {extended:false} ) );

app.get('/api/todos', function (req, res, next) {
    res.json( data.todos);
});

app.get('/api/todos/active', function (req, res) {
    var active_todos={};
    for(key in data.todos )
    {
        if( data.todos[key].status == data.statusENUMS.ACTIVE){
            active_todos[key] = data.todos[key];
        }
    }
    res.json(active_todos);
});


app.get('/api/todos/complete', function (req, res) {
    var completed_todos={};
    for(key in data.todos )
    {
        if( data.todos[key].status == data.statusENUMS.COMPLETE){
            completed_todos[key] = data.todos[key];
        }
    }
    res.json(completed_todos);
});


app.get('/api/todos/deleted', function (req, res) {
    var deleted_todos={};
    for(key in data.todos )
    {
        if( data.todos[key].status == data.statusENUMS.DELETED){
            deleted_todos[key] = data.todos[key];
        }
    }
    res.json(deleted_todos);
});




app.delete('/api/todos/:id', function (req, res, next) {
     var idToBeDelete = req.params.id;
     var todo = data.todos[idToBeDelete];
      // console.log( );
     if(!todo){
         res.status(400).json( {err: "todo doesn't exist"} );
     }
     else
     {
        todo.status = data.statusENUMS.DELETED;
        res.json(data.todos);
     }
});

app.post('/api/addNewTodo', function (req, res) {
    var titleData = req.body.todoTitle;
    console.log(req.body);
    console.log(titleData);
    if(!titleData  || titleData =='' || titleData .trim()=='' )
    {
        res.status(400).json({err:"title is Null"});
    }
    else
    {
        var newtodo={ title: titleData, status:data.statusENUMS.ACTIVE};
        data.todos[data.nextId] = newtodo;
        data.nextId++;
    }
     res.json(data.todos);
});

app.put('/api/modifyTodo/:id', function (req, res) {
    var todoId = req.params.id;
    var todo = data.todos[todoId];
    if(!todo)
    {
        res.status(400).json({err:"Given Id doesn't exist"});
    }
    else
    {
        var modifiedTitle = req.body.todoTitle;
        var modifiedStatus = req.body.todoStatus;

        data.todos[todoId].status = modifiedStatus;
        if( !modifiedTitle || modifiedTitle=='' || modifiedTitle.trim()=='')
        {
            res.status(400).json({err:"title is Empty"});
        }
        else
        {
            data.todos[todoId].title = modifiedTitle;
        }


    }
    res.json( data.todos);
});

// PUT /api/todos/complete/:id

app.put('/api/todos/complete/:id', function (req, res) {
    var idToBeCompleted = req.params.id;
    var todo = data.todos[idToBeCompleted];
    if(!todo){
        res.status(400).json( {err: "todo doesn't exist"} );
    }
    else
    {
        todo.status = data.statusENUMS.COMPLETE;
        res.json(data.todos);
    }

});

app.put('/api/todos/active/:id', function (req, res) {
    var idToBeActive = req.params.id;
    var todo = data.todos[idToBeActive];
    if(!todo){
        res.status(400).json( {err: "todo doesn't exist"} );
    }
    else
    {
        todo.status = data.statusENUMS.ACTIVE;
        res.json(data.todos);
    }

});


app.listen(3000);