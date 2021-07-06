namespace WithoutFriends {

    window.addEventListener("load", handleLoad);

    function handleLoad(_event: Event): void {

        // create button to go to next page
        let seeHowItWorks: HTMLDivElement = <HTMLDivElement>document.getElementById("seeHowItWorks");
        seeHowItWorks.addEventListener("pointerup", displayInstructions);
    }

    function displayInstructions(_event: PointerEvent): void {

        // hide last page, display new page
        let letsGetStarted: HTMLDivElement = <HTMLDivElement>document.getElementById("letsGetStarted");
        letsGetStarted.style.display = "none";
        let instructions: HTMLDivElement = <HTMLDivElement>document.getElementById("instrPage");
        instructions.style.display = "initial";

        // write input from form #1 as player 1 name
        let formData: FormData = new FormData(document.forms[0]);
        let name: string = <string>formData.get("Name")?.toString();
        let playerName: HTMLDivElement = <HTMLDivElement>document.getElementById("name1");
        playerName.innerHTML = "<br><b>" + name + "</b>";

        // create button to go to next page
        let startPlaying: HTMLDivElement = <HTMLDivElement>document.getElementById("startPlaying");
        startPlaying.addEventListener("pointerup", displayWriteSentence);
    }

    function displayWriteSentence(_event: PointerEvent): void {

        // hide last page, display new page
        let instructions: HTMLDivElement = <HTMLDivElement>document.getElementById("instrPage");
        instructions.style.display = "none";
        let yourResults: HTMLDivElement = <HTMLDivElement>document.getElementById("yourResults");
        yourResults.style.display = "none";
        let writeASentence: HTMLDivElement = <HTMLDivElement>document.getElementById("writeASentence");
        writeASentence.style.display = "initial";

        // create button to go to next page
        let sendSentence: HTMLDivElement = <HTMLDivElement>document.getElementById("createGame");
        sendSentence.addEventListener("pointerup", displayDrawingCanvas);
    }

    function displayDrawingCanvas(_event: PointerEvent): void {

        // hide last page, display new page
        let writeASentence: HTMLDivElement = <HTMLDivElement>document.getElementById("writeASentence");
        writeASentence.style.display = "none";
        let drawingCanvas: HTMLDivElement = <HTMLDivElement>document.getElementById("drawingCanvas");
        drawingCanvas.style.display = "initial";

        // write input from form #2 as sentence to draw
        let formData: FormData = new FormData(document.forms[1]);
        let sentence: string = <string>formData.get("Name")?.toString();
        let sentenceInput: HTMLDivElement = <HTMLDivElement>document.getElementById("sentenceInput");
        sentenceInput.innerHTML = "<q>" + sentence + "</q>";

        // create button to go to next page
        let save: HTMLDivElement = <HTMLDivElement>document.getElementById("save");
        save.addEventListener("pointerup", saveDrawing);
    }

    function saveDrawing(_event: PointerEvent): void {

        // hide last page, display new page
        let drawingCanvas: HTMLDivElement = <HTMLDivElement>document.getElementById("drawingCanvas");
        drawingCanvas.style.display = "none";
        let guessDrawing: HTMLDivElement = <HTMLDivElement>document.getElementById("guessDrawing");
        guessDrawing.style.display = "initial";

        // save Canvas Drawing as img and put into 2nd canvas (guessSentence page)
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");

        let canvas2: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("drawn");
        canvas2.width = canvas.width;
        canvas2.height = canvas.height;
        let crc2: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas2.getContext("2d");
        crc2.drawImage(canvas, 0, 0);

        // create button to go to next page
        let sendGuess: HTMLDivElement = <HTMLDivElement>document.getElementById("send");
        sendGuess.addEventListener("pointerup", displayYourResults);
    }

    function displayYourResults(_event: PointerEvent): void {

        // hide last page, display new page
        let guessDrawing: HTMLDivElement = <HTMLDivElement>document.getElementById("guessDrawing");
        guessDrawing.style.display = "none";
        let yourResults: HTMLDivElement = <HTMLDivElement>document.getElementById("yourResults");
        yourResults.style.display = "initial";

        // write input from form #1 as writer / guesser name
        let formData: FormData = new FormData(document.forms[0]);
        let name: string = <string>formData.get("Name")?.toString();
        let yourName: HTMLElement = <HTMLElement>document.getElementById("yourName");
        yourName.innerHTML = name;
        let yourNameAgain: HTMLElement = <HTMLElement>document.getElementById("yourNameAgain");
        yourNameAgain.innerHTML = name;

        // put written sentence at the top
        let formData1: FormData = new FormData(document.forms[1]);
        let sentence: string = <string>formData1.get("Name")?.toString();
        let writtenSentence: HTMLElement = <HTMLElement>document.getElementById("writtenSentence");
        writtenSentence.innerHTML = "<q>" + sentence + "</q>";

        // put guessed sentence at the bottom
        let formData2: FormData = new FormData(document.forms[2]);
        let sentence2: string = <string>formData2.get("Name")?.toString();
        let guessedSentence: HTMLElement = <HTMLElement>document.getElementById("guessedSentence");
        guessedSentence.innerHTML = "<q>" + sentence2 + "</q>";


        // display canvas image result
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");

        let canvas3: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("drawingResult");
        canvas3.width = canvas.width;
        canvas3.height = canvas.height;
        let crc3: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas3.getContext("2d");
        crc3.drawImage(canvas, 0, 0);

        // download!!
        let download: HTMLImageElement = <HTMLImageElement>document.getElementById("yourDownload");
        download.addEventListener("pointerup", downloadDrawing);

        // create button to start again
        let playAgain: HTMLDivElement = <HTMLDivElement>document.getElementById("playAgain");
        playAgain.addEventListener("pointerup", displayWriteSentence);
    }

    function downloadDrawing(): void {

        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
        let dataURL: string = canvas.toDataURL();
    }
}