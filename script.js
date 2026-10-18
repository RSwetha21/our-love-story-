// OPEN THE LOVE LETTER

function openLetter() {

    const letter = document.getElementById("letterSection");

    letter.classList.toggle("visible");

    if (letter.classList.contains("visible")) {

        setTimeout(function () {
            letter.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 200);

    } else {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

}


// FINAL SURPRISE

function showFinalMessage() {

    const message = document.getElementById("finalMessage");

    message.classList.toggle("show");

    if (message.classList.contains("show")) {

        message.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        heartBurst();

    }

}


// FLOATING HEARTS

function createFloatingHeart() {

    const container = document.getElementById("floatingHearts");

    const heart = document.createElement("span");

    heart.className = "floating-heart";

    heart.innerHTML = Math.random() > 0.5 ? "♡" : "♥";

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize = (12 + Math.random() * 18) + "px";

    heart.style.animationDuration = (7 + Math.random() * 5) + "s";

    container.appendChild(heart);

    setTimeout(function () {
        heart.remove();
    }, 12000);

}


// HEART BURST

function heartBurst() {

    const container = document.getElementById("floatingHearts");

    for (let i = 0; i < 20; i++) {

        const heart = document.createElement("span");

        heart.className = "burst-heart";

        heart.innerHTML = "♥";

        heart.style.left = Math.random() * 100 + "vw";

        heart.style.top = Math.random() * 80 + "vh";

        heart.style.fontSize = (15 + Math.random() * 25) + "px";

        container.appendChild(heart);

        heart.animate(
            [
                {
                    opacity: 1,
                    transform: "translateY(0) scale(.5)"
                },
                {
                    opacity: 0,
                    transform: "translateY(-150px) scale(1.5)"
                }
            ],
            {
                duration: 1600,
                easing: "ease-out"
            }
        );

        setTimeout(function () {
            heart.remove();
        }, 1700);

    }

}


// START THE HEARTS

window.addEventListener("load", function () {

    for (let i = 0; i < 8; i++) {
        setTimeout(createFloatingHeart, i * 500);
    }

    setInterval(createFloatingHeart, 1800);

});

// ROMANTIC LOVE QUIZ

const loveQuestions = [

    {
        question: "When did our beautiful story begin?",
        answers: [
            "October 21, 2024",
            "January 1, 2025",
            "February 14, 2024"
        ],
        correct: 0,
        message: "Yes! The day of our very first video call. ♥"
    },

    {
    question: "What was our first meeting like?",
    answers: [
        "A coffee date",
        "A video call ❤️",
        "A movie date"
    ],
    correct: 1,
    message: "Yes! Our very first video call, and the beginning of our love story. ♥"
},

    {
        question: "What do I want most from you?",
        answers: [
            "A fancy gift",
            "A hundred chocolates",
            "A lifetime of hugs and time together"
        ],
        correct: 2,
        message: "Exactly! All I want is to be close to you. ♥"
    }

];

let currentQuestion = 0;
let loveScore = 0;
let questionAnswered = false;


// SHOW QUESTION

function showQuestion() {

    const question = loveQuestions[currentQuestion];

    document.getElementById("questionArea").style.display = "block";
    document.getElementById("gameResult").classList.remove("show");

    document.getElementById("questionCount").textContent =
        `QUESTION ${currentQuestion + 1} OF ${loveQuestions.length}`;

    document.getElementById("progressFill").style.width =
        `${(currentQuestion / loveQuestions.length) * 100}%`;

    document.getElementById("questionText").textContent =
        question.question;

    document.getElementById("gameFeedback").textContent = "";

    const options = document.getElementById("answerOptions");

    options.innerHTML = "";

    questionAnswered = false;

    document.getElementById("nextButton").disabled = true;

    question.answers.forEach(function(answer, index) {

        const button = document.createElement("button");

        button.className = "answer-option";
        button.textContent = answer;

        button.onclick = function() {
            chooseAnswer(index, button);
        };

        options.appendChild(button);

    });

}


// CHOOSE ANSWER

function chooseAnswer(index, button) {

    if (questionAnswered) return;

    questionAnswered = true;

    const question = loveQuestions[currentQuestion];

    const allButtons = document.querySelectorAll(".answer-option");

    allButtons.forEach(function(option) {
        option.disabled = true;
    });

    if (index === question.correct) {

        loveScore++;

        button.classList.add("correct");

        document.getElementById("gameFeedback").textContent =
            question.message;

    } else {

        button.classList.add("wrong");

        allButtons[question.correct].classList.add("correct");

        document.getElementById("gameFeedback").textContent =
            "Almost, my love! The correct answer is highlighted. ♥";

    }

    document.getElementById("nextButton").disabled = false;

    if (currentQuestion === loveQuestions.length - 1) {

        document.getElementById("nextButton").textContent =
            "See your surprise ♥";

    }

}


// NEXT QUESTION

function nextQuestion() {

    if (!questionAnswered) return;

    currentQuestion++;

    if (currentQuestion < loveQuestions.length) {

        showQuestion();

    } else {

        showResult();

    }

}


// SHOW FINAL RESULT

function showResult() {

    document.getElementById("questionArea").style.display = "none";

    document.getElementById("progressFill").style.width = "100%";

    document.getElementById("questionCount").textContent =
        "OUR LITTLE LOVE STORY";

    const result = document.getElementById("gameResult");

    result.classList.add("show");

    if (loveScore === 3) {

        document.getElementById("resultTitle").textContent =
            "You know me so well!";

        document.getElementById("resultText").textContent =
            "Three out of three! You know my heart, my love. " +
            "Happy anniversary, my forever person. ♥";

    } else {

        document.getElementById("resultTitle").textContent =
            "You are still my favourite!";

        document.getElementById("resultText").textContent =
            `${loveScore} out of 3! No matter your score, ` +
            "you are the person I would choose every single time. ♥";

    }

    heartBurst();

}


// RESTART GAME

function restartGame() {

    currentQuestion = 0;
    loveScore = 0;

    showQuestion();

}


// START GAME

showQuestion();