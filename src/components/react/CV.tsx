import { type FC, useState, useEffect } from "react";
import axios from "axios";

const CV: FC<{ token: string; url: string; slug: string }> = ({
  token,
  url,
  slug,
}) => {
  const [professorData, setProfessorData] = useState<any[]>([]); // Assuming the shape of professor data
  console.log(slug);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          url + `professors?filters[slug][$eq]=${slug}&&populate=*`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = response.data.data;

        setProfessorData(result);
        console.log(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Run only once when component mounts

  return (
    <>
      {professorData.length == 0 ? (
        <div
          dir="rtl"
          className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
          role="alert"
        >
          <p className="font-bold">خطایی رخداد</p>
          <p>استادی با این مشخصات در سیستم ثبت نشده است.</p>
        </div>
      ) : (
        <div className="p-8">
          <div className="flex items-center">
            <img
              src="your-image.jpg"
              alt="Your Name"
              className="w-24 h-24 rounded-full mr-8"
            />
            <div>
              <h2 className="text-3xl font-semibold text-gray-800">
                Your Name
              </h2>
              <p className="text-gray-600">Job Title</p>
            </div>
          </div>
          <div className="mt-8">
            <div className="bg-gray-200 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Contact Information
              </h3>
              <p className="text-gray-600">Email: example@example.com</p>
              <p className="text-gray-600">Phone: +1234567890</p>
              <p className="text-gray-600">
                Address: 123 Main St, City, Country
              </p>
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
      )}
    </>
  );
};

export default CV;
