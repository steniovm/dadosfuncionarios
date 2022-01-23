const fs = require('fs');
const express = require('express');
const app = express();
const port = 8080;
const myModule = require('./componentes/modcadpessoas.js');
const cadastrofunc = require('./funcionarios.json');

app.use(express.static('../frontend/src/'));

app.get("/view*", (req, res) => {
    res.send(myModule.mostrarcadastro(cadastrofunc));
    return false;
});

app.get("/include=*", (req, res) => {
    let obj = JSON.parse(req.params[0]);
    console.log(obj);
    console.log(obj["Matricula"]);
    if (req.params[0]){
        res.send(myModule.incluir(cadastrofunc,obj))
    } else {
        res.send("É necessário digitar os dados");
    }
    return false;
});
app.get("/birthday=*", (req, res) => {
    if (req.params[0]){
        res.send(myModule.aniversario(cadastrofunc,req.params[0]-1));
    } else {
        res.send("É necessário digitar o mes");
    }
    return false;
});
app.get("/setor=*", (req, res) => {
    if (req.params[0]){
        res.send(myModule.setor(cadastrofunc,req.params[0]));
    } else {
        res.send("É necessário digitar o setor");
    }
    return false;
});
app.get("/ramais*", (req, res) => {
    res.send(myModule.mostrarramais(cadastrofunc));
    return false;
});

app.listen(port, () =>{
    console.log('listening http://localhost:'+ port);
});