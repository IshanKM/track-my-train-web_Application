// components/Accordion/Accordion.jsx
import React from "react";
import AccordionItem from "./AccordionItem";

function Accordion({ data }) {
  return (
    <div id="accordion-collapse" className="mt-16">
      {data.map((item, index) => (
        <AccordionItem key={index} title={item.title} content={item.content} />
      ))}
    </div>
  );
}

export default Accordion;
