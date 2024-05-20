import type { FC } from "react";

const SendEmailCv: FC = () => {
  return (
    <>
      <div className="max-w-[40rem] mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-4 ">
        <div className="p-4">
          <h1 className="text-gray-900 font-bold text-xl uppercase font-[Lalezar]">
            ثبت نظر
          </h1>
          <form className="space-y-4">
            <div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="@ایمیل"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <textarea
                id="message"
                name="message"
                placeholder="نظر شما ..."
                rows={4}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                defaultValue={""}
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
        </div>
      </div>
    </>
  );
};

export default SendEmailCv;
