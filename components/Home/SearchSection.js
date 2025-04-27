"use client";
import React, { useState, useContext, useEffect } from "react";
import InputItem from "./InputItem";
import GoogleWrapper from "./GoogleWrapper";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";
import CarListOptions from "./CarListOptions";

const SearchSection = () => {
  const { Source } = useContext(SourceContext);
  const { Destination } = useContext(DestinationContext);
  const [distance, setDistance] = useState(null);
  const [rideType, setRideType] = useState("now");

  const calculateDistance = () => {
    if (Source && Destination) {
      const dist = google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(Source.lat, Source.lng),
        new google.maps.LatLng(Destination.lat, Destination.lng)
      );
      setDistance(dist * 0.01); // Convert meters to kilometers
    }
  };

  useEffect(() => {
    if (Source) console.log("Source:", Source);
    if (Destination) console.log("Destination:", Destination);
  }, [Source, Destination]);

  return (
    <div>
      <div className="p-2 md:p-6 border-[2px] rounded-xl">
        <p className="text-[20px] font-bold mb-2">Get A Ride</p>
        <GoogleWrapper>
          <InputItem type="source" />
          <InputItem type="destination" />
        </GoogleWrapper>

        {/* Ride Type Toggle */}
        <div className="flex items-center gap-3 mt-4">
          <label className="font-medium">Ride Type:</label>
          <select
            className="border px-3 py-2 rounded-lg"
            value={rideType}
            onChange={(e) => setRideType(e.target.value)}
          >
            <option value="now">Ride Now</option>
            <option value="schedule">Schedule for Later</option>
          </select>
        </div>

        <button
          className="bg-black text-white py-3 rounded-lg mt-3 w-full"
          onClick={calculateDistance}
          disabled={!Source || !Destination}
        >
          Search
        </button>
      </div>

      {distance && <CarListOptions distance={distance} />}
    </div>
  );
};

export default SearchSection;
