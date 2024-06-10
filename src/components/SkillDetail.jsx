import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const host = 'http://localhost:3001';

const SkillDetail = () => {
  const { id } = useParams();
  const [skill, setSkill] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const response = await fetch(`${host}/skills/${id}`, {
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
        setSkill(data);
      } catch (error) {
        console.error("Error fetching skill:", error);
        setError("Failed to fetch skill");
      }
    };

    fetchSkill();
  }, [id]);

  if (error) {
    return <p className="text-red-600 text-center font-medium mt-5">Error: {error}</p>;
  }

  if (!skill) {
    return <p className="text-white text-center mt-5">Loading...</p>;
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 flex justify-center items-center">
      <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-6">
        <h1 className="text-3xl font-bold text-center text-yellow-300 my-6 drop-shadow-md">
          Skill Details
        </h1>
        <div className="bg-gray-800 bg-opacity-75 shadow-2xl rounded-lg p-6 text-white border border-yellow-500">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p><strong>Character ID:</strong> {skill.characterId}</p>
            <p><strong>Acrobatics:</strong> {skill.acrobatics}</p>
            <p><strong>Animal Handling:</strong> {skill.animalHandling}</p>
            <p><strong>Arcana:</strong> {skill.arcana}</p>
            <p><strong>Athletics:</strong> {skill.athletics}</p>
            <p><strong>Deception:</strong> {skill.deception}</p>
            <p><strong>History:</strong> {skill.history}</p>
            <p><strong>Insight:</strong> {skill.insight}</p>
            <p><strong>Intimidation:</strong> {skill.intimidation}</p>
            <p><strong>Investigation:</strong> {skill.investigation}</p>
            <p><strong>Medicine:</strong> {skill.medicine}</p>
            <p><strong>Nature:</strong> {skill.nature}</p>
            <p><strong>Perception:</strong> {skill.perception}</p>
            <p><strong>Performance:</strong> {skill.performance}</p>
            <p><strong>Persuasion:</strong> {skill.persuasion}</p>
            <p><strong>Religion:</strong> {skill.religion}</p>
            <p><strong>Sleight of Hand:</strong> {skill.sleightOfHand}</p>
            <p><strong>Stealth:</strong> {skill.stealth}</p>
            <p><strong>Survival:</strong> {skill.survival}</p>
          </div>
          <div className="mt-4 text-center">
            <Link
              to={`/characters/${skill.characterId}/skills/edit`}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            >
              Edit Skills
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillDetail;