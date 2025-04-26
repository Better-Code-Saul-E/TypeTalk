const elements = {
    input: document.getElementById("input-textarea"),
    characterCount: document.getElementById("character-count"),
    wordCount: document.getElementById("word-count"),
    playPauseButton: document.getElementById("play-pause-button"),
    stopButton: document.getElementById("stop-button"),
    restartButton: document.getElementById("restart-button"),
    voiceSelect: document.getElementById("voices")
};

elements.input.addEventListener("input", () => {
    elements.characterCount.textContent = elements.input.value.length;
    let text = elements.input.value.trim();
    let words = text.split(/\s+/);
    elements.wordCount.textContent = text.length === 0 ? 0 : words.length;
});

let speech = new SpeechSynthesisUtterance();
let voices = [];

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();

    if (voices.length > 0) {
        speech.voice = voices[0];
    }
    speech.voice = voices[0];

    voices.forEach((voice, i) => {
        elements.voiceSelect.options[i] = new Option(voice.name, i);
    });
}

elements.voiceSelect.addEventListener("change", () => {
    speech.voice = voices[elements.voiceSelect.value];
});

function readAloud () {

    speech.text = elements.input.value;
    window.speechSynthesis.speak(speech);
} 

elements.playPauseButton.addEventListener("click", () => {
    if (window.speechSynthesis.speaking) {
        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
        } else {
            window.speechSynthesis.pause();
        }
    } else {
        window.speechSynthesis.cancel();
        readAloud();
    }
});

elements.restartButton.addEventListener("click", () => {
    window.speechSynthesis.cancel();
    readAloud();
});
elements.stopButton.addEventListener("click", () => {
    window.speechSynthesis.cancel();
});
