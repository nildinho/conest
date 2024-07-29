//Determina valor máximo de caracteres para number
const inputCnpj = document.getElementById('inputCnpj')
inputCnpj.addEventListener('input', () => {
    if (inputCnpj.value.length > 15) {
        inputCnpj.value = inputCnpj.value.slice(0, 15)
    }
})

const inputPhone = document.getElementById('inputPhone')
inputPhone.addEventListener('input', () => {
    if (inputPhone.value.length > 15) {
        inputPhone.value = inputPhone.value.slice(0, 15)
    }
})

// Seleciona os elementos do formulário
const cepInput = document.getElementById('inputCep');
const logradouroInput = document.getElementById('logradouro');
const numeroInput = document.getElementById('numero');
const complementoInput = document.getElementById('complemento');
const bairroInput = document.getElementById('bairro');
const localidadeInput = document.getElementById('localidade');
const ufInput = document.getElementById('uf');
const BotaoBuscar = document.getElementById('btnSearchCep');
 
// Adiciona um evento de click ao botão "Buscar"
BotaoBuscar.addEventListener('click', buscarEndereco);
 
// Função que busca as informações de endereço
function buscarEndereco() {
  // Pega o valor do CEP digitado
  const cep = cepInput.value;
 
  // Faz a requisição à API dos Correios ViaCEP
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response.json())
    .then(data => {
      // Preenche os campos do formulário com as informações retornadas
      logradouroInput.value = data.logradouro;
      complementoInput.value = data.complemento;
      bairroInput.value = data.bairro;
      localidadeInput.value = data.localidade;
      ufInput.value = data.uf;
    })
    .catch(error => console.error('Erro ao buscar endereço:', error));
}
