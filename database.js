/**
 *  Módulo de conexão com o banco de dados
 *  Uso do Framework mongoose (npm i mongoose)
 */

// Importar a biblioteca
const mongoose = require('mongoose')

// definir um banco de dados 
let url = "mongodb+srv://admin:senac123@clusterconest.bslkffo.mongodb.net/flamengo"

let isConnected = false

// status da conexão
const dbStatus = async () => {
    if (isConnected === false) {
        await conectar()
    }
}

// conectar
const conectar = async () => {
    // se não estiver conectado
    if (isConnected === false) {
        try {
            await mongoose.connect(url)
            isConnected = true
            console.log("MongoDB conectado")
            return (isConnected)
        } catch (error) {
            console.log(`Problema detectado: ${error}`)
        }
    }
}

// desconectar
const desconectar = async () => {
    if (isConnected === true) {
        try {
            await mongoose.disconnect(url)
            isConnected = false            
            console.log("MongoDB desconectado")
        } catch (error) {
            console.log(`Problema detectado: ${error}`)
        }
    }
}

// exportar para o main os métodos dbStatus e desconectar
module.exports = { dbStatus, desconectar }