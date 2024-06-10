import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const host = 'http://localhost:3001';

const NewSpell = () => {
  const { id: characterId } = useParams();
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    characterId: characterId,
    name: "",
    level: "",
    school: "",
    description: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${host}/spells/new`, {
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

      navigate(`/characters/${characterId}/spells`);
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
        <h1 className="text-5xl font-bold mb-4 text-yellow-300 drop-shadow-md">Add To SpellBook</h1>
        <p className="text-xl text-yellow-200">Fill in the details to add a new spell to your character.</p>
      </div>
      <div className="w-full max-w-4xl flex flex-col items-center">
        <section className="bg-gray-800 bg-opacity-80 p-8 rounded-lg shadow-2xl text-center w-full border border-yellow-500">
          <h2 className="text-3xl font-bold mb-4 text-yellow-300">New Spell</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-yellow-200 mb-1">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-gray-700 border-gray-600 text-gray-300"
              />
            </div>
            <div>
              <label htmlFor="level" className="block text-yellow-200 mb-1">Level</label>
              <input
                type="number"
                name="level"
                id="level"
                placeholder="Level"
                value={formData.level}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-gray-700 border-gray-600 text-gray-300"
              />
            </div>
            <div>
              <label htmlFor="school" className="block text-yellow-200 mb-1">School</label>
              <input
                type="text"
                name="school"
                id="school"
                placeholder="School"
                value={formData.school}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-gray-700 border-gray-600 text-gray-300"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-yellow-200 mb-1">Description</label>
              <textarea
                name="description"
                id="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-gray-700 border-gray-600 text-gray-300"
              />
            </div>
            <input
              type="submit"
              value="Create Spell"
              className="w-full bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-2 rounded-full cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            />
          </form>
        </section>
      </div>
    </div>
  );
};

export default NewSpell;