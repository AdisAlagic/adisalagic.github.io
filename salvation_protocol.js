let commands;

const FAST = 0;
const MEDIUM = 1;
const SLOW = 2;

const ERROR = "Error"

document.addEventListener('DOMContentLoaded', async (event) => {
    commands = document.querySelector(".commands");
    let vis = false;
    setInterval(() => {
        setCursorVisibility(vis)
        vis = !vis;
    }, 500)
    createMessage()
    await initMsg("Initiating systems");
    await initMsg("Connecting to weapons", SLOW);
    await initMsg("Fetching database of weapons", MEDIUM)
    await initMsg("Checking main generator status", SLOW, ERROR)
    appendMessage("Couldn't connect to main generator. Attempt to use spare generators...")
    await initMsg("Checking GEN#" + getRandomIntInclusive(1000, 9999), MEDIUM, ERROR)
    await initMsg("Checking GEN#" + getRandomIntInclusive(1000, 9999), MEDIUM, ERROR)
    await initMsg("Checking GEN#" + getRandomIntInclusive(1000, 9999), MEDIUM, ERROR)
    await initMsg("Checking GEN#" + getRandomIntInclusive(1000, 9999), FAST)
    appendMessage("Generator power: " + getRandomIntInclusive(20, 40) + "%")
    appendMessage("Would you like to continue? Yes/No")
    appendMessage(">", false)
    await type("Yes")
    await initMsg("Preparing weapons", SLOW)
    let attemptsCount = 1;
    while (true){
        await initMsg("Connecting to \"SEARCH AND DESTROY SYSTEM\"", SLOW, ERROR)
        appendMessage("Retrying, attempt #" + attemptsCount)
        window.scrollTo(0, document.body.scrollHeight);
        attemptsCount++;
    }
});

function setCursorVisibility(visible){
    document.querySelector('.cursor').style.color = visible ? "#e3e3e3" : "transparent";
}

function createMessage(){
    commands.innerText = "Humanity Salvation Protocol v1.4-x3.\n"
    appendMessage("Please use in case of emergency or global disaster.")
}

function appendMessage(msg, lineBreak = true){
    commands.innerText += msg + (lineBreak ? '\n' : "")
}

async function type(msg){
    for (var i = 0; i < msg.length; i++) {
        const ch = msg[i];
        appendMessage(ch, false);
        await delay(getRandomIntInclusive(100, 1500))
    }
    appendMessage("")
}

async function initMsg(msg, speedType, result = "OK"){
    await delay(getRandomIntInclusive(100, 400))
    appendMessage(msg, false)
    switch (speedType){
        case FAST:
            appendMessage("..." + result);
            break;
        default:
        case MEDIUM:
            for (let i = 0; i < 3; i++) {
                appendMessage(".", false)
                await delay(getRandomIntInclusive(100, 300))
            }
            appendMessage(result)
            break;
        case SLOW:
            for (let i = 0; i < 3; i++) {
                appendMessage(".", false)
                await delay(getRandomIntInclusive(400, 1000))
            }
            appendMessage(result)
            break;
    }
}

const delay = ms => new Promise(res => setTimeout(res, ms));

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}