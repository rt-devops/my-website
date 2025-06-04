
const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');

let isXTurn = true;

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

restartButton.addEventListener('click', () => {
    window.location.reload();
});

function handleClick(e) {
    const cell = e.target;
    const currentClass = isXTurn ? 'X' : 'O';
    cell.classList.add(currentClass);
    cell.textContent = currentClass;
    if (checkWin(currentClass)) {
        message.textContent = `${currentClass} Wins!`;
        board.style.pointerEvents = 'none';
    } else if ([...cells].every(cell => cell.classList.contains('X') || cell.classList.contains('O'))) {
        message.textContent = 'Draw!';
    } else {
        isXTurn = !isXTurn;
    }
}

function checkWin(currentClass) {
    const winCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];
    return winCombos.some(combo => {
        return combo.every(index => cells[index].classList.contains(currentClass));
    });
}
