import { useEffect, useState } from "react";

const Counter = () => {
  const [num, setNum] = useState(() => {
    const storedNum = localStorage.getItem("num");
    return storedNum !== null ? Number(storedNum) : 0;
  });
  const [style, setStyle] = useState("mt-2 text-5xl font-bold");

  //   useEffect(() => {
  //     console.log("Counter rendered");
  //     const storedNum = localStorage.getItem("num");
  //     console.log(storedNum);
  //     setNum(storedNum !== null ? Number(storedNum) : 0);
  //   }, []);

  useEffect(() => {
    if (num < 0) {
      setStyle("mt-2 text-5xl font-bold text-red-500");
    } else if (num === 0) {
      setStyle("mt-2 text-5xl font-bold text-white-500");
    } else {
      setStyle("mt-2 text-5xl font-bold text-green-500");
    }
    localStorage.setItem("num", num);
  }, [num]);

  const handleIncrement = () => {
    setNum((prevNum) => prevNum + 1);
    // styleNum(num, setStyle);
    // localStorage.setItem("num", num);
  };
  const handleDecrement = () => {
    setNum((prevNum) => prevNum - 1);
    // localStorage.setItem("num", num);
    // styleNum(num, setStyle);
  };

  //   function styleNum(num, setStyle) {
  //     if (num < 0) {
  //       setStyle("mt-2 text-5xl font-bold text-red-500");
  //     } else if (num == 0) {
  //       setStyle("mt-2 text-5xl font-bold text-white-500");
  //     } else {
  //       setStyle("mt-2 text-5xl font-bold text-green-500");
  //     }
  //     localStorage.setItem("num", num);
  //   }

  return (
    <div className="flex flex-col items-center justify-center border rounded-2xl p-6">
      <h1 className="text-5xl font-bold">Counter</h1>
      <h1 className={style}>{num}</h1>
      <div className="grid grid-cols-3 gap-4 mt-6">
        <button
          onClick={handleIncrement}
          className="w-3xs px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-all mt-4"
        >
          Increment
        </button>
        <button
          onClick={handleDecrement}
          className="w-3xs px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-all mt-4 "
        >
          Decrement
        </button>
        <button
          onClick={() => {
            setNum(0);
            localStorage.setItem("num", 0);
          }}
          className="w-3xs px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-all mt-4 "
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Counter;
