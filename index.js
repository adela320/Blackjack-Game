let player = {
    name : "You",
    chips : 100
}
let cards = [];
let DealerCards = [];
let sum = 0;
let sum_dealer = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-player");
let cardsEl = document.getElementById("cards-player");
let playerEl = document.getElementById("player-el");
let sumDealerEl = document.getElementById("sum-dealer");
let cardsDealerEl = document.getElementById("cards-dealer");


function getRandomCard()
{
    let randomNum =   Math.floor( Math.random() * 13 ) + 1;
    if(randomNum > 10)
    {
        return 10;
    }
    if(randomNum === 1)
    {
        return 11;
    }
    return randomNum;
}

function startGame()
{
    player.chips = 100;
    playerEl.textContent = player.name + ": $" + player.chips;
    isAlive = true;
    hasBlackJack = false;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;

    sumDealerEl.textContent = "Sum: ";
    cardsDealerEl.textContent = "Cards: ";
    let firstCardDealer = getRandomCard();
    let secondCardDealer = getRandomCard();
    DealerCards = [firstCardDealer, secondCardDealer];
    sum_dealer = firstCardDealer + secondCardDealer;
    dealerCards();
    renderGame();
}

function renderGame()
{
    cardsEl.textContent = "Cards: ";
    for(let i = 0; i < cards.length; i++)
    {
        cardsEl.textContent += cards[i] + " ";
    }
    sumEl.textContent = "Sum: " + sum;
    if(sum <= 20)
    {
        message = "Do you want to draw a new card?";
    }
    else if(sum === 21)
    {
        message = "You've got Blackjack!";
        hasBlackJack = true;
    }
    else
    {
        message = "You're out of the game!";
        isAlive = false;
        playerEl.textContent = player.name + ": $0";
    }
    messageEl.textContent = message;
}

function newCard()
{
    if(isAlive === true && hasBlackJack === false)
    {
        let card =  getRandomCard();
        if(card == 11 && sum + card > 21)
        {
            card = 1;
        }
        cards.push(card);
        sum += card;
        renderGame();
    }
}

function stand()
{
    if(isAlive === true)
    {
        cardsDealerEl.textContent += DealerCards[1] + " ";
        while(sum_dealer < 17)
        {
            let card = getRandomCard();
            sum_dealer += card;
            cardsDealerEl.textContent += card + " ";
        }
        sumDealerEl.textContent = "Sum: " + sum_dealer;
        if(sum_dealer > 21 || sum > sum_dealer)
        {
            message = "You win!";
            if(hasBlackJack)
            {
                 player.chips += player.chips * (3/2);
            }
            else
            {
                player.chips *= 2;
            }
            playerEl.textContent = player.name + ": $" + player.chips;
        }
        else if(sum == sum_dealer && sum_dealer <= 21)
        {
            message = "It's a tie!";
        }
        else
        {
            message = "Dealer wins!";
            playerEl.textContent = player.name + ": $0";
        }
         messageEl.textContent = message;
        isAlive = false;
    }
       
}

function dealerCards()
{
     cardsDealerEl.textContent = "Cards: " + DealerCards[0] + " ";
}