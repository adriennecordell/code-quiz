var questions = [ 
  {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
  },
  {
      title: "Inside which HTML element do we put the JavaScript?",
      choices: ["<script>", "<javascript>", "<js>", "<scripting>"],
      answer: "<script>"
  },
  {
      title: "Which of these prints content to help with debugging?",
      choices: ["for loops", "console.log", "JavaScript", "terminal/bash"],
      answer: "console.log"
  },
  {
      title: "Is Java the same as JaveScript?",
      choices: ["true", "false"],
      answer: "false"
  },
  {
      title: "Which operator is used to assign a value to a variable?",
      choices: ["x", "-", "=", "+"],
      answer: "="
  }
]

var answer = document.querySelector("#answer")
var showTime = document.getElementById("timeLeft");
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

function start(){
  timeLeft = 40;
  showTime.innerHTML = timeLeft

  timer = setInterval(function(){
      timeLeft--;
      showTime.innerHTML = timeLeft;

      if(timeLeft <= 0){
          clearInterval(timer);
          endGame();
      }
      
  },1000);

  next();
}

function next() {
  currentQuestion++;

  if (currentQuestion > questions.length - 1) {
      endGame();
      return;
  }

  var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

  for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {        
      var buttonCode = "<button onclick='[ANS]'>[CHOICE]</button>";         
      buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);        
      
      if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {           
           buttonCode = buttonCode.replace("[ANS]", "correct()");
          
      }   else { 
             buttonCode = buttonCode.replace("[ANS]", "wrong()");      
           }        
           quizContent += buttonCode   
  }
  document.getElementById("quiz").innerHTML = quizContent;
  
}

function endGame() {
  clearInterval(timer);

  var quizContent = `
      <h2>Game over!</h2>
      <h3>You got a ` + score + ` /50!</h3>
      <h3>That means you got ` + score / 10 + ` questions correct!</h3>
      <input type="text" id="name" placeholder="Please enter your initals">
      <button onclick="inputScore()">Set score!</button>`;

      document.getElementById("quiz").innerHTML = quizContent;
}

function inputScore(){
  var highscore = localStorage.getItem("highscore");
  if(score > highscore){
  localStorage.setItem("highscore", score);
  localStorage.setItem("highscoreName", document.getElementById("name").value);
  }else {
      localStorage.getItem("highscore");
      localStorage.getItem("highscoreName")
      }   
  answer.textContent = "";
  getScore();
}

function getScore() {
  
  var quizContent = 
  `<h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
  <h1>` + localStorage.getItem("highscore") + `</h1><br>
  <button onclick="clearScore()">Clear score</button><button onclick="clearGame()">Play again!</button> `;

  document.getElementById("quiz").innerHTML = quizContent;
}

function clearScore() {
  localStorage.setItem("highscore", "");
  localStorage.setItem("highscoreName", "");

  clearGame();
}

function clearGame(){
  clearInterval(timer);
  score = 0;
  currentQuestion = -1;
  timeLeft = 0;
  timer = null;

  document.getElementById("timeLeft").innerHTML = timeLeft;

  var quizContent = `
  <h1>
      Coding Quiz!
  </h1>
  <h3>
      Click Start to play!
  </h3>
  <button onclick="start()">Start!</button>`;

  document.getElementById("quiz").innerHTML = quizContent;
}
function wrong(){
  answer.setAttribute("class", "border-top mt-3 pt-3")
  answer.setAttribute("style", "font-size: 20px; color: white; font-weight: bold; text-align: center;");
  answer.textContent = "Incorrect :(";
  timeLeft -= 15;
  next()
}
function correct(){
  answer.setAttribute("class", "border-top mt-3 pt-3")
  answer.setAttribute("style", "font-size: 20px; color: white; font-weight: bold; text-align: center;");
  answer.textContent = "Correct!";
  score += 10;
  next();
}