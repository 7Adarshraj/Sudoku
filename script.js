var cell = document.querySelectorAll('.cell');
const newGame = document.querySelector('.newGame');
const solve = document.querySelector('.solve');
const check = document.querySelector('.check');
var count = 0;
console.log(cell[0].innerText);
let previousEl;
let classname;



// var __nativeST__ = window.setTimeout,
//     __nativeSI__ = window.setInterval;

// window.setTimeout = function(vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */ ) {
//     var oThis = this,
//         aArgs = Array.prototype.slice.call(arguments, 2);
//     return __nativeST__(vCallback instanceof Function ? function() {
//         vCallback.apply(oThis, aArgs);
//     } : vCallback, nDelay);
// };




function change(event) {
    if (previousEl) {
        previousEl.className = classname;
        console.log('unselected cell ', previousEl);
    }
    //console.log('prev el outside if ', previousEl);
    previousEl = document.getElementById(event.target.id);
    //console.log('prev!!!!' ,previousEl);
    classname = previousEl.className;
    if (!(classname.includes('initialText'))) {
        console.log('selected cell before : ', previousEl);
        previousEl.className = "selected";
        console.log('selected cell after: ', previousEl);
    }


    let cell = document.getElementById(event.target.id);
    console.log('cell ', cell);
    let id = cell.id;
    console.log('id is ', id);
    id = id.substring(1, id.length);
    id = parseInt(id);
    console.log('cell id no is ', id);

    cell.onkeyup = ((event) => {
        let key = event.keyCode;

        console.log("event.keycode : ", event.keyCode);
        console.log("event.which : ", event.which);
        console.log(event.target.className);
        if (!(event.target.className.includes(' initialText'))) {
            if (key == 8) { cell.innerText = ''; return; }

            if (key >= 48 && key <= 57)
            // to check whether pressed key is number or not 
            // 
            {
                cell.innerText = key - 48;
                // console.log('cell is', cell);
                // console.log('event is', event);
                cell.className += " written";
                console.log(cell.className);
            }
        }

        //else return;

    })



}

let url = 'https://sugoku.herokuapp.com/board?difficulty=easy';

let Gboard = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
]

class Sudoku {
    constructor(board) {
        this.board = board;
    }

    updateDisplay() {

    }

    initialize(board) {

        // let k = 0;
        // for (let i = 0; i < 9; i++)
        //     for (let j = 0; j < 9; j++) {
        //         if (cell[k].innerText != '') {
        //             cell[k].innerText = '';
        //             //cell[k].className = cell[k].className + ' initialText';
        //             k += 1;
        //         }
        //     }

        this.board = board;
        Gboard = [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ];

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j]) Gboard[i][j] = board[i][j];
                else Gboard[i][j] = 0;
            }
        }
        // updateDisplay();
        let k = 0;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {




                if (cell[k].innerText == '' && board[i][j] != 0) {
                    cell[k].innerText = board[i][j];
                    cell[k].className = cell[k].className + ' initialText';
                } else {
                    if (cell[k].className.toString().includes(' initialText')) {
                        let len = cell[k].className.toString().length;
                        cell[k].className = cell[k].className.toString().substring(0, len - 12);
                        if (board[i][j] == 0) cell[k].innerText = '';
                        else cell[k].innerText = board[i][j];
                    }
                }
                k += 1;
            }
        }
        console.log('board is ', board);

    }
    checkBoard(Gboard) {
        let k = 0,
            flag = 0;

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (cell[k].innerText == '') {
                    //cell[k].className = cell[k].className + ' incomplete';
                    flag = 1;
                    console.log('wor @@')
                }

                k += 1;
            }
            console.log('working!!')
        }
        if (flag) alert('Please complete the sudoku!');
    }

    canPlace(Gboard, row, col, val) {
        // in row
        for (let it = 0; it < 9; it++) {
            if (Gboard[row][it] == val) return false;
        }
        // in column
        for (let it = 0; it < 9; it++) {
            if (Gboard[it][col] == val) return false;
        }

        // in the box
        let row_start = row - row % 3;
        let col_start = col - col % 3;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (Gboard[row_start + i][col_start + j] == val) return false;
            }
        }

        return true;


    }

    // func(Gboard, i, j, cell) {
    //     if (j == 8) this.solve(Gboard, i + 1, 0, cell)
    //     else this.solve(Gboard, i, j + 1, cell);
    // }

    solve(Gboard, i, j, cell) {
        // console.log(Gboard);
        // console.log(count);
        // count += 1;

        if (i == 9 && j == 0) { console.log('fff', Gboard); return true; }

        // Gboard[i][j];

        if (Gboard[i][j] == 0) {
            for (let val = 1; val < 10; val++) {

                if (this.canPlace(Gboard, i, j, val)) {

                    // cell[i * 9 + j].innerText = val;
                    // console.log(i, j, 'is', cell[i * 9 + j].innerText);
                    Gboard[i][j] = val;
                    cell[i * 9 + j].innerText = val;
                    // return true;

                    let ans = (j == 8) ? this.solve(Gboard, i + 1, 0, cell) : this.solve(Gboard, i, j + 1, cell);
                    // console.log('jhappi');
                    if (ans) { return true; } else {
                        // cell[i * 9 + j].innerText = '';
                        Gboard[i][j] = 0;
                        cell[i * 9 + j].innerText = '';

                    }

                }

            }
            return false;
        } else {
            let ans = (j == 8) ? this.solve(Gboard, i + 1, 0, cell) : this.solve(Gboard, i, j + 1, cell);
            if (ans) { return true; } else {
                // cell[i * 9 + j].innerText = '';
                Gboard[i][j] = 0;
                cell[i * 9 + j].innerText = '';

            }
        }


    }

}


// {
//         if(row==9 and col==0)return true;
//         //if(col==9)return true;   

//         //for(int i=col;i<9;i++){
//         if(board[row][col]==-1){
//             for(int val=1;val<10;val++)
//             {
//                 if( place(board,row,col,val))
//                 {
//                     board[row][col] = val;
//                     bool ans = (col==8)?sudoku(board,row+1,0):sudoku(board,row,col+1);
//                     //if(ans) return true;
//                     if(ans)return true;
//                     else board[row][col]=-1;
//                 }
//             }
//             return false;

//         }                
//         else{
//             bool ans = (col==8)?sudoku(board,row+1,0):sudoku(board,row,col+1);

//         }
//     }




newGame.onclick = function() {
    //     let xmlHttp = new XMLHttpRequest();
    //     let board = xmlHttp.open( "GET", theUrl); // false for synchronous request
    //    // xmlHttp.send( null );
    //     //return xmlHttp.responseText;
    //     console.log(board);
    //     console.log(xmlHttp.open( "GET", theUrl));


    // console.log('cellll', cell)
    // for (let c of cell) {
    //     c.innerText = '';
    // cell[i].innerText = '';

}


fetch(url)
    .then((resp) => resp.json())
    //.then(console.log(resp))
    .then(function(data) {
        let authors = data.results;
        console.log(data);
        console.log(data.board[0]);
        //sudoku.initialize(data.board);
        Gboard = [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ];
        sudoku = new Sudoku(Gboard);
        sudoku.initialize(data.board);
        initialBoard = data.board;
        console.log('gboard is ', Gboard);
        let board = data.board;
        let b = data.board[0];
        console.log(typeof b);
        console.log(typeof data);
    })
    .catch(function(error) {
        console.log(error);
    })
}
check.onclick = () => {
    sudoku.checkBoard(Gboard);
}

solve.addEventListener('click', (e) => {
    console.log('ceellll', cell)
    sudoku.solve(Gboard, 0, 0, cell);
})