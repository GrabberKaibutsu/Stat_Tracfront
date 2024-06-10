import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white min-h-screen flex flex-col items-center justify-center pb-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 text-yellow-300 drop-shadow-md">Stat_Trac</h1>
        <p className="text-xl text-yellow-200">Manage and save your charcters for a DND campaign.</p>
      </div>
      <div className="w-full max-w-4xl flex flex-col items-center">
        <div className="bg-gray-800 bg-opacity-80 p-8 rounded-lg shadow-2xl text-center w-full border border-yellow-500">
          <h2 className="text-3xl font-bold mb-4 text-yellow-300">Character sheets</h2>
          <p className="text-lg mb-6 text-yellow-200">Manage your Characters, their Skills, and SpellBook.</p>
          <div className="flex flex-col space-y-4">
            <Link to="/characters">
              <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
                View Characters
              </button>
            </Link>
            <Link to="/roll-dice">
              <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
                Dice Roller
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;