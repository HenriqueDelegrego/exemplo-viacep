// Seleciona os campos do formulário pelo ID
const cepInput = document.getElementById('cep');
const logradouroInput = document.getElementById('logradouro');
const bairroInput = document.getElementById('bairro');
const cidadeInput = document.getElementById('cidade');
const ufInput = document.getElementById('uf');

// Adiciona um event listener para o campo de CEP, disparando a cada alteração (input)
cepInput.addEventListener('input', async (e) => {
    e.preventDefault();

    cepInput.value = cepInput.value.replace(/\D/g, ''); // Remove tudo que não for números

    const cep = cepInput.value;

    if (cep.length !== 8) {
        limparCampos();
        return;
    }

    await buscarEndereco(cep);

});

async function buscarEndereco(cep) {
    try {
        const endereco = await obterEndereco(cep);
        preencherCampos(endereco);
    } catch (error) {
        alert('Erro: ' + error.message);
    }
}

function preencherCampos(endereco) {
    logradouroInput.value = endereco.logradouro;
    bairroInput.value = endereco.bairro;
    cidadeInput.value = endereco.localidade;
    ufInput.value = endereco.uf;
}

function limparCampos() {
    logradouroInput.value = '';
    bairroInput.value = '';
    cidadeInput.value = '';
    ufInput.value = '';
}
