const cepInput = document.getElementById('cep');
const logradouroInput = document.getElementById('logradouro');
const bairroInput = document.getElementById('bairro');
const cidadeInput = document.getElementById('cidade');
const ufInput = document.getElementById('uf');

cepInput.addEventListener('blur', () => {
    let cep = cepInput.value;
    cep = removerLetras(cep);

    if (cep.length !== 8) {
        alert('CEP inválido. Deve conter 8 dígitos.');
        limparCampos();
        return false;
    }
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            logradouroInput.value = data.logradouro;
            bairroInput.value = data.bairro;
            cidadeInput.value = data.localidade;
            ufInput.value = data.uf;
        });
});


function removerLetras(cep) {
    return cep.replace(/\D/g, '');
}


function limparCampos() {
    cepInput.value = '';
    logradouroInput.value = '';
    bairroInput.value = '';
    cidadeInput.value = '';
    ufInput.value = '';
}