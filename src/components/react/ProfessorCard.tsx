import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FC } from "react";
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
  name: string;
  family: string;
  adjectives: string[] | string;
  star: number;
  img: string;
  slug: string;
}> = ({ name, family, adjectives, star, img, slug }) => {
  return (
    <>
      <div className="w-full md:w-1/2 lg:w-1/4 p-4">
        <a href={`/professors/${slug}`} className="text-black">
          <div className="bg-white rounded-lg shadow-md p-4 h-full w-full lg:w-52">
            <div className="mb-4">
              <img
                src={`http://localhost:1337${img}`}
                alt={`${name} ${family}`}
                className="w-full h-40 object-cover rounded"
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              {`${name} ${family}`}
            </h2>
            <p className="text-gray-600 text-sm">
              {adjectives.length == 1 ? adjectives : adjectives[0]}
            </p>
            {star == 0 ? (
              <p className="mt-2 text-xs">هنوز امتیازی ثبت نشده</p>
            ) : (
              <div className="mt-2" dir="ltr">
                {renderStars(star)}
              </div>
            )}
            <div className="mt-2" dir="ltr"></div>
          </div>
        </a>
      </div>
    </>
  );
};

export default ProfessorCard;
