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


    // alteração do icone do status do banco de dados
api.dbMessage((event, message) => {
    console.log(message)
    if(message === "conectado"){
        document.getElementById('status').src = "../public/img/dbon.png"
    } else {
        document.getElementById('status').src = "../public/img/dboff.png"
    }
})
