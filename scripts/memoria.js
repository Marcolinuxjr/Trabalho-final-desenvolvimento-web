document.addEventListener('DOMContentLoaded', () => {
    const GAME_BOARD_COLOR = '#122121';
    const ROTATION_TIME = 300;
    const UNFLIP_DELAY = 1500;

    const gameBoard = document.getElementById('gameBoard');
    const colors = ['#FF5733', '#FF5733', '#33FF57', '#33FF57', '#3357FF', '#3357FF', '#FF33A8', '#FF33A8', '#FFFF33', '#FFFF33', '#33FFFF', '#33FFFF', '#FF33FF', '#FF33FF', '#33FF', '#33FF'];
    let shuffledColors = shuffle(colors);
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;

    shuffledColors.forEach(color => {
        const card = createCard(color);
        gameBoard.appendChild(card);
    });

    function createCard(color) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.color = color;
        card.style.backgroundColor = GAME_BOARD_COLOR;

        card.addEventListener('click', flipCard);

        return card;
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.style.transform = 'rotateY(180deg)';
        setTimeout(() => {
            this.style.backgroundColor = this.dataset.color;
        }, ROTATION_TIME);

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        lockBoard = true;

        if (firstCard.dataset.color === secondCard.dataset.color) {
            disableCards();
        } else {
            unflipCards();
        }
    }

    function shuffle(array) {
        let shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        firstCard = null;
        secondCard = null;
        lockBoard = false;
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.style.backgroundColor = GAME_BOARD_COLOR;
            secondCard.style.backgroundColor = GAME_BOARD_COLOR;

            firstCard.style.transform = '';
            secondCard.style.transform = '';

            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);

            firstCard.addEventListener('click', flipCard);
            secondCard.addEventListener('click', flipCard);

            firstCard = null;
            secondCard = null;
            lockBoard = false;
        }, UNFLIP_DELAY);
    }
});
