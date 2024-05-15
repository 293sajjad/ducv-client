import type { FC } from "react";
import type { Skill } from "../../../interfaces/Professor";

const SkillCv: FC<{ data: Skill[] }> = ({ data }) => {
  console.log(data);

  return (
    <>
      <div className="max-w-[40rem] h-auto mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-4">
        <div className="px-4 py-2">
          <h1 className="text-gray-900 font-bold text-xl uppercase font-[Lalezar]">
            توانایی‌ها
          </h1>
          <div className="mt-4">
            {data.map((s) => (
              <div
                key={s.id}
                className="flex flex-col md:flex-row items-center mb-4 text-center"
              >
                <div className="w-full md:w-1/3 mb-2 md:mb-0">
                  <p className="text-gray-600  md:text-left">
                    {s.attributes.title}
                  </p>
                </div>
                <div className="w-full md:w-2/3">
                  <div className="flex items-center">
                    <div className="flex-1 h-2 relative rounded-full bg-gray-200">
                      <div
                        className="absolute h-full bg-blue-500 rounded-full"
                        style={{ width: `${(s.attributes.degree * 100) / 5}%` }}
                      />
                    </div>
                    <p className="ml-2 text-gray-600">
                      {s.attributes.degree}/5
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SkillCv;
