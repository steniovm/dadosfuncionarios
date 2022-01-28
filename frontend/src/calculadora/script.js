const URLcalc = 'http://localhost:3000/calc?';
//variaveis globais
let inpA = document.getElementById("numberA");
let inpB = document.getElementById("numberB");
let reselem = document.getElementById("result");
let ops = document.querySelectorAll(".op");

//arrendonda valor com duas casas decimais
function arrend(numberlong){
    if (Number.isFinite(numberlong))
        return Math.round(numberlong*100)/100;
    return numberlong;
}

//calculos
function op(opt){
    let operand;
    let op1, op2;
    let fullurl;
    let result;
    if (opt == 0) operand = '%2B';// +
    if (opt == 1) operand = '-';
    if (opt == 2) operand = '*';
    if (opt == 3) operand = '%2F';// /
    if (opt == 4) operand = '%25';// %
    if (opt == 5) operand = '%3D';// =
    if (opt == 6) operand = 'C';
    op1 = inpA.value;
    op2 = inpB.value;
    fullurl = URLcalc+'ops='+operand+'&op1='+op1+'&op2='+op2;
    fetch(fullurl)
    .then(
        function(response) {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status);
            return;
        }
        response.json().then(function(data) {
            result = parseFloat(data[0]);
            reselem.innerHTML = arrend(result);
            console.log('dados recebidos');
            if (opt == 5){
                inpA.value = result;
                inpB.value = result;
            }
            if (opt == 6){
                inpA.value = 0;
                inpB.value = 0;
                reselem.innerHTML = 0;
            }
        });
        }
    )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
}

//eventos
//clicar em operação
for(let i=0;i<ops.length;i++){
    ops[i].addEventListener('click',function(){op(i)});
}