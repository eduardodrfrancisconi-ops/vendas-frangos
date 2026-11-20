//selecionar

import {dados} from './dados.js'

export function selecionar() {
    let pessoas = document.getElementById('slista') //tem q pegar toda vez, 
    if (pessoas.value === '') {
        window.alert('não há pedidos ainda')
        return// p prevenir, n executar a função se n houver ninguém p selecionar
    }
    let indice = Number(pessoas.value)
    let cliente = dados.pedidos[indice]
    document.getElementById('nome').value = cliente.nome
    document.getElementById('pedido').value = cliente.pedido
}

//reconstruir select dps de ctrl + R
export function atualizarSelect() {
    let pessoas = document.getElementById('slista')
    
    //percorrer pedidos e criar options
    dados.pedidos.forEach((pedido, indice) => {
        const option = document.createElement('option')
        option.value = indice
        option.textContent = `${pedido.nome} comprou ${pedido.pedido}`
        pessoas.appendChild(option)
    })
}