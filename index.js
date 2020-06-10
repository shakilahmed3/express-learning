const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const members = require('./members');
const app = express();

const logger = require('./middlewear/logger');

//init midelwear
// app.use(logger);

//Handlebars Middleware

app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:false}))

//Home Page route
app.get('/', (req,res)=>res.render('index',{
    title: 'Member Application',
    members: members
}));

// set static folder
app.use(express.static(path.join(__dirname, 'public')));


//Members api routes
app.use('/api/members', require('./routes/api/members'))



app.post('/product',(req,res)=>{
    console.log(req.body);
})


const PORT =process.env.PORT || 3000;

app.listen(PORT, (err)=>{
    if(err){
        console.log(err);
    }
    console.log("Ser started on Port "+PORT);
})