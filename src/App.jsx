import { useState } from "react";

import Navbar from "./components/Navbar/Navbar";
import SelectTrain from "./components/SelectTrain/SelectTrain";
import Separator from "./components/Separator/Separator";
import CustomComboBox from "./components/CustomComboBox/CustomComboBox";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <SelectTrain />
    </>
  );
}

export default App;
