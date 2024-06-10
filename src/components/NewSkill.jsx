import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const host = 'http://localhost:3001';

const NewSkill = () => {
  const { id: characterId } = useParams();
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    characterId: characterId,
    acrobatics: "",
    animalHandling: "",
    arcana: "",
    athletics: "",
    deception: "",
    history: "",
    insight: "",
    intimidation: "",
    investigation: "",
    medicine: "",
    nature: "",
    perception: "",
    performance: "",
    persuasion: "",
    religion: "",
    sleightOfHand: "",
    stealth: "",
    survival: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${host}/skills/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      navigate(`/characters/${characterId}/skills`);
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error: " + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white min-h-screen flex flex-col items-center justify-center pb-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 text-yellow-300 drop-shadow-md">Input Skill Values</h1>
        <p className="text-xl text-yellow-200">Fill in the details to add a skill sheet to your character.</p>
      </div>
      <div className="w-full max-w-4xl flex flex-col items-center">
        <section className="bg-gray-800 bg-opacity-80 p-8 rounded-lg shadow-2xl text-center w-full border border-yellow-500">
          <h2 className="text-3xl font-bold mb-4 text-yellow-300">New Skill</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.keys(formData).map((key) => (
              key !== "characterId" && (
                <div key={key}>
                  <label htmlFor={key} className="block text-yellow-200 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                  <input
                    type="number"
                    name={key}
                    id={key}
                    placeholder={key.replace(/([A-Z])/g, ' $1').trim()}
                    value={formData[key]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-gray-700 border-gray-600 text-gray-300"
                    min="-4"
                    max="4"
                  />
                </div>
              )
            ))}
            <input type="hidden" name="characterId" value={characterId} />
            <input
              type="submit"
              value="Create Skill"
              className="w-full bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-2 rounded-full cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            />
          </form>
        </section>
      </div>
    </div>
  );
};

export default NewSkill;