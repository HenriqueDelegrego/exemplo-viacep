const cepInput = document.getElementById('cep');
const logradouroInput = document.getElementById('logradouro');
const bairroInput = document.getElementById('bairro');
const cidadeInput = document.getElementById('cidade');
const ufInput = document.getElementById('uf');
const errorMessage = document.getElementById('error-message');

cepInput.addEventListener('blur', () => {
    let cep = cepInput.value.replace(/\D/g, '');

    if (cep.length !== 8) {
        showError('CEP deve conter 8 dígitos numéricos.');
        clearFields();
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na consulta ao ViaCEP.');
            }
            return response.json();
        })
        .then(data => {
            if (data.erro) {
                showError('CEP não encontrado.');
                clearFields();
                return;
            }

            errorMessage.style.display = 'none';
            logradouroInput.value = data.logradouro || '';
            bairroInput.value = data.bairro || '';
            cidadeInput.value = data.localidade || '';
            ufInput.value = data.uf || '';
        })
        .catch(error => {
            showError('Erro ao consultar o CEP. Tente novamente.');
            clearFields();
            console.error(error);
        });
});

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

function clearFields() {
    logradouroInput.value = '';
    bairroInput.value = '';
    cidadeInput.value = '';
    ufInput.value = '';
}