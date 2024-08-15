/**
 * Processo de renderização
 * clientes
 */
 
// mudar propriedades do documento ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("inputSearch").focus() //foco ao iniciar
    btnCreate.disabled = true
    btnUpdate.disabled = true
    btnDelete.disabled = true
})


// Função nomeada para manipular o evento de tecla Enter
function teclaEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // desativar o comportamento padrão
        buscarFornecedor(); // usar o Enter para executar uma função
    }
}

// Adiciona o manipulador de evento para tecla Enter
document.getElementById("frmFornecedor").addEventListener("keydown", teclaEnter);

// Função para remover o manipulador de evento
function restaurarTeclaEnter() {
    document.getElementById("frmFornecedor").removeEventListener("keydown", teclaEnter);
}

 
//CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// captura dos  inputs do formulario (passp 1 - slides)
let idFornecedor = document.getElementById('inputIdFornecedor')
let formFornecedor = document.getElementById('frmFornecedor')
let nomeFornecedor = document.getElementById('inputNameFornecedor')
let foneFornecedor = document.getElementById('inputPhoneFornecedor')
let emailFornecedor = document.getElementById('inputEmailFornecedor')
let cnpjFornecedor = document.getElementById('inputCnpj')
let cepFornecedor = document.getElementById('inputCep')
let ruaFornecedor = document.getElementById('inputLogradouro')
let numeroFornecedor = document.getElementById('inputNumero')
let complementoFornecedor = document.getElementById('inputComplemento')
let bairroFornecedor = document.getElementById('inputBairro')
let cidadeFornecedor = document.getElementById('inputCidade')
let ufFornecedor = document.getElementById('inputUf')
// eveto relacionado ao botão de adicionar (passo 1 - slide)
formFornecedor.addEventListener('submit', async (event) => {
    event.preventDefault()
    console.log(idFornecedor.value, nomeFornecedor.value, foneFornecedor.value, emailFornecedor.value, cnpjFornecedor.value, cepFornecedor.value,
        ruaFornecedor.value, numeroFornecedor.value, complementoFornecedor.value, bairroFornecedor.value, cidadeFornecedor.value, ufFornecedor.value)
    //Empacotar os dados em um objeto e enviar ao main.js
    const fornecedor = {
        idFor: idFornecedor.value,
        nomeFor: nomeFornecedor.value,
        foneFor: foneFornecedor.value,
        emailFor: emailFornecedor.value,
        cnpjFor: cnpjFornecedor.value,
        cepFor: cepFornecedor.value,
        ruaFor: ruaFornecedor.value,
        numeroFor: numeroFornecedor.value,
        complementoFor: complementoFornecedor.value,
        bairroFor: bairroFornecedor.value,
        cidadeFor: cidadeFornecedor.value,
        ufFor: ufFornecedor.value

    }
    api.novoFornecedores(fornecedor)
    // limpar os dados from após envio
formFornecedor.reset()
})
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 
// CRud Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// vetor usado na renderização dos dados
let arrayFornecedor = []
// buscar o cliente pelo nome
function buscarFornecedor() {
    let nomeFornecedor = document.getElementById('inputSearch').value
    // validação de campo obrigatório
    if (nomeFornecedor === "") {
        api.infoSearchFornecedor() //aviso e UX
    } else {
        api.searchFornecedor(nomeFornecedor) //busca pelo nome
    }
}
// Foco no campo de busca - UX
api.focusFornecedor(() => {
    document.getElementById('inputSearch').focus()
})
// Setar Nome do cliente - UX
api.nameFornecedor(() => {
    // Restaurar o comportamento padrão da tecla Enter
    //restaurarTeclaEnter()
    let setarNomeFornecedor = document.getElementById('inputSearch').value
    document.getElementById('inputNameFornecedor').value = setarNomeFornecedor
    document.getElementById('inputSearch').value = ""
    document.getElementById('inputSearch').disabled = true
    document.getElementById('inputSearch').blur() //remover o foco
    btnRead.disabled = true
    btnCreate.disabled = false
})
// Limpar busca - UX
api.clearSearch(() => {
    document.getElementById('inputSearch').value = ""
    document.getElementById('inputSearch').focus()
})
// Receber do main.js os dados do cliente
api.dataFornecedor((event, dadosFornecedor) => {
    arrayFornecedor = JSON.parse(dadosFornecedor)
    console.log(arrayFornecedor)
    //percorrer o array e setar os campos do form
    arrayFornecedor.forEach((c) => {
        document.getElementById('inputIdFornecedor').value = c._id
        document.getElementById('inputNameFornecedor').value = c.nomeFornecedor
        document.getElementById('inputPhoneFornecedor').value = c.foneFornecedor
        document.getElementById('inputEmailFornecedor').value = c.emailFornecedor
        document.getElementById('inputCnpj').value = c.cnpjFornecedor
        document.getElementById('inputLogradouro').value = c.ruaFornecedor
        document.getElementById('inputNumero').value = c.numeroFornecedor
        document.getElementById('inputComplemento').value = c.complementoFornecedor
        document.getElementById('inputBairro').value = c.bairroFornecedor
        document.getElementById('inputCidade').value = c.cidadeFornecedor
        document.getElementById('inputUf').value = c.ufFornecedor
        //limpar caixa de busca
        document.getElementById("inputSearch").value = ""
        //remover o foco e desativar a caixa de busca
        document.getElementById('inputSearch').disabled = true
        document.getElementById("inputSearch").blur()
        //desativar os botão adicionar e buscar
        document.getElementById("btnCreate").disabled = true
        document.getElementById("btnRead").disabled = true
        // ativar os botões update e delete
        document.getElementById("btnUpdate").disabled = false
        document.getElementById("btnDelete").disabled = false
    })
})


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 
//CRUD Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function editarFornecedor() {
    //Passo 1 do slide
    const fornecedor = {
        idFor: idFornecedor.value,
        nomeFor: nomeFornecedor.value,
        foneFor: foneFornecedor.value,
        emailFor: emailFornecedor.value,
        cnpjFor: cnpjFornecedor.value,
        cepFor: cepFornecedor.value,
        ruaFor: ruaFornecedor.value,
        numeroFor: numeroFornecedor.value,
        complementoFor: complementoFornecedor.value,
        bairroFor: bairroFornecedor.value,
        cidadeFor: cidadeFornecedor.value,
        ufFor: ufFornecedor.value
    }
    console.log(fornecedor) // teste do passo 1
    //Passo 2: Enviar o objeto cliente ao main.js
    api.updateFornecedor(fornecedor)
}
// CRUD delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function excluirFornecedor() {
    let idFor = idFornecedor.value // Passo 1 (obter o id do cliente)
    console.log(idFor) // teste do passo 1
    api.deleteFornecedor(idFor) // Passo 2 - enviar o id do cliente ao main
}

api.resetForm((args) => {
    resetForm()   
})

function resetForm() {
    document.getElementById('inputSearch').disabled = false    
    document.getElementById('inputSearch').focus()    
    btnCreate.disabled = true
    btnRead.disabled = false
    btnUpdate.disabled = true
    btnDelete.disabled = true
    //document.getElementById("frmClient").addEventListener("keydown", teclaEnter)  
}

 
