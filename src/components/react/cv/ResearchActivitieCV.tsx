import React from "react";

const ResearchActivities: React.FC<{ data: any }> = ({ data }) => {
  const articles = data.body.data || [];

  return (
    <div className="max-w-[40rem] mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-4 p-6">
      <h1 className="text-gray-900 font-bold text-xl uppercase font-[Lalezar]">
        فعالیت های پژوهشی
      </h1>
      <div className="grid grid-cols-1 gap-4">
        {articles.map(
          (article: any, index: number) =>
            article["عنوان فارسي"] !== undefined && (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-lg border border-gray-200"
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
    </div>
  );
};

export default ResearchActivities;
