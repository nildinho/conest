const {contextBridge, ipcRenderer, ipcMain } = require('electron')

contextBridge.exposeInMainWorld('api', {
    hello: () => ipcRenderer.send('send-message', "Oi!"),
    openclient: ()=> ipcRenderer.send('open-clientes'),
    opensupp: ()=> ipcRenderer.send('open-fornecedores'),
    openprodut: ()=> ipcRenderer.send('open-produtos'),
    openreports: ()=> ipcRenderer.send('open-relatorios'),
    dbMessage: (message) => ipcRenderer.on('db-message', message),
    newClient: (cliente) => ipcRenderer.send('new-client', cliente),
    newFornecedor: (fornecedor) => ipcRenderer.send('novo-fornecedor', fornecedor),
    infoSearchClient: () => ipcRenderer.send('dialog-infoSearchClient'),
    focusClient: (args) => ipcRenderer.on('focus-searchClient', args),
    searchClient: (nomeCliente) => ipcRenderer.send('search-client', nomeCliente),
    nameClient: (args) => ipcRenderer.on('set-nameClient', args),
    clearSearch: (args) => ipcRenderer.on('clear-search', args),
    dataClient: (dadosCliente) => ipcRenderer.on('data-client', dadosCliente),
    resetForm: (args) => ipcRenderer.on('reset-form', args)
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