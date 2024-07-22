// script.js
const targetWord = "apple"; // The word to guess
const maxGuesses = 6;
let currentGuess = "";
let guesses = [];

const gameBoard = document.getElementById("gameBoard");
const guessInput = document.getElementById("guessInput");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");

const createBoard = () => {
  gameBoard.innerHTML = "";
  for (let i = 0; i < maxGuesses; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < 5; j++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      row.appendChild(tile);
    }
    gameBoard.appendChild(row);
  }
};

const updateBoard = () => {
  guesses.forEach((guess, rowIndex) => {
    const row = gameBoard.children[rowIndex];
    for (let i = 0; i < 5; i++) {
      const tile = row.children[i];
      tile.textContent = guess[i];
      if (guess[i] === targetWord[i]) {
        tile.classList.add("correct");
      } else if (targetWord.includes(guess[i])) {
        tile.classList.add("present");
      } else {
        tile.classList.add("absent");
      }
    }
  });
};

const handleSubmit = () => {
  const guess = guessInput.value.toLowerCase();
  if (guess.length !== 5) {
    message.textContent = "Guess must be 5 letters.";
    return;
  }
  if (guesses.length >= maxGuesses) {
    message.textContent = "No more guesses left!";
    return;
  }
  guesses.push(guess);
  updateBoard();
  guessInput.value = "";

  if (guess === targetWord) {
    message.textContent = "Congratulations! You've guessed the word!";
    guessInput.disabled = true;
    submitBtn.disabled = true;
  } else if (guesses.length === maxGuesses) {
    message.textContent = `Game over! The word was ${targetWord}.`;
  }
};

submitBtn.addEventListener("click", handleSubmit);
guessInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleSubmit();
  }
});

createBoard();
