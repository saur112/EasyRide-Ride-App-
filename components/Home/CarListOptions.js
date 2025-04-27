import CarsDataList from "@/utils/CarsDataList";
import React, { useState } from "react";
import CarListItem from "./CarListItem";
import { useRouter } from "next/navigation";

const CarListOptions = ({ distance }) => {
  const [activeIndex, setActiveIndex] = useState();
  const [selectedCar, setSelectedCar] = useState();
  const router = useRouter();

  return (
    <div className="mt-5 overflow-auto h-[300px]">
      <h2 className="text-[22px] font-bold mb-2 ">Recommended</h2>
      {CarsDataList.map((item, index) => (
        <div
          key={item.id}
          className={`cursor-pointer px-4 ${
            activeIndex === index
              ? "border-[2px] border-black rounded-2xl"
              : null
          }`}
          onClick={() => {
            setActiveIndex(index);
            setSelectedCar(item);
          }}
        >
          <CarListItem car={item} distance={distance} />
        </div>
      ))}
      {selectedCar && <CarListItem car={selectedCar} distance={distance} /> ? (
        <div className="flex items-center justify-between bottom-1 fixed rounded-lg  bg-white p-3 shadow-xl w-full md:w-[30%] border-[1px] ">
          <h2>Make Payment For</h2>
          <button
            className="bg-black text-white py-2 px-4 rounded-lg"
            onClick={() => router.push("/payment?amount="+(selectedCar.amount*distance+170).toFixed(2))}
          >
            Request {selectedCar.name}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default CarListOptions;
