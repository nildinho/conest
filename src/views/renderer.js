/**
 * Processo de renderização do documento index.html
 */

console.log("Processo de renderização")

console.log(`Electron: ${api.verElectron()}`)
api.hello()

function clientes() {
    api.openclient()
}
function fornecedores() {
    api.opensupp()
}
function produtos() {
    api.openprodut()
}