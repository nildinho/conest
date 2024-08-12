const { ipcMain } = require('electron')
const { app, BrowserWindow, Menu, dialog } = require('electron/main')
const path = require('node:path')

// importar o módulo de conexão
const { dbStatus, desconectar } = require('./database.js')
// status de conexão do banco de dados (No MongoDB é mais eficiente manter uma única conexão aberta durante todo o tempo de vida do aplicativo e usá-la conforme necessário. Fechar e reabrir a conexão frequentemente pode aumentar a sobrecarga e causar problemas de desempenho)
// a função dbStatus garante que a conexão com o banco de dados seja estabelecida apenas uma vez e reutilizada.
// a variável abaixo é usada para garantir que o sistema inicie com o banco de dados desconectado
let dbCon = null


// Importação do Schema (model) das coleções ("tabelas")
const clienteModel = require('./src/models/Cliente.js')
const fornecedorModel = require('./src/models/Fornecedor.js')

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
            resizable: false,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
            }
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

    ipcMain.on('db-conect', async (event, message) => {
        dbCon = await dbStatus()
        event.reply('db-message', "conectado")
    })

    // desconectar do banco ao encerrar a aplicação
    app.on('before-quit', async () => {
        await desconectar(dbCon)
    })

    createWindow()

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

//CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
ipcMain.on('new-client', async (event, cliente) => {
    console.log(cliente) //Teste do passo 2 - slide
    // passo 3 (slide): cadastrar o cliente no MongoDB
    try {
        const novoCliente = new clienteModel({
            nomeCliente: cliente.nomeCli,
            foneCliente: cliente.foneCli,
            emailCliente: cliente.emailCli
        })
        await novoCliente.save()//save() - mongoose
        dialog.showMessageBox({
            type: 'info',
            title: 'aviso',
            message: "Cliente cadastrado com sucesso!",
            buttons:['OK']
        })
        } catch (error) {
        console.log(error)
    }
}),


// fornecedor
ipcMain.on('novo-fornecedor', async (event, fornecedor) => {
    console.log(fornecedor) //Teste do passo 2 - slide
    // passo 3 (slide): cadastrar o cliente no MongoDB
    try {
        const novoFornecedor = new fornecedorModel({
            nomeFornecedor: fornecedor.nomeFor,
            foneFornecedor: fornecedor.foneFor,
            emailFornecedor: fornecedor.emailFor,
            cnpjFornecedor: fornecedor.cnpjFor,
            cepFornecedor: fornecedor.cepFor,
            ruaFornecedor: fornecedor.ruaFor,
            numeroFornecedor: fornecedor.numeroFor,
            complementoFornecedor: fornecedor.complementoFor,
            bairroFornecedor: fornecedor.bairroFor,
            cidadeFornecedor: fornecedor.cidadeFor,
            ufFornecedor: fornecedor.ufFor
        })
        await novoFornecedor.save()//save() - mongoose
        dialog.showMessageBox({
            type: 'info',
            title: 'aviso',
            message: "Fornecedor cadastrado com sucesso!",
            buttons:['OK']
        })
        } catch (error) {
        console.log(error)
    }
})

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//CRUD Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Aviso (Busca: preenchimento de campo obrigatório)
// CRud Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Aviso (Busca: Preenchimento de campo obrigatório)
ipcMain.on('search-client', async (event, nomeCliente) => {
    console.log(nomeCliente) //receber pedido de busca do form
    try {
        const dadosCliente = await clienteModel.find({ nomeCliente: new RegExp(nomeCliente, 'i') }) // buscar no banco 
        console.log(dadosCliente)
        //UX
        if (dadosCliente.length === 0) {
            dialog.showMessageBox({
                type: 'warning',
                title: 'Clientes',
                message: 'Cliente não cadastrado.\nDeseja cadastrar este cliente?',
                defaultId: 0,
                buttons: ['Sim', 'Nâo']
            }).then((result) => {
                if (result.response === 0) {
                    event.reply('set-nameClient')
                } else {
                    event.reply('clear-search')
                }
            })
        } else {
            event.reply('data-client', JSON.stringify(dadosCliente)) //envio dos dados do cliente ao renderizador (cliente.js)
        }

    } catch (error) {
        console.log(error)
    }
})
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//CRUD Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


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

