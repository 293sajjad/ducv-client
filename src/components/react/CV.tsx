import { type FC, useState, useEffect } from "react";
import axios from "axios";
import type { ProfessorData } from "../../interfaces/Professor";

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
      <div className="flex flex-col items-center md:flex-row md:items-start">
        <img
          src={"http://localhost:1337" + attributes.avatar.data.attributes.url}
          alt={attributes.name}
          className="w-24 h-24 rounded-full border-cyan-900 border-[3px] m-2"
        />
        <div className="text-center md:text-left">
          <h2 className="m-2 text-2xl font-[Lalezar] font-semibold text-gray-800">
            {attributes.name} {attributes.family}
          </h2>
          <p className="text-gray-600 text-xs">
            {attributes.adjectives.length == 1
              ? attributes.adjectives
              : attributes.adjectives[0]}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <div className="max-w-[40rem] mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-4 h-auto">
          <div className="px-4 py-2 h-full">
            <h1 className="text-gray-900 font-bold text-xl uppercase">
              درباره من
            </h1>
            <p className="text-gray-600 mt-2">{attributes.aboutMe}</p>
          </div>
          <div className="flex justify-between items-center px-4 py-2 bg-gray-200 h-full">
            <p className="text-gray-600">مرتبه : {attributes.academic_rank}</p>
            <p className="text-gray-600">سن : {attributes.age}</p>
          </div>
        </div>

        <div className="max-w-[40rem] h-auto mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-4">
          <div className="px-4 py-2">
            <h1 className="text-gray-900 font-bold text-xl uppercase">
              توانایی‌ها
            </h1>
            <div className="mt-4">
              <div className="flex items-center mb-2">
                <div className="w-1/3">
                  <p className="text-gray-600">مهارت 1</p>
                </div>
                <div className="w-2/3">
                  <div className="flex items-center">
                    <div className="flex-1 h-2 relative rounded-full bg-gray-200">
                      <div
                        className="absolute h-full bg-blue-500 rounded-full"
                        style={{ width: "60%" }}
                      />
                    </div>
                    <p className="ml-2 text-gray-600">4/5</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center mb-2">
                <div className="w-1/3">
                  <p className="text-gray-600">مهارت 2</p>
                </div>
                <div className="w-2/3">
                  <div className="flex items-center">
                    <div className="flex-1 h-2 relative rounded-full bg-gray-200">
                      <div
                        className="absolute h-full bg-blue-500 rounded-full"
                        style={{ width: "80%" }}
                      />
                    </div>
                    <p className="ml-2 text-gray-600">5/5</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center mb-2">
                <div className="w-1/3">
                  <p className="text-gray-600">مهارت 3</p>
                </div>
                <div className="w-2/3">
                  <div className="flex items-center">
                    <div className="flex-1 h-2 relative rounded-full bg-gray-200">
                      <div
                        className="absolute h-full bg-blue-500 rounded-full"
                        style={{ width: "40%" }}
                      />
                    </div>
                    <p className="ml-2 text-gray-600">2/5</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[40rem] h-auto mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-4">
          <div className="px-4 py-2">
            <h1 className="text-gray-900 font-bold text-xl uppercase">
              اطلاعات تماس
            </h1>
            <div className="mt-4">
              <div className="flex items-center mb-2">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v.01M12 12v.01M12 16v.01M4 8v.01a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v.01M12 8a4 4 0 0 0-4 4v4a4 4 0 0 0 4 4v0a4 4 0 0 0 4-4v-4a4 4 0 0 0-4-4z"
                  />
                </svg>
                <p className="ml-2 text-gray-600">آدرس: [آدرس شما]</p>
              </div>
              <div className="flex items-center mb-2">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6m16 0a10 10 0 1 1-20 0 10 10 0 0 1 20 0z"
                  />
                </svg>
                <p className="ml-2 text-gray-600">تلفن: [شماره تماس شما]</p>
              </div>
              <div className="flex items-center mb-2">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 13a10 10 0 0 1 18 0v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a10 10 0 0 1 18 0v2"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 0 1 0 6v-6"
                  />
                </svg>
                <p className="ml-2 text-gray-600">ایمیل: [ایمیل شما]</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[40rem] h-auto mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-4 ">
          <h1 className="text-2xl font-semibold mb-4">
            فهرست فعالیت‌های استاد
          </h1>
          <ul>
            <li className="mb-4">
              <div>
                <h2 className="font-semibold mb-1">
                  ارائه درس تاریخ ایران باستان
                </h2>
                <p className="text-gray-600 mb-2">تاریخ شروع: 10 مهر 1403</p>
                <p className="text-gray-600 mb-2">تاریخ پایان: 20 مهر 1403</p>
                <p className="text-gray-600 mb-2 ">
                  توضیحات: ارائه‌ی درس مربوط به تاریخ ایران باستان برای
                  دانشجویان دانشکده تاریخ و فرهنگ است.
                </p>
                <p className="text-gray-600">
                  وضعیت: <span className="text-green-500">تکمیل شده</span>
                </p>
              </div>
            </li>
            <li className="mb-4">
              <div>
                <h2 className="font-semibold mb-1">
                  سخنرانی در کنفرانس تاریخ و فرهنگ
                </h2>
                <p className="text-gray-600 mb-2">تاریخ شروع: 20 آذر 1403</p>
                <p className="text-gray-600 mb-2">تاریخ پایان: 25 آذر 1403</p>
                <p className="text-gray-600 mb-2">
                  توضیحات: سخنرانی در کنفرانس ملی تاریخ و فرهنگ با موضوع "تأثیر
                  تاریخ در فرهنگ امروز".
                </p>
                <p className="text-gray-600">
                  وضعیت:{" "}
                  <span className="text-red-500">در حال برنامه‌ریزی</span>
                </p>
              </div>
            </li>
            <li className="mb-4">
              <div>
                <h2 className="font-semibold mb-1">
                  نوشتن مقاله درباره تأثیر انقلاب اسلامی بر زندگی روزمره
                </h2>
                <p className="text-gray-600 mb-2">تاریخ شروع: 2 بهمن 1403</p>
                <p className="text-gray-600 mb-2">تاریخ پایان: 10 بهمن 1403</p>
                <p className="text-gray-600 mb-2">
                  توضیحات: نوشتن مقاله‌ای با موضوع تأثیر انقلاب اسلامی بر زندگی
                  روزمره افراد.
                </p>
                <p className="text-gray-600">
                  وضعیت: <span className="text-yellow-500">در حال انجام</span>
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-[40rem] h-auto mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-4">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">معدل: 18.5</div>
            <p className="text-gray-700 text-base mb-2">
              نام موسسه: دانشگاه تهران
            </p>
            <p className="text-gray-700 text-base mb-2">معدل کل: 3.75</p>
            <p className="text-gray-700 text-base mb-2">
              تاریخ شروع: 1397/04/15
            </p>
            <p className="text-gray-700 text-base mb-2">
              تاریخ پایان: 1401/06/20
            </p>
            <p className="text-gray-700 text-base">
              توضیحات: دوره لیسانس رشته مهندسی کامپیوتر
            </p>
          </div>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">معدل: 18.5</div>
            <p className="text-gray-700 text-base mb-2">
              نام موسسه: دانشگاه تهران
            </p>
            <p className="text-gray-700 text-base mb-2">معدل کل: 3.75</p>
            <p className="text-gray-700 text-base mb-2">
              تاریخ شروع: 1397/04/15
            </p>
            <p className="text-gray-700 text-base mb-2">
              تاریخ پایان: 1401/06/20
            </p>
            <p className="text-gray-700 text-base">
              توضیحات: دوره لیسانس رشته مهندسی کامپیوتر
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-[40rem] h-auto mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-4">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">عنوان: عنوان افتخار</div>
            <p className="text-gray-700 text-base mb-2">تاریخ: 1399/01/01</p>
            <p className="text-gray-700 text-base mb-2">
              توضیحات: توضیحات افتخار
            </p>
            {/* این بخش اگر نیاز به ویرایش و حذف داشته باشد می تواند اضافه شود */}
          </div>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">عنوان: عنوان افتخار</div>
            <p className="text-gray-700 text-base mb-2">تاریخ: 1399/01/01</p>
            <p className="text-gray-700 text-base mb-2">
              توضیحات: توضیحات افتخار
            </p>
            {/* این بخش اگر نیاز به ویرایش و حذف داشته باشد می تواند اضافه شود */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CV;
