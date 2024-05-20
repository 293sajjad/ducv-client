import { type FC, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

interface RatingProps {
  professorId: number;
  token: string;
}

const Rating: FC<RatingProps> = ({ professorId, token }) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const submitRating = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:1337/ratings", // فرض کنید endpoint برای ذخیره امتیاز این باشد
        {
          data: {
            rating,
            email,
            professor: professorId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setMessage("امتیاز شما با موفقیت ثبت شد!");
      }
    } catch (error) {
      setMessage("خطایی رخ داد. لطفا دوباره تلاش کنید.");
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <div className="max-w-[40rem] mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-4 ">
      <div className="p-4">
        <h1 className="text-gray-900 font-bold text-xl uppercase font-[Lalezar]">
          امتیازدهی به استاد
        </h1>
        <form onSubmit={submitRating} className="space-y-4">
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="@ایمیل"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex items-center space-x-1 justify-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`cursor-pointer ${
                  star <= (hover || rating)
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              />
            ))}
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              ثبت امتیاز
            </button>
          </div>
          {message && <p className="mt-4 text-green-500">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Rating;
