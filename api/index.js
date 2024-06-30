var Express = require("express");
var MongoClient = require("mongodb").MongoClient;
var cors = require("cors");
const multer=require("multer");

var app=Express();
app.use(cors());

/*
var CONNECTION_STRING = "mongodb+srv://turma1p:7Ixcot35puc2Naji@cluster0.lem5op2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var DATABASENAME = "todoappdb";
*/
var CONNECTION_STRING="mongodb+srv://admin:UpIbJhwE5fmrsmTc@cluster0.e2pfzpe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var DATABASENAME="Collection";

var database;

app.listen(5038, ()=> {
    console.log("teste passo #1");
    MongoClient.connect(CONNECTION_STRING, (error, client) => {
        if (error) {
            console.error("Failed to connect to the database");
            console.error(error);
            return;
        }        
        database = client.db(DATABASENAME);
        console.log("Conectado ao MongoDB");
    });
    //console.log("teste passo #2");
});

app.get('/api/Collection/GetNote', (request, response) => {
    database.collection("products").find({}).toArray((error, result)=> {
        response.send(result);
        
    });
});

app.post('/api/Collection/AddNotes', multer().none(), (request, response) => {
    database.collection("products").count({}, function(error, numOfDocs){
        database.collection("products").insertOne({
            id:(numOfDocs+1).toString(),
            description: request.body.newNotes
        });
        response.json("Adicionado");
    });
});

app.delete('/api/Collection/DeleteNotes', (request, response) => {
        database.collection("products").deleteOne({
            description: request.query.id
        });
        response.json("Apagado");
});

app.get('/api/Collection/GetNotes', (request, response) => {
    database.collection("newsletter").find({}).toArray((error, result)=> {
        response.send(result);
    });
});

app.post('/api/Collection/AddNotese', multer().none(), (request, response) => {
    database.collection("newsletter").count({}, function(error, numOfDocs){
        database.collection("newsletter").insertOne({
            id:(numOfDocs+1).toString(),
            description: request.body.newNotes
        });
        response.json("Adicionado");
    });
});

app.delete('/api/Collection/DeleteNotese', (request, response) => {
        database.collection("newsletter").deleteOne({
            description: request.query.id
        });
        response.json("Apagado");
});
