import { useState } from "react";

import Navbar from "./components/Navbar/Navbar";
import SelectTrain from "./components/SelectTrain/SelectTrain";
import Separator from "./components/Separator/Separator";
import CustomComboBox from "./components/CustomComboBox/CustomComboBox";
import Accordian from "./components/Accordian/Accodian";
import "./App.css";

function App() {
  const accordionData = [
    {
      title: "What is Flowbite?",
      content:
        "Flowbite is an open-source library of interactive components built on top of Tailwind CSS.",
    },
    {
      title: "Is there a Figma file available?",
      content:
        "Flowbite is first conceptualized and designed using the Figma software.",
    },
    {
      title: "What are the differences between Flowbite and Tailwind UI?",
      content:
        "The main difference is that Flowbite components are open source while Tailwind UI is a paid product.",
    },
  ];

  return (
    <>
      <Navbar />
      <SelectTrain />
      <Accordian data={accordionData} />
    </>
  );
}

export default App;
