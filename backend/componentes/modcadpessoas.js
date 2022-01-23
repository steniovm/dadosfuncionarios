function mostrarcadastro(cadastrofunc){
    console.log(`cadastro completo (${cadastrofunc.length} itens):`);
    console.log(cadastrofunc);
    return cadastrofunc;
}
function incluir (cadastrofunc,param){
    let func = {
        "Matricula": 0,
        "Nome": "",
        "Ramal": 0,
        "Email": "",
        "Setor": "",
        "Nascimento": 0
    };
    if (param["Matricula"]) func["Matricula"] = param["Matricula"];
    if (param["Nome"]) func["Nome"] = param["Nome"];
    if (param["Ramal"]) func["Ramal"] = param["Ramal"];
    if (param["Email"]) func["Email"] = param["Email"];
    if (param["Setor"]) func["Setor"] = param["Setor"];
    if (param["Nascimento"]) func["Nascimento"] = param["Nascimento"];
    console.log("funcionario incluido:");
    console.log(func);
    cadastrofunc.push(func);
    return func;
}
function aniversario (cadastrofunc,param){
    let aniversariantes;
    aniversariantes = cadastrofunc.filter(item => {
        let data = new Date(item['Nascimento']);
        let mes = data.getUTCMonth();
        if (mes==param){
            return true;
        }
        return false;
    });
    console.log(aniversariantes);
    return aniversariantes;
}
function setor (cadastrofunc,param){
    let setors;
    setors = cadastrofunc.filter(item => item.Setor.toLowerCase() == param.toLowerCase());
    console.log(setors);
    return setors;
}
function mostrarramais(cadastrofunc){
    let list = [];
    cadastrofunc.forEach(item => {
        let ramal = {
            "Setor": "",
            "Ramal": 0
        }
        ramal.Ramal = item.Ramal;
        ramal.Setor = item.Setor;
        list.push(ramal);
    });
    list.sort(function(a,b){
        if (a.Setor > b.Setor) {
            return 1;
        }
        if (a.Setor < b.Setor) {
            return -1;
        }
        return 0;
    });
    console.log(list);
    return list;
}

module.exports = { mostrarcadastro, incluir, aniversario, setor, mostrarramais };
