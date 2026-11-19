import React, { useState } from "react";

function NewPlantForm({ onAddPlant }) {
  // Controlled form: one state object holds all three input values
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
  });

  // Update the field that changed, matched by the input's `name` attribute
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault(); // prevent the browser from reloading the page

    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        price: parseFloat(formData.price), // send price as a number
      }),
    })
      .then((r) => r.json())
      .then((newPlant) => {
        onAddPlant(newPlant); // pass the saved plant (with its id) up to PlantPage
        setFormData({ name: "", image: "", price: "" }); // clear the form
      })
      .catch((error) => console.error("Failed to add plant:", error));
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;