import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const host = 'http://localhost:3001';

const EditSkill = () => {
  const { user } = useContext(AuthContext);
  const { id: characterId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
        if (data.length > 0) {
          setFormData(data[0]); // Assuming there is only one skill object per character
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, [characterId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${host}/skills/${formData._id}`, {
        method: "PUT",
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white">
      <section className="p-8 bg-gray-800 bg-opacity-80 rounded-lg shadow-2xl w-full max-w-2xl border border-yellow-500">
        <h1 className="text-3xl font-bold mb-6 text-yellow-300">Edit Skills</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {Object.keys(formData).map((key) => (
            key !== "_id" && key !== "characterId" && key !== "__v" && (
              <div key={key}>
                <label htmlFor={key} className="block text-yellow-200 mb-2 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <input
                  type="number"
                  name={key}
                  id={key}
                  placeholder={key.replace(/([A-Z])/g, ' $1').trim()}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  min="-4"
                  max="4"
                />
              </div>
            )
          ))}
          <input
            type="submit"
            value="Save Skills"
            className="w-full bg-yellow-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-yellow-600"
          />
        </form>
      </section>
    </div>
  );
};

export default EditSkill;