import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import {PORT} from "../backend/config.js"
import mysql from "mysql2"
   
const app = express()
app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type'],
    }));
app.use(bodyParser.json())

//database connection
var connection = mysql.createConnection({
    host : 'localhost',
    database : 'demodb',
    user :'root',
    password :'Raveesha@123'
})
connection.connect(function(err){
    if(err){
        console.err('error connecting :'+err.stack);
        return ;
    }
    console.log('connected as id ' + connection.threadId)
})
app.listen(PORT,()=>{
    console.log(`Server is running....${PORT}`)
})
//get all data
app.get('/emp', (req, res) => {
    connection.query('SELECT * FROM employee', (error, results, fields) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json(results);
    });
  });


//get single data
app.get('/emp/:id',(req,res)=>{
    let Eid =req.params.id;
    let qr = `select * from employee where emp_id=${Eid}`
    connection.query(qr,(err,result)=>{
        if(err,(err,result)){
            if(err){console.log(err)}
        }
        if(result.length>0){
            res.send({
                message:'get employee details',
                data:result
            })
        }
        else{
            res.send({
                message:'data not found'
            })
        }
    })    

})

// create data 

app.post('/emp',(req,res)=>{
    console.log(req.body,'createdata');

    let emp_name = req.body.emp_name;
    let address = req.body.address;
    let phone_number = req.body.phone_number;

    let qr = `insert into employee(emp_name,address,phone_number) values('${emp_name}','${address}','${phone_number}')`

    console.log(qr,'qr')
    connection.query(qr,[emp_name, address, phone_number],(err,result)=>{
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err.message });
        }

        if(result.length>0){
            res.send({
                message:'data inserted'
            });
        }else{ 
            res.json({
                message: 'Data inserted successfully'
            });
        }
    })
})

//update data 

app.put('/user',(req,res)=>{
    console.log(req.body,'updatedata');

    let emp_name = req.body.emp_name;
    let address = req.body.address;
    let phone_number = req.body.phone_number;
    
})