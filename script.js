// Gerador de Questão
function genRandomNumber(stage, previousn, previousop) {
    if (!previousop) {
        return Math.floor(((Math.random() * 5) + 1) + (Math.random() * stage)) + 1;
    } else if (previousop) {
        if (previousop == "*") {
            return Math.floor(Math.random() * 10 + 1);
        } else if (previousop == "/") {
            let possibledivisions = []
            for (let r = 2; r <= 10; r++) {
                if (previousn % r == 0) {
                    possibledivisions.push(r)
                    console.log(previousn / r)
                }
            }

            if (Array.isArray(possibledivisions) && possibledivisions.length) {
                return possibledivisions[Math.floor(Math.random() * possibledivisions.length)];
            } return previousn;
        } else {
            return Math.floor((Math.random() * previousn)) + 1;
        }
    }
}

function genRandomOperation(stage, previousop) {
    if (stage <= 10) {
        return setupOperation(1); // + 
    } else if (stage <= 30) {
        return setupOperation(Math.floor((Math.random() * 2) + 1)); // + - 
    } else if (stage <= 50) {
        return setupOperation(Math.floor((Math.random() * 3) + 1)); // + - *
    } else {
        if (previousop == "*" || previousop == "/") {
            return setupOperation(Math.floor((Math.random() * 2) + 1)); // + - 
        } else {
            return setupOperation(Math.floor((Math.random() * 4) + 1)); // + - * /
        }
    }
}

function setupOperation(o) {
    switch (o) {
        case 1:
            return "+";
        case 2:
            return "-";
        case 3:
            return "*";
        case 4:
            return "/";
    }
}

function genRandomQuestion(stage, type) {
    let n1 = genRandomNumber(stage)
    let op1 = `${genRandomOperation(stage)}`
    let n2 = genRandomNumber(stage, n1, op1)
    let op2 = `${genRandomOperation(stage, op1)}`
    let n3 = genRandomNumber(stage, n2, op2)

    switch (type) {
        case 0: // Regular
            return {
                n1: n1,
                op1: op1,
                n2: n2
            }
        case 1: // Boss
            return {
                n1: n1,
                op1: op1,
                n2: n2,
                op2: op2,
                n3: n3
            }
    }

    n1, n2, n3 = 0;
    op1, op2 = "";
}

// Operador
function getQuestionAnswer(question) {
    let questionString = ""
    let type = 0;
    if (questions[question].op2 && questions[question].n3) {
        type = 1
    } else {
        type = 0
    }

    switch (type) {
        case 0: // Regular
            questionString = `${questions[question].n1} ${questions[question].op1} ${questions[question].n2}`
            break;
        case 1: // Boss
            questionString = `${questions[question].n1} ${questions[question].op1} ${questions[question].n2} ${questions[question].op2} ${questions[question].n3}`
            break;
    }

    return math.evaluate(questionString);
}

// Criador de fase
let questions = [];

function genNewStage(stage) {
    questions = []; // Resetando o Array
    for (let i = 1; i <= 4; i++) {
        questions.push(genRandomQuestion(stage, 0));
    }
    questions.push(genRandomQuestion(stage, 1));

    console.log("Fase:" + stage);
    console.log(questions);

    document.querySelector(".question").innerHTML = "";
    questions.forEach((question, index) => {
        if (question.n3) {
            document.querySelector(".question").innerHTML += `<span class="question text-2xl text-white opacity-30" id="question${index}">${question.n1} ${question.op1} ${question.n2} ${question.op2} ${question.n3}</span> <br>`;
        } else {
            document.querySelector(".question").innerHTML += `<span class="question text-2xl text-white opacity-30" id="question${index}">${question.n1} ${question.op1} ${question.n2}</span> <br>`;
        }
    });

}


// Seleção de Questão
let availableQuestions = [0, 1, 2, 3, 4];
let currentQuestion = 0;

let cursor = ""
function cursorElement() {
    if (cursor) {
        cursor.remove()
    }

    // let createCursor = document.createElement("span");
    // createCursor.setAttribute("class", "cursor text-primary font-bold text-white");
    // const cursorIcon = document.createTextNode(" -> ");

    // createCursor.appendChild(cursorIcon);
    // document.querySelector('.question').insertBefore(createCursor, document.getElementById(`question${availableQuestions[currentQuestion]}`));

    cursor = document.querySelector('.cursor')

    let el = document.getElementById(`question${availableQuestions[currentQuestion]}`);
    el.classList.remove("opacity-30");
    el.classList.add("text-[#36F1CD]", "font-extrabold", 'text-3xl');
}


function correctElement() {
    let createCheckmark = document.createElement("span");
    createCheckmark.setAttribute("class", "checkmark font-black text-xl text-[#36F1CD] opacity-30");
    const checkmarkIcon = document.createTextNode(" ✓ ");

    createCheckmark.appendChild(checkmarkIcon);
    document.querySelector('.question').insertBefore(createCheckmark, document.getElementById(`question${availableQuestions[currentQuestion]}`));

    checkmark = document.querySelector('.checkmark')

    const el = document.getElementById(`question${availableQuestions[currentQuestion]}`);
    el.classList.add("opacity-30");
    el.classList.remove("font-extrabold", 'text-3xl');
}

function cycleQuestion(place) {
    let el = document.getElementById(`question${availableQuestions[currentQuestion]}`);
    
    if (el){
        el.classList.add("opacity-30");
        el.classList.remove("text-[#36F1CD]", "font-extrabold", 'text-3xl');
    }
    
    if (typeof place == "number") {
        currentQuestion = place;
        cursorElement();
        // document.querySelector(".question").innerHTML = `${questions[availableQuestions[currentQuestion]].n1} ${questions[availableQuestions[currentQuestion]].op1} ${questions[availableQuestions[currentQuestion]].n2}`

        if (availableQuestions[currentQuestion] == 4) {
            cursorElement();
            // document.querySelector(".question").innerHTML = `${questions[availableQuestions[currentQuestion]].n1} ${questions[availableQuestions[currentQuestion]].op1} ${questions[availableQuestions[currentQuestion]].n2} ${questions[availableQuestions[currentQuestion]].op2} ${questions[availableQuestions[currentQuestion]].n3}`
        }
    } else {
        if (currentQuestion < availableQuestions.length - 1) {
            currentQuestion++;
            cursorElement();
            // document.querySelector(".question").innerHTML = `${questions[availableQuestions[currentQuestion]].n1} ${questions[availableQuestions[currentQuestion]].op1} ${questions[availableQuestions[currentQuestion]].n2}`
        } else {
            currentQuestion = 0;
            cursorElement();
            // document.querySelector(".question").innerHTML = `${questions[availableQuestions[currentQuestion]].n1} ${questions[availableQuestions[currentQuestion]].op1} ${questions[availableQuestions[currentQuestion]].n2}`
        }

        if (availableQuestions[currentQuestion] == 4) {
            cursorElement();
            // document.querySelector(".question").innerHTML = `${questions[availableQuestions[currentQuestion]].n1} ${questions[availableQuestions[currentQuestion]].op1} ${questions[availableQuestions[currentQuestion]].n2} ${questions[availableQuestions[currentQuestion]].op2} ${questions[availableQuestions[currentQuestion]].n3}`
        }
    }
}

// Sistema de Combo
let comboGauge = 0
let progressBar = document.querySelector('.progress-bar');
let comboButton = document.querySelector('#comboButton')
progressBar.classList.add(`w-0`);

function updateCombo() {
    progressBar.classList.remove("w-0");
    progressBar.classList.remove(`w-[${(comboGauge - 1) * 10}%]`);
    progressBar.classList.add(`w-[${(comboGauge) * 10}%]`);

    if (comboGauge == 10){
        progressBar.classList.add("bg-gradient-to-r", "from-indigo-500", "from-25%", "via-sky-500", "via-75%", "to-emerald-500", "to-100%");
        comboButton.classList.add("bg-[#36F1CD]", "hover:scale-105");
        comboButton.classList.remove("bg-[#465573]", "opacity-50");
    } else{
        progressBar.classList.remove("w-[100%]", "bg-gradient-to-r", "from-indigo-500", "from-25%", "via-sky-500", "via-75%", "to-emerald-500", "to-100%");
        comboButton.classList.remove("bg-[#36F1CD]", "hover:scale-105");
        comboButton.classList.add("bg-[#465573]", "opacity-50");
    }
}

function increaseCombo() {
    if (comboGauge < 10) {
        comboGauge++;
        updateCombo();
    }
}

function useCombo() {
    if (comboGauge == 10) {
        comboGauge = 0;
        answerQuestion(true);
        updateCombo();
    } else {
        console.log("Combo insuficiente");
    }
}

// Respondendo Questão
let answerBox = document.querySelector(".answer")
function answerQuestion(combo) {
    let currentAnswer = answerBox.value;
    let correctAnswer = getQuestionAnswer(availableQuestions[currentQuestion])
    if (currentAnswer == correctAnswer || combo) {
        console.log("Correto");

        correctElement();
        document.getElementById(`question${availableQuestions[currentQuestion]}`).innerText += ` = ${correctAnswer}`

        availableQuestions.splice(currentQuestion, 1);
        if (availableQuestions.length == 0) {
            document.querySelector(".question").innerHTML = `<div class="stageEnd text-white text-xl text-center font-bold">Fase concluída!</div>`
            nextStageTimer();
        } else {
            cycleQuestion(0);
        }

        if (!combo) {
            increaseCombo();
        }

    } else {
        console.log("Incorreto");
        removeLife();
    }

    answerBox.value = ""
}

// Resposta com ENTER
answerBox.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        answerQuestion()
    }
})

// Troca com TAB, Combo com ESPAÇO
function checkForTab(event) {
    if (event.key == "Tab") {
        event.preventDefault();
        cycleQuestion()
    } else {
        if (event.which == 32) {
            event.preventDefault();
            useCombo();
        }
    }
}

answerBox.onkeydown = checkForTab;




// Contador de timer
let timer = 0;
let timerDisplay = document.querySelector('.timernumber');
let timerID = 0
function startStageTimer() {
    timer = 60;
    timerID = setInterval(() => {
        timer--;
        timerDisplay.innerHTML = timer;

        if (timer == -1) {
            endGame();
        }
    }, 1000)
}

function nextStageTimer(starting) {
    clearInterval(timerID)
    timer = 3;
    timerDisplay.innerHTML = timer;
    cdTimerID = setInterval(() => {
        timer--;
        timerDisplay.innerHTML = timer;

        if (timer == 1 && starting != true){
            reloadScreen();
        }
            
        if (timer == -1) {
            if (starting == true){
                startStageTimer();
                advanceStage();
            } else{
                advanceStage();
            }
            clearInterval(cdTimerID)
        }
    }, 1000)
}

function resetStageTimer() {
    clearInterval(timerID)
    startStageTimer()
    timerDisplay.innerHTML = timer;
}

function reloadScreen(){
    wrapper.classList.add("opacity-0");
    setTimeout(() => {
        wrapper.classList.remove("opacity-0");
    }, 2000);
}


// Contador de vidas
let lives = 3;
let livesDisplay = document.querySelector('.livesnumber');
function removeLife() {
    lives--;
    livesDisplay.innerHTML = lives;

    if (lives == 0) {
        endGame()
    }
}

// Contador de fase
let stageNumber = document.querySelector(".stagenumber");
let currentStage = 0;
function advanceStage() {
    currentStage++;
    stageNumber.innerHTML = currentStage;
    resetStageTimer();
    genNewStage(currentStage);
    availableQuestions = [0, 1, 2, 3, 4];

    cursorElement();
    progressBar.classList.remove("w-5/5");
    progressBar.classList.add("w-0");
}

function startGame() {
    let wrapper = document.querySelector("#wrapper");
    let tutorial = document.querySelector("#tutorial");

    tutorial.classList.add("opacity-0");
    setTimeout(() => {
        tutorial.remove();
        wrapper.classList.remove("opacity-0");
    }, 1000);
    
    nextStageTimer(true)
}

function reloadPage() {
    location.reload();
}

function endGame() {
    document.querySelector("body").innerHTML = `<div class="flex flex-col gap-2 justify-center">
                                                    <p class="text-white text-5xl text-center font-bold m-5">FIM DE JOGO</p>
                                                    <p class="text-white text-xl text-center font-bold"> Fase alcançada:</p>
                                                    <p class="text-[#36F1CD] text-9xl text-center place-self-center align-middle font-bold m-7">${currentStage}</p>
                                                    <button onclick="reloadPage()" class="answerquestion bg-[#36F1CD] m-5 p-4 rounded">Jogar novamente</button>
                                                </div>`
}
