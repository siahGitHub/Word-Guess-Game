            //Storing guessing topics in 2 separate objects
            myTopic1 = { "name": "Island Names", "itemsToGuess": ["barbados", "trinidad", "antigua", "cuba", "st lucia", "st martin"] };
            myTopic2 = { "name": "US State Names", "itemsToGuess": ["new york", "virginia", "texas", "colorado"] };
            //Storing topics objects in arrary
            topicsArray = [myTopic1, myTopic2];

            //Intialization
            var guess = "";
            var randTopics = Math.floor(Math.random() * Math.floor(topicsArray.length));
            var randTopic = Math.floor(Math.random() * Math.floor(topicsArray[randTopics].itemsToGuess.length));

            //Set hint for Topic to guess
            document.getElementById("demo").innerHTML = topicsArray[randTopics].name;
            console.log(randTopic);

            //Build the masked word to guess using random itemsToGuess property from the topics array
            function buildWhatToGuess(whatToGuess) {
                //var maskedBuild = "";
                for (var i = 0; i < whatToGuess.length; i++) {
                    //maskedBuild = maskedBuild + " __ ";
                    var userGuess = document.getElementById("guesses");
                    var userGuessDiv = document.createElement("div");
                    userGuessDiv.style = "float:left; display:none; padding:2px";
                    userGuessDiv.className = topicsArray[randTopics].itemsToGuess[randTopic].charAt(i);
                    userGuessDiv.textContent = " " + topicsArray[randTopics].itemsToGuess[randTopic].charAt(i) + " ";
                    userGuess.appendChild(userGuessDiv);
                    var userGuessDiv = document.createElement("div");
                    userGuessDiv.style = "float:left; display:block; padding:2px";
                    userGuessDiv.className = "_" + topicsArray[randTopics].itemsToGuess[randTopic].charAt(i);
                    if (topicsArray[randTopics].itemsToGuess[randTopic].charAt(i) === " ") {
                        userGuessDiv.textContent = "  ";
                    }
                    else {
                        userGuessDiv.textContent = " __ ";
                    }
                    userGuess.appendChild(userGuessDiv);
                }
                
            }

            //Calling function to build masked word to guess using random itemsToGuess property from the topics array
            var whatToGuessMasked = buildWhatToGuess(topicsArray[randTopics].itemsToGuess[randTopic]);

            //Initializing of the canvas to draw the hangman
            var canvas = document.getElementById("myCanvas");
            var ctx = canvas.getContext("2d");
            ctx.strokeStyle = "#d3d3d3";

            //Function to draw hangman structure
            function drawHangManStart(myCanvas) {
                ctx.moveTo(50, 25);
                ctx.lineTo(50, 125);
                ctx.stroke();
                ctx.moveTo(50, 25);
                ctx.lineTo(100, 25);
                ctx.stroke();
                ctx.moveTo(100, 25);
                ctx.lineTo(100, 50);
                ctx.stroke();
            }

            //Function to draw hangman head
            function drawHead(myCanvas) {
                ctx.beginPath();
                ctx.arc(100, 60, 10, 0, 2 * Math.PI);
                ctx.stroke();
            }

             //Function to draw hangman body
            function drawBody(myCanvas) {
                ctx.moveTo(100, 70);
                ctx.lineTo(100, 105);
                ctx.stroke();
            }

             //Function to draw hangman arms
            function drawArm(myCanvas, side) {
                if (side === "R") {
                    ctx.moveTo(100, 75);
                    ctx.lineTo(110, 85);
                    ctx.stroke();
                }
                if (side === "L") {
                    ctx.moveTo(100, 75);
                    ctx.lineTo(90, 85);
                    ctx.stroke();
                }
            }

             //Function to draw hangman legs
            function drawLeg(myCanvas, side) {
                if (side === "R") {
                    ctx.moveTo(100, 105);
                    ctx.lineTo(110, 115);
                    ctx.stroke();
                }
                if (side === "L") {
                    ctx.moveTo(100, 105);
                    ctx.lineTo(90, 115);
                    ctx.stroke();
                }
            }

            //Function to call hangman draw functions based on number of bad guesses
            function badGuessDraw(badGuessNumber) {
                if (badGuessNumber === 1) {
                    drawHead(canvas);
                }
                else if (badGuessNumber === 2) {
                    drawBody(canvas);
                }
                else if (badGuessNumber === 3) {
                    drawArm(canvas, "R");
                }
                else if (badGuessNumber === 4) {
                    drawArm(canvas, "L");
                }
                else if (badGuessNumber === 5) {
                    drawLeg(canvas, "R");
                }
                else if (badGuessNumber === 6) {
                    drawLeg(canvas, "L");
                    gameOver("Looser");
                }
            }

            //Function to end game, display result and remove guesses
            function gameOver(result) {
                document.getElementById("result").innerHTML = "Game Over - You are a " + result;
                document.getElementById("user-text").remove();
            }

            //Function to start game over and reload page
            function startOver() {
                location.reload();
            }

            //Calling hangman start function to build structure
            drawHangManStart(canvas);

            //Variables for keeping track of values guessed, number of bad guesses and number of good guesses
            var checkedGuess = "";
            var badGuesses = 0;
            var goodGuesses = 0;

            //Function to check user guess against the hidden value
            function checkGuess(guessToBeChecked) {
                var guessFound = false;
                //Check if the guessed value was already guessed
                if (checkedGuess.indexOf(guessToBeChecked) < 0) {
                    //loop through length of string comparing the characters to the guessed value
                    for (var i = 0; i < topicsArray[randTopics].itemsToGuess[randTopic].length; i++) {
                        console.log(guessToBeChecked + " " + topicsArray[randTopics].itemsToGuess[randTopic].charAt(i) + " " + checkedGuess.indexOf(guessToBeChecked));
                        if (guessToBeChecked === topicsArray[randTopics].itemsToGuess[randTopic].charAt(i)) {
                            goodGuesses++;
                            checkedGuess = checkedGuess + guessToBeChecked;
                            var showGuess = document.getElementsByClassName(topicsArray[randTopics].itemsToGuess[randTopic].charAt(i));
                            var maskGuess = document.getElementsByClassName("_" + topicsArray[randTopics].itemsToGuess[randTopic].charAt(i));
                            console.log(topicsArray[randTopics].itemsToGuess[randTopic].charAt(i));
                            console.log(showGuess);
                            //loop through elements and set the style to hide the place holder and show the hidden value
                            for (j = 0; j < showGuess.length; j++) {
                                showGuess[j].style = "float:left; display: block; padding:2px";
                                maskGuess[j].style = "float:left; display: none; padding:2px";

                            }
                            guessFound = true;
                        }
                    }
                    if (!guessFound) {
                        badGuesses++;
                        //Call hangman drawing function when guess doesn't match
                        badGuessDraw(badGuesses);
                    }
                    else {
                        console.log(goodGuesses + " " + topicsArray[randTopics].itemsToGuess[randTopic].length);
                        var topicsNoSpaceLength = topicsArray[randTopics].itemsToGuess[randTopic].replace(/ /g, "");
                        if (goodGuesses === topicsNoSpaceLength.length) {
                            gameOver("Winner");
                        }
                    }
                }

            }

            // Next, we give JavaScript a function to execute when onkeyup event fires.
            var userText = document.getElementById("user-text");
            document.onkeyup = function (event) {
                guess = event.key;
                var guesses = userText.innerHTML + guess;
                userText.textContent = guesses;
                //Calling function to check the value of the users key press against hidden topic
                checkGuess(guess);
            };