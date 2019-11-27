import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../modules/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const authAxios = axiosWithAuth();

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  useEffect(() => {
    authAxios
      .get(`http://localhost:5000/api/colors`)
      .then(res => setColorList(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
