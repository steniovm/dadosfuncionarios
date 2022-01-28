function calculadora() {
    let memorys = [0,1,2,3,4,5,6,7,8];
    memorys.forEach(element => {element=randomizevalues()});
    let resut = 0;
    let operand1 = 0;
    let operand2 = 0;
    let operation = '=';
    function randomizevalues(){
        return Math.random() * 100;
    }
    function soma(a,b){
        resut = a+b;
        return resut;
    }
    function subtrai(a,b){
        resut = a-b;
        return resut;
    }
    function multiplica(a,b){
        resut = a*b;
        return resut;
    }
    function divide(a,b){
        if (b != 0){
            resut = a/b;
        }else{
            resut = "err div/0";
        }
        return resut;
    }
    function resto(a,b){
        if (b != 0){
            resut = a%b;
        }else{
            resut = "err div/0";
        }
        return resut;
    }
    function getMam(index){
        return memorys[index];
    }
    function setMam(index, valor){
        memorys[index] = valor;
        return memorys[index];
    }
    function getResult(){
        let resul;
        switch (operation){
            case '+':
                resul = soma(operand1,operand2);
            break;
            case '-':
                resul = subtrai(operand1,operand2);
            break;
            case '*':
                resul = multiplica(operand1,operand2);
            break;
            case '/':
                resul = divide(operand1,operand2);
            break;
            case '%':
                resul = resto(operand1,operand2);
            break;
            case '=':
                resul = resut;
                operand2=operand1;
            break;
            case 'C':
                resul = 0;
                clearCalculator();
            break;
            default:
                resul = 'err';
        }
        return resul;
    }
    function setReMam(index){
        return setMam(index,resut);
    }
    function setOperand1(_operand1){
        operand1 = _operand1;
    }
    function getOperand1(){
        return operand1;
    }
    function setOperand2(_operand2){
        operand2 = _operand2;
    }
    function getOperand2(){
        return operand2;
    }
    function setOperation(_operation){
        operation = _operation;
    }
    function getOperation(){
        return operation;
    }
    function clearCalculator(){
        memorys = [0,0,0,0,0,0,0,0,0];
        resut = 0;
        operand1 = 0;
        operand2 = 0;
        operation = '=';
    }
    return {
        soma,
        subtrai,
        multiplica,
        divide,
        resto,
        getMam,
        setMam,
        getResult,
        setReMam,
        setOperand1,
        setOperand2,
        getOperand1,
        getOperand2,
        setOperation,
        getOperation,
        clearCalculator
    }
}

module.exports = {calculadora};
