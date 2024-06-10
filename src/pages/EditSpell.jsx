import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const host = 'http://localhost:3001';

const EditSpell = () => {
  const { spellId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    level: "",
    school: "",
    description: ""
  });
  const [characterId, setCharacterId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSpell = async () => {
      try {
        const response = await fetch(`${host}/spells/${spellId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }

        const data = await response.json();
        setFormData({
          name: data.name,
          level: data.level,
          school: data.school,
          description: data.description
        });
        setCharacterId(data.characterId._id); // Ensure characterId is a string
      } catch (error) {
        console.error("Error fetching spell:", error);
        setError("Failed to fetch spell");
      }
    };

    fetchSpell();
  }, [spellId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${host}/spells/${spellId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(formData)
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

  if (error) {
    return <p className="text-red-600 text-center font-medium mt-5">Error: {error}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white">
      <section className="p-8 bg-gray-800 bg-opacity-80 rounded-lg shadow-2xl w-full max-w-2xl border border-yellow-500">
        <h1 className="text-3xl font-bold mb-6 text-yellow-300">Edit Spell</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-yellow-200 mb-2">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="level" className="block text-yellow-200 mb-2">Level</label>
            <input
              type="number"
              name="level"
              id="level"
              placeholder="Level"
              value={formData.level}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="school" className="block text-yellow-200 mb-2">School</label>
            <input
              type="text"
              name="school"
              id="school"
              placeholder="School"
              value={formData.school}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-yellow-200 mb-2">Description</label>
            <textarea
              name="description"
              id="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <input
            type="submit"
            value="Save Spell"
            className="w-full bg-yellow-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-yellow-600"
          />
        </form>
      </section>
    </div>
  );
};

export default EditSpell;