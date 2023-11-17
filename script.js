let cardList = [
  'darkness',
  'double',
  'fairy',
  'fighting',
  'fire',
  'grass',
  'lightning',
  'metal',
  'psychic',
  'water',
];

let cardSet;
let board = [];
let rows = 4;
let columns = 5;

let coin = 10_000;
let matchPairs = 10;

let cardOneSelected;
let cardTwoSelected;

const coinElement = document.getElementById('coin');

window.onload = function () {
  updateCoinCount();
  shuffleCards();
  startGame();
};

function shuffleCards() {
  cardSet = cardList.concat(cardList);
  // console.log(cardSet);

  for (let i = 0; i < cardSet.length; i++) {
    let j = Math.floor(Math.random() * cardSet.length);

    let temp = cardSet[i];
    cardSet[i] = cardSet[j];
    cardSet[j] = temp;
  }
  // console.log(cardSet);
}

function startGame() {
  for (let r = 0; r < rows; r++) {
    let row = [];

    for (let c = 0; c < columns; c++) {
      let cardImg = cardSet.pop();
      row.push(cardImg);

      let card = document.createElement('img');
      // ./assets/back.jpg
      card.id = `${r.toString()}-${c.toString()}`;
      // card.src = `./assets/${cardImg}.jpg`;
      card.src = getSrc(cardImg);
      card.classList.add('card');

      card.addEventListener('click', handleSelectCard);

      document.getElementById('board').append(card);
    }
    board.push(row);
  }
  console.log(board);
  setTimeout(hideCards, 100);
}

function hideCards() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let card = document.getElementById(`${r.toString()}-${c.toString()}`);
      card.src = getSrc('back');
    }
  }
}

function handleSelectCard() {
  if (this.src.includes('back')) {
    if (!cardOneSelected) {
      cardOneSelected = this;

      revealCard(cardOneSelected);
    } else if (!cardTwoSelected && this != cardOneSelected) {
      cardTwoSelected = this;

      revealCard(cardTwoSelected);

      setTimeout(checkWin, 800);
    }
  }
}

function revealCard(card) {
  let coords = card.id.split('-');
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);
  card.src = getSrc(board[r][c]);
}

function checkWin() {
  if (
    cardOneSelected.src === cardTwoSelected.src &&
    cardOneSelected.id !== cardTwoSelected.id
  ) {
    coin += 1000;
    matchPairs++;
    cardOneSelected.style.visibility = 'hidden';
    cardTwoSelected.style.visibility = 'hidden';
  } else {
    coin -= 500;
    cardOneSelected.src = getSrc('back');
    cardTwoSelected.src = getSrc('back');
  }

  if (coin < 0) {
    alert('Game Over! You ran out of coins.');
  }

  if (matchPairs === 10) {
    alert('Congratulations! You won!');
  }

  cardOneSelected = null;
  cardTwoSelected = null;
  updateCoinCount();
}

function updateCoinCount() {
  coinElement.innerHTML = `${coin}`;
}

function getSrc(name) {
  return `./assets/${name.toString()}.jpg`;
}
