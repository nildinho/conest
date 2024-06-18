/**
 *  Módulo de conexão com o banco de dados
 *  Uso do Framework mongoose (npm i mongoose)
 */

// Importar a biblioteca
const mongoose = require('mongoose')

// definir um banco de dados 
let url = "mongodb://admin:123%40senac@10.26.45.215:27017/"

// conectar
const conectar = async () => {
    try {
        await mongoose.connect(url)
        console.log("MongoDB conectado!")
    } catch (error) {
        console.log(`Problema detectado: ${error.message}`)
    }
}

// desconectar
const desconectar = async () => {
    try {
        await mongoose.disconnect(url)
        console.log("MongoDB desconectado!")
    } catch (error) {
        console.log(`Problema detectado: ${error.message}`)
    }
}

// exportar para o main os métodos conectar e desconectar
module.exports = {conectar,desconectar}