// Função para validar o email
function validarEmail() {
    var email = document.getElementById('email').value;
    var emailValido = /^[^\s@]+@[^\s@]+\.(com|br|school)$/.test(email);

    if (emailValido) {
        document.getElementById('email').style.borderColor = "green";
    } else {
        document.getElementById('email').style.borderColor = "red";
    }
}

function validarUser() {
    var user = document.getElementById('user').value;

    if (!user || user.trim() === "") {
        return "O nome de usuário não pode ser vazio.";
    }

    // Verificar se o nome de usuário tem entre 3 e 15 caracteres
    if (user.length < 3 || user.length > 15) {
        return "O nome de usuário deve ter entre 3 e 15 caracteres.";
    }

    // Verificar se o nome de usuário contém apenas letras, números e underscores
    const regex = /^[a-zA-Z0-9_]+$/;
    if (!regex.test(user)) {
        return "O nome de usuário pode conter apenas letras, números e underscores.";
    }

    // Se todas as condições forem atendidas, o nome de usuário é válido
    return "Nome de usuário válido!";
}

function validarDataNascimento() {
    var dtNasc = document.getElementById('dtNasc').value;

    // Expressão regular para validar o formato DD/MM/AAAA
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/;
    
    if (!regex.test(dtNasc)) {
        return false; 
    }

    // Divide a data em dia, mês e ano
    const [dia, mes, ano] = dtNasc.split('/').map(Number);

    // Verifica se a data é válida (considerando o mês e o ano)
    const dataValida = new Date(ano, mes - 1, dia);
    
    // Verifica se o dia, mês e ano coincidem com a data gerada
    return dataValida.getDate() === dia && dataValida.getMonth() === mes - 1 && dataValida.getFullYear() === ano;
}

// Função para mostrar os requisitos da senha
function mostrarRequisitosSenha() {
    document.getElementById("senhaRequisitos").style.display = "block";
}

// Função para ocultar os requisitos da senha
function ocultarRequisitosSenha() {
    document.getElementById("senhaRequisitos").style.display = "none";
}

// Validação de Senha com exibição de requisitos
function validarSenha() {
    var senha = document.getElementById("senha").value;
    var temMinuscula = /[a-z]/.test(senha);
    var temMaiuscula = /[A-Z]/.test(senha);
    var temNumero = /\d/.test(senha);
    var temEspecial = /[\W_]/.test(senha);

    // Exibir os requisitos em vermelho ou verde conforme o usuário digita
    document.getElementById("letraMinuscula").style.color = temMinuscula ? "green" : "red";
    document.getElementById("letraMaiuscula").style.color = temMaiuscula ? "green" : "red";
    document.getElementById("numero").style.color = temNumero ? "green" : "red";
    document.getElementById("caractereEspecial").style.color = temEspecial ? "green" : "red";

    if (temMinuscula && temMaiuscula && temNumero && temEspecial) {
        document.getElementById("senha").style.borderColor = "green";
    } else {
        document.getElementById("senha").style.borderColor = "red";
    }
}

// Função para validar se a senha e a confirmação são iguais
function validarConfirmarSenha() {
    var senha = document.getElementById("senha").value;
    var confirmarSenha = document.getElementById("confirmar_senha").value;

    if (senha === confirmarSenha && senha !== "") {
        document.getElementById("confirmar_senha").style.borderColor = "green";
    } else {
        document.getElementById("confirmar_senha").style.borderColor = "red";
    }
}

// Função para validar todas as informações no cadastro
function validarInformacoes() {
    validarUser();
    validarEmail();
    validarSenha();
    validarConfirmarSenha();
    validarDataNascimento();

    // Verifica se todos os campos estão verdes (válidos)
    var camposValidos = document.getElementById('email').style.borderColor === "green" &&
                        document.getElementById('senha').style.borderColor === "green" &&
                        document.getElementById('confirmar_senha').style.borderColor === "green";


        if (camposValidos) {
        console.log('dentro do if ')
        // Recuperar os valores dos campos
        var userVar = document.getElementById('user').value;
        var emailVar = document.getElementById('email').value;
        var senhaVar = document.getElementById('senha').value;
        var confirmarSenhaVar = document.getElementById('confirmar_senha').value;
        var dtNascVar = document.getElementById('dtNasc').value;


        // Enviando os dados via fetch
        fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userServer: userVar,
                emailServer: emailVar,
                senhaServer: senhaVar,
                confirmarSenhaServer: confirmarSenhaVar,
                dtNascServer: dtNascVar
            }),
        })
        .then(function (resposta) {
            console.log('entrei no fetch')
            console.log("Resposta: ", resposta);
            console.log('entrei no fetch antes da validacao da resposta')
            
            if (resposta.ok) {
                alert("Cadastro realizado com sucesso! Redirecionando para a tela de Login...");
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 2000);
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
            alert("Ocorreu um erro durante o cadastro. Tente novamente.");
        });

    } else {
        alert("Por favor, corrija os erros e tente novamente.");
    }
}
