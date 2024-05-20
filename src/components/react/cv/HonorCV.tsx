import type { FC } from "react";
import type { Honor } from "../../../interfaces/Professor";

const HonorCv: FC<{ honors: Honor[] }> = ({ honors }) => {
  return (
    <div className="max-w-[40rem] mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-4 ">
      <h1 className="text-gray-900 font-bold text-xl uppercase font-[Lalezar]">
        افتخارات
      </h1>
      <div className={`grid grid-cols-${honors.length == 1 ? 1 : 2}`}>
        {honors.map((h) => (
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              عنوان : {h.attributes.title}
            </div>
            <p className="text-gray-700 text-base mb-2">
              تاریخ : {h.attributes.date}
            </p>

            <p className="text-gray-700 text-base">
              توضیحات: {h.attributes.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HonorCv;
