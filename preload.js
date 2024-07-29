const {contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    hello: () => ipcRenderer.send('send-message', "Oi!"),
    openclient: ()=> ipcRenderer.send('open-clientes'),
    opensupp: ()=> ipcRenderer.send('open-fornecedores'),
    openprodut: ()=> ipcRenderer.send('open-produtos'),
    openreports: ()=> ipcRenderer.send('open-relatorios')
})

// status de conexão (verificar se o banco de dados está conectado)

ipcRenderer.send('send-message', "Status do banco de dados:")

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