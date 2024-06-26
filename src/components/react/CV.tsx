import { type FC, useState, useEffect } from "react";
import axios from "axios";
import type { ProfessorData } from "../../interfaces/Professor";
import AboutCv from "./cv/AboutCV";
import SkillCv from "./cv/SkillCV";
import ContactCv from "./cv/ContactCV";
import EducationCv from "./cv/EducationCV";
import HonorCv from "./cv/HonorCV";
import ResearchActivities from "./cv/ResearchActivitieCV";
import SendEmailCv from "./cv/SendEmailCV";
import Rating from "./cv/Rating";
import TeachingCV from "./cv/Teaching";

const CV: FC<{ token: string; url: string; slug: string; SCtoken: string }> = ({
  token,
  SCtoken,
  url,
  slug,
}) => {
  const [professorData, setProfessorData] = useState<ProfessorData | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${url}professors?filters[slug][$eq]=${slug}&&populate=*`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = response.data.data[0];

        if (!result) {
          console.log("No professor data found");
          setLoading(false);
        }
        setProfessorData(result);
        setLoading(false); // Data fetching completed, set loading to false
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Error occurred, set loading to false
      }
    };

    fetchData();
  }, []);

  const copyPageUrl = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        alert("نشانی صفحه کپی شد!");
      })
      .catch((error) => {
        console.error("Error copying URL:", error);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 rounded-full animate-spin border-8 border-solid border-green-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!professorData) {
    return (
      <div
        dir="rtl"
        className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
        role="alert"
      >
        <p className="font-bold">خطایی رخداد</p>
        <p>استادی با این مشخصات در سیستم ثبت نشده است.</p>
      </div>
    );
  }

  const { attributes } = professorData;

  return (
    <div className="p-8">
      <div className="flex flex-col items-center md:flex-row md:items-center p-4">
        <img
          src={"http://localhost:1337" + attributes.avatar.data.attributes.url}
          alt={attributes.name}
          className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-cyan-900 object-cover"
        />
        <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left mr-2">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            {attributes.name} {attributes.family}
          </h2>
          <p className="text-gray-800 text-sm md:text-base mt-2 w-40">
            {attributes.adjectives.length == 1
              ? attributes.adjectives
              : attributes.adjectives[0]}
          </p>
          <div className="mt-4 flex justify-center md:justify-start">
            <button
              onClick={copyPageUrl}
              className="py-1 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              کپی نشانی صفحه
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <AboutCv
          text={attributes.aboutMe}
          rank={attributes.academic_rank}
          age={attributes.age}
        />
        <SkillCv data={attributes.skills.data} />
        <ContactCv
          phone={attributes.phone_number}
          email={attributes.email}
          scholar={attributes.google_scholar}
        />
        <EducationCv education={attributes.educations.data} />
        <TeachingCV data={attributes.teachings.data} />
        <HonorCv honors={attributes.honors.data} />
        <ResearchActivities
          data={attributes.research_activitie.data.attributes}
        />
        <SendEmailCv professorId={professorData.id} url={url} token={SCtoken} />
        <Rating
          professorId={professorData.id}
          token={token}
          SCtoken={SCtoken}
        />
      </div>
    </div>
  );
};

export default CV;
