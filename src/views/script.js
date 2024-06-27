//Determina valor máximo de caracteres para number
const inputCnpj = document.getElementById('inputCnpj')
inputCnpj.addEventListener('input', () => {
    if (inputCnpj.value.length > 15) {
        inputCnpj.value = inputCnpj.value.slice(0, 15)
    }
})

const inputPhone = document.getElementById('inputPhone')
inputPhone.addEventListener('input', () => {
    if (inputPhone.value.length > 15) {
        inputPhone.value = inputPhone.value.slice(0, 15)
    }
})