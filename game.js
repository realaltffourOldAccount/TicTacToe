var player = 1;											// player turn
var lineColor = "#ddd";									// stroke color
var win = false;											// to check if someone has one

var canvas = document.getElementById("canvas");	// canvas element
var context  = canvas.getContext("2d");			// context to draw
var canvasSize = 500;									// size of canvas
																// since the canvas is square the x and y will be same
var sectionSize = canvasSize / 3;					// per section size; relative to the size of the canvas
canvas.width = canvasSize;
canvas.height = canvasSize;
context.translate(0.5,0.5);

function getInitialBoard(defualtValue)
{
	var board = [];
	for (var x = 0; x < 3; x++)
	{
		board.push([]);
		for (var y =0; y < 3;y++)
		{
			board[x].push(defualtValue);
		}
	}
	return board;
}

var board = getInitialBoard(" ");

function GetCellValByCord(xCordinate, yCordinate)
{
		// first row
		// cell 1
		if	(xCordinate < sectionSize && yCordinate < sectionSize)
		{
			return board[0][0];
		}
		// cell 2
		if	(xCordinate < sectionSize * 2 && !(xCordinate < sectionSize)
		&& yCordinate < sectionSize)
		{
			return board[0][1];
		}
		// cell 3
		if	(xCordinate < sectionSize * 3 && !(xCordinate < sectionSize * 2) 
		&& yCordinate < sectionSize)
		{
			return board[0][2];
		}
		// second row
		// cell 4
		if	(xCordinate < sectionSize 
		&&	(yCordinate < sectionSize + sectionSize && !yCordinate < sectionSize))
		{
			return board[1][0];
		}
		// cell 5
		if	(xCordinate < sectionSize + sectionSize && !(xCordinate < sectionSize) &&
		(yCordinate < sectionSize * 2 && !yCordinate < sectionSize))
		{
			return board[1][1];
		}
		// cell 6
		if	(xCordinate < sectionSize * 3 && !(xCordinate < sectionSize * 2)
		 && (yCordinate < sectionSize * 2 && !yCordinate < sectionSize))
		{
			return board[1][2];
		}
		// cell 7
		if	(xCordinate < sectionSize &&
		(yCordinate < sectionSize * 3 && !yCordinate < sectionSize * 2))
		{
			return board[2][0] ;
		}
		// cell 8
		if	(xCordinate < sectionSize + sectionSize && !(xCordinate < sectionSize)
		 && (yCordinate < sectionSize * 3 && !yCordinate < sectionSize * 2))
		{
			return board[2][1];
		}
		// cell 9
		if	(xCordinate < sectionSize + sectionSize + sectionSize && !(xCordinate < sectionSize * 2)
		 && (yCordinate < sectionSize * 3 && !yCordinate < sectionSize * 2))
		{
			return board[2][2] ;
		}
}

function SetCellValByCord(xCordinate, yCordinate, value)
{
			// first row
		// cell 1
		if	(xCordinate < sectionSize && yCordinate < sectionSize)
		{
			board[0][0] = value;
			return;
		}
		// cell 2
		if	(xCordinate < sectionSize * 2 && !(xCordinate < sectionSize)
		&& yCordinate < sectionSize)
		{
			board[0][1] = value;
			return;
		}
		// cell 3
		if	(xCordinate < sectionSize * 3 && !(xCordinate < sectionSize * 2) 
		&& yCordinate < sectionSize)
		{
			board[0][2] = value;
			return;
		}
		// second row
		// cell 4
		if	(xCordinate < sectionSize 
		&&	(yCordinate < sectionSize + sectionSize && !yCordinate < sectionSize))
		{
			board[1][0] = value;
			return;
		}
		// cell 5
		if	(xCordinate < sectionSize + sectionSize && !(xCordinate < sectionSize) &&
		(yCordinate < sectionSize * 2 && !yCordinate < sectionSize))
		{
			board[1][1] = value;
			return;
		}
		// cell 6
		if	(xCordinate < sectionSize * 3 && !(xCordinate < sectionSize * 2)
		 && (yCordinate < sectionSize * 2 && !yCordinate < sectionSize))
		{
			board[1][2] = value;
			return;
		}
		// cell 7
		if	(xCordinate < sectionSize &&
		(yCordinate < sectionSize * 3 && !yCordinate < sectionSize * 2))
		{
			board[2][0] = value;
			return;
		}
		// cell 8
		if	(xCordinate < sectionSize + sectionSize && !(xCordinate < sectionSize)
		 && (yCordinate < sectionSize * 3 && !yCordinate < sectionSize * 2))
		{
			board[2][1] = value;
			return;
		}
		// cell 9
		if	(xCordinate < sectionSize + sectionSize + sectionSize && !(xCordinate < sectionSize * 2)
		 && (yCordinate < sectionSize * 3 && !yCordinate < sectionSize * 2))
		{
			board[2][2] = value;
			return;
		}
}

function DrawWinLine(xCordinateStart, yCordinateStart, xCordinateFinish, yCordinateFinish)
{
	var winline = canvas.getContext("2d");		// stroke function draws all lines so varyation in color 
															// does not occur; creating other context solves it
	var offset = sectionSize / 2;
	xCordinateStart += offset;			// Since the argument going to be passed will be start not the middle
	yCordinateStart += offset;			// Since the argument going to be passed will be start not the middle
	xCordinateFinish -= offset;		// Since the argument going to be passed will be start not the middle
	yCordinateFinish -= offset;		// Since the argument going to be passed will be start not the middle
	winline.strokeStyle = "#33cc33";
	winline.beginPath();
	winline.lineWidth = 10;
	winline.moveTo(xCordinateStart, yCordinateStart);
	winline.lineTo(xCordinateFinish, yCordinateFinish);
	winline.stroke();
}

function CheckWin()
{
		var win_log = document.getElementById("win_log");
		
		if (board[0][0] != " " && board[0][1] != " " && board[0][2] != " ")
		{
			if (board[0][0] == "O" && board[0][1] == "O" && board[0][2] == "O")
			{
			 win_log.innerHTML = "Player 1 Wins!";
			 DrawWinLine(0,0, sectionSize * 3, sectionSize);
			 win = true;
			} 
			else if (board[0][0] == "X" && board[0][1] == "X" && board[0][2] == "X")
			 {
			 win_log.innerHTML  = "Player 2 Wins!";
			 DrawWinLine(0,0, sectionSize * 3, sectionSize);
			 win = true;
			 }
		}
		if (board[1][0] != " " && board[1][1] != " " && board[1][2] != " ")
		{
			if (board[1][0] == "O" && board[1][1] == "O" && board[1][2] == "O")
			{
			 win_log.innerHTML = "Player 1 Wins!";
			 DrawWinLine(0,sectionSize, sectionSize * 3, sectionSize*2);
			 win = true;
			}
			else if (board[1][0] == "X" && board[1][1] == "X" && board[1][2] == "X")
			{
			    win_log.innerHTML  = "Player 2 Wins!";
				 DrawWinLine(0,sectionSize, sectionSize * 3, sectionSize*2);
			    win = true;
			}
		}	
		if (board[2][0] != " " && board[2][1] != " " && board[2][2] != " ")
		{
			if (board[2][0] == "O" && board[2][1] == "O" && board[2][2] == "O") 
			{
			win_log.innerHTML = "Player 1 Wins!";
			 DrawWinLine(0, sectionSize*2, sectionSize * 3, sectionSize*3);
			 win = true;
			}
			else if (board[2][0] == "X" && board[2][1] == "X" && board[2][2] == "X")
			 {
			 win_log.innerHTML = "Player 2 Wins!";
			 DrawWinLine(0, sectionSize*2, sectionSize * 3, sectionSize*3);
			 win = true;
			}
		}
		if (board[0][0] != " " && board[1][0] != " " && board[2][0] != " ")
		{
			if (board[0][0] == "O" && board[1][0] == "O" && board[2][0] == "O")
			{
			 win_log.innerHTML = "Player 1 Wins!";
			 DrawWinLine(0, 0, sectionSize, sectionSize*3);
			 win = true;					
			}
			else if (board[0][0] == "X" && board[1][0] == "X" && board[2][0] == "X") 
			 {
			 win_log.innerHTML  = "Player 2 Wins!";		 
			 DrawWinLine(0,0, sectionSize * 3, sectionSize);
			 win = true;
			 }
		}
		if (board[0][1] != " " && board[1][1] != " " && board[2][1] != " ")
		{
			if (board[0][1] == "O" && board[1][1] == "O" && board[2][1] == "O")
			{
			 win_log.innerHTML = "Player 1 Wins!";
			 DrawWinLine(sectionSize, 0, sectionSize * 2, sectionSize * 3);
			 win = true;
			}
			else if (board[0][1] == "X" && board[1][1] == "X" && board[2][1] == "X")
			{
			  win_log.innerHTML  = "Player 2 Wins!";
			  DrawWinLine(sectionSize, 0, sectionSize * 2, sectionSize * 3);
			  win = true; 	
			}
			 
		}
		if (board[0][2] != " " && board[1][2] != " " && board[2][2] != " ")
		{
			if (board[0][2] == "O" && board[1][2] == "O" && board[2][2] == "O")
			{
				 win_log.innerHTML = "Player 1 Wins!";
				 DrawWinLine(sectionSize * 2,0, sectionSize * 3, sectionSize * 3);
			    win = true;
			}
			else if (board[0][2] == "X" && board[1][2] == "X" && board[2][2] == "X")
			{
		       win_log.innerHTML  = "Player 2 Wins!";
				 DrawWinLine(sectionSize * 2,0, sectionSize * 3, sectionSize * 3);
			    win = true; 			
			}
		}		
		if (board[0][2] != " " && board[1][1] != " " && board[2][0] != " ")
		{
			if (board[0][2] == "O" && board[1][1] == "O" && board[2][0] == "O")
			{
			 win_log.innerHTML = "Player 1 Wins!";
			 DrawWinLine(sectionSize *  2, 0, sectionSize, sectionSize * 3);
			 win = true;	
			}
			else if (board[0][2] == "X" && board[1][1] == "X" && board[2][0] == "X")
			 {
			  win_log.innerHTML  = "Player 2 Wins!";	 	
			  DrawWinLine(sectionSize * 2, 0, sectionSize, sectionSize * 3);
			  win = true;	
			 }
		}
		if (board[0][0] != " " && board[1][1] != " " && board[2][2] != " ")
		{
			if (board[0][0] == "O" && board[1][1] == "O" && board[2][2] == "O")
			{
			 win_log.innerHTML = "Player 1 Wins!";	
			 DrawWinLine(0,0, sectionSize * 3, sectionSize * 3);
			 win = true;
			}
			else if (board[0][0] == "X" && board[1][1] == "X" && board[2][2] == "X")
			{
			 win_log.innerHTML  = "Player 2 Wins!";	 	
			 DrawWinLine(0,0, sectionSize * 3, sectionSize * 3);
			 win = true;
			}
		}	
}

function addPlayingPiece (mouse) {
  var xCordinate;
  var yCordinate;

  for (var y = 0; y < 3; y++) {
    for (var x = 0; x < 3; x++) {
      xCordinate = x * sectionSize;
      yCordinate = y * sectionSize;

      if (
          mouse.x >= xCordinate && mouse.x <= xCordinate + sectionSize &&
          mouse.y >= yCordinate && mouse.y <= yCordinate + sectionSize
        )
        {

if (GetCellValByCord(xCordinate,yCordinate) != " ")
{
alert("Place Taken!");
}
else {

        		if (player === 1) {
          	drawX(xCordinate, yCordinate);
        		} else {
         	 drawO(xCordinate, yCordinate);
        		}
}  
      }
    }
  }
}

function clearPlayingArea(xCordinate, yCordinate)
{
	context.fillStyle = "#fff";
	context.fillRect(
	xCordinate,
	yCordinate,
	sectionSize,
	sectionSize)
}

function drawO (xCordinate, yCordinate) {
  SetCellValByCord(xCordinate, yCordinate, "O");
 
  var halfSectionSize = (0.5 * sectionSize);
  var centerX = xCordinate + halfSectionSize;
  var centerY = yCordinate + halfSectionSize;
  var radius = (sectionSize - 100) / 2;
  var startAngle = 0 * Math.PI; 
  var endAngle = 2 * Math.PI;
  
  
  
  context.lineWidth = 10;
  context.strokeStyle = "#01bBC2";
  context.beginPath();
  context.arc(centerX, centerY, radius, startAngle, endAngle);
  context.stroke();
}

function drawX (xCordinate, yCordinate) {
  SetCellValByCord(xCordinate, yCordinate, "X");
  context.strokeStyle = "#f1be32";

  context.beginPath();
  
  var offset = 50;
  
  context.moveTo(xCordinate + offset, yCordinate + offset);
  context.lineTo(xCordinate + sectionSize - offset, yCordinate + sectionSize - offset);

  context.moveTo(xCordinate + offset, yCordinate + sectionSize - offset);
  context.lineTo(xCordinate + sectionSize - offset, yCordinate + offset);

  context.stroke();
  
}
function drawLines (lineWidth, strokeStyle) {
  var lineStart = 4;
  var lineLenght = canvasSize - 5;

  context.lineWidth = lineWidth;
  context.lineCap = 'round';
  context.strokeStyle = "#ddd";
  context.beginPath();

  /*
   * Horizontal lines 
   */
  for (var y = 1;y <= 2;y++) {  
    context.moveTo(lineStart, y * sectionSize);
    context.lineTo(lineLenght, y * sectionSize);
  }

  /*
   * Vertical lines 
   */
  for (var x = 1;x <= 2;x++) {
    context.moveTo(x * sectionSize, lineStart);
    context.lineTo(x * sectionSize, lineLenght);
  }

  context.stroke();
}

drawLines(10, lineColor);

function getCanvasMousePosition (event) {
  var rect = canvas.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
}

function Reset()
{
	var win_log = document.getElementById("win_log");
	board = getInitialBoard(" ");
	win = false;
	player = 1;
	context.clearRect(0,0, canvas.width, canvas.height);
	drawLines(10, lineColor);
	win_log.innerHTML = "Play!";
}

canvas.addEventListener('mouseup', function (event) {
  var canvasMousePosition = getCanvasMousePosition(event);
  
  if (win == false) {
  if (player === 1) {
    player = 2;
    addPlayingPiece(canvasMousePosition);
     CheckWin();
  } else {
    player = 1;
      addPlayingPiece(canvasMousePosition);
    CheckWin();
  }
  }
 
  drawLines(10, lineColor);
});
