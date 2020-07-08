const url = "https://random-word-api.herokuapp.com/word?number=100";
const wordInput = document.querySelector("#word-input");
const scoreDisplay = document.querySelector("#score");
const message = document.querySelector("#message");
const timeDisplay = document.querySelector("#time");
const headerTime = document.querySelector("#seconds");
let score = 0;
const gameTime = 5;
let time = gameTime;
let isPlaying = true;


headerTime.innerHTML = gameTime;
const words = [];

init();

// initial 초기 실행
function init() {
    getWords();
    timeDisplay.innerHTML = time;
    wordInput.addEventListener("input", startMatch);
    setInterval(countDown, 1000);
    setInterval(checkStatus, 50);
}

// 단어 가져오기
function getWords() {
    axios.get(url).then((res) => {
        res.data.forEach((word) => {
            if (word.length < 7) {
                words.push(word);
            }
        })
    }).catch((err) => {
        console.log(err);
    })
}



// 함수들
// 게임이 플레이중인지 확인
function checkStatus() {
    if (!isPlaying && time === 0) {
        message.innerHTML = 'GAME OVER';
        score = -1;
    }
}


// 시간을 카운트 다운
function countDown() {
    if (time > 0) {
        time--;
    } else if (time === 0) {
        isPlaying = false;
    }
    timeDisplay.innerHTML = time;
}


// 글자가 맞는지 확인 함수
function startMatch() {
    const currentword = document.querySelector("#current-word");
    // console.log(currentword.innerHTML, wordInput.value, currentword.innerHTML === wordInput.value);
    if (currentword.innerHTML === wordInput.value) {
        score++;
        time = gameTime;
        scoreDisplay.innerHTML = score;
        wordInput.value = "";
        message.innerHTML = "정답 입니다!!!";

        const randomIndex = Math.floor((Math.random() * words.length));
        console.log(randomIndex);
        // const randomIndex = Math.floor()
        currentword.innerHTML = words[randomIndex];
    } else {
        message.innerHTML = '';
    }

    if (score === -1) {
        scoreDisplay.innerHTML = 0;

    } else {
        scoreDisplay.innerHTML = score;
    }
}