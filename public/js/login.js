// document.querySelector('#registerForm').addEventListener('submit', function (e) {
//     e.preventDefault();

//     var email = document.querySelector('#email').value;
//     var password = document.querySelector('#password').value;
//     var confirmPassword = document.querySelector('#confirmPassword').value;

//     // Validação básica de senha
//     if (password !== confirmPassword) {
//         alert('As senhas não correspondem!');
//         return;
//     }

//     // Armazenar email e senha no localStorage
//     localStorage.setItem('registeredEmail', email);
//     localStorage.setItem('registeredPassword', password);

//     alert('Cadastro realizado com sucesso!');

//     // Redirecionar para a página de login
//     window.location.href = './site-institucional/index.html';
// });

function entrar() {

    var user = document.getElementById('user').value;
    var senha = document.getElementById('senha').value;

    if (user == "" || senha == "") {
        mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)";
        return false;
    }


    var userVar = document.getElementById('user').value;
    var senhaVar = document.getElementById('senha').value;


    fetch("/usuarios/autenticar",{
        
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userServer: userVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.NOME_USUARIO = json.user;

                setTimeout(function () {
                    window.location = "./dashboard/cards.html";
                }, 1000); // apenas para exibir o loading

            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}


