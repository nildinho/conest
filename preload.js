const {contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    hello: () => ipcRenderer.send('send-message', "Oi!"),
    openclient: ()=> ipcRenderer.send('open-clientes'),
    opensupp: ()=> ipcRenderer.send('open-fornecedores'),
    openprodut: ()=> ipcRenderer.send('open-produtos'),
    openreports: ()=> ipcRenderer.send('open-relatorios'),
    dbMessage: (message) => ipcRenderer.on('db-message', message),
    newClient: (cliente) => ipcRenderer.send('new-client', cliente),
    novoFornecedores: (fornecedor) => ipcRenderer.send('new-fornecedores',fornecedor),
    infoSearchClient: () => ipcRenderer.send('dialog-infoSearchClient'),
    focusClient: (args) => ipcRenderer.on('focus-searchClient', args),
    searchClient: (nomeCliente) => ipcRenderer.send('search-client', nomeCliente),
    nameClient: (args) => ipcRenderer.on('set-nameClient', args),
    clearSearch: (args) => ipcRenderer.on('clear-search', args),
    dataClient: (dadosCliente) => ipcRenderer.on('data-client', dadosCliente),
    resetForm: (args) => ipcRenderer.on('reset-form', args),
    updateClient: (cliente) => ipcRenderer.send('update-client', cliente),
    deleteClient: (idCli) => ipcRenderer.send('delete-client', idCli),
    infoSearchFornecedor: () => ipcRenderer.send('dialog-infoSearchFornecedor'),
    focusFornecedor: (args) => ipcRenderer.on('focus-searchFornecedor', args),
    searchFornecedor: (nomeFornecedor) => ipcRenderer.send('search-fornecedor', nomeFornecedor),
    nameFornecedor: (args) => ipcRenderer.on('set-nameFornecedor', args),
    dataFornecedor: (dadosFornecedor) => ipcRenderer.on('data-fornecedor', dadosFornecedor),
    updateFornecedor: (fornecedor) => ipcRenderer.send('update-fornecedor', fornecedor),
    deleteFornecedor: (idFor) => ipcRenderer.send('delete-fornecedor', idFor),
    focusClient:(focusCliente) => ipcRenderer.on('focus-client', focusCliente)
})

// status de conexão (verificar se o banco de dados está conectado)

ipcRenderer.send('db-conect')

ipcRenderer.on('db-status', (event, status) => {
    console.log(status)
})

function obterData() {
    const data = new Date()
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric', 
    }
    return data.toLocaleDateString('pt-BR', options)
}

window.addEventListener('DOMContentLoaded', () => {
    const dataAtual = document.getElementById('dataAtual').innerHTML = obterData()
})