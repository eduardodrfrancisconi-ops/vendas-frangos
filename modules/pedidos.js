import {dados, salvarDados} from './dados.js'
import {atualizarEstoque} from './estoque.js'

export function adicionar() {
    let pessoas = document.getElementById('slista') //pq foi colocado ca DENTRO DA FUNCTION??
    let nome = document.getElementById('nome').value
    let pedido = Number(document.getElementById('pedido').value)

    if (nome.length == ' ' || pedido < 1 ) {
        window.alert('dê nome ao cliente e seu pedido')
        return;
    }
    if (pedido > dados.estoque) {
        window.alert('Estoque insuficiente')
        return;
    }
    let clienteExiste = dados.pedidos.some(function(cliente) {
        return cliente.nome === nome
    })

    if (clienteExiste) {
        window.alert('O cliente já está na lista!')
        return;
    } else {
        let cliente = {
            nome : nome,
            pedido : pedido
        }
        dados.pedidos.push(cliente)
        let item = document.createElement('option')
        item.value = dados.pedidos.length -1 
        // serve p identificar o indice numerico de certo objt (cliente)
        item.text = `${nome} comprou ${pedido} frangos`
        pessoas.appendChild(item)
        dados.estoque = dados.estoque - cliente.pedido
        salvarDados()
        atualizarEstoque()
        /*
        document.getElementById('nome') = ''
        document.getElementById('pedido') = ''
        document.getElementById('nome').focus()
        */
        //ultimas 3 linhas n presta
    }
}