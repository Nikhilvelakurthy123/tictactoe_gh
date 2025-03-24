import { useEffect, useRef, useState } from "react";
import PieCharts from "./PieChart";

const Board = () => {
  const squaresArr = new Array(9).fill(null);
  const [squares, setSquares] = useState(squaresArr);
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const buttonRefs = useRef([]);

  useEffect(() => {
    const storedWinners = JSON.parse(localStorage.getItem("winners")) || [];
    console.log("Last five winners:", storedWinners);
  }, []);

  useEffect(() => {
    if (!isXNext && !winner) {
      const emptySquares = squares
        .map((square, index) => (square === null ? index : null))
        .filter((index) => index !== null);

      if (emptySquares.length > 0) {
        const randomIndex =
          emptySquares[Math.floor(Math.random() * emptySquares.length)];
        handleSquares(randomIndex);
      }
    }
  }, [isXNext, winner]);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        console.log("Winner is", squares[a]);
        buttonRefs.current[a].style.backgroundColor = "green";
        buttonRefs.current[b].style.backgroundColor = "green";
        buttonRefs.current[c].style.backgroundColor = "green";
        setWinner(squares[a]);
        buttonRefs.current.forEach((button) => {
          if (button) button.disabled = true;
        });

        // Update the winners array in local storage
        const storedWinners = JSON.parse(localStorage.getItem("winners")) || [];
        storedWinners.push(squares[a]);
        if (storedWinners.length > 5) {
          storedWinners.shift(); // Remove the oldest entry if there are more than 5 winners
        }
        localStorage.setItem("winners", JSON.stringify(storedWinners));

        return squares[a];
      }
    }

    if (!squares.includes(null) && !winner) {
      let isDraw = true;
      squares.forEach((square) => {
        if (square === null) {
          isDraw = false;
        }
      });
      if (isDraw) {
        setWinner("Draw");
        buttonRefs.current.forEach((button) => {
          if (button) button.disabled = true;
        });
        // Update the winners array in local storage
        const storedWinners = JSON.parse(localStorage.getItem("winners")) || [];
        storedWinners.push("Draw");
        if (storedWinners.length > 5) {
          storedWinners.shift(); // Remove the oldest entry if there are more than 5 winners
        }
        localStorage.setItem("winners", JSON.stringify(storedWinners));
      }
    }
    return null;
  };

  const handleSquares = (index) => {
    if (squares[index] || winner) return;
    const newSquares = [...squares];

    newSquares[index] = isXNext ? "X" : "O";

    setSquares(newSquares);
    setIsXNext(!isXNext);
    calculateWinner(newSquares);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4 text-orange-500 text-center">
        {winner ? `Winner is ${winner}` : `Next Player: ${isXNext ? "X" : "O"}`}
      </h1>
      <div className="grid grid-cols-3 gap-2">
        {squares.map((square, index) => (
          <button
            key={index}
            ref={(el) => (buttonRefs.current[index] = el)}
            className="h-24 w-24 bg-blue-500 text-white text-4xl font-bold flex items-center justify-center border-2 border-white transition-all hover:bg-blue-700"
            onClick={() => handleSquares(index)}
          >
            {square}
          </button>
        ))}
      </div>
      <button
        className="mt-4 w-2xs px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-all"
        onClick={() => {
          buttonRefs.current.forEach((button) => {
            if (button) {
              button.style.backgroundColor = "blue";
              button.disabled = false;
            }
          });

          //   if (
          //     (winner && !["X", "O", "Draw"].includes(winner)) ||
          //     !squares.includes(null)
          //   ) {
          //     //when we have draw we are able to add reset to winners array that should not be the case
          //     // console.log(
          //     //   "resetting winner - ",
          //     //   winner,
          //     //   !squares.includes(null),
          //     //   !["X", "O", "Draw"].includes(winner)
          //     // );
          //     // Update the winners array in local storage
          //     const storedWinners =
          //       JSON.parse(localStorage.getItem("winners")) || [];
          //     storedWinners.push("Reset");
          //     if (storedWinners.length > 5) {
          //       storedWinners.shift(); // Remove the oldest entry if there are more than 5 winners
          //     }
          //     localStorage.setItem("winners", JSON.stringify(storedWinners));
          //   }

          setSquares(squaresArr);
          setIsXNext(true);
          setWinner(null);
        }}
      >
        Reset
      </button>
      <h1 className="text-4xl font-bold mt-4 mb-4 text-green-500 text-center">
        {`Last 5 Winners: ${JSON.parse(localStorage.getItem("winners")) || []}`}
      </h1>
      <div className="w-full max-w-xs mx-auto">
        <PieCharts xWins={2} oWins={2} draws={5} />
      </div>
    </div>
  );
};

export default Board;
