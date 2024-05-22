import React, { type FC, useState, useEffect } from "react";
import axios from "axios";

const SendEmailCv: FC<{ professorId: number; url: string; token: string }> = ({
  professorId,
  url,
  token,
}) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [commentsModalIsOpen, setCommentsModalIsOpen] = useState(false);
  const [comments, setComments] = useState([]);

  const openModal = (message: string, error: boolean) => {
    setModalMessage(message);
    setIsError(error);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) {
      openModal("لطفا تمامی فیلدها را پر کنید.", true);
      return;
    }

    try {
      const response = await axios.post(
        url + "comments",
        {
          data: {
            body: message,
            email: email,
            professor: professorId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      openModal("نظر با موفقیت ثبت شد.", false);
      setEmail("");
      setMessage("");
    } catch (error) {
      openModal("مشکلی در ثبت نظر به وجود آمد. لطفا دوباره تلاش کنید.", true);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${url}comments?filters[professor][$eq]=${professorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments(response.data.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    if (commentsModalIsOpen) {
      fetchComments();
    }
  }, [commentsModalIsOpen]);

  return (
    <>
      <div className="max-w-[40rem] mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-4">
        <div className="p-4">
          <h1 className="text-gray-900 font-bold text-xl uppercase font-[Lalezar]">
            ثبت نظر
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="@ایمیل"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="نظر شما ..."
                rows={4}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                ثبت نظر
              </button>
            </div>
          </form>
          <div className="mt-4">
            <button
              onClick={() => setCommentsModalIsOpen(true)}
              className="w-full py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              نمایش نظرات
            </button>
          </div>
        </div>
      </div>

      {modalIsOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 max-w-md">
            <h2
              className={`text-lg font-bold ${
                isError ? "text-red-600" : "text-green-600"
              } mb-4`}
            >
              {isError ? "خطا" : "موفقیت"}
            </h2>
            <p className="text-gray-700 mb-4">{modalMessage}</p>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              بستن
            </button>
          </div>
        </div>
      )}

      {commentsModalIsOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 max-w-md max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-gray-900 mb-4">نظرات</h2>
            <div className="space-y-4">
              {comments.length > 0 ? (
                comments.map((comment: any) => (
                  <div
                    key={comment.id}
                    className="p-4 border rounded-md shadow-sm"
                  >
                    <p className="text-sm text-gray-700">
                      <strong>ایمیل:</strong> {comment.attributes.email}
                    </p>
                    <p className="text-sm text-gray-700 mt-2">
                      <strong>نظر:</strong> {comment.attributes.body}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      <strong>تاریخ:</strong>{" "}
                      {new Date(comment.attributes.createdAt).toLocaleString(
                        "fa-IR"
                      )}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-700">هیچ نظری وجود ندارد.</p>
              )}
            </div>
            <div className="mt-4">
              <button
                onClick={() => setCommentsModalIsOpen(false)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SendEmailCv;
