function resetGame() {
	let matrix = [];
	for (let i = 0; i < 6; i++) {
		matrix.push([0, 0, 0, 0, 0, 0, 0]);
	}
	Array.prototype.forEach.call(document.querySelector(".field").children, (el) => {
		el.innerHTML = '';
	});
	return matrix;
}
function checkEndgame(matrix) {
   if (isX(matrix) === 1 || isDiagonal(matrix) === 1) {
      return 1;
   } else if (isX(matrix) === 2 || isDiagonal(matrix) === 2) {
      return 2;
   }
   // rotate 90deg;
   let newmatrix = rotateRight90(matrix);
   if (isX(newmatrix) === 1 || isDiagonal(newmatrix) === 1) {
      return 1;
   } else if (isX(newmatrix) === 2 || isDiagonal(newmatrix) === 2) {
      return 2;
   }
	return 0;
   // another functions
   function is4inArr(arr) {
      let first = 0,
         second = 0;
      for (let el of arr) {
         if (el === 1) {
            first++;
            second = 0;
				if (first >= 4) {
					return 1;
				}
         } else if (el === 2) {
            second++;
            first = 0;
				if (second >= 4) {
					return 2;
				}
         } else {
            first = 0;
            second = 0;
         }
      }
      return 0;
   }
   function isX(matrix) {
      for (let i = 0; i < matrix.length; i++) {
         if (is4inArr(matrix[i]) === 1) {
            return 1;
         } else if (is4inArr(matrix[i]) === 2) {
            return 2;
         }
      }
   }
   function rotateRight90(matrix) {
      let result = [];
      for (let i = matrix.length - 1; i >= 0; i--) {
         for (let j = 0; j < matrix[i].length; j++) {
            if (!result[j]) {
               result[j] = [];
            }
            result[j].push(matrix[i][j]);
         }
      }
      return result;
   }
   function isDiagonal(matrix) {
      for (let x = 3; x < 9; x++) {
         let diag = [];
         for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[0].length; j++) {
               if (i + j === x) {
                  diag.push(matrix[i][j]);
               }
            }
         }
         let res = is4inArr(diag);
         if (res === 1) {
            return 1;
         } else if (res === 2) {
            return 2;
         }
      }
      return 0;
   }
}

function calcRowIndex(el) {
	return Math.floor((el.dataset.id - 1) / 7);
}
function calcColIndex(el) {
	return (el.dataset.id - 1) % 7;
}
export {
	resetGame, calcRowIndex, calcColIndex, checkEndgame
};