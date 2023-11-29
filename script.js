let boardSize = 64;
mouseDown = false;

document.body.addEventListener("mousedown", () => {
  mouseDown = true;
});
document.body.addEventListener("mouseup", () => {
  mouseDown = false;
});

document.querySelector("#clear").addEventListener("click", () => {
  deleteBoard();
  drawBoard();
});

const board = document.querySelector(".board");
drawBoard();

document.querySelector("#input").addEventListener("keyup", (e) => {
  if (e.keyCode == 13) {
    let input = e.target.value;
    if (!isNaN(input)) {
      input = +input;
      if (input <= 64) {
        boardSize = input;
        deleteBoard();
        drawBoard();
      }
    }
  }
});

function deleteBoard() {
  while (board.hasChildNodes()) {
    board.removeChild(board.firstChild);
  }
}
function drawBoard() {
  for (let i = 0; i < boardSize; i++) {
    const line = document.createElement("div");
    line.classList.add("row");
    line.style.cssText = "display: flex";
    for (let k = 0; k < boardSize; k++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.addEventListener("mouseover", recolor);
      tile.addEventListener("mousedown", recolor);
      line.appendChild(tile);
    }
    board.appendChild(line);
  }
}

/**
 *
 * @param {Event} e
 */
function recolor(e) {
  if (e.target.classList.contains("tile")) {
    if (mouseDown || e.type == "mousedown") {
      console.log(document.querySelector("#colorPicker").value);
      e.target.style.cssText = `background-color: ${
        document.querySelector("#colorPicker").value
      };`;
    }
  }
}
