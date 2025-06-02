    let vezes = 8;
document.getElementById("gerar-senha").addEventListener("click", function() {
    const senha = gerarSenha();
    document.getElementById("senha").value = senha;
});

function gerarSenha() {
    function maisCaracteres() {
        while (vezes < 16) {       
        vezes =+ 1;
        return vezes;
    }
    }
    function menosCaracteres() {
        while (vezes > 0) {
            vezes =- 1;
            return vezes
        } 
    }
    const caracteresminusculos = "abcdefghijklmnopqrstuvwxyz";
    const caracteresmaiusculos = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const caracteresnumeros = "0123456789";
    const caracteressimbolos = "!@#$%&*";
    if (document.getElementById("maiusculas").checked) {
        caracteres = caracteresminusculos + caracteresmaiusculos;
    } else {
        caracteres = caracteresminusculos;
    }
    if (document.getElementById("numeros").checked) {
        caracteres += caracteresnumeros;
    }
    if (document.getElementById("simbolos").checked) {
        caracteres += caracteressimbolos;
    }
    let senha = "";
    for (let i = 0; i < vezes; i++) {
        senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return senha;
}
function maiusculas() {
    const senha = document.getElementById("senha");
    senha.value = gerarSenha();
}
function minusculas() {
    const senha = document.getElementById("senha");
    senha.value = gerarSenha();
}
function numeros() {
    const senha = document.getElementById("senha");
    senha.value = gerarSenha();
}
function simbolos() {
    const senha = document.getElementById("senha");
    senha.value = gerarSenha();
}