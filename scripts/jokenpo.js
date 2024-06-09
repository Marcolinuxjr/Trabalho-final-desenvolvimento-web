function selectOption(option) {
    var options = ['pedra', 'papel', 'tesoura'];
    var userChoice = option;
    var computerChoice = options[Math.floor(Math.random() * 3)];

    var result = '';

    if (userChoice === computerChoice) {
        result = 'Empate!';
    } else if ((userChoice === 'pedra' && computerChoice === 'tesoura') ||
               (userChoice === 'papel' && computerChoice === 'pedra') ||
               (userChoice === 'tesoura' && computerChoice === 'papel')) {
        result = 'Você venceu!';
    } else {
        result = 'Você perdeu!';
    }

    document.getElementById('result').innerText = 'Você escolheu ' + userChoice + ', o computador escolheu ' + computerChoice + '. ' + result;
}