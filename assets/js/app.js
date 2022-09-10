const canvas = document.querySelector('canvas');
const newGame = document.getElementById('new-game');
const secondBack = document.getElementById('second-back');
const thirdBack = document.getElementById('third-back');
const letters = document.getElementById('letters');
const firstSection = document.getElementById('first');
const secondSection = document.getElementById('second');
const thirdSection = document.getElementById('third');
const start = document.getElementById('start');
const add = document.getElementById('add');
const save = document.getElementById('save');
const textarea = document.querySelector('textarea');
const noLetters = document.getElementById('no-letters');


let ctx = canvas.getContext('2d');

ctx.canvas.width = 0;
ctx.canvas.height = 0;

const body = [
    [4,2,1,1],
    [4,3,1,2],
    [3,5,1,1],
    [5,5,1,1],
    [3,3,1,1],
    [5,3,1,1]
]

const words = [
    'JAVA', 'PHP', 'CSS', 'PYTHON', 'GOLANG', 'SOLANA' 
]


let selectedWord;
let usedLetters;
let fails;
let hits;

const randomWord = () => {
    selectedWord = words[Math.floor(Math.random()*words.length)].split('')
    console.log(selectedWord);

}

const drawWord = () => {
    selectedWord.forEach( letter => {
        const letterWord = document.createElement('p');
        letterWord.innerHTML = letter;
        letterWord.classList.add('letter');
        letterWord.classList.add('hidden');
        letters.appendChild(letterWord);
    });
}

const  verifyLetter = ( e ) => {
    let newLetter = e.key.toUpperCase();
    if(newLetter.match(/^[a-z]$/i) && !usedLetters.includes(newLetter)){
        evalLetter( newLetter )
    }
}

const evalLetter = (e) => {
    if(selectedWord.includes( e )) {
        correctLetter( e );
    }else {
        wrongLetter( e );
    }
}

const correctLetter = ( e ) => {
    const { children } = letters;
    for(let i = 0; i < children.length; i++) {
        if(children[i].innerHTML === e && children[i].classList.value == 'letter hidden') {
            children[i].classList.toggle('hidden');
            hits++;
        }
    }
    if(hits === selectedWord.length) {
        endGame();
        Swal.fire(
            { 
                title: 'Win!',
                text: 'Good luck!',
                icon: 'success',
                background: '#212534',
                color: 'white'
            }
        )
        newGame.style.opacity = 1;
    }
}

const wrongLetter = ( e ) => {
    const noLetter = document.createElement('p');
    noLetter.innerHTML = e;
    noLetter.classList.add('no-letter');
    noLetters.appendChild(noLetter)
    addBody(body[fails]);
    fails++;
    if(fails === body.length) {
        endGame();
        Swal.fire(
            { 
                title: 'Lost!',
                text: `The secret word was "${selectedWord.join('')}"`,
                icon: 'error',
                background: '#212534',
                color: 'white'
            }
        )
        newGame.style.opacity = 1;
    noLetters.innerText = '';
    }
}

const addBody = ( e ) => {
    ctx.fillStyle = 'lightgray';
    ctx.fillRect(...e);
}

const endGame = () => {
    document.removeEventListener('keydown', verifyLetter);
    newGame.disabled = false;
}

const drawMan = () => {
    ctx.canvas.width = 120;
    ctx.canvas.height = 160;
    ctx.scale(20, 20);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0,7, 4, 1);
    ctx.fillRect(1, 0, 1, 8);
    ctx.fillRect(2, 0, 3, 1);
    ctx.fillRect(4, 1, 1, 1);
}

const setNewGame = () => {
    usedLetters = [];
    fails = 0;
    hits = 0;
    newGame.disabled = true;
    newGame.style.opacity = .8
    letters.innerText = ''
    drawMan();
    randomWord();
    drawWord();
    document.addEventListener('keydown', verifyLetter)
    console.log('newgame');
}


newGame.addEventListener('click', setNewGame)


//start game
const continuePage = () => {
    firstSection.style.display = 'none';
    thirdSection.style.display = 'flex';
}
start.addEventListener('click', continuePage);

// Go menu
const goMenu = () => {
    secondSection.style.display = 'none';
    firstSection.style.display = 'flex';
}
secondBack.addEventListener('click', goMenu);

// Go back from second page
const addWord = () => {
    secondSection.style.display = 'flex';
    firstSection.style.display = 'none';
}
add.addEventListener('click', addWord);

//Save word and Start
const saveWord = () => {
    if(textarea.value.split('').length > 8 || textarea.value == '') {
        Swal.fire(
            { 
                title: 'Error!',
                text: `Read the indications`,
                icon: 'error',
                background: '#212534',
                color: 'white'
            }
        )
    }else {
        words.push(textarea.value.toUpperCase());
        secondSection.style.display = 'none';
        thirdSection.style.display = 'flex';


    }
    console.log(words);

}
save.addEventListener('click', saveWord);


// Go back from third page
const thBack = () => {
    thirdSection.style.display = 'none';
    firstSection.style.display = 'flex';
    document.removeEventListener('keydown', verifyLetter);
    newGame.disabled = false;
    newGame.style.opacity = 1;
    letters.innerText = '';
    noLetters.innerText = '';
    usedLetters = [];
    fails = 0;
    hits = 0;
    drawMan();
    randomWord();
    drawWord();



}

thirdBack.addEventListener('click', thBack);
