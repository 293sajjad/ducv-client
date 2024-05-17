import type { FC } from "react";
import type { Education } from "../../../interfaces/Professor";

const EducationCv: FC<{ education: Education[] }> = ({ education }) => {
  return (
    <div className="max-w-[40rem] mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-4 ">
      <h1 className="text-2xl font-semibold mt-4 font-[Lalezar]">
        تحصیلات استاد
      </h1>
      {education.map((e, index) => (
        <EducationCard key={index} education={e.attributes} />
      ))}
    </div>
  );
};

interface EducationCardProps {
  education: {
    grade: string;
    name_of_the_institution: string;
    gpa: number;
    date_start: string;
    date_end: string;
    description: string;
  };
}

const EducationCard: FC<EducationCardProps> = ({ education }) => {
  const {
    grade,
    name_of_the_institution,
    gpa,
    date_start,
    date_end,
    description,
  } = education;

  return (
    <div className="max-w-md mx-auto   rounded-lg overflow-hidden mb-6">
      <div className="px-6 py-4">
        <div className="mb-4">
          <p className="text-base mb-2">
            <span className="font-bold">مقطع: </span>
            {grade}
          </p>
          <p className="text-base mb-2">
            <span className="font-bold">نام موسسه: </span>
            {name_of_the_institution}
          </p>
          <p className="text-base mb-2">
            <span className="font-bold">معدل: </span>
            {gpa}
          </p>
          <p className="text-base mb-2">
            <span className="font-bold">تاریخ شروع: </span>
            {date_start}
          </p>
          <p className="text-base mb-2">
            <span className="font-bold">تاریخ پایان: </span>
            {date_end}
          </p>
        </div>
        <p className="text-base">{description}</p>
      </div>
    </div>
  );
};

export default EducationCv;
