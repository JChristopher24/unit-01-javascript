"use strict";

const EXAM_DATE = new Date(2026, 10, 25);

function checkScreen() {
    if (window.innerWidth < 600) {
        showError(document.getElementById("screenMsg"), "Small screen: turn your device sideways for a bigger card.")   
    } else {
        showError(document.getElementById("screenMsg"), "Window width: " + window.innerWidth + "px")
    }
}

function startApp() {
    checkScreen();
}