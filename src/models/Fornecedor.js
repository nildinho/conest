const {model, Schema} = require('mongoose')

const fornecedorSchema = new Schema({
    nomeFornecedor: {
        type: String
    },
    foneFornecedor: {
        type: String
    },
    emailFornecedor: {
        type: String
    },
    cnpjFornecedor: {
        type: String
    },
    cepFornecedor: {
        type: String
    },
    ruaFornecedor: {
        type: String
    },
    numeroFornecedor: {
        type: String
    },
    complementoFornecedor: {
        type: String
    },
    bairroFornecedor: {
        type: String
    },
    cidadeFornecedor: {
        type: String
    },
    ufFornecedor: {
        type: String
    }
})

module.exports = model('Fornecedor',fornecedorSchema)