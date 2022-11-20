/* eslint-disable max-lines-per-function */

const prompt = require('readline-sync');
let deck = [];
let value = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
let suit = [' of Hearts', ' of Diamonds', ' of Spades', ' of Clubs'];
let playerHand = [];
let dealerHand = [];
let playerTotal = 0;
let dealerTotal = 0;

// loop of 13 values, nested loop of 4 cards for each value and suite

const initializeDeck = (deck) => {

  for (let cardValue = 0; cardValue < value.length; cardValue++) {
    for (let cardSuit = 0; cardSuit < suit.length; cardSuit++) {
      let card = { value: value[cardValue], suit: suit[cardSuit] };
      deck.push(card);
    }
  }
  return deck;
};

const initialHand = (deck, playerHand, dealerHand) => { // may refactor for a loop with 4 iterations, switching hands between each
  playerHand.push(deck.shift());
  dealerHand.push(deck.shift());
  playerHand.push(deck.shift());
  dealerHand.push(deck.shift());
};

const shuffleDeck = (deck) => {

  let shuffledDeck = []; // temporary deck to hold shuffled cards

  for (let cards = deck.length; cards > 0; cards--) {
    let randomIndex = Math.floor(Math.random() * deck.length);
    shuffledDeck.push(deck[randomIndex]);
    deck.splice(randomIndex, 1);
  }

  return shuffledDeck;
};

const displayHands = (playerHand, dealerHand) => {
  console.clear();

  console.log("Dealer has: ");
  for (let cards = 0; cards < dealerHand.length; cards++) {
    console.log(`${dealerHand[cards]['value']}${dealerHand[cards]['suit']}`);
  }
  console.log("You have: ");
  for (let cards = 0; cards < playerHand.length; cards++) {
    console.log(`${playerHand[cards]['value']}${playerHand[cards]['suit']}`); // Need to format this so it's on a single line
  }
};


const sumHands = (playerHand, dealerHand) => {
  playerTotal = 0;
  dealerTotal = 0;
  playerHand.forEach((card) => { // Refactor duplicate code
    switch (card['value']) {
      case 'Jack':
      case 'Queen':
      case 'King':
        playerTotal += 10;
        break;
      case 'Ace':
        playerTotal += 11;
        break;
      default:
        playerTotal += Number(card.value);
    }
  });
  dealerHand.forEach((card) => {
    switch (card['value']) {
      case 'Jack':
      case 'Queen':
      case 'King':
        dealerTotal += 10;
        break;
      case 'Ace':
        dealerTotal += 11;
        break;
      default:
        dealerTotal += Number(card.value);
    }
  });
};

const dealACard = (deck, hand) => {
  hand.push(deck.shift());
  // return hand;
};

const checkTotal = (player) => {
  // playerHand.filter(value => value === 11).forEach(_ => {
  //     console.log(player);
  //     if (player > 21) player -= 10;
  // });
  return (player > 21); // true is a bust
};

const checkWinner = (player, dealer) => {
  if (dealer <= 21 && dealer > player) {
    console.log("The dealer wins.");
  } else if (player <= 21 && player > dealer) {
    console.log("The player wins!");
  } else if (player <= 21 && dealer <= 21 && player === dealer) {
    console.log("It's a push.");
  }
};

// MAIN

(initializeDeck(deck)); // create deck
deck = shuffleDeck(deck); // shuffle deck
// console.log(deck); // print shuffled deck
// Deal initial hand
initialHand(deck, playerHand, dealerHand);

// Display initial hand
displayHands(playerHand, dealerHand);
sumHands(playerHand, dealerHand);
console.log(`\nPlayer has ${playerTotal}. Dealer has ${dealerTotal}.`);

while (true) { // Player hand loop
  let input = prompt.question("Do you want to (H)it or (S)tand? ");

  if (input.toUpperCase() === 'H') {
    dealACard(deck, playerHand);
    displayHands(playerHand, dealerHand);
    sumHands(playerHand, dealerHand);
    console.log(`\nPlayer has ${playerTotal}. Dealer has ${dealerTotal}.`);
    if (checkTotal(playerTotal)) {
      console.log("You busted. Dealer wins.");
      break;
    }
  } else break;
}

// eslint-disable-next-line no-unmodified-loop-condition
while (dealerTotal < 17) { // Dealer hand loop
  dealACard(deck, dealerHand);
  displayHands(playerHand, dealerHand);
  sumHands(playerHand, dealerHand);
  console.log(`\nPlayer has ${playerTotal}. Dealer has ${dealerTotal}.`);
  if (checkTotal(dealerTotal)) {
    console.log("Dealer busted. Player wins!");
    break;
  }
}

checkWinner(playerTotal, dealerTotal);
