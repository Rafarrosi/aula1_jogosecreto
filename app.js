let listaNumeroSorteados = [];
let numeroLimite = 3
let numeroSecreto = gerarNumeroAleatorio ();
let tentativas = 1;

function exibirTextoNaTela (tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto,'Brazilian Portuguese Female',{rate:1.4})
}

function msgInicial () {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'escolha um número entre 1 e 10');
}

msgInicial ();

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'
        let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if (chute > numeroSecreto) {
        exibirTextoNaTela('h1', 'Errou!');
        exibirTextoNaTela('p', 'O número secreto é menor');
        tentativas++
        
    } else {
        exibirTextoNaTela('h1', 'Errou!');
        exibirTextoNaTela('p', 'O número secreto é maior');
        tentativas++
        limparCampo ();
    }
}

function gerarNumeroAleatorio() {

    if (listaNumeroSorteados.length == numeroLimite) {
        listaNumeroSorteados = [];
    }

    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
        if (listaNumeroSorteados.includes(numeroEscolhido)) {
            return gerarNumeroAleatorio();
        } else {
            listaNumeroSorteados.push(numeroEscolhido);
            console.log(listaNumeroSorteados);
            return numeroEscolhido;
        }
}

function limparCampo () {
    chute = document.querySelector ('input');
    chute.value = ''

}

function reniciarGame () {
    msgInicial ();
    numeroSecreto = gerarNumeroAleatorio ();
    tentativas = 1
    limparCampo ();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}