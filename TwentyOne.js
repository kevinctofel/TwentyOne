// 1. Initialize deck
// 2. Deal cards to player and dealer
// 3. Player turn: hit or stay
//    - repeat until bust or stay
// 4. If player bust, dealer wins.
// 5. Dealer turn: hit or stay
//    - repeat until total >= 17
// 6. If dealer busts, player wins.
// 7. Compare cards and declare winner.
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

    for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < suit.length; j++) {
            let card = { value: value[i], suit: suit[j] }
            deck.push(card);
        }
    }
    return deck;
}

const initialHand = (deck, playerHand, dealerHand) => { // may refactor for a loop with 4 iterations, switching hands between each
    playerHand.push(deck.shift());
    dealerHand.push(deck.shift());
    playerHand.push(deck.shift());
    dealerHand.push(deck.shift());
}

const shuffleDeck = (deck) => {

    let shuffledDeck = []; // temporary deck to hold shuffled cards

    for (let i = deck.length; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * deck.length);
        shuffledDeck.push(deck[randomIndex]);
        deck.splice(randomIndex, 1);
    }

    return shuffledDeck;
}

const displayHands = (playerHand, dealerHand) => {
    console.clear();

    console.log(`Dealer has: ${dealerHand[0]['value']} and a face down card of ${dealerHand[1]['value']}`);
    // need to loop through hand for dealer similar to player code below
    console.log("You have: ");
    for (let i = 0; i < playerHand.length; i++) {
        console.log(`${playerHand[i]['value']}`); // Need to format this so it's on a single line
    }
}

const sumHands = (playerHand, dealerHand) => { 
    playerTotal = 0;
    dealerTotal = 0;
    playerHand.forEach((card) => { // Refactor duplicate code
        switch (card['value']) {
            case 'Jack':
            case 'Queen':
            case 'King':
                playerTotal = playerTotal + 10;
                break;
            case 'Ace':
                playerTotal = playerTotal + 11;
                break;
            default:
                playerTotal = playerTotal + Number(card.value)
        }
    });
    dealerHand.forEach((card) => {
        switch (card['value']) {
            case 'Jack':
            case 'Queen':
            case 'King':
                dealerTotal = dealerTotal + 10;
                break;
            case 'Ace':
                dealerTotal = dealerTotal + 11;
                break;
            default:
                dealerTotal = dealerTotal + Number(card.value)
        }
    });
}

const dealACard = (deck, hand) => {
    hand.push(deck.shift());
    // return hand;
}


// MAIN

(initializeDeck(deck)); // create deck
deck = shuffleDeck(deck); // shuffle deck
// console.log(deck); // print shuffled deck
// Deal initial hand
initialHand(deck, playerHand, dealerHand);

// Display initial hand
displayHands(playerHand, dealerHand);
sumHands(playerHand, dealerHand);
console.log(`Player has ${playerTotal}. Dealer has ${dealerTotal}.`);


let input = prompt.question("Do you want to (H)it or (S)tand? ");
// if (input.toUpperCase === 'H') {
//     dealACard(deck, playerHand);
// }
dealACard(deck, playerHand);

displayHands(playerHand, dealerHand);
sumHands(playerHand, dealerHand);
console.log(`Player has ${playerTotal}. Dealer has ${dealerTotal}.`);
