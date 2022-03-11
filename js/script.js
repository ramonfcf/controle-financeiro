class Despesa {

    constructor(ano, mes, dia, tipo, valor, descricao) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.valor = valor
        this.descricao = descricao
    }

    validarDados() {
        for(let i in this) {
            if(this[i] == undefined || this[i] == '' || this[i] == null)
            return false;
        }

        return true;
    }
}

class BancoDados {

    constructor() {
        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravarLocalStorage(registro){
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(registro))

        localStorage.setItem('id', id)
    }
}

let bancoDados = new BancoDados()

function cadastrarRegistro() {

    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let dia = document.getElementById('dia');
    let tipo = document.getElementById('tipo');
    let valor = document.getElementById('valor');
    let descricao = document.getElementById('descricao');

    let registro = new Despesa(
        ano.value, 
        mes.value, 
        dia.value, 
        tipo.value,
        valor.value,
        descricao.value,
    )
    
    if(registro.validarDados()){
        console.log('Dados Válidos')
    } else {
        console.log('dados inválidos')
    }
    bancoDados.gravarLocalStorage(registro);
}

function carregaListaRegistro(){
    
}