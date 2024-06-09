function play() {
    // Obter o número digitado pelo jogador
    var guess = parseInt(document.getElementById("guess").value);

    // Gerar um número aleatório entre 1 e 6 (inclusive)
    var randomNumber = Math.floor(Math.random() * 6) + 1;

    // Verificar se o número digitado pelo jogador é igual ao número aleatório
    if (guess >= 1 && guess <= 6) {
        if (guess === randomNumber) {
            document.getElementById("result").innerHTML = "Parabéns! Você acertou!";
        } else {
            document.getElementById("result").innerHTML = "Ops! Você errou. O número era " + randomNumber + ".";
        }
    } else {
        document.getElementById("result").innerHTML = "Por favor, escolha um número entre 1 e 6.";
    }

    switch(randomNumber){

        case 1:
            document.getElementById("dados").src = "/assets/dadof1.png";
            break;

        case 2:
            document.getElementById("dados").src = "/assets/dadof2.png";
            break;

        case 3:
            document.getElementById("dados").src = "/assets/dadof3.png";
            break;

        case 4:
            document.getElementById("dados").src = "/assets/dadof4.png";
            break;

        case 5:
            document.getElementById("dados").src = "/assets/dadof5.png";
            break;

        case 6:
            document.getElementById("dados").src = "/assets/dadof6.png";
            break;

        default:
            document.getElementById("dados").src = "/assets/dado.jpeg";
    }

    console.log(randomNumber)
}