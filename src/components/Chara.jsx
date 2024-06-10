import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const host = 'http://localhost:3001';

const Characters = () => {
  const { user } = useContext(AuthContext);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(`${host}/characters`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }

        const data = await response.json();
        setCharacters(data);
      } catch (error) {
        console.error("Error fetching characters:", error);
        setError("Failed to fetch characters");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (characters.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-300 drop-shadow-md">No Characters Found</h1>
        </div>
        <Link
          to="/characters/new"
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
        >
          Add New Character
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white py-6 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-300 drop-shadow-md">Characters</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {characters.map((character) => (
            <div
              key={character._id}
              className="bg-gray-800 bg-opacity-80 border border-yellow-500 shadow-2xl rounded-lg p-4 flex flex-col items-center text-center space-y-3 transform transition-transform hover:scale-105"
            >
              <Link
                to={`/characters/${character._id}`}
                className="flex flex-col items-center space-y-3"
              >
                <div>
                  <h2 className="text-lg font-bold text-yellow-300">{character.characterName}</h2>
                  <p className="text-sm text-yellow-200">
                    {character.class} - Level {character.level}
                  </p>
                  <p className="text-sm text-yellow-200">Player: {character.playerName}</p>
                  <p className="text-sm text-yellow-200">Race: {character.race}</p>
                  <p className="text-sm text-yellow-200">Alignment: {character.alignment}</p>
                  <p className="text-sm text-yellow-200">XP: {character.experiencePoints}</p>
                </div>
              </Link>
            </div>
          ))}
          <div className="flex flex-col items-center justify-center text-center transform transition-transform hover:scale-105">
            <Link
              to="/characters/new"
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            >
              Add New Character
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Characters;