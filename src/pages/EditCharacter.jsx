import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const host = 'http://localhost:3001';

const EditCharacter = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    playerName: "",
    characterName: "",
    race: "",
    class: "",
    level: "",
    background: "",
    alignment: "",
    experiencePoints: "",
    description: "",
    strength: "",
    dexterity: "",
    constitution: "",
    intelligence: "",
    wisdom: "",
    charisma: "",
    weaponName: "",
  });
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
        setFormData(data);
      } catch (error) {
        console.error("Error fetching character:", error);
        setError("Failed to fetch character");
      }
    };

    fetchCharacter();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${host}/characters/${id}`, {
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

      navigate(`/characters/${id}`);
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

  if (!formData) {
    return <p className="text-white text-center mt-5">Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white pb-20">
      <section className="p-8 bg-gray-800 bg-opacity-80 rounded-lg shadow-2xl w-full max-w-2xl border border-yellow-500 pb-10">
        <h1 className="text-3xl font-bold mb-6 text-yellow-300">Edit Character</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {Object.keys(formData).map((key) => (
            key !== "_id" && key !== "__v" && key !== "userId" && (
              <div key={key}>
                <label htmlFor={key} className="block text-yellow-200 mb-2 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <input
                  type="text"
                  name={key}
                  id={key}
                  placeholder={key.replace(/([A-Z])/g, ' $1').trim()}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-gray-700 border-gray-600 text-white"
                />
              </div>
            )
          ))}
          <input
            type="submit"
            value="Save Changes"
            className="w-full bg-yellow-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-yellow-600 transition-colors duration-300"
          />
        </form>
      </section>
    </div>
  );
};

export default EditCharacter;