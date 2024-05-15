import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FC } from "react";
import type { ProfessorData } from "../../interfaces/Professor";

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  const stars = Array.from({ length: fullStars }, (_, index) => (
    <FontAwesomeIcon key={index} icon={faStar} />
  ));

  if (hasHalfStar) {
    stars.push(<FontAwesomeIcon key="half-star" icon={faStarHalf} />);
  }

  return stars;
};

const ProfessorCard: FC<{
  p: ProfessorData;
  slug: string;
  star: number;
}> = ({ p, slug, star }) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/4 ">
      <a href={`/professors/${slug}`} className="text-black">
        <div className="bg-white rounded-lg shadow-md p-4 h-full w-full lg:w-52 relative group">
          <div className="mb-4">
            <img
              src={`http://localhost:1337${p.attributes.avatar.data.attributes.url}`}
              alt={`${p.attributes.name} ${p.attributes.family}`}
              className="w-full h-40 object-cover rounded"
            />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            {`${p.attributes.name} ${p.attributes.family}`}
          </h2>
          <p className="text-gray-600 text-sm">
            {p.attributes.adjectives.length == 1
              ? p.attributes.adjectives
              : p.attributes.adjectives[0]}
          </p>
          {star == 0 ? (
            <p className="mt-2 text-xs">هنوز امتیازی ثبت نشده</p>
          ) : (
            <div className="mt-2" dir="ltr">
              {renderStars(star)}
            </div>
          )}
          <div className="mt-2" dir="ltr"></div>
          <div className="absolute inset-0 border-2 border-transparent rounded-lg group-hover:border-blue-500 transition-all duration-300 pointer-events-none"></div>
        </div>
      </a>
    </div>
  );
};

export default ProfessorCard;
