// renderer.js

// Exemplo de como chamar funções da API para abrir diferentes seções
function clientes() {
    api.openclient();
}

function fornecedores() {
    api.opensupp();
}

function produtos() {
    api.openprodut();
}

function relatorios(){
    api.openreports()
}

// Exemplo adicional de como chamar uma função da API
function helloFromApi() {
    api.hello();
}

const inputPhone = document.getElementById('inputPhone');

    // Adiciona um listener para o evento 'input' que é disparado quando o valor do input muda
    inputPhone.addEventListener('input', function() {
        // Remove todos os caracteres não numéricos utilizando uma expressão regular
        this.value = this.value.replace(/\D/g, '');
    });
