import { type FC, useState, useEffect } from "react";
import axios from "axios";

interface AvatarAttributes {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: any | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
}

interface AvatarData {
  id: number;
  attributes: AvatarAttributes;
}

interface ProfessorAttributes {
  name: string;
  family: string;
  marital_status: boolean;
  age: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  phoen: string;
  address: string;
  email: string | null;
  aboutMe: string | null;
  google_scholar: string | null;
  adjectives: string[];
  slug: string;
  avatar: { data: AvatarData };
  video: { data: any };
  educations: { data: any[] };
  teachings: { data: any[] };
  researches: { data: any[] };
  honors: { data: any[] };
  activities: { data: any[] };
  skills: { data: any[] };
  comments: { data: any[] };
  scores: { data: any[] };
}

interface ProfessorData {
  id: number;
  attributes: ProfessorAttributes;
}

const CV: FC<{ token: string; url: string; slug: string }> = ({
  token,
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
          return;
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
      <div className="flex items-center">
        {/* Assuming the avatar URL is available in professorData */}
        <img
          src={"http://localhost:1337" + attributes.avatar.data.attributes.url}
          alt={attributes.name}
          className="w-24 h-24 rounded-full mr-8"
        />
        <div>
          <h2 className="m-2 text-2xl font-[Lalezar] font-semibold text-gray-800">
            {attributes.name} {attributes.family}
          </h2>
          <p className="text-gray-600">
            {attributes.adjectives.length == 1
              ? attributes.adjectives
              : attributes.adjectives[0]}
          </p>
        </div>
      </div>
      <div className="mt-8">
        <div className="bg-gray-200 rounded-lg p-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Contact Information
          </h3>
          <p className="text-gray-600">Email: {attributes.email || "N/A"}</p>
          <p className="text-gray-600">Phone: {attributes.phoen}</p>
          <p className="text-gray-600">Address: {attributes.address}</p>
        </div>
        <div className="bg-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Education
          </h3>
          <p className="text-gray-600">
            Degree: Bachelor of Science in Computer Science
          </p>
          <p className="text-gray-600">University: XYZ University</p>
          <p className="text-gray-600">Year of Graduation: 20XX</p>
        </div>
      </div>
    </div>
  );
};

export default CV;
