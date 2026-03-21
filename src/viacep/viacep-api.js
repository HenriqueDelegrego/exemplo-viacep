// Função assíncrona que realiza uma requisição HTTP usando fetch.
// Retorna uma Promise que resolve para um objeto com os dados do endereço obtidos da API
async function fetchEndereco(cep) {

    // Faz a requisição para a API ViaCEP usando o valor do CEP
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

    // Verifica se houve erro HTTP na requisição (ex: 404, 500)
    if (!response.ok) {
        throw new Error("Falha ao buscar endereço");
    }

    // Converte o corpo da resposta para JSON e retorna um objeto JavaScript
    const data = await response.json();

    // Lança um erro caso a API retornar o atributo erro (algo específico da ViaCEP)
    if (data.erro) {
        throw new Error('CEP não encontrado');
    }

    // Retorna os dados do endereço obtidos da API
    return data;
}
