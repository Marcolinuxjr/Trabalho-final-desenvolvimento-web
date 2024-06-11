let deckId = null;
let playerHand = [];
let dealerHand = [];
const messageElement = document.getElementById('message');
const playerCardsElement = document.getElementById('playerCards');
const dealerCardsElement = document.getElementById('dealerCards');
const newGameButton = document.querySelector('button[onclick="startGame()"]');
const hitButton = document.querySelector('button[onclick="hit()"]');
const standButton = document.querySelector('button[onclick="stand()"]');
const h5Elements = document.querySelectorAll('h5');
const backOfCardImage = '/assets/carta.jpeg'; 

hitButton.style.display = 'none';
standButton.style.display = 'none';
h5Elements.forEach(h5 => h5.style.display = 'none')

async function startGame() {
    try {
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        const data = await response.json();
        deckId = data.deck_id;
        playerHand = [];
        dealerHand = [];
        await Promise.all([drawCard('player'), drawCard('dealer', true)]);
        renderCards();
        messageElement.innerText = 'Escolha: Pedir Carta ou Parar';
        newGameButton.style.display = 'none'; 
        hitButton.style.display = 'block'; 
        standButton.style.display = 'block'; 
        h5Elements.forEach(h5 => h5.style.display = 'block'); 
    } catch (error) {
        console.error('Erro ao iniciar o jogo:', error);
    }
}

async function drawCard(player, hideCard = false) {
    try {
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        const data = await response.json();
        const card = data.cards[0];
        if (hideCard) {
            card.image = backOfCardImage;
        }
        if (player === 'player') {
            playerHand.push(card);
        } else {
            dealerHand.push(card);
        }
        renderCards();
    } catch (error) {
        console.error('Erro ao comprar carta:', error);
    }
}

async function hit() {
    if (deckId !== null) {
        await Promise.all([drawCard('player'), drawCard('dealer', true)]);
        const playerScore = calculateScore(playerHand);
        if (playerScore === 21) {
            messageElement.innerText = 'Você fez 21! Você ganhou!';
            stand();
        } else if (playerScore > 21) {
            messageElement.innerText = 'Você estourou! Pontuação: ' + playerScore + '. Você perdeu.';
            stand();
        }
    } else {
        messageElement.innerText = 'Clique em "Novo Jogo" para começar.';
    }
}

function stand() {
    if (deckId !== null) {
        revealDealerCards();
        determineWinner();
        newGameButton.style.display = 'block'; 
        hitButton.style.display = 'none'; 
        standButton.style.display = 'none'; 

    } else {
        messageElement.innerText = 'Clique em "Novo Jogo" para começar.';
    }
}

function calculateScore(hand) {
    let score = 0;
    let numAces = 0;
    for (let card of hand) {
        let value = card.value;
        if (value === 'KING' || value === 'QUEEN' || value === 'JACK') {
            score += 10;
        } else if (value === 'ACE') {
            numAces++;
            score += 11;
        } else {
            score += parseInt(value);
        }
    }
    while (score > 21 && numAces > 0) {
        score -= 10;
        numAces--;
    }
    return score;
}

function renderCards() {
    renderHand(playerHand, playerCardsElement);
    renderHand(dealerHand, dealerCardsElement);
}

function renderHand(hand, cardsElement) {
    let handHTML = '';
    for (let card of hand) {
        handHTML += `<img src="${card.image}" alt="${card.value} of ${card.suit}">`;
    }
    cardsElement.innerHTML = handHTML;
}

function revealDealerCards() {
    for (let card of dealerHand) {
        card.image = card.images.png; 
    }
    renderCards();
}

function determineWinner() {
    const playerScore = calculateScore(playerHand);
    const dealerScore = calculateScore(dealerHand);
    if (playerScore > 21 || (dealerScore <= 21 && dealerScore > playerScore)) {
        messageElement.innerText = 'Você perdeu! Sua pontuação: ' + playerScore + ', Pontuação do dealer: ' + dealerScore;
    } else if (dealerScore > 21 || playerScore > dealerScore) {
        messageElement.innerText = 'Você ganhou! Sua pontuação: ' + playerScore + ', Pontuação do dealer: ' + dealerScore;
    } else {
        messageElement.innerText = 'Empate! Sua pontuação: ' + playerScore + ', Pontuação do dealer: ' + dealerScore;
    }
}
