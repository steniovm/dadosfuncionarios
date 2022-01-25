//retorna todo o banco de dados
function mostrarcadastro(cadastrofunc){
    console.log(`cadastro completo (${cadastrofunc.length} itens):`);
    //console.log(cadastrofunc);
    return cadastrofunc;
}

//inclui usuario no banco de dados
function incluir (cadastrofunc,param){
    let func = {
        "birthday": "00/00/0000",
        "firstName": "",
        "lastName": "",
        "fullName": "",
        "email": "",
        "department": "",
        "extension": 0,
        "id": 0
    };
    if (param["birthday"]) func["birthday"] = param["birthday"];
    if (param["firstName"]) func["firstName"] = param["firstName"];
    if (param["lastName"]) func["lastName"] = param["lastName"];
    if (param["fullName"]) func["fullName"] = param["fullName"];
    if (param["email"]) func["email"] = param["email"];
    if (param["department"]) func["department"] = param["department"];
    if (param["extension"]) func["extension"] = param["extension"];
    if (param["id"]) func["id"] = param["id"];
    console.log("funcionario incluido:");
    console.log(func);
    cadastrofunc.push(func);
    return func;
}
//retorna dados dos aniversariantes do mês
function aniversario (cadastrofunc,param){
    let aniversariantes;
    aniversariantes = cadastrofunc.filter(item => {
        let data = new Date(item['birthday']);
        let mes = data.getUTCMonth();
        if (mes==param){
            return true;
        }
        return false;
    });
    //console.log(aniversariantes);
    return aniversariantes;
}
//retorna os funcionarios do setor pesquisado
function setor (cadastrofunc,param){
    let setors;
    setors = cadastrofunc.filter(item => item.department.toLowerCase() == param.toLowerCase());
    console.log(setors);
    return setors;
}
//retorna lista de ramais e setors em ordem alfabetica de setores
function mostrarramais(cadastrofunc){
    let list = [];
    cadastrofunc.forEach(item => {
        let ramal = {
            "department": "",
            "extension": 0
        }
        ramal.extension = item.extension;
        ramal.department = item.department;
        list.push(ramal);
    });
    list.sort(function(a,b){
        if (a.department > b.department) {
            return 1;
        }
        if (a.department < b.department) {
            return -1;
        }
        return 0;
    });
    console.log(list);
    return list;
}

module.exports = { mostrarcadastro, incluir, aniversario, setor, mostrarramais };


/*
//mesmas funções adequadas para o formato do arquivo funcionarios.json
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
*/