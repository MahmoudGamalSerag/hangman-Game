const letters = "abcdefghijklmnopqrstuvwxyz";

//letters array
let lettersAray = Array.from(letters);

//select letters container
let lettersContainer = document.querySelector(".letters");
// generate letters 
lettersAray.forEach(letter => {
    //create span 
    let span = document.createElement("span");
    //create letter text node
    let theLetter = document.createTextNode(letter);
    // append leeter to span 
    span.appendChild(theLetter);
    //add class to span 
    span.className = `letter-box`;
    // appendspan to letter container
    lettersContainer.appendChild(span);
});
// Object Of Words 
const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
}
// get random property
let allKeys = Object.keys(words);
let randomProbNumber = Math.floor(Math.random() * allKeys.length);
let randomProbName = allKeys[randomProbNumber];
let randomProbValue = words[randomProbName];
let randomValueNumber = Math.floor(Math.random() * randomProbValue.length);
let randomValueValue = randomProbValue[randomValueNumber];
//set category info 
document.querySelector(".game-info .category span").innerHTML = randomProbName;
//select letters guess element 
let letterGuessContainer = document.querySelector(".letters-guess");
//convert word to array 
let lettersAndSpace = Array.from(randomValueValue);

//create spans depends on words 
lettersAndSpace.forEach(letter => {
    let emptySpan = document.createElement("span");
    if (letter === ' ') {
        emptySpan.className = `with-space`;
    }
    // add span to letter guess container
    letterGuessContainer.appendChild(emptySpan);
})
//select guess spans 
let guessSpans = document.querySelectorAll(".letters-guess span");


//set wrong attempts 
let wrongAttempts = 0;
let successAttempts = 0;

//handle the draw
let theDraw = document.querySelector(".hangman-draw");

//handel click on letters 
document.addEventListener("click", (e) => {
    //set the status
    let theStatus = false;
    if (e.target.className === `letter-box`) {
        e.target.classList.add("clicked");

        //get clicked letter
        let theClickedLetter = e.target.innerHTML.toLowerCase();

        // the chosen word
        let chosenWord = Array.from(randomValueValue.toLowerCase());


        chosenWord.forEach((wordLetter, wordIndex) => {


            // if the clicked letter is in word
            if (theClickedLetter == wordLetter) {

                //set status to correct
                theStatus = true;

                //loop on all guess spans 
                guessSpans.forEach((span, spanIndex) => {

                    if (wordIndex === spanIndex) {
                        span.innerHTML = theClickedLetter;
                        successAttempts++;
                    }

                });
            }
        });

        // if letter is wrong
        if (theStatus !== true) {
            wrongAttempts++;
            theDraw.classList.add(`wrong-${wrongAttempts}`);
            if (wrongAttempts == 8) {
                endGame();
                lettersContainer.classList.add("finished");
            }
        }

        // if word is finished 
        if (successAttempts == randomValueValue.length) {
            finishGame();
            lettersContainer.classList.add("finished");
        }
    }

});
function endGame() {
    //create popup div 
    let div = document.createElement("div");
    //create text
    let divText = document.createTextNode(`Game Over, The Word Is ${randomValueValue}`);
    //append text to div 
    div.appendChild(divText);

    //add class to div
    div.className = `popup`;
    //append to body
    document.body.appendChild(div);
}

function finishGame() {
    //create popup div 
    let div = document.createElement("div");
    //create text
    let divText = document.createTextNode(`You Did It, your wrong answers are: ${wrongAttempts}`);
    //append text to div 
    div.appendChild(divText);

    //add class to div
    div.className = `popup`;
    //append to body
    document.body.appendChild(div);
}