const express = require('express');
const testAPIRouter = require('./test')
const querystring = require('querystring')
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
//const { default: getData } = require('./got-test');
const getData = require('./got-test')
const got = require('got')
const food_api_id="8ec3fe8a";
const food_api_key='f9ed737d34092ca3e40cd93f1a799a1d'
const {URL, URLSearchParams} = require('url');
const { resourceUsage } = require('process');
//const URLSearchParams = new url.URLSearchParams()

app.use('/testAPI', testAPIRouter)
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host : 'localhost',
    user : 'zf2182',
    password : '123456',
    database : 'cruddatabase'
});

db.connect();

//app.get('/getRecipe',getData())

app.get('/getRecipe',async function (req, res){
    // const url = "https://api.edamam.com/search?"
    // const params = new URLSearchParams({
    //     q:'tomato,egg,spinach ',
    //     app_id: food_api_id,
    //     app_key:food_api_key,
        
    // })
    const url = new URL("https://api.edamam.com/search?");
    const params = querystring.stringify({
            
        q:'tomato,egg,spinach ',
        app_id: food_api_id,
        app_key:food_api_key,
        
    })

    const final_url = url + params;
   
   let v;
    try{
        //const res = await got.get('https://jsonplaceholder.typicode.com/posts/1').json();
        //console.log(res);
        
        //const final_url = 'https://api.edamam.com/api/recipes/v2?type=public&q=egg%2Cspinach%20ham&app_id=8ec3fe8a&app_key=f9ed737d34092ca3e40cd93f1a799a1d';
        console.log(final_url);
        v = await got.get(final_url).json();
        console.log('receiving data...');
        res.send(v.hits);
    }catch(error){
        console.log(error);
   }
   //return v.hits;
}
)
app.get('/',(req, res) =>{
    res.send('Welcome!!')
})

app.get('/data', function(req,res){
var sql = 'SELECT * FROM ninja limit 20';
db.query(sql, (err, result)=>{
    if(err) throw err;
    console.log(result);
    res.send(result);
});
});

app.get('/data/random', function(req, res){
    
})

app.post('/data', function(req, res){
	console.log(req.body); 
    var data = {nama:req.body.nama, usia:req.body.usia};
    var sql = 'INSERT INTO ninja SET ?';
    db.query(sql, data, (err, result)=>{
    if(err) throw err;
    console.log(result);
    res.send({
        status: 'Data has been successfully inserted!',
        no: null,
		nama: req.body.nama,
		usia: req.body.usia
	});
});
});

app.listen(3100, ()=>{
    console.log('Your server is workint in port 3100.')
});

module.exports=app;