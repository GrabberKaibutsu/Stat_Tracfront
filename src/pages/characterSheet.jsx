import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const host = 'http://localhost:3001';

const CharacterDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`${host}/characters/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setCharacter(data);
      } catch (error) {
        console.error("Error fetching character:", error);
        setError("Failed to fetch character");
      }
    };

    fetchCharacter();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this character?")) {
      return;
    }

    try {
      const response = await fetch(`${host}/characters/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (!response.ok) {
        throw new Error("Failed to delete character");
      }

      navigate("/characters");
    } catch (error) {
      console.error("Error deleting character:", error);
      setError("Failed to delete character");
    }
  };

  if (error) {
    return <p className="text-red-600 text-center font-medium mt-5">Error: {error}</p>;
  }

  if (!character) {
    return <p className="text-white text-center mt-5">Loading...</p>;
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 flex justify-center items-center">
      <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-6">
        <h1 className="text-3xl font-bold text-center text-yellow-300 my-6 drop-shadow-md">
          {character.characterName}
        </h1>
        <div className="bg-gray-800 bg-opacity-75 shadow-2xl rounded-lg p-6 text-white border border-yellow-500 flex flex-col items-center">
          <p><strong className="text-yellow-200">Player Name:</strong> {character.playerName}</p>
          <p><strong className="text-yellow-200">Class:</strong> {character.class}</p>
          <p><strong className="text-yellow-200">Level:</strong> {character.level}</p>
          <p><strong className="text-yellow-200">Race:</strong> {character.race}</p>
          <p><strong className="text-yellow-200">Alignment:</strong> {character.alignment}</p>
          <p><strong className="text-yellow-200">Experience Points:</strong> {character.experiencePoints}</p>
          <p><strong className="text-yellow-200">Background:</strong> {character.background}</p>
          <p><strong className="text-yellow-200">Description:</strong> {character.description}</p>
          <h2 className="text-2xl font-bold mt-4 text-yellow-300">Attributes</h2>
          <p><strong className="text-yellow-200">Strength:</strong> {character.strength}</p>
          <p><strong className="text-yellow-200">Dexterity:</strong> {character.dexterity}</p>
          <p><strong className="text-yellow-200">Constitution:</strong> {character.constitution}</p>
          <p><strong className="text-yellow-200">Intelligence:</strong> {character.intelligence}</p>
          <p><strong className="text-yellow-200">Wisdom:</strong> {character.wisdom}</p>
          <p><strong className="text-yellow-200">Charisma:</strong> {character.charisma}</p>
          <h2 className="text-2xl font-bold mt-4 text-yellow-300">Weapon</h2>
          <p><strong className="text-yellow-200">Name:</strong> {character.weaponName}</p>
          <div className="mt-4">
            <Link to={`/characters/${character._id}/skills`} className="text-yellow-500 underline">View Skills</Link>
          </div>
          <div className="mt-4">
            <Link to={`/characters/${character._id}/spells`} className="text-yellow-500 underline">View Spellbook</Link>
          </div>
          <div className="mt-4">
            <Link to={`/characters/${character._id}/edit`} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
              Edit Character
            </Link>
          </div>
          <div className="mt-4">
            <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
              Delete Character
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;