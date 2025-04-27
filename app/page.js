"use client";
import GoogleMapSection from "@/components/Home/GoogleMapSection";
import GoogleWrapper from "@/components/Home/GoogleWrapper";
import SearchSection from "@/components/Home/SearchSection";
import { DestinationContext } from "@/context/DestinationContext";
import { SourceContext } from "@/context/SourceContext";
import { useState } from "react";

export default function Home() {
  const [Source, setSource] = useState([]);
  const [Destination, setDestination] = useState([]);
  return (
    <SourceContext.Provider value={{ Source, setSource }}>
      <DestinationContext.Provider value={{ Destination, setDestination }}>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5 font-medium">
          <div>
            <SearchSection />
          </div>
          <div className="col-span-2">
            <GoogleWrapper>
              <GoogleMapSection />
            </GoogleWrapper>
          </div>
        </div>
      </DestinationContext.Provider>
    </SourceContext.Provider>
  );
}
