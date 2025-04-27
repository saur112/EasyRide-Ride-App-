"use client";
import React, { useEffect, useRef, useState } from "react";

const CustomAutocompleteInput = ({ placeholder, onSelect }) => {
  const inputRef = useRef(null);
  const [predictions, setPredictions] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.google?.maps?.places?.AutocompleteSuggestion
    ) {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    const service = new window.google.maps.places.AutocompleteSuggestion();

    const input = inputRef.current;
    const handleChange = (e) => {
      const query = e.target.value;
      if (!query) return setPredictions([]);

      service.getSuggestions({ input: query }, (suggestions, status) => {
        if (status === "OK") setPredictions(suggestions);
        else setPredictions([]);
      });
    };

    input.addEventListener("input", handleChange);
    return () => input.removeEventListener("input", handleChange);
  }, [ready]);

  // Don't render anything server-side
  if (!ready) return null;

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        placeholder={placeholder}
        className="w-full p-2 border rounded"
      />
      {predictions.length > 0 && (
        <ul className="absolute bg-white z-10 w-full border rounded mt-1 max-h-40 overflow-y-auto">
          {predictions.map((prediction, i) => (
            <li
              key={i}
              onClick={() => {
                inputRef.current.value = prediction.description;
                setPredictions([]);
                if (onSelect) onSelect(prediction);
              }}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {prediction.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomAutocompleteInput;
