
var mongoClient = require("mongodb").MongoClient;
var express = require('express');
var cors = require('cors')
var ConnectionString = 'mongodb://localhost:27017'
var app = express()

app.use(express.urlencoded({
    extended:true
}))
app.use(express.json())
app.use(cors())
app.get('/',(req,res)=>{
    res.send('<h1>All API</h1> <br> <a href=http://localhost:8080/readAllData>Read</a>')
})

//Read all Data
app.get('/readAllData', (req,res)=>{
    mongoClient.connect(ConnectionString)
    .then(response=>{
        var dataBase = response.db('firstDataBase')
        return dataBase.collection('tbl1').find({}).toArray()
    })
    .then(document=>{
        res.send(document)
    })
    .catch(err=>{
        console.log(err);
    })
})


//Read all the data by using path params
app.get('/student/:id/:Name',(req,res)=>{
    var id = Number(req.params.id);
    var Name = req.params.Name
    mongoClient.connect(ConnectionString)
    .then(response=>{
        var dataBase = response.db('firstDataBase')
        console.log(id);
        return dataBase.collection('tbl1').find({$and:[{'id':id},{'Name':Name}]}).toArray()
    }).then(document=>{
        res.send(document)
    }).catch(err=>{
        console.log(err);
    })
})


//Create the data 
app.post('/createData',(req,res)=>{
    var data = {
        'branch': req.body.branch,
        'id': req.body.id,
        'Name': req.body.Name
    }
    console.log(data);
    mongoClient.connect(ConnectionString)
    .then(clientObj=>{
        var dataBase = clientObj.db("firstDataBase")
        return dataBase.collection('tbl1').insertOne(data)
    })
    .then(document=>{
        res.send("Inserted Succesfully")
    })
    .catch(err=>{
        console.log(err);
    })
})

 //update the data
app.put('/addData/:id',(req,res)=>{
    var id = Number(req.params.id);

    mongoClient.connect(ConnectionString)
    .then(response=>{
        var dataBase = response.db('firstDataBase')
        return dataBase.collection('tbl1').updateOne({id:id},{$set:{ Name:req.body.Name}})
    })
    .then(()=>{
        res.send("Updated succesfully")
    })
    .catch(err=>{
        console.log(err);
    })
})
 
// {
//     "_id": "65c7bdfa6d9585c89f7d9d1e",
//     "branch": "CS",
//     "id": 1,
//     "Name": "jigyasa Singh",
//     "updatedata": {                   //To delete this object we use $unset
//       "Name": "jigyasa Singh"
//     }
//   }, 
app.put('/deleteData/:id',(req,res)=>{
    mongoClient.connect(ConnectionString)
    .then(response=>{
        let dataBase = response.db('firstDataBase')
        return dataBase.collection('tbl1').updateOne({id:Number(req.params.id)},{$unset:{updatedata:1}})
    }).then(doc=>{
        res.send("deleted one coloum")
    }).catch(err=>{
        console.log(err);
    })
 })

   //Delete Data
app.delete('/delete/:id',(req,res)=>{
    mongoClient.connect(ConnectionString)
    .then(clientObj=>{
        let dataBase =clientObj.db('firstDataBase')
        return dataBase.collection('tbl1').deleteOne({id:(req.params.id)})
    })
    .then(docum=>{
        res.send("Deleted Succesfully")
    }).catch(error=>{
        console.log(error);
    })
})

app.listen(8080,()=>{
   console.log("Server Started")
})