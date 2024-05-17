import type { FC } from "react";
import type { Skill } from "../../../interfaces/Professor";

const SkillCv: FC<{ data: Skill[] }> = ({ data }) => {
  // آرایه‌ای از رنگ‌های کارت و خط درصد
  const cardColors = [
    "bg-red-100",
    "bg-blue-100",
    "bg-green-100",
    "bg-yellow-100",
    "bg-purple-100",
  ];
  const lineColors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
  ];

  return (
    <>
      <div className="max-w-[40rem] h-auto mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-4">
        <div className="px-4 py-2">
          <h1 className="text-gray-900 font-bold text-xl uppercase font-[Lalezar]">
            توانایی‌ها
          </h1>
          <div className="mt-4">
            {data.map((s, index) => {
              // انتخاب رندوم رنگ کارت و خط درصد

              const lineColor =
                lineColors[Math.floor(Math.random() * lineColors.length)];

              return (
                <div
                  key={index}
                  className={`bg-slate-100 rounded-lg shadow-lg p-6 mb-4`}
                >
                  <h2 className="text-xl font-semibold mb-2">
                    {s.attributes.title}
                  </h2>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                          {(s.attributes.degree / 5) * 100}%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
                      <div
                        style={{ width: `${(s.attributes.degree / 5) * 100}%` }}
                        className={`${lineColor} shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SkillCv;
