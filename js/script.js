class Registro {

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

    recuperarTodosRegistros() {

        let registros = [];

        let id =localStorage.getItem('id')
        
        for(let i = 1; i <= id; i++){
            let registro = JSON.parse(localStorage.getItem(i));

            if(registro == null){
                continue
            }
            registros.push(registro);
        }

       return registros;
    }

    pesquisar (registro) {
        console.log(registro);
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

    let registro = new Registro (
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

        let formulario = document.getElementById('formulario');
        formulario.reset();
}

function carregaListaRegistro(){

    let registros = []
    registros = bancoDados.recuperarTodosRegistros();

    let listaRegistros = document.getElementById('listaRegistros');

    registros.forEach(function(d) {
        let linha = listaRegistros.insertRow();

        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`;
        linha.insertCell(1).innerHTML = `${d.tipo}`;
        linha.insertCell(2).innerHTML = `${d.descricao}`;
        linha.insertCell(3).innerHTML = `R$${d.valor}`;
    });


}

function filtraRegistro(){
    let ano = document.getElementById('ano').value;
    let mes = document.getElementById('mes').value;
    let dia = document.getElementById('dia').value;
    let tipo = document.getElementById('tipo').value;
    let valor = document.getElementById('valor').value;
    let descricao = document.getElementById('descricao').value;

    let registro = new Registro (ano, mes, dia, tipo, valor, descricao);

    bancoDados.pesquisar(registro);
}