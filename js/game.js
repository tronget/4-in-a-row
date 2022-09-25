import {
	resetGame, calcRowIndex, calcColIndex, checkEndgame
} from './functions.js';
const tic = document.querySelector(".first span");
const toe = document.querySelector(".second span");
const field = document.querySelector(".field");
const resetBtn = document.querySelector(".reset-btn");
const backBtn = document.querySelector(".back-btn");
let matrix = resetGame();
let move = 1;
let endgame = false;
let lastMove = {
   id: 1,
   move: 1,
	isWin: false
};
field.addEventListener("click", (e) => {
   if (
      endgame === false &&
      e.target.className === "field__cell" &&
      e.target.innerHTML === "" &&
      (calcRowIndex(e.target) === 5 ||
         document.querySelector(
            `.field__cell[data-id="${+e.target.dataset.id + 7}"]`
         ).innerHTML !== "")
   ) {
      lastMove.id = e.target.dataset.id;
      let i = calcRowIndex(e.target);
      let j = calcColIndex(e.target);

      if (move === 1) {
         e.target.insertAdjacentHTML(
            "afterbegin",
            `<img src="img/free-icon-cancel-3482248.png" alt="tic">`
         );
         matrix[i][j] = move;
         lastMove.move = 1;
         move = 2;
      } else {
         e.target.insertAdjacentHTML(
            "afterbegin",
            `<img style="transform: scale(.7)" src="img/rec.png" alt="toe">`
         );
         matrix[i][j] = move;
         lastMove.move = 2;
         move = 1;
      }
      let res = checkEndgame(matrix);
      if (res !== 0) {
         endgame = true;
			lastMove.isWin = true;
      }
      if (res === 1) {
			tic.parentElement.classList.add('winner');
         tic.textContent++;
      } else if (res === 2) {
			toe.parentElement.classList.add('winner');
         toe.textContent++;
      }
   }
});
resetBtn.addEventListener("click", () => {
   matrix = resetGame();
   endgame = false;
	tic.parentElement.classList.remove('winner');
	toe.parentElement.classList.remove('winner');
});
backBtn.addEventListener("click", () => {
   document.querySelector(`.field__cell[data-id="${lastMove.id}"]`).innerHTML = "";
	matrix[Math.floor((lastMove.id - 1) / 7)][(lastMove.id - 1) % 7] = 0;
	move = lastMove.move;
	endgame = false;
	if (lastMove.isWin === true) {
		lastMove.isWin = false;
		[tic.parentElement, toe.parentElement][lastMove.move - 1].classList.remove('winner');
		[tic, toe][lastMove.move - 1].textContent--;
	}
});
