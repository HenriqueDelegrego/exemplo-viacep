const cepInput = document.getElementById('cep');
const logradouroInput = document.getElementById('logradouro');
const bairroInput = document.getElementById('bairro');
const cidadeInput = document.getElementById('cidade');
const ufInput = document.getElementById('uf');

cepInput.addEventListener('input', () => {
    let cep = cepInput.value;
    cep = removerLetras(cep);

    if (cep.length !== 8) {
        limparCampos();
        return false;
    }
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                throw new Error('CEP não encontrado');
            }
            logradouroInput.value = data.logradouro;
            bairroInput.value = data.bairro;
            cidadeInput.value = data.localidade;
            ufInput.value = data.uf;
        })
        .catch(error => {
            alert('Erro: ' + error.message);
            limparCampos();
        });
});


function removerLetras(cep) {
    return cep.replace(/\D/g, '');
}


function limparCampos() {
    logradouroInput.value = '';
    bairroInput.value = '';
    cidadeInput.value = '';
    ufInput.value = '';
}