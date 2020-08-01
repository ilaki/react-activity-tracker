const express = require('express');
const path = require('path');
const favicon = require('express-favicon');

const app = express();
const PORT = process.env.PORT || 8080;

// app.use(favicon(__dirname + '/build/favicon/ico'));
app.use(express.static(__dirname));
app.get('/ping', (req,res)=> {
    return res.send('pong');
})

app.get('/', (req,res)=> {
    res.sendFile(path.join(__dirname , 'build','index.html'));
})

app.listen( PORT , ()=> {
    console.log(`app listening on port : ${PORT}`);
})