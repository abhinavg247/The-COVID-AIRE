
const options = document.querySelector(".options").children;
const answerTrackerContainer = document.querySelector(".answers-tracker");
const questionNumberSpan = document.querySelector(".question-num-value");
const totalQuestionSpan = document.querySelector(".total-question");
const correctAnswerSpan = document.querySelector(".correct-answers");
const totalQuestionSpan2 = document.querySelector(".total-question2");
const percentage = document.querySelector(".percentage");
const question = document.querySelector(".question");
const op1 = document.querySelector(".option1");
const op2 = document.querySelector(".option2");
const op3 = document.querySelector(".option3");
const op4 = document.querySelector(".option4");
let questionIndex;
let index = 0;
let myArray = [];
let myArr = [];
let score = 0;

//questions and options and answers

const questions = [
    {
        q: ' Coronoviruses are named for the spikes that protrude from their surfaces resembling _______. They can infect both animals and people, and can cause illness of the respiratory tract. ',
        options: [" barbed wire ", " the sun's corona ", " a shark's teeth ", " football cleats "],
        answer: 1  //paste answer index here
    },
    {
        q: 'The coronavirus spreads easily from person to person, travelling through the air, enveloped in tiny ________ or picked up when a person touches an infected surface. ',
        options: [' gamma rays ', ' bacterial follicles ', ' viral droplets ', ' pollution particles '],
        answer: 2  //paste answer index here
    },
    {
        q: ' Which of the following is NOT a common symptom of the coronavirus? ',
        options: [' dry cough ', ' fever ', ' shortness of breath ', ' rash '],
        answer: 3  //paste answer index here
    },
    {
        q: ' Most people fall ill five to seven days after exposure, but symptoms may appear in as few as two days or as many as _____  days. ',
        options: [' 14 ', ' 21 ', ' 28 ', ' 35 '],
        answer: 0  //paste answer index here
    },
    {
        q: ' Coronavirus cases in children have been ',
        options: [' rare, as of now. ', ' non-existent. ', ' as common as elderly cases. ', ' rapidly rising. '],
        answer: 0  //paste answer index here
    },
    {
        q: ' Washing your hands is considered to be one of the very best defenses you can take to prevent the spread of the virus. It is recommended that you wash your hands for at least _________. ',
        options: [' 5 seconds ', ' 10 seconds ', ' 20 seconds ', ' 4 minutes '],
        answer: 2  //paste answer index here
    },
    {
        q: ' Can you always tell if someone has COVID-19? ',
        options: [' Yes, it will be obvious - A person who has Corona coughs a lot. ', ' Everyone who has a fever has been affected with COVID. ', ' Yes , you can tell just by where a person comes from, their race and ethnicity ', ' No, not everyone with COVID has symptoms. '],
        answer: 3  //paste answer index here
    },
    {
        q: ' By maintaining a distance of atleast ________ from others when possible, people may limit the spread of the virus. ',
        options: [' 12 inches ', ' two feet ', ' four feet ', ' six feet '],
        answer: 3  //paste answer index here
    },
    {
        q: ' The first case of novel coronavirus was identified in .....',
        options: [' Shanghai ', ' Wuhan, Hubei ', ' Beijing ', ' Tianjin '],
        answer: 1  //paste answer index here
    },
    {
        q: ' What happens to a person suffering from COVID-19? ',
        options: [' Around 80% of the people will require no treatment as such and will recover on their own. ', '  Around <20% or a small proportion may need hospitalisation. ', '  A very small proportion basically suffering from chronic illness may need admission in an Intensive Care Unit (ICU). ', ' All the above are correct. '],
        answer: 3  //paste answer index here
    }
]

//set questions and options and question number 
totalQuestionSpan.innerHTML = questions.length;
function load() {
    questionNumberSpan.innerHTML = index + 1;
    question.innerHTML = questions[questionIndex].q;
    op1.innerHTML = questions[questionIndex].options[0];
    op2.innerHTML = questions[questionIndex].options[1];
    op3.innerHTML = questions[questionIndex].options[2];
    op4.innerHTML = questions[questionIndex].options[3];
    index++;
}

function check(element) {
    if (element.id == questions[questionIndex].answer) {
        element.classList.add("correct");
        updateAnswerTracker("correct");
        score++;
    }
    else {
        element.classList.add("wrong");
        updateAnswerTracker("wrong");
    }
    disabledOptions();
}

function disabledOptions() {
    for (let i = 0; i < options.length; i++) {
        options[i].classList.add("disabled");
        if (options[i].id == questions[questionIndex].answer) {
            options[i].classList.add("correct");
        }
    }
}

function enableOptions() {
    for (let i = 0; i < options.length; i++) {
        options[i].classList.remove("disabled", "correct", "wrong");
    }
}


function validate() {
    if (!options[0].classList.contains("disabled")) {
        alert("Please select a response!")
    }
    else {
        enableOptions();
        randomQuestion();
    }
}

function next() {
    validate();
}

function randomQuestion() {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = 0;
    if (index == questions.length) {
        quizOver();
    }
    else {
        if (myArray.length > 0) {
            for (let i = 0; i < myArray.length; i++) {
                if (myArray[i] == randomNumber) {
                    hitDuplicate = 1;
                    break;
                }
            }
            if (hitDuplicate == 1) {
                randomQuestion();
            }
            else {
                questionIndex = randomNumber;
                load();
                myArr.push(questionIndex);
            }

        }
        if (myArray.length == 0) {
            questionIndex = randomNumber;
            load();
            myArr.push(questionIndex);
        }

        myArray.push(randomNumber);

    }
}

function answerTracker() {
    for (let i = 0; i < questions.length; i++) {
        const div = document.createElement("div");
        answerTrackerContainer.appendChild(div);
    }
}

function updateAnswerTracker(classNam) {
    answerTrackerContainer.children[index - 1].classList.add(classNam);
}

function quizOver() {
    document.querySelector(".quiz-over").classList.add("show");
    correctAnswerSpan.innerHTML = score;
    totalQuestionSpan2.innerHTML = questions.length;
    percentage.innerHTML = (score / questions.length) * 100 + "%";
}

function tryAgain() {
    window.location.reload();
}

window.onload = function () {
    randomQuestion();
    answerTracker();

}