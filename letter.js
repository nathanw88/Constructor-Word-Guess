//letter constructor to make objects out of the letters in the current word
function Letter(letter) {
  // variable to hold the letter value
  this.letter = letter;
  //holds a boolen value letting program know if this letter has been guessed
  this.guessed = false;
  // function that returns a placeholder if letter hasn't been guessed yet or the letter if it has been guessed to be printed to the screen
  this.toString = function () {

    if (this.guessed) return this.letter;

    else if (!this.guessed) return "?";

  };
//checks if guess is correct if so changes the guessed value to true
  this.checks = function (char) {
    if (char === this.letter) {
      this.guessed = true;
      return true

    };
  }
}
// exports Letter contructor to be used in word.js
module.exports = Letter
