//node 后端服务器
const StuApi=require('./api/StuApi')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.sendStatus(200);
    else
        next();
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/User', StuApi)

app.listen(3000)
console.log('success listen at port:3000......')