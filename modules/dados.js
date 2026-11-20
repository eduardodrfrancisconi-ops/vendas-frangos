/*export const dados = {
    clientes: [],
    pedidos: [],
    estoque: 0
}; */

//implementando JSON
const salvo = localStorage.getItem('vendasFrangos')

export const dados = salvo ? JSON.parse(salvo) : { //JSON.parse(text) -> transf text em obj
    estoque: {},
    pedidos: [],
}

export function salvarDados() {
    //JSON.stringify transf o obj em texto p guardar
    localStorage.setItem('vendasFrangos', JSON.stringify(dados)) //guarda (em x, guarda y)
} 