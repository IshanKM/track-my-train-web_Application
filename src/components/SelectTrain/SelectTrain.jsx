import React from 'react';
import background from '../../assets/Background.jpg';
import CustomComboBox from '../CustomComboBox/CustomComboBox';

const SelectTrain = () => {
  return (
    <div className="absolute w-full h-full pt-24">
      <img
        src={background}
        alt="Background"
        className="absolute inset-0 object-cover w-full h-full"
      />
      <div className="relative flex content-center justify-center w-full h-full place-content-center">
        <CustomComboBox/>
        <CustomComboBox/>
        
      </div>
    </div>
  );
};

export default SelectTrain;
