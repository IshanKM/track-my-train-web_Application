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
        "http://localhost:3000/api/v1/stations",
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
      const url = `http://localhost:3000/api/v1/clients?startStation=${startStation}&endStation=${endStation}`;

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
                coordinate: lastLocationData?.coordinate || [],
              },
              progressPercentage: schedule.progressPercentage || "N/A",
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
            const content = (
              <div>
                <p>
                  <strong>Route {routeIndex + 1}</strong>
                </p>
                <p>
                  <strong>Start Location:</strong> {route.startLocation}
                </p>
                <p>
                  <strong>End Location:</strong> {route.endLocation}
                </p>
                <p>
                  <strong>Distance:</strong> {route.distance} km
                </p>
                <p>
                  <strong>Price:</strong> {JSON.stringify(route.price)}
                </p>
                {/* Schedule details */}
                <p>
                  <strong>Distance:</strong> {schedule.distance} km
                </p>
                <p>
                  <strong>Train Name:</strong> {schedule.defaultTrainName}
                </p>
                <p>
                  <strong>Train No:</strong> {schedule.TrainNo}
                </p>
                <p>
                  <strong>Status:</strong> {schedule.status}
                </p>
                <p>
                  <strong>Train Type:</strong> {schedule.trainType}
                </p>
                <p>
                  <strong>Frequency:</strong> {schedule.frequency}
                </p>
                <p>
                  <strong>Notes:</strong> {schedule.notes}
                </p>
                <p>
                  <strong>Avg Start Time:</strong> {schedule.avgStartTime}
                </p>
                <p>
                  <strong>Avg End Time:</strong> {schedule.avgEndTime}
                </p>
                <p>
                  <strong>Progress Percentage:</strong>{" "}
                  {schedule.progressPercentage}%
                </p>
                <p>
                  <strong>Time:</strong> {schedule.lastLocationData.Time}
                </p>
                <p>
                  <strong>Speed:</strong> {schedule.lastLocationData.speed} km/h
                </p>
                <p>
                  <strong>Coordinate:</strong>{" "}
                  {schedule.lastLocationData.coordinate.join(", ")}
                </p>
              </div>
            );
            accordionItems.push({ title, content });
          });
        } else {
          // Handle routes with no schedules
          const title = `Route ${routeIndex + 1}: No schedules available`;
          const content = (
            <div>
              <p>
                <strong>Start Location:</strong> {route.startLocation}
              </p>
              <p>
                <strong>End Location:</strong> {route.endLocation}
              </p>
              <p>
                <strong>Distance:</strong> {route.distance} km
              </p>
              <p>
                <strong>Price:</strong> {JSON.stringify(route.price)}
              </p>
              <p>No schedules available.</p>
            </div>
          );
          accordionItems.push({ title, content });
        }
      });

      setAccordionData(accordionItems); // Update state with accordion data
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
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
            Hey , Please Select your Start and End Stations
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

          <div className="p-5 bg-[#079ca2] rounded-md text-white bottom-0 ">
            <button onClick={handleSubmit}>Search</button>
          </div>
        </div>

        {/* Display the accordion with filtered data */}
        {accordionData.length > 0 && <Accordion data={accordionData} />}
      </div>
    </div>
  );
};

export default SelectTrain;
