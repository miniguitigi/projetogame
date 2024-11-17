var database = require("../database/config")

function entrar(user, senha) {
    var instrucaoSql = `
        SELECT userC, senha 
        FROM cadastro 
        WHERE userC LIKE '${user}' AND senha LIKE '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar( user, email, senha, confirmarSenha, dtNasc) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", user, email, senha, confirmarSenha, dtNasc);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO cadastro ( userC, email, senha, confSenha, dtNasc) VALUES ('${user}','${email}', '${senha}', '${confirmarSenha}', '${dtNasc}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    entrar,
    // autenticar,
    cadastrar
};