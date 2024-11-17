var usuarioModel = require("../models/usuarioModel");


// function autenticar(req, res) {
//     const { userServer: user, senhaServer: senha } = req.body;  

//     console.log('entrei na func autenticar')

//     if (!user) {
//         res.status(400).send("Seu usuário está indefinido ou vazio!");
//     } else if (!senha) {
//         res.status(400).send("Sua senha está indefinida ou vazia!");
//     }else { 

//         console.log('**********entrei no else da func autenticar')

//         usuarioModel.autenticar(user, senha)
//         .then(
//             function (resultado) {
//                 console.log(`\nResultados encontrados: ${resultado.length}`);
//                 console.log(`Resultados: ${JSON.stringify(resultado)}`);

//                 if (resultado.length == 1) {
//                     console.log(resultado);

//                     usuarioModel.acessos(user);

//                     res.json(resultado[0]);
//                 } else if (resultado.length == 0) {
//                     res.status(403).send("Usuário e/ou senha inválido(s)");
//                 } else {
//                     res.status(403).send("Mais de um usuário com o mesmo login e senha!");
//                 }
//             }
//         ).catch(
//             function (erro) {
//                 console.log(erro);
//                 console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
//                 res.status(500).json(erro.sqlMessage);
//             }
//         );
//     }
// }

function entrar(req, res) {
    var user = req.body.userServer;
    var senha = req.body.senhaServer;

    if (user == undefined) {
        res.status(400).send("Seu usuário está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        
        usuarioModel.entrar(user, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);

                        usuarioModel.acessos(user);

                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Usuário e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var user = req.body.userServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var confirmar_senha = req.body.confirmarSenhaServer;
    var dtNasc = req.body.dtNascServer;


    // Faça as validações dos valores
    if (user == undefined) {
        res.status(400).send("Seu usuário está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (confirmar_senha == undefined) {
        res.status(400).send("a confirmação de senha está undefined!");
    }else if (dtNasc == undefined) {
        res.status(400).send("a data de nascimento está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(user, email, senha, confirmar_senha, dtNasc)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    entrar,
    // autenticar,
    cadastrar
}