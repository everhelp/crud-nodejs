const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const handlebars = require('express-handlebars');
const app = express();
const urlencondeParser = bodyParser.urlencoded({extended:false});
const sql=mysql.createConnection({ 
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306
});
sql.query("use nodejs");
app.use('/img', express.static('img'));
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
//Template engine 
app.engine("handlebars", handlebars({defaultLayout: 'main'})); 
app.set('view engine', 'handlebars'); 

//rotas e templates
app.get('/', function(req, res){
/* res.send("pagina inicial");*/
/*res.sendFile(dirname+"index.html")*/
/*console.log(req.params.id); */
res.render('index');

app.get("/ javascript", function(req, res){res.sendFile(__dirname+'/js/javascript.js   ');});
app.get("/ style", function(req, res){res.sendFile(__dirname+'/js/style.js   ');});});
app.get("/inserir", function(req, res){res.render("inserir");});

app.get("/select/:id?", function(req, res){
     if(!req.params.id){
       sql.query("select * from user order by id asc", function(err, results, fields){
        res.render('select', {data:results});

    });

    }   

});

app.post("/controllerForm",urlencondeParser,function(req, res) {
    sql.query('INSERT INTO USER VALUES (?,?,?)',[req.body.id, req.body.name, req.body.idade]); 
    res.render('controllerForm');  });
    
    app.get('/deletar/:id', function(req, res){
        sql.query("delete from user where id=?", [req.params.id]);
        res.render('deletar');
});

    app.get("/update/:id",function(req, res){
        sql.query("select * from user where id=?", [req.params.id], function(err, results,fields){
            res.render('update', {id:req.params.id, name: results[0].name,idade: results[0].idade});


        })
        
    });
    app.post("/controllerupdate/",urlencondeParser,function(req, res){
        sql.query("update user set  name=?, idade=? where id=? ", [req.body.name, req.body.idade,req.body.id])
             res.send("Dados atualizados com sucesso!");
            res.render('controllerupdate');
    })
//start server
app.listen(3000, function(req, res){console.log("Servidor rodando...");});