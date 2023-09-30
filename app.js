/*GAME FUNCTION:
-Player must guess a number between a min and max
-Player gets a certain amount of guesses
-Notify Player of guesses remaining
-Notify Player of the correct answer if lost
-Let Player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessInput = document.querySelector('#guess-input'),
      guessBtn = document.querySelector('#guess-btn'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);

  // Validate
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Check if won
  if(guess === winningNum){
    // Game over - won
    gameOver(true, `${winningNum} is correct, YOU WIN!`);
    guessInput.disabled = true;

  } else{
    // Wrong number
    guessesLeft -= 1;

    if(guessesLeft === 0){
      // Game over
      gameOver(`Game over! ${winningNum} is the right answer`, 'red');
      // Disable input
      guessInput.disabled = true;
      // Change border color
      guessInput.style.borderColor = 'red';
    } else{
      // Game continues - answer wrong
      setMessage(`${guess} is not correct, ${guessesLeft} guess(es) left`, 'red');
      // Clear input
      guessInput.value = '';
      // Change border color
      guessInput.style.borderColor = 'red';
    }
  }

});

function gameOver(won, msg){
  let color;
  won === true ? color = 'green' : color = 'red';

  // Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set text color
  message.style.color = color;
  // Set message
  setMessage(msg);

  // PLay Again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

// Get Winning Number
function getRandomNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

// Set message
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;

}