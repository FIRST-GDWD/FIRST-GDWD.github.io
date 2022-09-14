/*
  The 'const' keyword is an alternate way to create a variable compared to 'let'.
  The 'let' keyword will allow you to change a variable value later; however,
  the 'const' keyword will cause an error if you try to change it later.
*/
const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSORS = "SCISSORS";

/*
  The getRandomPick() function should have an equal chance of returning
  either ROCK, PAPER, or SCISSORS when you execute it.
*/
function getRandomPick() {
  // Math.random() returns a random number between 0.00 and 1.00
  let chance = Math.random();

  if (chance > 0.66) {
    // If chance is between 0.66 and 1.00, we return ROCK
    return ROCK;
  } else if (chance > 0.33) {
    // Otherwise, if chance is between 0.33 and 0.66, we return PAPER
    return PAPER;
  } else {
    // Otherwise, chance must be between 0.00 and 0.33, so we return SCISSORS
    return SCISSORS;
  }
}

/*
  The getResultText() function accepts two inputs (the computer and player picks)
    and returns the result of that round of Rock, Paper, Scissors.
  The text is from the perspective of the computer, so it will tell the player
    whether they won or lost, or if it was a tie.
*/
function getResultText(computerPick, playerPick) {
  const TIE = "It's a tie!";
  const WIN = "You win!";
  const LOSE = "You lose!";

  // if the computer and player pick the same value, then the result is a TIE
  if (computerPick == playerPick) {
    return TIE;
  }

  /*
    at this point, if the computer and player values were the same,
    we would have already return a TIE, so we know they must be different now
  */

  /*
    Here we evaluate the scenarios when the computer picks PAPER;
    if the player picked ROCK, they lose, but if they picked SCISSORS, they win
  */
  if (computerPick == PAPER && playerPick == ROCK) {
    return LOSE;
  } else if (computerPick == PAPER && playerPick == SCISSORS) {
    return WIN;
  }

  /*
    Here we evaluate the scenarios when the computer picks ROCK;
    if the player picked SCISSORS, they lose, but if they picked PAPER, they win
  */
  if (computerPick == ROCK && playerPick == SCISSORS) {
    return LOSE;
  } else if (computerPick == ROCK && playerPick == PAPER) {
    return WIN;
  }

  /*
    Here we evaluate the scenarios when the computer picks SCISSORS;
    if the player picked PAPER, they lose, but if they picked ROCK, they win
  */
  if (computerPick == SCISSORS && playerPick == PAPER) {
    return LOSE;
  } else if (computerPick == SCISSORS && playerPick == ROCK) {
    return WIN;
  }
}
