import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomComboBox from "../CustomComboBox/CustomComboBox";
import backgroud from "../../assets/Background.jpg";
import Accordion from "../Accordian/Accodian"; // Import the Accordion component

const SelectTrain = () => {
  const [stations, setStations] = useState([]);
  const [token, setToken] = useState(null);
  const [startStation, setStartStation] = useState("");
  const [endStation, setEndStation] = useState("");
  const [filteredData, setFilteredData] = useState(null); // State to store filtered data
  const [accordionData, setAccordionData] = useState([]); // State to store accordion data

  const fetchToken = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/get-token",
        {},
        {
          headers: {
            "x-api-key": "user-api-key-123456",
          },
        }
      );
      setToken(response.data.token);
    } catch (error) {
      console.error("Failed to fetch token:", error);
    }
  };

  const fetchStations = async () => {
    try {
      if (!token) return;

      const response = await axios.get(
        "http://api.trackmytrain.online/api/v1/stations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const allStations = response.data.data.flatMap((route) =>
        route.stations.map((station) => station.name)
      );
      const uniqueStations = [...new Set(allStations)];

      setStations(uniqueStations);
    } catch (error) {
      console.error("Failed to fetch stations:", error);
    }
  };

  const handleSubmit = async () => {
    if (!startStation || !endStation) {
      alert("Please select both start and end stations.");
      return; // Stop the function here if validation fails
    }

    console.log("Start Station:", startStation);
    console.log("End Station:", endStation);

    try {
      const url = `http://api.trackmytrain.online/api/v1/clients?startStation=${startStation}&endStation=${endStation}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API Response:", response.data);

      const {
        startStation: responseStartStation,
        endStation: responseEndStation,
        routes,
      } = response.data;

      // Process and sort data
      const processedData = routes.map((route) => ({
        startStation: responseStartStation,
        endStation: responseEndStation,
        startLocation: route.startLocation,
        endLocation: route.endLocation,
        distance: route.distance,
        price: route.price,
        schedules: route.schedules
          .map((schedule) => {
            const lastLocationData = schedule.lastLocationData || {};
            return {
              distance: schedule.schedule?.distance || "N/A",
              defaultTrainName: schedule.schedule?.defaultTrainName || "N/A",
              TrainNo: schedule.schedule?.TrainNo || "N/A",
              status: schedule.schedule?.status || "N/A",
              trainType: schedule.schedule?.trainType || "N/A",
              frequency: schedule.schedule?.frequency || "N/A",
              notes: schedule.schedule?.notes || "N/A",
              avgStartTime: schedule.schedule?.avgStartTime || "N/A",
              avgEndTime: schedule.schedule?.avgEndTime || "N/A",
              lastLocationData: {
                Name: lastLocationData?.Name || "N/A",
                Time: lastLocationData?.Time || "N/A",
                speed: lastLocationData?.speed || "N/A",
                coordinate: lastLocationData?.cordinate || [],
              },
              progressPercentage: isNaN(schedule.progressPercentage)
                ? "N/A"
                : `${schedule.progressPercentage}`,
            };
          })
          .sort((a, b) => {
            // Sort by status: "active" should come first
            if (a.status === "active" && b.status !== "active") return -1;
            if (a.status !== "active" && b.status === "active") return 1;
            return 0; // Leave the order unchanged if both have the same status
          }),
      }));

      setFilteredData(processedData); // Update state with filtered data

      // Prepare data for Accordion
      const accordionItems = [];

      processedData.forEach((route, routeIndex) => {
        if (route.schedules.length > 0) {
          route.schedules.forEach((schedule, scheduleIndex) => {
            const title =
              schedule.defaultTrainName || `Train ${scheduleIndex + 1}`;

            const content = {
              "Start Location": route.startLocation,
              "End Location": route.endLocation,
              Distance: `${route.distance} km`,
              Price: JSON.stringify(route.price),
              "Schedule Distance": `${schedule.distance} km`,
              "Train Name": schedule.defaultTrainName,
              "Train No": schedule.TrainNo,
              Status: schedule.status,
              "Train Type": schedule.trainType,
              Frequency: schedule.frequency,
              Notes: schedule.notes,
              "Avg Start Time": schedule.avgStartTime,
              "Avg End Time": schedule.avgEndTime,
              "Progress Percentage": `${schedule.progressPercentage}%`,
              Time: schedule.lastLocationData.Time,
              Speed: `${schedule.lastLocationData.speed} km/h`,
              Coordinate: schedule.lastLocationData.coordinate.join(", "),
            };

            accordionItems.push({ title, content });
          });
        } else {
          // Handle routes with no schedules
          const title = `Route ${routeIndex + 1}: No schedules available`;
          const content = {
            "Start Location": route.startLocation,
            "End Location": route.endLocation,
            Distance: `${route.distance} km`,
            Price: JSON.stringify(route.price),
            Notes: "No schedules available.",
          };
          accordionItems.push({ title, content });
        }
      });

      setAccordionData(accordionItems); // Update state with accordion data
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handleClear = () => {
    setStartStation("");
    setEndStation("");
    setFilteredData(null);
    setAccordionData([]);
  };

  useEffect(() => {
    fetchToken();
  }, []);

  useEffect(() => {
    if (token) {
      fetchStations();
    }
  }, [token]);

  return (
    <div className="relative flex w-full bg-gray-200 bg-center bg-cover h-96">
      <div
        className="flex w-full bg-center bg-cover h-96"
        style={{ backgroundImage: `url(${backgroud})` }}
      ></div>
      <div className="absolute flex flex-col justify-center p-10 transform -translate-x-1/2 bg-white border border-2 border-black rounded-lg select-station left-1/2 top-1/2">
        <div className="mb-10 text-xl">
          <p className="items-start justify-start">
            Hey, Please Select your Start and End Stations
          </p>
        </div>

        <div className="flex flex-row items-center gap-4">
          <div>
            <p className="items-start justify-start">Start Station</p>
            <CustomComboBox
              label="Start Station"
              options={stations}
              value={startStation}
              onChange={(value) => setStartStation(value)}
            />
          </div>
          <div>
            <p className="items-start justify-start">End Station</p>
            <CustomComboBox
              label="End Station"
              options={stations}
              value={endStation}
              onChange={(value) => setEndStation(value)}
            />
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={handleSubmit}
            className="p-5 bg-[#079ca2] rounded-md text-white"
          >
            Search
          </button>
          <button
            onClick={handleClear}
            className="p-5 text-white bg-gray-500 rounded-md"
          >
            Clear
          </button>
        </div>

        {/* Display the accordion with filtered data */}
        {accordionData.length > 0 && <Accordion data={accordionData} />}
      </div>
    </div>
  );
};

export default SelectTrain;
