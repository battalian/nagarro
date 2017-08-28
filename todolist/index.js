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

app.get('/todos', function (req, res, next) {
    res.json( data.todos);
});

app.delete('/todos/:id', function (req, res, next) {
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

app.post('/addNewTodo', function (req, res) {
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

app.put('/modifyTodo/:id', function (req, res) {
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


app.listen(3000);