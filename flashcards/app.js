"use strict";

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
}