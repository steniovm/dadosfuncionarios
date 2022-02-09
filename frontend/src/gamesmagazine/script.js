const url = 'http://localhost:3000/';
//variaveis globais
let bimputs = document.getElementById("bimputs");
let imputgame = document.querySelectorAll(".imputgame");
let imputlabel = document.querySelectorAll(".imputlabel");
let catalogtable = document.getElementById("catalogtable");
let gamemodel = {
	"id": "",
	"game": "",
	"year": "",
	"genre": "",
	"multiplayer": "",
	"offline": "",
	"crossplataform": ""
};
function newcatalog(){
    catalogtable.innerHTML="";
    let headerline = document.createElement("tr");
    let datenames = new Array(imputlabel.length);
    imputlabel.forEach((item,index)=>{
        datenames[index] = document.createElement("th");
        datenames[index].innerHTML = item.innerHTML;
    });
    headerline.append(...datenames);
    catalogtable.append(headerline);
}
function addlinecatalog(data){
    let line = document.createElement("tr");
    let dates = new Array(imputlabel.length);
    imputlabel.forEach((item,index)=>{
        dates[index] = document.createElement("th");
    });
    dates[0].innerHTML = data.id;
    dates[1].innerHTML = data.game;
    dates[2].innerHTML = data.year;
    dates[3].innerHTML = data.genre;
    dates[4].innerHTML = data.multiplayer;
    dates[5].innerHTML = data.offline;
    dates[6].innerHTML = data.crossplataform;
    line.append(...dates);
    catalogtable.append(line);
}
function refreshcatalog(database){
    newcatalog();
    console.log(database);
    database.forEach(addlinecatalog);
}
function enviar(){
    let newgame = {
        "id": "",
        "game": "",
        "year": "",
        "genre": "",
        "multiplayer": "",
        "offline": "",
        "crossplataform": ""
    };
    newgame.id = imputgame[0].value;
    newgame.game = imputgame[1].value;
    newgame.year = imputgame[2].value;
    newgame.genre = imputgame[3].value;
    newgame.multiplayer = imputgame[4].checked;
    newgame.offline = imputgame[5].checked;
    newgame.crossplataform = imputgame[6].value;
    console.log(newgame);
    envio(newgame);
}
function envio(param){
    fetch(url+"gameadd",{
        method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(param)
    }).then(function(response) {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status);
            return;
        }
        response.json().then(function(data) {
            console.log('dados recebidos');
            console.log(data);
            refreshcatalog(data);
        });
        }).catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
}
function catalogupdate(){
    fetch(url+"gamecat").then(
        function(response) {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status);
            return;
        }
        response.json().then(function(data) {
            refreshcatalog(data);
            console.log('dados recebidos');
        });
        }
    ).catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
}

catalogupdate();

bimputs.addEventListener('click',enviar);