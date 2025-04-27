import Image from "next/image";
import React from "react";
import { HiMiniUser } from "react-icons/hi2";

const CarListItem = ({ car, distance }) => {
  const baseFare = 170;
  const price = baseFare + car.amount * distance;

  return (
    <div>
      <div className="flex items-center justify-between mt-5">
        <div className="flex items-center gap-4">
          <Image src={car.image} width={100} height={100} alt="car image" />
          <div>
            <h2 className="font-semibold text-[18px] flex gap-3 items-center">
              {car.name}
              <span className="flex items-center font-medium">
                <HiMiniUser /> {car.seat}
              </span>
            </h2>
            <p>{car.description}</p>
          </div>
          <p className="text-[18px] font-semibold">₹{price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default CarListItem;
