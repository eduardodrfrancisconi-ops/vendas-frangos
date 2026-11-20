import {dados, salvarDados} from './dados.js'

export function definirEstoque() {
    let pedidos = document.getElementById('slista')
    if (pedidos.length > 0) {
        window.alert('N é possivel alterar o estoque no momento')
        return
    }
    dados.estoque = Number(document.getElementById('estoque').value)
    if (dados.estoque <= 0) {
        window.alert('defina um estoque válido')
        return
    }
    salvarDados()
    atualizarEstoque()
    
}

export function atualizarEstoque() {
    let res = document.getElementById('res')
    res.innerHTML = `Restam ${dados.estoque} disponíveis`
    }