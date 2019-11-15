import React, { useState } from "react";
import { axiosWithAuth } from "../modules/axiosWithAuth";

const authAxios = axiosWithAuth();

const AddColor = () => {
  const [newColor, setNewColor] = useState({
    code: {
      hex: ""
    },
    color: ""
  });
  console.log(" : AddColor -> newColor", newColor);

  const handleChange = e => {
    setNewColor({
      ...newColor,
      [e.target.name]: e.target.value
    });
  };

  const handleHexChange = e => {
    setNewColor({
      ...newColor,
      code: {
        hex: e.target.value
      }
    });
  };

  const addColor = e => {
    e.preventDefault();
    authAxios
      .post(`http://localhost:5000/api/colors`, newColor)
      .then(alert("New Color Added!"))
      .catch(err => console.log("Post error", err));
  };

  return (
    <form>
      <label>
        Hex code:
        <input
          type="text"
          name="hex"
          value={newColor.code.hex}
          onChange={handleHexChange}
        />
      </label>
      <label>
        Color:
        <input
          type="text"
          name="color"
          value={newColor.color}
          onChange={handleChange}
        />
      </label>
      <button type="submit" onClick={addColor}>
        Add New Color
      </button>
    </form>
  );
};

export default AddColor;
