import React, { type FC, useState } from "react";
import axios from "axios";
import { FaStar, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

interface RatingProps {
  professorId: number;
  SCtoken: string;
  token: string;
}

const Rating: FC<RatingProps> = ({ professorId, SCtoken, token }) => {
  const [rate, setRate] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const getProfessorEmails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1337/api/professors/${professorId}?fields[0]=id&populate=scores`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data.attributes.scores.data.map(
        (score: any) => score.attributes.email
      );
    } catch (error) {
      console.error("Error getting professor emails:", error);
      return [];
    }
  };

  const submitRating = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const professorEmails = await getProfessorEmails();
      if (professorEmails.includes(email)) {
        setMessage("شما قبلا برای این استاد امتیاز داده‌اید.");
        setIsSuccess(false);
        setIsModalOpen(true);
        return;
      }

      // If the user has not rated this professor yet, submit the rating
      const ratingResponse = await axios.post(
        "http://localhost:1337/api/scores",
        {
          data: {
            rate,
            email,
            professor: professorId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${SCtoken}`,
          },
        }
      );

      if (ratingResponse.status === 200) {
        setMessage("امتیاز شما با موفقیت ثبت شد!");
        setIsSuccess(true);
      }
    } catch (error) {
      setMessage("خطایی رخ داد. لطفا دوباره تلاش کنید.");
      setIsSuccess(false);
      console.error("Error submitting rating:", error);
    } finally {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="max-w-[40rem] mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-4">
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
                  star <= (hover || rate) ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => setRate(star)}
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
        </form>
      </div>
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div
                className={`bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ${
                  isSuccess
                    ? "border-l-4 border-green-500"
                    : "border-l-4 border-red-500"
                }`}
              >
                <div className="sm:flex sm:items-start">
                  <div
                    className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${
                      isSuccess ? "bg-green-100" : "bg-red-100"
                    } sm:mx-0 sm:h-10 sm:w-10`}
                  >
                    {isSuccess ? (
                      <FaCheckCircle
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    ) : (
                      <FaExclamationCircle
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      اطلاعیه
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{message}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  تایید
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rating;
