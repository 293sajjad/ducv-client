import axios from "axios";
import { useEffect, useState, type FC } from "react";
import ProfessorCard from "./ProfessorCard";
import type { ProfessorData } from "../../interfaces/Professor";

const ProfessorLanding: FC<{ token: string; url: string }> = ({
  token,
  url,
}) => {
  const [professors, setProfessors] = useState<ProfessorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${url}professors?fields[0]=name&fields[1]=family&fields[2]=adjectives&fields[3]=slug&populate[0]=avatar&populate[1]=scores`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfessors(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProfessors = professors.filter((professor) =>
    `${professor.attributes.name} ${professor.attributes.family} ${professor.attributes.adjectives}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const calculateStarRating = (professor: ProfessorData) => {
    const scores = professor.attributes.scores.data;
    if (scores.length === 0) {
      return 0;
    }
    const total = scores.reduce((acc, score) => acc + score.attributes.rate, 0);
    return total / scores.length;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 rounded-full animate-spin border-8 border-solid border-green-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return <div>خطا در بارگیری اطلاعات: {error.message}</div>;
  }

  return (
    <div>
      {/* جستجو */}
      <div className="mb-4" dir="rtl">
        <input
          type="text"
          placeholder="جستجو..."
          className="w-full px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-yellow-400"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      {/* اصلی */}
      {filteredProfessors.length == 0 ? (
        <div
          dir="rtl"
          className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
          role="alert"
        >
          <p className="font-bold">خطایی رخداد</p>
          <p>استادی با این مشخصات در سیستم ثبت نشده است.</p>
        </div>
      ) : (
        <div className="flex flex-wrap -mx-4">
          {filteredProfessors.map((professor) => (
            <ProfessorCard
              key={professor.id}
              slug={professor.attributes.slug}
              p={professor}
              star={calculateStarRating(professor)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfessorLanding;
