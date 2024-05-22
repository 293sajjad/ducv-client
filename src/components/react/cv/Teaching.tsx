import type { FC } from "react";

interface Teach {
  attributes: {
    name_of_institution: string;
    status: boolean;
    description: string;
  };
}

const TeachingCV: FC<{ data: Teach[] }> = ({ data }) => {
  return (
    <div className="max-w-[40rem] mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-4 h-auto">
      <div className="px-4 py-2 h-full">
        <h1 className="text-gray-900 font-bold text-xl uppercase font-[Lalezar] mb-4">
          درس های تدریس شده
        </h1>
        <div className="space-y-4">
          {data.map((teachItem, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <h2 className="text-gray-800 font-semibold text-lg">
                {teachItem.attributes.name_of_institution}
              </h2>
              <p
                className={`text-sm mt-1 ${
                  teachItem.attributes.status
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {teachItem.attributes.status ? "درحال تدریس" : "توقف ارائه"}
              </p>
              <p className="text-gray-600 mt-2">
                {teachItem.attributes.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeachingCV;
