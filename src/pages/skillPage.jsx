import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const host = 'http://localhost:3001';

const SkillPage = () => {
  const { user } = useContext(AuthContext);
  const { id: characterId } = useParams();
  const navigate = useNavigate();
  const [skills, setSkills] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(`${host}/skills?characterId=${characterId}`, {
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
        console.log("Fetched skills data:", data);
        if (data.length > 0) {
          setSkills(data[0]); // Assuming there is only one skill object per character
        } else {
          setSkills({}); // No skills found, set to an empty object
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
        setError("Failed to fetch skills");
      }
    };

    fetchSkills();
  }, [characterId]);

  const handleEdit = () => {
    navigate(`/characters/${characterId}/skills/edit`);
  };

  const handleAddNewSkill = () => {
    navigate(`/characters/${characterId}/skills/new`);
  };

  if (error) {
    return (
      <p className="text-red-600 text-center font-medium mt-5">Error: {error}</p>
    );
  }

  if (!skills) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (Object.keys(skills).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-300 drop-shadow-md">No Skills Found</h1>
        </div>
        <button
          onClick={handleAddNewSkill}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
        >
          Add New Skill
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white py-6 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center text-yellow-300 my-6">
          Skills
        </h1>
        <div className="bg-gray-800 bg-opacity-80 border border-yellow-500 shadow-2xl rounded-lg p-6">
          {Object.entries(skills).map(([key, value]) => (
            key !== "_id" && key !== "characterId" && key !== "__v" && (
              <div key={key} className="flex justify-between">
                <span className="capitalize text-yellow-200">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                <span className="text-yellow-100">{value}</span>
              </div>
            )
          ))}
          <div className="text-center mt-4">
            <button
              onClick={handleEdit}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            >
              Edit Skills
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillPage;