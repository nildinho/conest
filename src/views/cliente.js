/**
 * Processo de renderização
 * clientes
 */

// Mudar propriedades do documentoao iniciar (xd)
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('inputSearch').focus()
    btnCreate.disabled = true
    btnUpdate.disabled = true
    btnDelete.disabled = true
})

// Alterar comportamento do Enter (relacionar ao botão de bsuca)
document.getElementById('frmCliente').addEventListener('keydown', (event) => {
        if(event.key === 'Enter'){
            event.preventDefault()
            // executar a funçãi associada ao botão buscar
            buscarCliente()
        }
})
 
//CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// captura dos  inputs do formulario (passp 1 - slides)
let formCliente = document.getElementById('frmCliente')
let nomeCliente = document.getElementById('inputName')
let foneCliente = document.getElementById('inputPhone')
let emailCliente = document.getElementById('inputAddress')
// eveto relacionado ao botão de adicionar (passo 1 - slide)
formCliente.addEventListener('submit', async (event) => {
    event.preventDefault()
    console.log(nomeCliente.value, foneCliente.value, emailCliente.value)
    //Empacotar os dados em um objeto e enviar ao main.js
    const cliente = {
        nomeCli: nomeCliente.value,
        foneCli: foneCliente.value,
        emailCli: emailCliente.value
    }
    api.newClient(cliente)
    // limpar os dados from após envio
formCliente.reset()
})
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 
//CRUD Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// array(vetor) usado na renderização dos dados do cliente
let arrayCliente = []
// Função que busca os dados do cliente (envia ao main um pedido pelo nome do cliente)
// Passo - 1 (slide)
function buscarCliente() {
    let nomeCliente = document.getElementById('inputSearch').value.trimStart().trimEnd()
    // Validação (UX)
    if(nomeCliente === "") {
        // Validar campo obrigatorio
        api.infoSearchDialog()
    } else {
        // enviar o pedido de busca junto com o nome do cliente
        api.searchClient(nomeCliente);
    }
    // Foco no campo de busca (UX)
    api.focusSearch((args)=>{
        document.getElementById('inputSearch').focus()
    })
    // Setar o nome do cliente e habilitar o cadastramento
    api.nameClient((args)=>{
    let setarNomeCliente = document.getElementById('inputSearch').value.trim()
    document.getElementById('inputName').value = setarNomeCliente
    document.getElementById('inputSearch').value = ""
    document.getElementById('inputSearch').blur()
    document.getElementById('inputSearch').disabled = true
    document.getElementById('inputName').focus()
    btnRead.disabled = true 
    btnCreate.disabled = false
})
// limpar a caixa de busca e setar o foco
api.clearSearch((args)=> {
    document.getElementById('inputSearch').value = ""
    document.getElementById('inputSearch').focus()
})
}
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 
//CRUD Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 
//CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 
// Reset no formulario
function resetForm() {
    document.getElementById('inputSearch').focus()
    btnCreate.disabled = true
    btnUpdate.disabled = true
    btnDelete.disabled = true
    document.getElementById('inputSearch').disabled = true
    btnRead.disabled = true 
}