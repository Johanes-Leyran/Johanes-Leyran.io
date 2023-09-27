let text = document.getElementsByClassName('type')[0].innerHTML.replace(/\s+/g,' ').trim();
document.getElementsByClassName('type')[0].innerHTML = '';
document.getElementsByClassName('type')[0].style.visibility = "visible";

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

function showContinue() {
    document.getElementsByClassName('continue')[0].style.visibility = 'visible';
}

async function idle() {
    setInterval(async () => {
        let prevText = document.getElementsByClassName('type')[0].innerHTML;

        if (prevText.charAt(prevText.length - 1) == '|') {
            let newText = document.getElementsByClassName('type')[0].innerHTML.substring(0, prevText.length-1);
            document.getElementsByClassName('type')[0].innerHTML = newText;
        }
        else {
            document.getElementsByClassName('type')[0].innerHTML += '|';
        }
    }, 500);
}

async function type() {
    for(let i = 0;i < text.length;i++) {
        let prevText = document.getElementsByClassName('type')[0].innerHTML;

        if (prevText.length != 0 && prevText.charAt(prevText.length-1) == '|') {
            let newText = document.getElementsByClassName('type')[0].innerHTML.substring(0, prevText.length-1);
            document.getElementsByClassName('type')[0].innerHTML = newText;
        }

        document.getElementsByClassName('type')[0].innerHTML += text.charAt(i);

        if(i != text.length-1) {
            document.getElementsByClassName('type')[0].innerHTML += '|';
        }
        await sleep(50); 
    }
}


window.onload = async function () {
    await type();
    idle();
    await sleep(300);
    showContinue();
}