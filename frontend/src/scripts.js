const url = 'http://localhost:3000/';
//Variaveis globais
let bview = document.getElementById("bview");
let binclude = document.getElementById("binclude");
let bbirthday = document.getElementById("bbirthday");
let bsetor = document.getElementById("bsetor");
let bramais = document.getElementById("bramais");
let inmatricula = document.getElementById("inmatricula");
let infirstname = document.getElementById("infirstname");
let inlastname = document.getElementById("inlastname");
let inramal = document.getElementById("inramal");
let inemail = document.getElementById("inemail");
let insetor = document.getElementById("insetor");
let indate = document.getElementById("indate");
let inmonth = document.getElementById("inmonth");
let inseto = document.getElementById("inseto");
let results = document.getElementById("results");

//funções
//enviar requicisão
function sendparam(param, calb, urlu){
    let resp = false;
    console.log(param);
    console.log(url+urlu);
        fetch(url+urlu, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json; charset=UTF-8',
            },
            body: param
        })
        .then(
            function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }
            response.json().then(function(data) {
                console.log('dados recebidos');
                console.log(data);
                if (calb) calb(data);
                resp = true;
            });
            }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
        return resp;
}
//escrever tabela
function writetable(dados){
    results.innerHTML="<tr><th>Matricula</th><th>Nome</th><th>Ramal</th><th>Email</th><th>Setor</th><th>Nascimento</th></tr>";
    dados.forEach(element => {
        let line = document.createElement("tr");
        line.innerHTML=`<td>${element.id}</td><td>${element.fullName}</td><td>${element.extension}</td><td>${element.email}</td><td>${element.department}</td><td>${element.birthday}</td>`;
        results.append(line);
    });    
}
//escrever tabela de ramais
function writetabler(dados){
    results.innerHTML="<tr><th>Setor</th><th>Ramal</th></tr>";
    dados.forEach(element => {
        let line = document.createElement("tr");
        line.innerHTML=`<td>${element.department}</td><td>${element.extension}</td>`;
        results.append(line);
    });    
}

//ver cadastros
function clickview(){
    let exec = sendparam("", writetable, "view");
    console.log(exec);
    return exec;
}
//incluir cadastro
function clickinclude(){
    let funcionario = {
        "birthday": "",
        "firstName": "",
        "lastName": "",
        "fullName": "",
        "email": "",
        "department": "",
        "extension": 0,
        "id": 0
    }
    if (inmatricula.value && infirstname.value && inlastname.value && inramal.value && inemail.value && insetor.value && indate.value) {
        funcionario.id=inmatricula.value;
        funcionario.firstName=infirstname.value;
        funcionario.lastName=inlastname.value;
        funcionario.fullName=infirstname.value+" "+inlastname.value;
        funcionario.extension=inramal.value;
        funcionario.email=inemail.value;
        funcionario.department=insetor.value;
        funcionario.birthday=indate.value;
        let param = JSON.stringify(funcionario);
        sendparam(param, function (){console.log(param)},"include")
        writetable([funcionario]);
        console.log("cadastro incluido");
        console.log([funcionario]);
        return true;
    }else{
        alert("insira os dados a serem cadastrados");
        return false;
    }
}
//ver aniversáriantes
function clickbirthday(){
    if (inmonth.value){
        let dat = new Date(inmonth.value);
        let param = JSON.stringify(dat.getUTCMonth()+1);
        console.log("Aniversariantes do mês: "+dat.getUTCMonth()+1);
        let parame = {"mes":param};
        console.log(JSON.stringify(parame));
        let paramet = JSON.stringify(parame);
        sendparam(paramet, writetable, "birthday");
        return true;
    }else{
        alert("insira os mês a ser verificado");
        return false;
    }
}
//filtrar setor
function clicksetor(){
    if (inseto.value){
        let param = inseto.value;
        let parame = {"setor":param};
        let paramet = JSON.stringify(parame);
        console.log("Setor: "+inseto.value);
        sendparam(paramet, writetable, "setor");
        return true;
    }else{
        alert("insira os setor a ser verificado");
        return false;
    }
}
//ver ramais
function clickramais(){
    let param = "";
    console.log("Ramais:");
    sendparam(param, writetabler, "ramais");
    return true;
}

//eventos
bview.addEventListener('click',clickview);
binclude.addEventListener('click',clickinclude);
bbirthday.addEventListener('click',clickbirthday);
bsetor.addEventListener('click',clicksetor);
bramais.addEventListener('click',clickramais);

