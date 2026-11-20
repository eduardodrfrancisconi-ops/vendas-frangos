
import {selecionar, atualizarSelect} from './modules/selecionar.js'
import {alterar, excluir} from './modules/mudar-pedido.js'
import {definirEstoque, atualizarEstoque} from './modules/estoque.js'
import {adicionar} from './modules/pedidos.js'
import { salvarDados, dados } from './modules/dados.js'

//os botoes não funcionam mais no html, tem q ser aq agr . Liga dom ID
document.getElementById('Bdefinir').addEventListener('click', definirEstoque)
document.getElementById('Badicionar').addEventListener('click', adicionar)
document.getElementById('Bselecionar').addEventListener('click', selecionar)
document.getElementById('Balterar').addEventListener('click', alterar)
document.getElementById('Bexcluir').addEventListener('click', excluir)

atualizarSelect() //
atualizarEstoque() //sempre dps q button for ativado

//botão backup =>
document.getElementById('Bbackup').addEventListener('click', () => {
    //1. Transf obj dados em text bnt
    const texto = JSON.stringify(dados, null, 2)
    //2. Cria um arq de verdade na memoria
    const arquivo = new Blob([texto], {type: 'application/json'})
    //3. Cria link temporario p baixar
    const link = document.createElement('a')
    link.href = URL.createObjectURL(arquivo)
    link.download = 'vendas-frangos.json' //nome do arquivo
    link.click() //clica sozinho no link
    })

//recuperar backup
const inputArquivo = document.getElementById('arquivoBackup')
//Quando clicar em restaurar, abre janela p escolher arquivo
document.getElementById('Brestaurar').addEventListener('click', () => {
    inputArquivo.click() //abre file
})

//quando escolher arq, ele lê
inputArquivo.addEventListener('change', () => {
    const arquivo = inputArquivo.files[0]
    const leitor = new FileReader()

    leitor.onload = () => {
        //1. transf em obj 
        const dadosDoBackup = JSON.parse(leitor.result)
        //2. Troca dados atuais pelos do backup
        dados.estoque = dadosDoBackup.estoque
        dados.pedidos = dadosDoBackup.pedidos
        //3. Salva na gaveta e redesenha a tela 
        salvarDados()
        atualizarEstoque()
        atualizarSelect()

        alert('Backup restaurado com sucesso!')
    }
    leitor.readAsText(arquivo) //manda lero arquivo como texto
})