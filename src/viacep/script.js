// Seleciona os campos do formulário pelo ID
const cepInput = document.getElementById('cep');
const logradouroInput = document.getElementById('logradouro');
const bairroInput = document.getElementById('bairro');
const cidadeInput = document.getElementById('cidade');
const ufInput = document.getElementById('uf');

// Adiciona um event listener para o campo de CEP, disparando a cada alteração (input)
cepInput.addEventListener('input', async (e) => {
    e.preventDefault();

    cepInput.value = cepInput.value.replace(/\D/g, ''); // Remove tudo que não for dígito

    const cep = cepInput.value;

    if (cep.length !== 8) {
        limparCampos();
        return;
    }

    try {
        const endereco = await obterEndereco(cep);

        logradouroInput.value = endereco.logradouro;
        bairroInput.value = endereco.bairro;
        cidadeInput.value = endereco.localidade;
        ufInput.value = endereco.uf;
    }
    catch (error) {
        alert('Erro: ' + error.message);
    }

});


// Função para limpar os campos menos o CEP do formulário
function limparCampos() {
    logradouroInput.value = '';
    bairroInput.value = '';
    cidadeInput.value = '';
    ufInput.value = '';
}
