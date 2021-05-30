const learnAlgo = require('./anomalies_Algo');
const bodyParser = require('body-parser');

console.log("1") //todo delete
const express = require('express')
const app = express()
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    console.log("2") //todo delete
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

console.log("3") //todo delete
//1
app.post('/api/model', (req,res) => {
    //getting model type from the uri
    console.log("2") //todo delete
    const model_type = req.query.model_type;
    //getting data array from body
    const data = req.body;
    var dataArr = Object.values(data);

    var LearnArr = dataArr[0];
    //console.log("Learn Arr" + LearnArr); //todo delete
    var DetectArr = dataArr[1];
    //console.log("Detect Arr" + DetectArr); //todo delete
    var result = learnAlgo.learnAlgo(LearnArr, DetectArr,  model_type)

    //  [[123, "aclkm - sdfaf"],[123, "A - F"],...]
    res.send(JSON.stringify(result));
});

console.log("4") //todo delete
//2
app.get('/api/model', (req,res) => {
    console.log("5") //todo delete
    const model_id = req.query.model_id;
    res.status(200).json({
        messege: 'hello3'
    })
});

//3
app.delete('/api/model', (req,res) => {
    console.log("6") //todo delete
    const model_id = req.query.model_id;
    res.status(200).json({
        messege: 'hello2'
    })
    res.send()
});

//4 work
app.get('/api/models', (req,res) => {
    console.log("7") //todo delete
    res.send(require('./db/models.json'));
});

//5
app.post('/api/anomaly', (req,res) => {
    const model_id = req.query.model_id;
    res.status(200).json({
        messege: 'hello2'
    })
});

module.exports = app;