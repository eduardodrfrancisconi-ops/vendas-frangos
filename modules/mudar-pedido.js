//alterar e excluir 

import {dados, salvarDados} from './dados.js'
import {atualizarEstoque} from './estoque.js'

export function alterar() {
    let pessoas = document.getElementById('slista')
    if (pessoas.value === '') {
        window.alert('n ha pedidos para alterar')
            return
            //escrito novamente pq fiz cagada de não englobar essa condição ás duas funções, selec. e alt.
    }
    let indice = Number(pessoas.value)
    let cliente = dados.pedidos[indice]
    let nome = document.getElementById('nome').value
    let pedido = Number(document.getElementById('pedido').value)
    if (nome.trim() === '' || pedido <= 0 || !Number.isInteger(pedido)) {
        window.alert('Preencha correamente')
        return
        //.trim() -> exclui espaços no começo e fim da string
        //.isInteger() -> se o valor é inteiro ou não
    }
    
    let clienteExiste = dados.pedidos.some(function(c, i) {
        return c.nome === nome && i !== indice
    })
    if (clienteExiste) {
    window.alert('ja há outro cliente com esse nome')
    return
    }  // parte essencial!!
    
    let diferenca = pedido - cliente.pedido
    if (dados.estoque < diferenca) {
        window.alert('Estoque insuficiente')
        return
    }
    dados.estoque = dados.estoque - diferenca
    cliente.nome = nome
    cliente.pedido = pedido
    pessoas.options[indice].text = `${nome} comprou ${pedido} frango(s)`
    //a falta o 's' no fim de 'option' custou rim. 'options' diz respeito a toddos os options dentro do select, sendo q a option exata é encontrada pelo indice.

    //pessoas.options[x] ou pessoas.options[pessoas.selectedIndex] serve p RECUPERAR o option 'item' criado em guardado no DOM pessoas(select)
    salvarDados()
    atualizarEstoque()
}

export function excluir() {
    let pessoas = document.getElementById('slista')
    if (pessoas.value === '' ) {
        window.alert('não há pessoas para excluir')
        return
    }

    let indice = Number(pessoas.value)
    let cliente = dados.pedidos[indice]
    dados.estoque = dados.estoque + cliente.pedido
    dados.pedidos.splice(indice, 1)
    //splice ( onde começar, QUANTOS apagar)
    pessoas.remove(indice) //  tira do select

    for (let i = 0; i < pessoas.options.length; i ++) {
        pessoas.options[i].value = i 
    } //i vai rodar infinitamente. quando pessoas.options.length > i, option recebe i. Quando acabar uma rodada, i ++
    salvarDados()
    atualizarEstoque()
    document.getElementById('nome').value = ''
    document.getElementById('pedido').value = ''
    document.getElementById('nome').focus()
}