var Letter = require("./letter");
//a counter to know how many letters are left to guess
var counter
// word constructor that splits the word pased from index.js then creates an array of objects with each letter being passed in as a value
function Word(word) {
  //reseting counter for new word
  counter = 0
  //splits word into an array
  this.wordArr = word.split("");
  // an array to hold the objects to be made from the letters
  this.lettersArr = [];
  //function to take each letter and pass it to the constructor in letter.js 
  this.addLetters = function () {
    for (var i = 0; i < this.wordArr.length; i++) {
      // pushes the new objects into lettersArr 
      this.lettersArr.push(new Letter(this.wordArr[i]));
      //adds one to counter for each object made
      counter++
    };
    // the function that returns the place holder and letters that have been guessed for each letter object
    this.joinLetters = function () {
      // console.log(this.lettersArr)
      // console.log(this.lettersArr.join(","));

      return this.lettersArr.join(", ");

    };
//the function that passes the guess on to letter.js to check and return if correct and if word is done 
    this.guess = function (guess) {
      var boolen = false
      for (var i = 0; i < this.lettersArr.length; i++) {
        var checks = this.lettersArr[i].checks(guess);
        if (checks) {
          boolen = true;
          //if correct takes one from  counter for each letter that is matched
          counter--
          //if counter is at zero returns that word is done
          if (counter === 0) return "done"
        }



      }
      return boolen
    };
  }
}

//exports contructor to be used in index.js
module.exports = Word;
