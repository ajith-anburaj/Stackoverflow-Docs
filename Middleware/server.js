
const express = require('express');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.get('/topics/:docId', (req, res) => {
    MongoClient.connect(url,function(err,db){
        if(err) throw err;
        var dbo = db.db("StackDocs");
        var docid = parseInt(req.params.docId);
        // var query = ;
        dbo.collection("topics").find({DocTagId:docid}).toArray(function(err,data){
            if(err) throw err;
            res.json({"response":data});
            db.close(); // must close the connection inside the callback function to fetch all the data then close.
        });
    });  
});

app.get('/examples/:topicId', (req, res) => {
    MongoClient.connect(url,function(err,db){
        if(err) throw err;
        var dbo = db.db("StackDocs");
        var topicid = parseInt(req.params.topicId);
        dbo.collection("examples").find({DocTopicId:topicid}).toArray(function(err,data){
            if(err) throw err;
            res.json({"response":data});
            db.close(); // must close the connection inside the callback function to fetch all the data then close.
        });
    });
});

app.get('/doctags', (req, res) => {
    MongoClient.connect(url,function(err,db){
        if(err) throw err;
        var dbo = db.db("StackDocs");
        dbo.collection("doctags").find({}).toArray(function(err,data){
            if(err) throw err;
            res.json({"response":data});
            db.close(); // must close the connection inside the callback function to fetch all the data then close.
        });
    }); 
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});