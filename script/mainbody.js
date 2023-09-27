let indexInfo = 1;
const finished = []

document.getElementById('next').onclick = () => {   
    document.getElementById('info-' + indexInfo).style.visibility = 'hidden';
    indexInfo++;

    if(indexInfo > 1 && finished.includes(indexInfo)) {
        document.getElementById('back').style.visibility = 'visible';
    }
    if(indexInfo == 3 || !finished.includes(indexInfo)) {
        document.getElementById('next').style.visibility = 'hidden';
        
        if(!finished.includes(indexInfo)) {
            document.getElementById('back').style.visibility = 'hidden';
        }
    }
    if(finished.includes(indexInfo)) {
        document.getElementById('info-' + indexInfo).style.visibility = 'visible';
    } else{
        startType();
    }
}

document.getElementById('back').onclick = () => {
    document.getElementById('info-' + indexInfo).style.visibility = 'hidden';
    indexInfo--;

    if(indexInfo < 3) {
        document.getElementById('next').style.visibility = 'visible';
    }

    if(indexInfo == 1) {
        document.getElementById('back').style.visibility = 'hidden';
    }

    document.getElementById('info-' + indexInfo).style.visibility = 'visible';

}

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

async function startType() {
    const arrayElements = document.getElementsByClassName('type-' + indexInfo);
    const arrayTexts = [];

    for(let i = 0;i < arrayElements.length;i++) {
        arrayTexts.push(arrayElements[i].innerHTML.replace(/\s+/g,' ').trim());
        arrayElements[i].innerHTML = '';
    }

    document.getElementById('info-' + indexInfo).style.visibility = 'visible';

    for(let i = 0;i < arrayElements.length;i++) {
        let currentElement = arrayElements[i];
        let currentText = arrayTexts[i];

        for (let j = 0;j < currentText.length;j++) {
            let prevText = currentElement.innerHTML;

            if(prevText.length != 0 && prevText.charAt(prevText.length - 1) == '|') {
                let newText = currentElement.innerHTML.substring(0, prevText.length -1);
                currentElement.innerHTML = newText;
            }
            currentElement.innerHTML += currentText.charAt(j);

            if(j != currentText.length - 1) {
                currentElement.innerHTML += '|';
            }

            await sleep(20);
        }

        if (i == arrayElements.length - 1) {
            setInterval(() => {
                let text = currentElement.innerHTML;

                if(text.charAt(text.length - 1) == '|') {
                    let newText = currentElement.innerHTML.substring(0, text.length - 1);
                    currentElement.innerHTML = newText;
                }
                else {
                    currentElement.innerHTML += '|';
                }
            }, 500);
        }
    }
    finished.push(indexInfo);

    if (indexInfo != 3) {
        document.getElementById('next').style.visibility = 'visible';
    } 
    if (indexInfo != 1) {
        document.getElementById('back').style.visibility = 'visible';
    } 
}

window.onload = () => {
    startType();
}