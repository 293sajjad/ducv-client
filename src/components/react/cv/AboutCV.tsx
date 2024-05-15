import type { FC } from "react";

const AboutCv: FC<{ text: string; rank: string; age: number }> = ({
  text,
  rank,
  age,
}) => {
  return (
    <>
      <div className="max-w-[40rem] mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-4 h-auto">
        <div className="px-4 py-2 h-full">
          <h1 className="text-gray-900 font-bold text-xl uppercase font-[Lalezar]">
            درباره من
          </h1>
          <p className="text-gray-600 mt-2">{text}</p>
        </div>
        <div className="flex justify-between items-center px-4 py-2 bg-gray-200 h-full">
          <p className="text-gray-600">مرتبه : {rank}</p>
          <p className="text-gray-600">سن : {age}</p>
        </div>
      </div>
    </>
  );
};

export default AboutCv;
