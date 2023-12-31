// Setting Game Name
let gameName = "Wordle";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `Created by &#9400 2023 Omar.`;

// Setting Game Options
let numOfTries = 6;
let numOfLetters = 5;
let currentTry = 1;

function generateInput() {
    const inputsContainer = document.querySelector(".inputs");

    //Create Main tryDiv
    for (let i = 1; i <= numOfTries; i++) {
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        // tryDiv.innerHTML = `<span>Try ${i}</span>`;

        if (i !== 1) tryDiv.classList.add("disabled-inputs");

        //Create Inputs
        for (let j = 1; j <= numOfLetters; j++) {
            const input = document.createElement("input");
            input.type = "text";
            input.id = `guess-${i}-letter-${j}`;
            input.maxLength = 1;
            tryDiv.appendChild(input);
        }

        inputsContainer.appendChild(tryDiv);
    }

    inputsContainer.children[0].children[0].focus();

    // Disable All Inputs Except The First One
    const inputsInDisabledDiv = document.querySelectorAll(".disabled-inputs input");
    inputsInDisabledDiv.forEach((input) => (input.disabled = true));

    const inputs = document.querySelectorAll("input");
    inputs.forEach((input, index) => {
        // Convert Input to Upper case
        input.addEventListener("input", function () {
            this.value = this.value.toUpperCase();
            const nextInput = inputs[index + 1];
            if (nextInput) nextInput.focus();
        });

        input.addEventListener("keydown", function (event) {
            // console.log(event);
            const currentIndex = Array.from(inputs).indexOf(event.target); //or this
            if (event.key === "ArrowRight") {
                const nextInput = currentIndex + 1;
                if (nextInput < inputs.length) inputs[nextInput].focus();
            }
            if (event.key === "ArrowLeft") {
                const nextInput = currentIndex - 1;
                if (nextInput >= 0) inputs[nextInput].focus();
            }
        });
    });

}
window.onload = function () { generateInput(); };