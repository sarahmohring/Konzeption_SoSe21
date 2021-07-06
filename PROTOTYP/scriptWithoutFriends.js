"use strict";
var WithoutFriends;
(function (WithoutFriends) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        // create button to go to next page
        let seeHowItWorks = document.getElementById("seeHowItWorks");
        seeHowItWorks.addEventListener("pointerup", displayInstructions);
    }
    function displayInstructions(_event) {
        // hide last page, display new page
        let letsGetStarted = document.getElementById("letsGetStarted");
        letsGetStarted.style.display = "none";
        let instructions = document.getElementById("instrPage");
        instructions.style.display = "initial";
        // write input from form #1 as player 1 name
        let formData = new FormData(document.forms[0]);
        let name = formData.get("Name")?.toString();
        let playerName = document.getElementById("name1");
        playerName.innerHTML = "<br><b>" + name + "</b>";
        // create button to go to next page
        let startPlaying = document.getElementById("startPlaying");
        startPlaying.addEventListener("pointerup", displayWriteSentence);
    }
    function displayWriteSentence(_event) {
        // hide last page, display new page
        let instructions = document.getElementById("instrPage");
        instructions.style.display = "none";
        let writeASentence = document.getElementById("writeASentence");
        writeASentence.style.display = "initial";
        // create button to go to next page
        let sendSentence = document.getElementById("createGame");
        sendSentence.addEventListener("pointerup", displayDrawingCanvas);
    }
    function displayDrawingCanvas(_event) {
        // hide last page, display new page
        let writeASentence = document.getElementById("writeASentence");
        writeASentence.style.display = "none";
        let drawingCanvas = document.getElementById("drawingCanvas");
        drawingCanvas.style.display = "initial";
        // write input from form #2 as sentence to draw
        let formData = new FormData(document.forms[1]);
        let sentence = formData.get("Name")?.toString();
        let sentenceInput = document.getElementById("sentenceInput");
        sentenceInput.innerHTML = "<q>" + sentence + "</q>";
        // create button to go to next page
        let save = document.getElementById("save");
        save.addEventListener("pointerup", saveDrawing);
    }
    function saveDrawing(_event) {
        // hide last page, display new page
        let drawingCanvas = document.getElementById("drawingCanvas");
        drawingCanvas.style.display = "none";
        let guessDrawing = document.getElementById("guessDrawing");
        guessDrawing.style.display = "initial";
        // save Canvas Drawing as img and put into 2nd canvas (guessSentence page)
        let canvas = document.querySelector("canvas");
        let canvas2 = document.getElementById("drawn");
        canvas2.width = canvas.width;
        canvas2.height = canvas.height;
        let crc2 = canvas2.getContext("2d");
        crc2.drawImage(canvas, 0, 0);
        // create button to go to next page
        let sendGuess = document.getElementById("send");
        sendGuess.addEventListener("pointerup", displayYourResults);
    }
    function displayYourResults(_event) {
        // hide last page, display new page
        let guessDrawing = document.getElementById("guessDrawing");
        guessDrawing.style.display = "none";
        let yourResults = document.getElementById("yourResults");
        yourResults.style.display = "initial";
        // write input from form #1 as writer / guesser name
        let formData = new FormData(document.forms[0]);
        let name = formData.get("Name")?.toString();
        let yourName = document.getElementById("yourName");
        yourName.innerHTML = name;
        let yourNameAgain = document.getElementById("yourNameAgain");
        yourNameAgain.innerHTML = name;
        // put written sentence at the top
        let formData1 = new FormData(document.forms[1]);
        let sentence = formData1.get("Name")?.toString();
        let writtenSentence = document.getElementById("writtenSentence");
        writtenSentence.innerHTML = "<q>" + sentence + "</q>";
        // put guessed sentence at the bottom
        let formData2 = new FormData(document.forms[2]);
        let sentence2 = formData2.get("Name")?.toString();
        let guessedSentence = document.getElementById("guessedSentence");
        guessedSentence.innerHTML = "<q>" + sentence2 + "</q>";
        // display canvas image result
        let canvas = document.querySelector("canvas");
        let canvas3 = document.getElementById("drawingResult");
        canvas3.width = canvas.width;
        canvas3.height = canvas.height;
        let crc3 = canvas3.getContext("2d");
        crc3.drawImage(canvas, 0, 0);
        // download!!
        let download = document.getElementById("yourDownload");
        download.addEventListener("pointerup", downloadDrawing);
        // create button to start again
        let playAgain = document.getElementById("playAgain");
        playAgain.addEventListener("pointerup", playAnotherGame);
    }
    function downloadDrawing() {
        let canvas = document.querySelector("canvas");
        let image = canvas.toDataURL("image/png");
        window.location.href = image;
    }
    function playAnotherGame(_event) {
        // reload page
        location.reload();
        // reset all forms
        let form = document.getElementById("form");
        form.reset();
        let form2 = document.getElementById("form2");
        form2.reset();
        let form3 = document.getElementById("form3");
        form3.reset();
    }
})(WithoutFriends || (WithoutFriends = {}));
//# sourceMappingURL=scriptWithoutFriends.js.map