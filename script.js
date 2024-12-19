// Gera um número secreto aleatório entre 1 e 100
let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let tentativasRestantes = 10;

const form = document.getElementById('form');
const chuteInput = document.getElementById('chute');
const resultadoDiv = document.getElementById('resultado');

// Função para exibir confetes
function disparaConfetes() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }, // Posição dos confetes
    });
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    tentativasRestantes = 10;
    resultadoDiv.textContent = '';
    form.style.display = 'block';
    chuteInput.value = '';
    const botaoReiniciar = document.getElementById('botao-reiniciar');
    if (botaoReiniciar) {
        botaoReiniciar.remove(); // Remove o botão "Jogar novamente"
    }
}

// Lida com o envio do formulário
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Previne o recarregamento da página

    const chute = parseInt(chuteInput.value);

    // Verifica se o palpite é válido
    if (isNaN(chute) || chute < 1 || chute > 100) {
        resultadoDiv.textContent = 'Por favor, insira um número válido entre 1 e 100.';
        return;
    }

    // Verifica se o jogador acertou
    if (chute === numeroSecreto) {
        resultadoDiv.textContent = `Parabéns! Você acertou o número secreto ${numeroSecreto}! 🎉`;
        disparaConfetes(); // Dispara confetes
        form.style.display = 'none'; // Esconde o formulário
        adicionarBotaoReiniciar();
    } else {
        tentativasRestantes--;

        if (tentativasRestantes === 0) {
            resultadoDiv.textContent = `Você esgotou todas as tentativas. O número secreto era ${numeroSecreto}. 😢`;
            form.style.display = 'none'; // Esconde o formulário
            adicionarBotaoReiniciar();
        } else if (chute > numeroSecreto) {
            resultadoDiv.textContent = `O número secreto é menor que ${chute}. Você ainda tem ${tentativasRestantes} tentativa(s).`;
        } else {
            resultadoDiv.textContent = `O número secreto é maior que ${chute}. Você ainda tem ${tentativasRestantes} tentativa(s).`;
        }
    }

    // Limpa o campo de entrada para o próximo palpite
    chuteInput.value = '';
});

// Função para adicionar o botão de reiniciar
function adicionarBotaoReiniciar() {
    const botaoReiniciar = document.createElement('button');
    botaoReiniciar.id = 'botao-reiniciar';
    botaoReiniciar.textContent = 'Jogar novamente';
    botaoReiniciar.style.marginTop = '20px';
    botaoReiniciar.style.padding = '10px';
    botaoReiniciar.style.fontSize = '1rem';
    botaoReiniciar.style.backgroundColor = '#4caf50';
    botaoReiniciar.style.color = 'white';
    botaoReiniciar.style.border = 'none';
    botaoReiniciar.style.borderRadius = '8px';
    botaoReiniciar.style.cursor = 'pointer';

    // Adiciona funcionalidade ao botão
    botaoReiniciar.addEventListener('click', reiniciarJogo);

    // Adiciona o botão à página
    resultadoDiv.appendChild(botaoReiniciar);
}
