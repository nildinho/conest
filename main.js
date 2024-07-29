const { ipcMain } = require('electron')
const { app, BrowserWindow, Menu } = require('electron/main')
const path = require('node:path')

// importar o módulo de conexão
const { conectar, desconectar } = require('./database.js')

// Janela principal (definir o objeto win como variável pública)
let win
const createWindow = () => {
    win = new BrowserWindow({
        width: 1280,
        height: 720,
        icon: './src/public/img/estoquesobre.png',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            resizable: false
        }
    })

    Menu.setApplicationMenu(Menu.buildFromTemplate(menu))

    win.loadFile('./src/views/index.html')
}

let about

const aboutWindow = () => {
    const father = BrowserWindow.getFocusedWindow()
    if (!about) {
        about = new BrowserWindow({
            width: 1280, 
            height: 720, 
            icon: './src/public/img/ajuda.png',
            autoHideMenuBar: true,
            modal: true,
            parent: father, 
            resizable: false
        })
    }
    about.loadFile('./src/views/sobre.html')
    about.on('closed', () => {
        about = null
    })
}

let client

const clientWindow = () => {
    const father = BrowserWindow.getFocusedWindow()
    if (!client) {
        client = new BrowserWindow({
            width: 1280,
            height: 720,
            icon: './src/public/img/cliente.png',
            autoHideMenuBar: true,
            modal: true,
            parent: father,
            resizable: false
        })
    }
    client.loadFile('./src/views/clientes.html')
    client.on('closed', () => {
        client = null
    })
}

let supp

const suppWindow = () => {
    const father = BrowserWindow.getFocusedWindow()
    if (!supp) {
        supp = new BrowserWindow({
            width: 1280,
            height: 720,
            icon: './src/public/img/fornecedores.png',
            autoHideMenuBar: true,
            modal: true,
            parent: father,
            resizable: false
        })
    }
    supp.loadFile('./src/views/fornecedores.html')
    supp.on('closed', () => {
        supp = null
    })
}

let produt

const produtWindow = () => {
    const father = BrowserWindow.getFocusedWindow()
    if (!produt) {
        produt = new BrowserWindow({
            width: 1280,
            height: 720,
            icon: './src/public/img/produto.png',
            autoHideMenuBar: true,
            modal: true,
            parent: father,
            resizable: false
        })
    }
    produt.loadFile('./src/views/produtos.html')
    produt.on('closed', () => {
        produt = null
    })
}

let reports

const reportsWindow = () => {
    const father = BrowserWindow.getFocusedWindow()
    if (!reports) {
        reports = new BrowserWindow({
            width: 1280,
            height: 720,
            icon: './src/public/img/relatorios.png',
            autoHideMenuBar: true,
            modal: true,
            parent: father,
            resizable: false
        })
    }
    reports.loadFile('./src/views/relatorios.html')
    reports.on('closed', () => {
        reports = null
    })
}

// iniciar a aplicação
app.whenReady().then(() => {

    // status de conexão com o banco de dados
    ipcMain.on('send-message', (event, message) => {
        console.log(`<<< ${message}`)
        statusConexao()
    })

    // desconectar do banco ao encerrar a janela
    app.on('before-quit', async () => {
        await desconectar()
    })

    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

const menu = [
    {
        label: 'Arquivo',
        submenu: [
            {
                label: 'Clientes',
                click: () => clientWindow()
            },
            {
                label: 'Fornecedores',
                click: () => suppWindow()
            },
            {
                label: 'Produtos',
                click: () => produtWindow()
            },
            {
                label: 'Sair',
                click: () => app.quit(),
                accelerator: 'Alt+F4'
            }
        ]
    },
    {
        label: 'Exibir',
        submenu: [
            {
                label: 'Recarregar',
                role: 'reload'
            },
            {
                label: 'Ferramentas do desenvolvedor',
                role: 'toggleDevTools'
            },
            {
                type: 'separator'
            },
            {
                label: 'Aplicar zoom',
                role: 'zoomIn'
            },
            {
                label: 'Reduzir',
                role: 'zoomOut'
            },
            {
                label: 'Restaurar o zoom padrão',
                role: 'resetZoom'
            }
        ]
    },

    {
        label: 'Relatorios',
        submenu: [
            {
                label: 'Relatorios',
                click: () => relatoriosWindow()
            }
        ]
    },
    {
        label: 'Ajuda',
        submenu: [
            {
                label: 'Sobre',
                click: () => aboutWindow()
            }
        ]
    }
]


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

//-----------------------------------------------
// Função que verifica o status da conexão
const statusConexao = async () => {
    try {
        await conectar()
        win.webContents.send('db-status', "Banco de dados conectado")
    } catch (error) {
        win.webContents.send('db-status', `Erro de conexão: ${error.message}`)
    }
}
ipcMain.on('open-clientes', () => {
    clientWindow()
})
ipcMain.on('open-fornecedores', () => {
    suppWindow()
})
ipcMain.on('open-produtos', () => {
    produtWindow()
})
ipcMain.on('open-relatorios', () => {
    reportsWindow()
})