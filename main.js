const { ipcMain } = require('electron')
const { app, BrowserWindow, Menu, shell } = require('electron/main')
const path = require('node:path')

// Importar o módulo de conexão
const { conectar, desconectar } = require('./database.js')


// Janela Principal (definir o objeto win como variavel publica)
let win
const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: './src/public/img/estoquesobre.png',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    })
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
    win.loadFile('./src/views/index.html')
}

//janela sobre
let about //Resolver bug de abertura de várias janelas

const aboutWindow = () => {
    // Se a janela about n estiver aberta (bug 1) abrir
    if (!about) {
        about = new BrowserWindow({
            width: 560, //largura
            height: 400, //altura
            resizable: false, //evitar o redimensionamento
            //titleBarStyle: 'hidden', //esconder barra de título e menu
            autoHideMenuBar: true, //esconder o menu
            icon: './src/public/img/ajuda.png'
        })
    }
    // nativeTheme.themeSource = 'dark'
    about.loadFile('./src/views/sobre.html')

    // bug 2 (reabrir a janela ao se estiver fechada)
    about.on('closed', () => {
        about = null
    })
}
// janela fornecedor
let supp //Resolver bug de abertura de várias janelas

const suppWindow = () => {
    // Se a janela about n estiver aberta (bug 1) abrir
    if (!supp) {
        supp = new BrowserWindow({
            width: 560, //largura
            height: 400, //altura
            resizable: false, //evitar o redimensionamento
            //titleBarStyle: 'hidden', //esconder barra de título e menu
            autoHideMenuBar: true, //esconder o menu
            icon: './src/public/img/ajuda.png'
        })
    }
    // nativeTheme.themeSource = 'dark'
    supp.loadFile('./src/views/fornecedores.html')

    // bug 2 (reabrir a janela ao se estiver fechada)
    supp.on('closed', () => {
        supp = null
    })
}
// janela clientes 
let client //Resolver bug de abertura de várias janelas

const clientWindow = () => {
    // Se a janela about n estiver aberta (bug 1) abrir
    if (!client) {
        client = new BrowserWindow({
            width: 560, //largura
            height: 400, //altura
            resizable: false, //evitar o redimensionamento
            //titleBarStyle: 'hidden', //esconder barra de título e menu
            autoHideMenuBar: true, //esconder o menu
            icon: './src/public/img/ajuda.png'
        })
    }
    // nativeTheme.themeSource = 'dark'
    client.loadFile('./src/views/clientes.html')

    // bug 2 (reabrir a janela ao se estiver fechada)
    client.on('closed', () => {
        client = null
    })
}

// janela produtos
let produt //Resolver bug de abertura de várias janelas

const produtWindow = () => {
    // Se a janela about n estiver aberta (bug 1) abrir
    if (!produt) {
        produt = new BrowserWindow({
            width: 560, //largura
            height: 400, //altura
            resizable: false, //evitar o redimensionamento
            //titleBarStyle: 'hidden', //esconder barra de título e menu
            autoHideMenuBar: true, //esconder o menu
            icon: './src/public/img/ajuda.png'
        })
    }
    // nativeTheme.themeSource = 'dark'
    produt.loadFile('./src/views/produtos.html')

    // bug 2 (reabrir a janela ao se estiver fechada)
    produt.on('closed', () => {
        produt = null
    })
}
// Iniciar a aplicação
app.whenReady().then(() => {
    createWindow()

    //   status de conexão com o banco de dados
    ipcMain.on('send-message', (event, message) => {
        console.log(`<<< ${message} >>>`)
        statusConexao()
    })

    // Desconectar do banco ao encerrar a janela
    app.on('before-quit', async () => {
        await desconectar()
    })

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// Template do menu personalizado

const template = [
    {
        label: 'Arquivo',
        submenu: [
            {
                label: 'Sair',
                click: () => app.quit(),
                accelerator: 'Alt+F4'
            },
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
            }
        ]
    },

    {
        label: 'Ajuda',
        submenu: [
            {
                label: 'Sobre',
                click: () => aboutWindow(),
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
                label: 'Ferramentas',
                role: 'toggleDevTools'
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
    }
]

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})


//-------------------------------------------------------------
// Função para verificar status de conexão com o banco de dados
const statusConexao = async () => {
    try {
        await conectar()
        win.webContents.send('db-status', "Banco de dados conectado.")
    } catch (error) {
        win.webContents.send('db-status', `Erro de conexão: ${error}`)
    }
}
