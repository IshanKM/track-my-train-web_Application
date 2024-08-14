import React from "react";
import background from "../../assets/Background.jpg";
import CustomComboBox from "../CustomComboBox/CustomComboBox";

const SelectTrain = () => {
  return (
    <div>
      <div className="absolute flex items-center justify-center w-full h-96">
        <img
          src={background}
          alt="Background"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="relative flex items-center justify-start max-w-screen-xl w-[75%] bg-white border-2 border-black h-[65%] mt-96 ">
          <div className="flex flex-col items-start justify-start gap-4">
            <div className="relative z-20">
              <CustomComboBox />
            </div>
            {/* Second ComboBox */}
            <div className="relative z-10">
              <CustomComboBox />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectTrain;
