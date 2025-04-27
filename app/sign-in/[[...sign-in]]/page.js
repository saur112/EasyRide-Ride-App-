import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <div>
        <Image
          src="/aa.jpg"
          alt=""
          width={900}
          height={800}
          className=" object-contain  w-full "
        />
        <div className="absolute top-20 right-10">
          <SignIn />
        </div>
      </div>
    </>
  );
}
