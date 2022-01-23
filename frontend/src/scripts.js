//Variaveis globais
let bview = document.getElementById("bview");
let binclude = document.getElementById("binclude");
let bbirthday = document.getElementById("bbirthday");
let bsetor = document.getElementById("bsetor");
let bramais = document.getElementById("bramais");
let inmatricula = document.getElementById("inmatricula");
let inname = document.getElementById("inname");
let inramal = document.getElementById("inramal");
let inemail = document.getElementById("inemail");
let insetor = document.getElementById("insetor");
let indate = document.getElementById("indate");
let inmonth = document.getElementById("inmonth");
let inseto = document.getElementById("inseto");
let results = document.getElementById("results");

//funções
//enviar requicisão
function sendparam(param, calb){
    let resp = false;
    console.log(param);
        fetch(param)
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
        line.innerHTML=`<td>${element.Matricula}</td><td>${element.Nome}</td><td>${element.Ramal}</td><td>${element.Email}</td><td>${element.Setor}</td><td>${element.Nascimento}</td>`;
        results.append(line);
    });    
}
function writetabler(dados){
    results.innerHTML="<tr><th>Setor</th><th>Ramal</th></tr>";
    dados.forEach(element => {
        let line = document.createElement("tr");
        line.innerHTML=`<td>${element.Setor}</td><td>${element.Ramal}</td>`;
        results.append(line);
    });    
}
//ver cadastros
function clickview(){
    let exec = sendparam("view", writetable);
    console.log(exec);
    return exec;
}
//incluir cadastro
function clickinclude(){
    results.innerHTML="";
    let funcionario = {
        "Matricula": 0,
        "Nome": "",
        "Ramal": 0,
        "Email": "",
        "Setor": "",
        "Nascimento": 0
    };
    if (inmatricula.value && inname.value && inramal.value && inemail.value && insetor.value && indate.value) {
        funcionario.Matricula=inmatricula.value;
        funcionario.Nome=inname.value;
        funcionario.Ramal=inramal.value;
        funcionario.Email=inemail.value;
        funcionario.Setor=insetor.value;
        funcionario.Nascimento=indate.value;
        let param = "include="+JSON.stringify(funcionario);
        sendparam(param, function (){console.log(param)})
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
        let param = "birthday="+JSON.stringify(dat.getUTCMonth()+1);
        console.log("Aniversariantes do mês: "+dat.getUTCMonth()+1);
        sendparam(param, writetable);
        return true;
    }else{
        alert("insira os mês a ser verificado");
        return false;
    }
}
//filtrar setor
function clicksetor(){
    if (inseto.value){
        let param = "setor="+inseto.value;
        console.log("Setor: "+inseto.value);
        sendparam(param, writetable);
        return true;
    }else{
        alert("insira os setor a ser verificado");
        return false;
    }
}
//ver ramais
function clickramais(){
    let param = "Ramais";
    console.log("Ramais:");
    sendparam(param, writetabler);
    return true;
}

//eventos
bview.addEventListener('click',clickview);
binclude.addEventListener('click',clickinclude);
bbirthday.addEventListener('click',clickbirthday);
bsetor.addEventListener('click',clicksetor);
bramais.addEventListener('click',clickramais);

