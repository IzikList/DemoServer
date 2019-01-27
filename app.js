const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

array = {};
const cors = require('cors')

app.use(cors())

app.get('/', (req, res) => {
    if(req.query.pwd){
        array['' + req.query.pwd] = {
            req: Date.now()
        }
    }
    res.send(req.query);
});

app.get('/upload', (req, res) => {
    if(req.query.pwd){
        console.log(req.query.pwd);
        if(array['' +req.query.pwd] &&  array['' +req.query.pwd].req > Date.now() - 1000 * 60 * 5){
            array['' +req.query.pwd].upload = Date.now();
            res.status(200).send();
        }
    }
    res.status(404).send();
});

app.get('/check', (req, res) => {
    if(req.query.pwd){
        if(array['' +req.query.pwd] && array['' +req.query.pwd].upload && array['' +req.query.pwd].upload > Date.now() - 1000 * 60 * 5){
            return res.status(200).send();
        }
    }
    res.status(404).send();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
