// 1. Initialize deck
// 2. Deal cards to player and dealer
// 3. Player turn: hit or stay
//    - repeat until bust or stay
// 4. If player bust, dealer wins.
// 5. Dealer turn: hit or stay
//    - repeat until total >= 17
// 6. If dealer busts, player wins.
// 7. Compare cards and declare winner.

let deck = [];
let value = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
let suit = [' of Hearts', ' of Diamonds', ' of Spades', ' of Clubs'];

// loop of 13 values, nested loop of 4 cards for each value and suite

const initializeDeck = (deck) => {

  for (let i = 0; i < value.length; i++) {
    for (let j = 0; j < suit.length; j++) {
      let card = { Value: value[i], Suit: suit[j] }
      deck.push(card);
    }
  }
  return deck;
}

const shuffleDeck = (deck) => {
  let shuffledDeck = []; // temporary deck to hold shuffled cards
  console.log(deck.length);
  for (let i = deck.length; i > 0; i--) {
    let randomIndex = Math.floor(Math.random() * deck.length);
    shuffledDeck.push(deck[randomIndex]);
    deck.splice(randomIndex, 1);
  }
  return shuffledDeck;
}

// MAIN

(initializeDeck(deck)); // create deck
deck = shuffleDeck(deck); // shuffle and print deck
console.log(deck);
console.log(deck.length);