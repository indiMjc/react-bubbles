import React, { useState } from "react";
import { axiosWithAuth } from "../modules/axiosWithAuth";
import AddColor from "./AddColor";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const authAxios = axiosWithAuth();

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    authAxios
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => updateColors(colors.filter(color => color.id !== res.data)))
      .catch(err => console.log("Editing error", err));
  };

  const deleteColor = color => {
    authAxios
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(res => {
        updateColors(colors.filter(color => color.id !== res.data));
      })
      .catch(err => console.log("Delete error", err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      <AddColor />
    </div>
  );
};

export default ColorList;
