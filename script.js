let difficulty = 1;
let secretNumber = undefined;
let guesses = undefined;

const gift = document.getElementsByClassName("fa-gift");
const revealNum = document.getElementById("secret-num");
const range = document.getElementById("range");
const lower = document.getElementById("lower");
const higher = document.getElementById("higher");
const input = document.getElementById("input");
const button = document.getElementById("guess-button");
const guessNum = document.getElementById("guess-num");
const gameWon = document.getElementById("won");
const gameLost = document.getElementById("lost");
const newGame = document.getElementById("new-game");

const generateSecretNumber = () => {
    return Math.floor(Math.random() * (maxValue(difficulty) + 1));
}

const numberOfGuesses = () => {
    const guessCount = (difficulty === 1 ? (7) : ((difficulty === 2) ? (11) : (11)));

    guessNum.innerHTML = guessCount;
    return guessCount;
}

window.onload = () => {
    secretNumber = generateSecretNumber();
    setRangeValues(difficulty);
    guesses = numberOfGuesses();
    console.log(secretNumber);
}

const maxValue = () => {
    switch(difficulty) {
        case 1:
            return 100;

        case 2:
            return 500;

        case 3:
            return 1000;
    }
}

input.addEventListener("input", () => {
    if (isNaN(input.value)) input.value = "";
    if (input.value > maxValue(difficulty)) input.value = maxValue(difficulty);
});

const setRangeValues = (difficulty) => {
    lower.innerHTML = 0;
    higher.innerHTML = ((difficulty === 1) ? (100) : ((difficulty === 2) ? (500) : (1000)));
}

const updateRangeValues = (guessValue) => {
    if (guessValue < secretNumber && guessValue > Number.parseInt(lower.innerHTML)) {
        lower.innerHTML = (guessValue + 1);
    } else if (guessValue > secretNumber && guessValue < Number.parseInt(higher.innerHTML)) {
        higher.innerHTML = (guessValue - 1);
    }
}

const showResult = (gameResult) => {
    gift[0].style.display = "none";
    range.style.display = "none";
    revealNum.innerHTML = secretNumber;
    newGame.style.display = "block";
    ((gameResult === true) ? (gameWon) : (gameLost)).style.display = "block";
}

const hideResult = () => {
    gift[0].style.display = "inline-block";
    range.style.display = "inline-block";
    revealNum.innerHTML = "";
    gameWon.style.display = "none";
    gameLost.style.display= "none";
    newGame.style.display = "none";
}

button.addEventListener("click", () => {
    if (input.value !== "") {
        console.log(input.value);
        const guessValue = Number.parseInt(input.value);

        guesses --;
        input.value = "";
        guessNum.innerHTML = guesses;

        if (guessValue === secretNumber || guesses === 0) {
            input.disabled = true;
            showResult((guessValue === secretNumber));
        } else {
            input.focus();
            updateRangeValues(guessValue);
        }
    }
});

newGame.onclick = () => {
    secretNumber = generateSecretNumber();
    setRangeValues(difficulty);
    guesses = numberOfGuesses();
    input.disabled = false;
    hideResult();
};