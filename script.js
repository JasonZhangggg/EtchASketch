let boardSize = 64;
mouseDown = false;
rainbow = false;
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

const rainbowButton = document.querySelector("#rainbow");
const regularButton = document.querySelector("#regular");
rainbowButton.addEventListener("click", () => {
  rainbow = true;
  rainbowButton.disabled = true;
  regularButton.disabled = false;
});

regularButton.addEventListener("click", () => {
  rainbow = false;
  rainbowButton.disabled = false;
  regularButton.disabled = true;
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
      let tileColor;
      if (!rainbow) {
        tileColor = document.querySelector("#colorPicker").value;
      } else {
        tileColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
      }
      e.target.style.cssText = `background-color: ${tileColor};`;
    }
  }
}
