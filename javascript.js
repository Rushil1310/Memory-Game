let arr = [
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', '']
]
let correct_guess = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let emoji = ['🐶', '🐶', '🐬', '🍁', '🐉', '🌏', '🌈', '🍎', '🎳', '🐬', '🍁', '🐉', '🌏', '🌈', '🍎', '🎳'];

let emoji_used = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

for (let i = 0; i < 16; i++) {
    let randint = getRandomInt(16);
    while (emoji_used[randint] != 0) {
        randint = getRandomInt(16);
    }
    arr[Math.floor(i / 4)][i % 4] = emoji[randint];
    emoji_used[randint] = 1;
}

let is_on = 0;
let prev = '';
let work = 0;
let count = 0;
let moves = 0;

function show(num) {
    if (moves >= 29) {
        window.alert("You lost !");
        reset_board();
        return;
    }
    if (correct_guess[Math.floor(num / 4)][num % 4] != 0) {
        window.alert("Already guessed correctly !");
        return;
    }
    if (work >= 2) {
        window.alert("wait a min beta");
        return;
    }
    moves++;
    work++;
    document.getElementById("moves").innerHTML = `Moves ${moves}/30`
    document.getElementById(num).innerHTML = arr[Math.floor(num / 4)][num % 4];

    if (is_on == 1) {
        if (arr[Math.floor(num / 4)][num % 4] == arr[Math.floor(prev / 4)][prev % 4]) {
            if (num == prev) {
                work--;
                moves--;
                document.getElementById("moves").innerHTML = `Moves ${moves}/30`;
                window.alert("Chose something diff !");
                return;
            }
            correct_guess[Math.floor(num / 4)][num % 4] = 1;
            correct_guess[Math.floor(prev / 4)][prev % 4] = 1;
            count++;
            if (count == 8) {
                window.alert('You won !');
                document.getElementById("heading").innerHTML = `Winner !`;
                setTimeout(() => { reset_board(); }, 5000);
                return;
            }
            document.getElementById("heading").innerHTML = `EMOJI'S ${count}/8`;
        } else {
            setTimeout(() => {
                document.getElementById(prev).innerHTML = '';
                document.getElementById(num).innerHTML = '';
            }, 2500);

            setTimeout(() => {
                document.getElementById(num).animate(
                    [
                        { transform: 'rotateY(0deg)' },
                        { transform: 'rotateY(180deg)' }
                    ], { duration: 1000 }
                );
                document.getElementById(prev).animate(
                    [
                        { transform: 'rotateY(0deg)' },
                        { transform: 'rotateY(180deg)' }
                    ], { duration: 1000 }
                );
            }, 2000)

        }
        setTimeout(() => {
            work = 0;
        }, 2500);
        is_on = 0;
    } else {
        prev = num;
        is_on = 1;
    }
}

function reset_board() {
    is_on = 0;
    prev = '';
    work = 0;
    count = 0;
    moves = 0;
    for (let i = 0; i < 16; i++) {
        document.getElementById(i).innerHTML = '';
    }
    arr = [
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', '']
    ]
    document.getElementById('heading').innerHTML = "EMOJI'S 0/8";
    emoji_used = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 16; i++) {
        let randint = getRandomInt(16);
        while (emoji_used[randint] != 0) {
            randint = getRandomInt(16);
        }
        arr[Math.floor(i / 4)][i % 4] = emoji[randint];
        emoji_used[randint] = 1;
    }
    correct_guess = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    document.getElementById("Moves").innerHTML = "Moves 0/30";
}