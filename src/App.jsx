import Board from "./components/Board";
import Counter from "./components/Counter";

const App = () => {
  return (
    // <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4 sm:p-6 md:p-8 lg:p-10">
    //   <Board />
    //   {/* <Counter /> */}
    // </div>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="w-full max-w-4xl">
        <Board />
        {/* <Counter /> */}
      </div>
    </div>
  );
};

export default App;
