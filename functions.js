const TOTAL_TIME = 6;

let ADD_OPTION = false;
let TIMES_OPTION = false;
let TIMER_ON = false;
let points = 0;

// Start Screen
let optionsScreen = document.createElement("div");
optionsScreen.classList.add("windowDiv");
optionsScreen.append(optionsScreenText, addOptionBtn, timesOptionBtn);
document.body.append(optionsScreen);

let optionsScreenText = document.createElement("p");
optionsScreenText.textContent = "Choose an option:";
optionsScreenText.classList.add("heading1");

let startTimerBtn = document.createElement("button");
startTimerBtn.textContent = "Start Quiz";

//// Addition Button 
let addOptionBtn = document.createElement("button");
let addition = document.createElement("p");
addition.textContent = "Addition";
let plus = document.createElement("p");
plus.textContent = "+";
plus.classList.add("accent-text")
addOptionBtn.append(addition, plus);

//// Multiplication Button
let timesOptionBtn = document.createElement("button");
let multiplication = document.createElement("p");
multiplication.textContent = "Multiplication";
let times = document.createElement("p");
times.textContent = "×";
times.classList.add("accent-text")
timesOptionBtn.append(multiplication, times);

// Questions 
let questionDiv = document.createElement("div");
questionDiv.classList.add("question");

let question = document.createElement("p");
let answer = document.createElement("input");
let a;
let b;
let c;

// Addition Window
let addWindow = document.createElement("div");
let addQuestionBtn = document.createElement("button");

// Multiplication Window
let timesWindow = document.createElement("div");
let timesQuestionBtn = document.createElement("button");


// Addition 
//// Animation
addOptionBtn.addEventListener("mouseover", () => {
    addOptionBtn.textContent = "Start Quiz";
    addOptionBtn.style.backgroundColor = "#7CEADD";
    addOptionBtn.style.color = "#0A0529";
})

addOptionBtn.addEventListener("mouseout", () => {
    addOptionBtn.textContent = "";
    addOptionBtn.style.backgroundColor = "#27467D";
    addOptionBtn.style.color = "white";
    addOptionBtn.append(addition, plus);
})


//// When "addition" button is clicked
addOptionBtn.addEventListener("click", () => {
    document.body.removeChild(optionsScreen);
    addWindow.classList.add("windowDiv");
    addWindow.append(startTimerBtn);
    document.body.append(addWindow);
    ADD_OPTION = true;
    TIMES_OPTION = false;
    TIMER_ON = true;

    addWindow.removeChild(startTimerBtn);
    getTimer(addWindow);
    addQuestion();
})

function addQuestion() {    
    getAddQuestion();
    document.body.addEventListener("keyup", (e) => {
        if (e.key === 'Enter' && TIMER_ON) {
            if (Number(answer.value) === c) {
                points += 1;
            }
            getAddQuestion();
        }
    })
    questionDiv.append(question, answer);
    addWindow.append(questionDiv);
}

function getAddQuestion() {
    a = Math.floor((Math.random()) * 10);
    b = Math.floor((Math.random()) * 10);
    c = a + b;
    question.textContent = a + " + " + b + " = ";
    answer.value = "";
}


// Multiplication 
//// Animation
timesOptionBtn.addEventListener("mouseover", () => {
    timesOptionBtn.textContent = "Start Quiz";
    timesOptionBtn.style.backgroundColor = "#7CEADD";
    timesOptionBtn.style.color = "#0A0529";
})

timesOptionBtn.addEventListener("mouseout", () => {
    timesOptionBtn.textContent = "";
    timesOptionBtn.style.backgroundColor = "#27467D";
    timesOptionBtn.style.color = "white";
    timesOptionBtn.append(multiplication, times);
})

//// When "multiplication" button is clicked
timesOptionBtn.addEventListener("click", () => {
    document.body.removeChild(optionsScreen);
    timesWindow.classList.add("windowDiv");
    timesWindow.append(startTimerBtn);
    document.body.append(timesWindow);
    ADD_OPTION = false;
    TIMES_OPTION = true;
    
    TIMER_ON = true;
    timesWindow.removeChild(startTimerBtn);
    getTimer(timesWindow);
    timesQuestion();
})

function timesQuestion() {    
    getTimesQuestion();
    document.body.addEventListener("keyup", (e) => {
        if (e.key === 'Enter' && TIMER_ON) {
            if (Number(answer.value) === c) {
                points += 1;
            }
            getTimesQuestion();
        }
    })
    questionDiv.append(question, answer);
    timesWindow.append(questionDiv);
}

function getTimesQuestion() {
    a = Math.floor((Math.random()) * 10);
    b = Math.floor((Math.random()) * 10);
    c = a * b;
    question.textContent = a + " × " + b + " = ";
    answer.value = "";
}


// Timer 
let timerInterval;
function getTimer(window) {
    let countdown = document.createElement("p");
    countdown.classList.add("timer");
    let caption = document.createElement("p");
    caption.textContent = "seconds left";
    caption.classList.add("caption")
    let timeLeft = TOTAL_TIME;
    countdown.textContent = timeLeft;

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft -= 1;
        countdown.textContent = timeLeft;
        console.log()
        if(timeLeft == 0) {
            clearInterval(timerInterval)
            TIMER_ON = false;
            endQuiz(window);
        }
    }, 1000)
    window.append(countdown, caption);
}


// Once timer ends, the final score and the home button is displayed
function endQuiz(window) {
    let scoreText = document.createElement("p");
    scoreText.classList.add("points-text");
    scoreText.textContent = points == 1 ? "You scored " + points + " point" : "You scored " + points + " points"
    let endBtn = document.createElement("p");
    endBtn.textContent = "Back to Home";
    endBtn.classList.add("home-btn");
    window.append(scoreText, endBtn);
    answer.disabled = true;

    endBtn.addEventListener("click", () => {
        location.reload();
    })
}