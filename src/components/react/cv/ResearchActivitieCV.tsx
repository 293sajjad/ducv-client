import React, { useState } from "react";

const ResearchActivities: React.FC<{ data: any }> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const articles = data.body.data || [];

  const toggleContent = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="max-w-[40rem] mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-4">
      <div className="p-6">
        <h1 className="text-gray-900 font-bold text-xl uppercase font-[Lalezar] ">
          فعالیت های پژوهشی
        </h1>
        <button
          onClick={toggleContent}
          className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300 ease-in-out"
        >
          {isOpen ? "بستن" : "مشاهده"}
        </button>
        {isOpen && (
          <div className="grid grid-cols-1 gap-4 mt-4">
            {articles.map(
              (article: any, index: number) =>
                article["عنوان فارسي"] !== undefined && (
                  <div
                    key={index}
                    className="bg-gray-100 p-4 rounded-lg border border-gray-200 hover:shadow-md transition duration-300 ease-in-out"
                  >
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">
                      {article["عنوان فارسي"]}
                    </h2>
                    <p className="text-sm text-gray-600">
                      تاریخ: {article["تاريخ ثبت فعاليت"]}
                    </p>
                  </div>
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResearchActivities;
