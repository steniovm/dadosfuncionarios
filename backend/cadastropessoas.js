const fs = require('fs');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const myModule = require('./componentes/modcadpessoas.js');
const mycalc = require('./componentes/modcalculator.js');
let calca = new mycalc.calculadora;
const { ppid } = require('process');
const { stringify } = require('querystring');
//const cadastrofunc = require('./funcionarios.json');
const database = './database.json';
const cadastrofunc = require(database);
app.use(express.json());
app.use(cors());
//app.use(express.static('../frontend/src/'));
app.use('/funcionarios',express.static('../frontend/src/funcionarios'));
app.use('/calculadora',express.static('../frontend/src/calculadora'));

app.post("/view", (req, res) => {
    console.log("teste view");
    console.log(req.body);
    res.send(myModule.mostrarcadastro(cadastrofunc));
    return false;
});

app.post("/include", (req, res) => {
    console.log("teste include");
    console.log(req.body);
    //let obj = JSON.parse(req.body);
    //let obj = {};
    //let obj = req.body;
    //console.log(obj);
    if (req.body){
        res.send(myModule.incluir(cadastrofunc,req.body));
        var dbs = JSON.stringify(cadastrofunc);
        fs.writeFile(database, dbs, 'utf8', err=>{console.log(err)});
    } else {
        res.send("É necessário digitar os dados");
    }
    return false;
});
app.post("/birthday", (req, res) => {
    console.log("teste birthday");
    console.log(req.body.mes);
    if (req.body){
        res.send(myModule.aniversario(cadastrofunc,req.body.mes-1));
    } else {
        res.send("É necessário digitar o mes");
    }
    return false;
});
app.post("/setor", (req, res) => {
    console.log("teste setor");
    console.log(req.body.setor);
    if (req.body){
        res.send(myModule.setor(cadastrofunc,req.body.setor));
    } else {
        res.send("É necessário digitar o setor");
    }
    return false;
});
app.post("/ramais", (req, res) => {
    console.log("teste ramais");
    console.log(req.body);
    res.send(myModule.mostrarramais(cadastrofunc));
    return false;
});

app.get("/calc/", (req, res) => {
    console.log(req.query);
    if (req.query.ops && req.query.op1 && req.query.op2){
        calca.setOperation(req.query.ops);
        calca.setOperand1(parseFloat(req.query.op1));
        calca.setOperand2(parseFloat(req.query.op2));
        console.log(calca.getOperand1()+calca.getOperation()+calca.getOperand2()+" = "+calca.getResult());
        res.send([calca.getResult()]);
        return true;
    }else{
        res.send('falta de parametros');
    }
    return false;
})

app.listen(port, () =>{
    console.log('listening http://localhost:'+ port);
});