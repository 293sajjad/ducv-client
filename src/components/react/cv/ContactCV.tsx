import type { FC } from "react";

const ContactCv: FC<{ phone: string; email: string }> = ({ phone, email }) => {
  return (
    <div className="max-w-[40rem] h-auto mx-auto bg-white shadow-xl rounded-lg overflow-hidden mb-6 flex flex-col items-center">
      <div className="px-6 py-4 text-center">
        <h1 className="text-gray-900 font-bold text-2xl uppercase font-[Lalezar]">
          اطلاعات تماس
        </h1>
        <div className="mt-4">
          <div className="flex flex-col space-y-4" style={{ direction: "ltr" }}>
            <ContactItem icon="phone" text={phone} />
            <ContactItem icon="email" text={email} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactItem: FC<{ icon: "phone" | "email"; text: string }> = ({
  icon,
  text,
}) => {
  const icons = {
    phone: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 text-blue-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
        />
      </svg>
    ),
    email: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 text-blue-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
        />
      </svg>
    ),
  };

  return (
    <div className="flex items-center space-x-4">
      {icons[icon]}
      <p className="text-gray-600">{text}</p>
    </div>
  );
};

export default ContactCv;
