// needed modules imported
var inquirer = require("inquirer");
var Word = require("./word");


//array of words to guess from
var words = ["turtle", "dolphins", "whales", "tuna", "octopus", "squid", "tuna", "corral", "kelp", "lobster"];
// variable to hold current word to guess as an object
var currentWord;
// to hold and array of letters guessed on current word
var lettersGuessed

var losses = 0
var wins = 0
var guessesLeft;

//function for grabbing random word from an array passed in could go one by one with a counter as well 

var setWord = function (wordsArr) {
  
  lettersGuessed = []
  var randomNum = Math.floor(Math.random() * wordsArr.length);
  var word = wordsArr[randomNum];
  //makes an object using the contructor in word.js 
  currentWord = new Word(word);
  //use the function in that object to make objects out of the letters in the word using a constructor found in letter.js 
  currentWord.addLetters()

  guessesLeft = 5;
  question();
};
// the question function that takes in a guess from a user 
var question = function () {
  // prints to screen placeholders and letters for current word
  console.log(currentWord.joinLetters())
  inquirer.prompt([
    {
      type: "input",
      message: "What letter would you like to guess?",
      name: "toSearch"
    }
  ]).then(function (response) {
    // if guess hasn't been guessed before on the current word does this
    if (lettersGuessed.indexOf(response.toSearch.toLowerCase()) === -1) {
      // adds guessed letter to array of guessed letters for current word
      lettersGuessed.push(response.toSearch.toLowerCase())
     // variable to hold guess
      var letterGuessed = response.toSearch.toLowerCase();
       // variable to accept return from from function that the guess is passed to to check if it's in the word and if word has been finished 
      var right = currentWord.guess(letterGuessed);
      // if word is finished adds to wins and grabs a word from the array
      if (right === "done") {
        console.log("you finished this word.");
        wins++
        console.log(`wins: ${wins}`)
        setWord(words);
       
      }
      // if the guess was in the word asks restarts function to get another guess
      else if (right) question();
     
      // if the guess was wrong removes a guess from guesses left
      else {
        guessesLeft--;;
        console.log(`Guesses left: ${guessesLeft}`)
      
        //if guesses are left calls function again
        if (guessesLeft > 0) question();
        //otherwise adds on to losses and grabs a word from the array
        else if (guessesLeft <= 0) {
          console.log("You have lost");
          losses++;
          console.log(`Losses: ${losses}`);
          setWord(words)
        }
          
      }
    }
    //if you have already guessed that ask for another guess
      else {
          console.log("You already guessed that.")
          question()
      }

    })
  }

        
      
    
  


// starts the game off passing in the array words
setWord(words);