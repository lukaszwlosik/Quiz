"use strict";
// FIXME
// -> W przyszłości poprawić żeby nie musiało być answer: "A:odpowiedź", tylko żeby mogły być te pytania mieszane!
// -> Dodać też żeby te pytania nie były po kolei, tylko losowane!!

const questions = [
  {
    id: 1,
    question: "Jakie jest główne pożywienie jeży?",
    options: ["Insekty", "Owoce", "Ryby", "Trawa"],
    answer: "A:Insekty",
  },
  {
    id: 2,
    question: "Jak jeże bronią się przed drapieżnikami?",
    options: [
      "Gryzą",
      "Biegną bardzo szybko",
      "Zwijają się w kulkę",
      "Udają martwe",
    ],
    answer: "C:Zwijają się w kulkę",
  },
  {
    id: 3,
    question: "Ile kolców ma dorosły jeż?",
    options: ["Około 100", "Około 500", "Około 2000", "Około 5000"],
    answer: "D:Około 5000",
  },
  {
    id: 4,
    question: "Jak długo jeże hibernują w zimie?",
    options: ["1-2 tygodnie", "1-2 miesiące", "3-4 miesiące", "5-6 miesięcy"],
    answer: "D:5-6 miesięcy",
  },
  {
    id: 5,
    question: "W jakim środowisku najczęściej żyją jeże?",
    options: ["Pustynie", "Las", "Morze", "Wysokie góry"],
    answer: "B:Las",
  },
];

// ZMIENNE I STAŁE Początek
const mainSection = document.querySelector(".main-section");
const correctAnswerSection = document.getElementById("correct-answer");
const correctAnswerBtn = document.getElementById("next-question-btn");

const incorrectAnswerSection = document.getElementById("incorrect-answer");
const incorrectAnswerBtn = document.getElementById("try-again-btn");
let i = 0;

const winningSection = document.getElementById("winning-screen");
const winningBtn = document.getElementById("winning-btn");
// ZMIENNE I STAŁE Koniec

window.addEventListener("DOMContentLoaded", function () {
  displayQuestion(questions, i);
});

const answerTheQuestion = function (section, btn) {
  section.classList.add("active");
  btn.addEventListener("click", () => {
    section.classList.remove("active");
    displayQuestion(questions, i);
  });
};

let displayQuestion = function (item, index) {
  // Funkcja która tworzy strukturę pytań do HTML i decyduje jakie pytanie pojawi się następne
  let convertQuestion = function () {
    return `<section class="content-section">
    <div class="question-section">
    <p class="question">
    ${item[index].question}
          </p>
        </div>

        <div class="answer-section">
        <div class="answer">
        <button class="btn" data-id="a">
        <span class="main-color">A:</span>${item[index].options[0]}
        </button>
        </div>
        <div class="answer">
        <button class="btn" data-id="b">
        <span class="main-color">B:</span>${item[index].options[1]}
        </button>
        </div>
        <div class="answer">
        <button class="btn" data-id="c">
        <span class="main-color">C:</span>${item[index].options[2]}
        </button>
        </div>
          <div class="answer">
          <button class="btn" data-id="d">
          <span class="main-color">D:</span>${item[index].options[3]}
          </button>
          </div>
          </div>
          </section>`;
  };

  mainSection.innerHTML = convertQuestion();
  // Przechwytuje buttony wszystkich odpowiedzi
  const answerBtns = document.querySelectorAll(".btn");
  // console.log(answerBtns);

  // Dla każdego buttona wywołuje klika
  answerBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      // console.log(e.target.innerText);
      // console.log(item[index].answer);
      // Sprawdzenie czy ten przycisk który kliknął użytkownik zgadza się z odpowiedzią. Warunek dla poprawnej odpowiedzi
      if (e.target.innerText == `${item[index].answer}`) {
        // console.log(`Poprawna odpowiedź`);
        i++;
        if (i < questions.length) {
          // FIXME Żeby pytania były randomowo, a nie od pierwszego do ostatniego!
          // Fukcja wywołująca okienko poprawnej odpowiedzi
          answerTheQuestion(correctAnswerSection, correctAnswerBtn);
        } else {
          // FIXME zrobić jakieś fajne okienko kończące grę
          i = 0;
          // Funkcja wywołująca okienko wygranej gry
          answerTheQuestion(winningSection, winningBtn);
        }
      }
      // Warunek dla błędnej odpowiedzi
      else {
        // FIXME też później zrobić żeby randomowo pytania można było odtwarzać, a nie od początku!
        // console.log(`Błędna odpowiedź`);
        i = 0;
        answerTheQuestion(incorrectAnswerSection, incorrectAnswerBtn);
      }
    });
  });
};
