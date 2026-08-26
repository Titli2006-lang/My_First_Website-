/* =========================
   QUIZ QUESTIONS
========================= */

const questions = [

    {
        question: "What is my favorite hobby?",

        image: "images/hobby.jpg",

        options: [
            {
                text: "Drawing",
                image: "images/drawing.jpg"
            },

            {
                text: "Gaming",
                image: "images/gaming.jpg"
            },

            {
                text: "Cooking",
                image: "images/cooking.jpg"
            },

            {
                text: "Sleeping",
                image: "images/sleeping.jpg"
            }
        ],

        correct: 0
    },


    {
        question: "What would I choose for a free day?",

        image: "images/freeday.jpg",

        options: [
            {
                text: "Stay at home",
                image: "images/home.jpg"
            },

            {
                text: "Go shopping",
                image: "images/shopping.jpg"
            },

            {
                text: "Travel somewhere",
                image: "images/travel.jpg"
            },

            {
                text: "Study all day",
                image: "images/study.jpg"
            }
        ],

        correct: 0
    },


    {
        question: "Which type of food do I like most?",

        image: "images/food.jpg",

        options: [
            {
                text: "Pizza",
                image: "images/pizza.jpg"
            },

            {
                text: "Biryani",
                image: "images/biryani.jpg"
            },

            {
                text: "Burger",
                image: "images/burger.jpg"
            },

            {
                text: "Noodles",
                image: "images/noodles.jpg"
            }
        ],

        correct: 1
    },


    {
        question: "Which activity I will enjoy to do with you the most?",

        image: "images/activity.jpg",

        options: [
            {
                text: "doing PNPC",
                image: "images/pnpc.jpg"
            },

            {
                text: "Watching movies",
                image: "images/movie.jpg"
            },

            {
                text: "Playing games",
                image: "images/game.jpg"
            },

            {
                text: "Going outside",
                image: "images/outside.jpg"
            }
        ],

        correct: 0
    },


    {
        question: "Which place would I love to visit?",

        image: "images/travel2.jpg",

        options: [
            {
                text: "Beach",
                image: "images/beach.jpg"
            },

            {
                text: "Mountains",
                image: "images/mountain.jpg"
            },

            {
                text: "Group Trip",
                image: "images/trip.jpg"
            },

            {
                text: "Another Country",
                image: "images/country.jpg"
            }
        ],

        correct: 2
    }

];



/* =========================
   VARIABLES
========================= */

let currentQuestion = 0;

let score = 0;

let selectedAnswer = null;

let playerName = "";


/*
This array will remember
what the person selected.
*/

let userAnswers = [];



/* =========================
   GET HTML ELEMENTS
========================= */

const welcomeScreen =
    document.getElementById("welcome-screen");

const quizScreen =
    document.getElementById("quiz-screen");

const resultScreen =
    document.getElementById("result-screen");


const nameInput =
    document.getElementById("name-input");


const startButton =
    document.getElementById("start-btn");


const questionNumber =
    document.getElementById("question-number");


const questionElement =
    document.getElementById("question");


const questionImage =
    document.getElementById("question-image");


const optionsElement =
    document.getElementById("options");


const nextButton =
    document.getElementById("next-btn");


const progressBar =
    document.getElementById("progress-bar");


const resultTitle =
    document.getElementById("result-title");


const resultMessage =
    document.getElementById("result-message");


const finalScore =
    document.getElementById("final-score");


const percentageElement =
    document.getElementById("percentage");


const resultDetails =
    document.getElementById("result-details");


const restartButton =
    document.getElementById("restart-btn");

const resultIcon =
    document.getElementById("result-icon");



/* =========================
   START QUIZ
========================= */

startButton.addEventListener("click", () => {

    playerName =
        nameInput.value.trim();


    /*
    Don't allow an empty name.
    */

    if (playerName === "") {

        nameInput.style.borderColor = "#ef4444";

        nameInput.placeholder =
            "Please enter your name";

        return;

    }


    /*
    Reset everything.
    */

    currentQuestion = 0;

    score = 0;

    userAnswers = [];


    /*
    Hide welcome page.
    */

    welcomeScreen.classList.add("hidden");


    /*
    Show quiz page.
    */

    quizScreen.classList.remove("hidden");


    /*
    Show first question.
    */

    showQuestion();

});



/* =========================
   SHOW QUESTION
========================= */

function showQuestion() {



    /*
    Reset selected answer.
    */

    selectedAnswer = null;


    
    /*
    Disable NEXT.
    */

    nextButton.disabled = true;


    /*
    Get current question.
    */

    const question =
        questions[currentQuestion];


    /*
    Question number.
    */

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;


    /*
    Question text.
    */

    questionElement.textContent =
        question.question;


    /*
    Question image.
    */

    if (question.image) {

        questionImage.src =
            question.image;

        questionImage.style.display =
            "block";

    }
    else {

        questionImage.style.display =
            "none";

    }


    /*
    Remove old options.
    */

    optionsElement.innerHTML = "";


    /*
    Create new options.
    */

    question.options.forEach(
        (option, index) => {

            const button =
                document.createElement("button");


            button.classList.add("option");


            /*
            Create image.
            */

            const image =
                document.createElement("img");


            image.src =
                option.image;


            image.alt =
                option.text;


            /*
            Create text.
            */

            const text =
                document.createElement("div");


            text.classList.add(
                "option-text"
            );


            text.textContent =
                option.text;


            /*
            Put image + text
            inside button.
            */

            button.appendChild(image);

            button.appendChild(text);


            /*
            When clicked,
            select the answer.
            */

            button.addEventListener(
                "click",
                () => {

                    selectAnswer(
                        index,
                        button
                    );

                }
            );


            optionsElement.appendChild(
                button
            );

        }
    );


    /*
    Update progress.
    */

    updateProgress();


}



/* =========================
   SELECT ANSWER
========================= */

function selectAnswer(
    index,
    button
) {

    const allOptions =
        document.querySelectorAll(
            ".option"
        );


    /*
    Remove previous selection.
    */

    allOptions.forEach(
        option => {

            option.classList.remove(
                "selected"
            );

        }
    );


    /*
    Highlight selected option.
    */

    button.classList.add(
        "selected"
    );


    /*
    Remember selection.
    */

    selectedAnswer = index;


    /*
    Enable NEXT.
    */

    nextButton.disabled = false;

}



/* =========================
   CHECK ANSWER
========================= */

function checkAnswer() {

    const question =
        questions[currentQuestion];


    const allOptions =
        document.querySelectorAll(
            ".option"
        );


    /*
    Show correct answer.
    */

    allOptions.forEach(
        (option, index) => {

            option.disabled = true;


            if (
                index === question.correct
            ) {

                option.classList.add(
                    "correct"
                );

            }


            /*
            Show wrong answer.
            */

            if (
                index === selectedAnswer &&
                selectedAnswer !== question.correct
            ) {

                option.classList.add(
                    "wrong"
                );

            }

        }
    );


    /*
    Check score.
    */

    const isCorrect =
        selectedAnswer === question.correct;


    if (isCorrect) {

        score++;

    }


    /*
    Save the user's answer.
    */

    userAnswers.push({

        question:
            question.question,

        selected:
            selectedAnswer,

        correct:
            question.correct,

        isCorrect:
            isCorrect

    });

}



/* =========================
   NEXT BUTTON
========================= */

nextButton.addEventListener(
    "click",
    () => {

        if (
            selectedAnswer === null
        ) {

            return;

        }



        /*
        Check answer first.
        */

        checkAnswer();


        /*
        Small delay so the user
        can see correct/wrong.
        */

        setTimeout(
            () => {

                currentQuestion++;


                if (
                    currentQuestion <
                    questions.length
                ) {

                    showQuestion();

                }
                else {

                    showResult();

                }

            },
            700
        );

    }
);



/* =========================
   PROGRESS BAR
========================= */

function updateProgress() {

    const progress =
        (
            (currentQuestion + 1)
            /
            questions.length
        ) * 100;


    progressBar.style.width =
        `${progress}%`;

}




/* =========================
   SHOW RESULT
========================= */

function showResult() {



    /*
    Hide quiz.
    */

    quizScreen.classList.add(
        "hidden"
    );


    /*
    Show result.
    */

    resultScreen.classList.remove(
        "hidden"
    );


    /*
    Score.
    */

    finalScore.textContent =
        `${score} / ${questions.length}`;


    /*
    Percentage.
    */

    const percentage =
        Math.round(
            (
                score /
                questions.length
            ) * 100
        );


    percentageElement.textContent =
        `${percentage}% correct`;


    /*
    Personalized message.
    */

    resultTitle.textContent =
        `${playerName}'s Result`;


    if (percentage === 100) {

        resultIcon.textContent = "🤯";
        resultMessage.textContent =
            "oh hooooooooooooo!😲Here is the Winner!😍 You know me better than my own mirror.🤔Blink twice if you're actually a secret agent tracking my chaotic life...😂😂😂😂";

    }
    else if (percentage >= 60) {

        resultIcon.textContent = "😏";
        resultMessage.textContent =
            "You know the basics… but the real me is still a mystery! 🕵️‍♀️🔎😂";

    }
    else if (percentage >= 40) {

         resultIcon.textContent = "🧐";
        resultMessage.textContent =
           "Okay… I'm starting to think you don't know me at all! 😭😂";

    }
    else {

        resultIcon.textContent = "😭";
        resultMessage.textContent =
            "Oh no… we clearly need to have a serious conversation! 😂💀";

    }


    /*
    Clear previous results.
    */

    resultDetails.innerHTML = "";


    /*
    Create answer review.
    */

    userAnswers.forEach(
        (answer, index) => {

            const question =
                questions[index];


            const item =
                document.createElement(
                    "div"
                );


            item.classList.add(
                "result-item"
            );


            /*
            Question number.
            */

            const questionText =
                document.createElement(
                    "div"
                );


            questionText.classList.add(
                "result-question"
            );


            questionText.textContent =
                `Q${index + 1}`;


            /*
            Answer information.
            */

            const answerText =
                document.createElement(
                    "div"
                );


            answerText.classList.add(
                "result-answer"
            );


            if (
                answer.selected === -1
            ) {

                answerText.innerHTML =
                    `<span class="answer-wrong">
                        No answer
                    </span>
                    <br>
                    Correct:
                    ${question.options[question.correct].text}`;

            }
            else if (
                answer.isCorrect
            ) {

                answerText.innerHTML =
                    `<span class="answer-correct">
                        ✓ ${question.options[answer.selected].text}
                    </span>`;

            }
            else {

                answerText.innerHTML =
                    `<span class="answer-wrong">
                        ✗ ${question.options[answer.selected].text}
                    </span>
                    <br>
                    Correct:
                    ${question.options[question.correct].text}`;

            }


            item.appendChild(
                questionText
            );


            item.appendChild(
                answerText
            );


            resultDetails.appendChild(
                item
            );

        }
    );

}



/* =========================
   RESTART
========================= */

restartButton.addEventListener(
    "click",
    () => {



        currentQuestion = 0;

        score = 0;

        selectedAnswer = null;

        userAnswers = [];


        /*
        Hide result.
        */

        resultScreen.classList.add(
            "hidden"
        );


        /*
        Show welcome screen.
        */

        welcomeScreen.classList.remove(
            "hidden"
        );


        /*
        Clear name.
        */

        nameInput.value = "";

    }
);