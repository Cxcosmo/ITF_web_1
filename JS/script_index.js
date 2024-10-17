const quote = document.getElementById("quote");
const quotes = ["Less Is More, Simple Is Key", "Work Smart and Rest More", "Work With Focus, Prevail with Caution", "Unleash Sweet Delight, Unwrap and Indulge"]
const quote1 = document.getElementById("quote1");
const quotes1 = ["Complexity has no place here. Just keep everything simple.", 
                "Take breaks at the right time... to minimize the annoyance of working.", 
                "Whether she takes it too seriously or not seriously enough, it's her enemy who ends up suffering from it.",
                "Savoring the lollipop and concealing her true thoughts."]

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

async function playQuote(q, text) {
    let display = "";
    const playingPerC = Math.floor(3000 / text.length);
    for (let i = 0; i < text.length; i++) {
        display += text[i];
        q.innerText = display;
        await sleep(playingPerC);
    }
    await sleep(3000);
    for (let i = 0; i < text.length; i++) {
        display = text.slice(0, text.length - i);
        q.innerText = display;
        await sleep(Math.ceil(playingPerC / 2));
    }
}

let quoteIndex = 0;

async function start() {
    while (true) {
        await playQuote(quote, quotes[quoteIndex]);
        quoteIndex++;
        if (quoteIndex >= quotes.length) {
            quoteIndex = 0;
        }
    }
}
async function start2() {
    while (true) {
        await playQuote(quote1, quotes1[quoteIndex]);
        quoteIndex++;
        if (quoteIndex >= quotes1.length) {
            quoteIndex = 0;
        }
    }
}

start();
start2();