/**
 * Processo de renderização
 * clientes
 */
 
//CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// captura dos  inputs do formulario (passp 1 - slides)
let formFornecedor = document.getElementById('frmFornecedor')
let nomeFornecedor = document.getElementById('inputNomeFornecedor')
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
    console.log(nomeFornecedor.value, foneFornecedor.value, emailFornecedor.value,cnpjFornecedor.value, cepFornecedor.value,
        ruaFornecedor.value, numeroFornecedor.value, complementoFornecedor.value, bairroFornecedor.value, cidadeFornecedor.value, ufFornecedor.value)
    //Empacotar os dados em um objeto e enviar ao main.js
    const fornecedor = {
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
    api.newFornecedor(fornecedor)
    // limpar os dados from após envio
formFornecedor.reset()
})
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 
//CRUD Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 
//CRUD Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 
//CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 