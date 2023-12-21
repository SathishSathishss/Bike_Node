
const express= require('express');
const bodyparser= require('body-parser');
const mysql=require('mysql2');
const app = express();
const port=3000;

app.use(bodyparser.json());
const dp=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'root',
        database:'Bike'
});

dp.connect((error)=>{
    if(error){
        console.error("Not connected to DB");
    }
    else{
        console.log("connected to DB");
    }
});
//postData
app.post('/addDetails',(req,res)=>{
    const {name,price,color}=req.body;
    dp.query('insert into bike (name,price,color) value (?,?,?)',
    [name,price,color],(error,result,field)=>{
    if(error){
          console.error("Error in post data",error.stack);
          res.status(500).send("Error in insert");
    }
    else{
        console.log("insert data sucessfully");
        res.status(200).send("Insert successfully");
    }
});
});
//getAll
app.get('/geAll',(req,res)=>{

    dp.query('select * from bike ',(error,result,field)=>{
    if(error){
         console.error("Error statment",error.stack);
         res.status(500).send("error in get data");
    }
    else {
        res.status(200).send(result);
    }
    });
});
//getById
app.get('/getById/:id',(req,res)=>{
    const {id}=req.params;

    dp.query('select * from bike where id=?',[id],(error,field,result)=>{
        if(error){
            console.error("Error in statement",error.stack);
            res.status(500).send("Error in get data")
        }
        else{
            res.status(200).send("Get data successfully");
        }
    });
});
//getAll
app.get('/getAll',(req,res)=>{
    const data=req.body;

    dp.query('select * from bike ',(error,data)=>{
    if(error){
        console.error("error in statment",error.stack);
        res.status(500).send("error in get");
    }
    else {
         res.status(200).send("get Successfully");
    }

});
});

app.listen(port,()=>{
  console.log(`This application run on ${port} port`);
});