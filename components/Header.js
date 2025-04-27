import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const Header = () => {
  const HeaderMenu = [
    {
      id: 1,
      title: "Ride",
      icon: "/taxi.png",
    },
    {
      id: 2,
      title: "Package",
      icon: "/box.png",
    },
  ];
  return (
    <div>
      <div className="p-5 pb-3 pl-4 border-b-[4px] border-gray-200 bg-white flex items-center justify-between">
        <div className="flex items-center gap-24">
          <Image
            src="/Logo.png"
            width={100}
            height={100}
            alt="logo"
            priority
            style={{ height: "auto" }}
          />
          <div className="flex items-center gap-6">
            {HeaderMenu.map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <Image
                  src={item.icon}
                  width={30}
                  height={30}
                  alt={item.title}
                />
                <h2 className="font-semibold text-[15px] text-black">
                  {item.title}
                </h2>
              </div>
            ))}
          </div>
        </div>
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
