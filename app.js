/** * @file Tic-Tac-Toe spēles loģika
 * Šis skripts pārvalda lietotāja interakciju, uzvaras pārbaudi un spēles stāvokli.
 */

// --- DOM Elementu atlase ---

/** @type {NodeList} Visas spēles laukuma rūtiņas */
let boxes = document.querySelectorAll(".box");

/** @type {Element} Poga spēles atiestatīšanai */
let resetBtn = document.querySelector("#reset-btn");

/** @type {Element} Poga jaunas spēles uzsākšanai pēc uzvaras */
let newGameButton = document.querySelector("#new-btn");

/** @type {Element} Galvenais paziņojumu konteiners */
let msgContainer = document.querySelector(".msg-container");

/** @type {Element} Papildu ziņojumu konteiners (ja nepieciešams) */
let msgContainer2 = document.querySelector(".msg-container2");

/** @type {Element} Teksta elements uzvarētāja paziņošanai */
let msg = document.querySelector("#msg");

/** @type {Element} Papildu teksta elements */
let msg2 = document.querySelector("#msg2");

/** @type {Element} Galvenais spēles režģa konteiners */
let container = document.querySelector(".container");

// --- Spēles stāvokļa mainīgie ---

/** @type {number} Veikto gājienu skaits (0-9) */
let count = 0;

/** @type {boolean} Norāda, vai pašlaik ir kārta "O" spēlētājam */
let turnO = true;

/** * Visas iespējamās indeksu kombinācijas uzvarai.
 * @type {Array<Array<number>>} 
 */
const winPatterns = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8],
    [3, 4, 5], [6, 7, 8], [1, 4, 7],
    [2, 5, 8], [2, 4, 6]
];

// --- Spēles Funkcijas ---

/**
 * Pilnībā atiestata spēli: notīra laukumu, atbloķē pogas un paslēpj paziņojumus.
 * @function resetGame
 */
const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    container.classList.remove("hide");
}

/**
 * Deaktivizē visas rūtiņas (izmanto pēc spēles beigām).
 * @function disableBoxes
 */
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

/**
 * Aktivizē visas rūtiņas un iztīra to tekstu jaunai spēlei.
 * @function enableBoxes
 */
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

/**
 * Parāda uzvarētāja ziņojumu un paslēpj spēles laukumu.
 * @function showWinner
 * @param {string} winner - Simbols ("X" vai "O"), kurš uzvarēja.
 */
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    container.classList.add("hide");
    
    // Drošības pārbaude nezināmiem mainīgajiem
    if (typeof hideDisplay !== 'undefined' && hideDisplay == "inline") {
        hide2.style.display = "none";
    }
    disableBoxes(); 
}

/**
 * Apstrādā neizšķirta situāciju, ja visi gājieni ir izdarīti un uzvarētāja nav.
 * @function drawGame
 */
const drawGame = () => {
    if (!checkWinner()) {
        msg.innerText = "This Game is a Draw.";
        msgContainer.classList.remove("hide");
        container.classList.add("hide");
        disableBoxes();
    }
}

/**
 * Pārbauda visas winPatterns kombinācijas pret pašreizējo stāvokli laukumā.
 * @function checkWinner
 * @returns {boolean} True, ja uzvarētājs ir atrasts, citādi false.
 */
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("winner is ", pos1Val);
                showWinner(pos1Val);
                return true;
            }
        }
    }
    return false;
};

// --- Notikumu klausītāji (Event Listeners) ---

/**
 * Pievieno klikšķa notikumu katrai rūtiņai.
 */
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // Ja spēle beigusies, neļaujam klikšķināt
        if (count === 9 || checkWinner()) {
            return;
        }

        if (turnO) {
            box.innerText = "O";
            box.style.color = "white";
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = "cyan";
            turnO = true;
        }

        box.disabled = true;
        count++;

        // Pārbaudām uzvaru pēc katra gājiena
        let isWinner = checkWinner();

        // Ja nav uzvarētāja un visi lauciņi pilni - neizšķirts
        if (count === 9 && !isWinner) {
            drawGame();
        }
    });
});

// Pogu funkcionalitāte
newGameButton.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
