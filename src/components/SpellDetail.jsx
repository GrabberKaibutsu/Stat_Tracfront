import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const host = 'http://localhost:3001';

const SpellDetail = () => {
  const { id } = useParams();
  const [spell, setSpell] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSpell = async () => {
      try {
        const response = await fetch(`${host}/spells/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setSpell(data);
      } catch (error) {
        console.error("Error fetching spell:", error);
        setError("Failed to fetch spell");
      }
    };

    fetchSpell();
  }, [id]);

  if (error) {
    return <p className="text-red-600 text-center font-medium mt-5">Error: {error}</p>;
  }

  if (!spell) {
    return <p className="text-white text-center mt-5">Loading...</p>;
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 flex justify-center items-center">
      <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-6">
        <h1 className="text-3xl font-bold text-center text-yellow-300 my-6 drop-shadow-md">
          {spell.name}
        </h1>
        <div className="bg-gray-800 bg-opacity-75 shadow-2xl rounded-lg p-6 text-white border border-yellow-500">
          <p className="mb-4"><strong className="text-yellow-200">Level:</strong> {spell.level}</p>
          <p className="mb-4"><strong className="text-yellow-200">School:</strong> {spell.school}</p>
          <p className="mb-4"><strong className="text-yellow-200">Description:</strong> {spell.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SpellDetail;