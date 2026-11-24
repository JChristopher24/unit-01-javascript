"use strict";

// Checkpoint 1

const EXAM_DATE = new Date(2026, 10, 25);

let msg = document.getElementById("screenMsg");

function checkScreen() {
    if (window.innerWidth < 600) {
        msg.textContent = "Small screen: turn your device sideways for a bigger card.";
    } else {
        msg.textContent = "Window width: " + window.innerWidth + "px";
    }
}

function startApp() {
    checkScreen();

    // Checkpoint 3
    
    document.getElementById("nextBtn").addEventListener("click", nextCard);
    document.getElementById("card").addEventListener("mouseover", highlightCard);
    document.getElementById("card").addEventListener("mouseout", unhighlightCard);
    document.addEventListener("keydown", checkKey);

    showCard(current);

    // Checkpoint 4

    document.getElementById("shuffleBtn").addEventListener("click", shuffleCard);
    document.getElementById("gotBtn").addEventListener("click", markGot);
    document.getElementById("missBtn").addEventListener("click", markMissed);
    document.getElementById("resetBtn").addEventListener("click", resetScore);

    updateScore();
    showCountdown();

}

// Checkpoint 2

function getDomain(objective) {
    switch (objective.charAt(0)) {
        case "1" : return "Operators, Methods, and Keywords";
        case "2" : return "Variables, Data Types, and Functions";
        case "3" : return "Decisions and Loops";
        case "4" : return "Document Object Model";
        case "5" : return "HTML Forms";
        default : return "Unknown Domain";
    }
}

function card(question, answer, objective) {
    this.question = question;
    this.answer = answer;
    this.getLabel = function () {
        return objective + " | " + getDomain(objective);
    }
}

let deck = new Array();

let card1 = new card('"5" + 3', "53", "1.1");
deck.push(card1);

let card2 = new card('let a = 5; let b = a++ b = ?', "6", "1.1");
deck.push(card2);

let card3 = new card("typeof null", "object", "2.1");
deck.push(card3);

let card4 = new card('typeof NaN', 'undefined', '2.1');
deck.push(card4);

let card5 = new card('"5" == 5', "true", "3.1");
deck.push(card5);

let card6 = new card('"5" === 5', "false", "3.1");
deck.push(card6);

let card7 = new card('NaN === NaN', "false", "3.1");
deck.push(card7);

let card8 = new card('parseInt("3.9")', "3", "2.1");
deck.push(card8);

let card9 = new card('(2.5).toFixed(1) returns what type', "string", "2.1");
deck.push(card9);

let card10 = new card('Math.round(-2.5)', "-2", "2.4");
deck.push(card10);

// Checkpoint 3

let current = 0;

    function showCard(index) {
        document.getElementById("cardLabel").textContent = deck[index].getLabel();
        document.getElementById("cardQuestion").textContent = deck[index].question;
        document.getElementById("cardAnswer").textContent = deck[index].answer;
        document.getElementById("cardAnswer").style.display = "none";
        document.getElementById("cardNumber").textContent = "Card " + (index + 1) + " of " + deck.length;
    }

    function flipCard() {
        if (document.getElementById("cardAnswer").style.display === "none") {
            document.getElementById("cardAnswer").style.display = "block";
        } else {
            document.getElementById("cardAnswer").style.display = "none";
        }
    }

    function nextCard() {
        current++;
        if (current % deck.length === 0) {
            current = 0;
        }
        showCard(current);
    }

    function highlightCard() {
        let card = document.getElementById("card");
        card.className = "card highlight";
    }

    function unhighlightCard() {
        let card = document.getElementById("card");
        card.className = "card";
    }

    function checkKey(event) {
        if (event.key === "ArrowRight") {
            nextCard();
        }
    }

// Checkpoint 4

let gotIt = 0;
let missed = 0;

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleCard() {
    current = getRandom(0, deck.length - 1);
    showCard(current);
}

function updateScore() {
    if (document.getElementById("scoreMsg").textContent === "") {
        document.getElementById("scoreMsg").textContent = "No cards scored yet.";
    } else {
        document.getElementById("scoreMsg").textContent = gotIt + " of " + (gotIt + missed) + " correct (" + Math.round((gotIt / (gotIt + missed)) * 100) + "%)"
    }

    if (Math.round((gotIt / (gotIt + missed)) * 100).toFixed(1) >= 90) {
        document.getElementById("scoreMsg").textContent += "Exam ready!";
    } else if (Math.round((gotIt / (gotIt + missed)) * 100).toFixed(1) >= 80) {
        document.getElementById("scoreMsg").textContent += "Almost there. Keep flipping.";
    } else if (Math.round((gotIt / (gotIt + missed)) * 100).toFixed(1) >= 70) {
        document.getElementById("scoreMsg").textContent += "Flip your missed cards again.";
    }
}

function markGot() {
    gotIt += 1;
    current++;
    updateScore();
}

function markMissed() {
    missed += 1;
    current++;
    updateScore();
}

function resetScore() {
    if (confirm("Reset your score to 0?")) {
        gotIt = 0;
        missed = 0;
        document.getElementById("scoreMsg").textContent = "";
        updateScore();
    }
}

function showCountdown() {
    let date = new Date();
    document.getElementById("countdown").textContent = Math.ceil((EXAM_DATE - date) / (1000 * 60 * 60 * 24)) + " days until exam day " + EXAM_DATE.toLocaleDateString("en-US");
    if ( date >= EXAM_DATE ) {
        document.getElementById("countdown").textContent = "Exam day is here " + EXAM_DATE.toLocaleDateString("en-US") + " You've got this!";
    }
}