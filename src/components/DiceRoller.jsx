import React, { useState } from "react";

const DiceRollerPage = () => {
  const [result, setResult] = useState(null);

  const rollDice = (sides) => {
    const roll = Math.floor(Math.random() * sides) + 1;
    setResult(roll);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white">
      <h2 className="text-5xl font-bold mb-8 text-center text-yellow-400">Roll Dice</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        <button onClick={() => rollDice(2)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
          Roll d2
        </button>
        <button onClick={() => rollDice(3)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
          Roll d3
        </button>
        <button onClick={() => rollDice(4)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
          Roll d4
        </button>
        <button onClick={() => rollDice(6)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
          Roll d6
        </button>
        <button onClick={() => rollDice(8)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
          Roll d8
        </button>
        <button onClick={() => rollDice(10)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
          Roll d10
        </button>
        <button onClick={() => rollDice(12)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
          Roll d12
        </button>
        <button onClick={() => rollDice(20)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
          Roll d20
        </button>
        <button onClick={() => rollDice(100)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
          Roll d100
        </button>
      </div>
      {result !== null && (
        <div className="mt-8 text-center">
          <p className="text-4xl font-bold text-yellow-400">Result: {result}</p>
        </div>
      )}
    </div>
  );
};

export default DiceRollerPage;