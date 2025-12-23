// const FAQ = () => {
//   const faqList = [
//     {
//       q: "What is QuickLink DBT?",
//       a: "It is a platform for Direct Benefit Transfer services.",
//     },
//     {
//       q: "How do I check my status?",
//       a: "Visit your dashboard and select 'Status Check' option.",
//     },
//     {
//       q: "How do I update my profile?",
//       a: "Navigate to the Profile section from the header.",
//     },
//     {
//       q: "What documents are required?",
//       a: "Aadhaar, Bank account details, and phone number.",
//     },
//     {
//       q: "How long does verification take?",
//       a: "Usually 24–48 hours depending on server load.",
//     },
//     {
//       q: "Can I change my registered mobile?",
//       a: "Yes, use the Profile > Edit option.",
//     },
//     {
//       q: "What if my payment fails?",
//       a: "Contact the support team or re-initiate verification.",
//     },
//     {
//       q: "Is my data secure?",
//       a: "Yes, all data is encrypted and stored securely.",
//     },
//     {
//       q: "How do I logout?",
//       a: "Use the logout button on the top-right corner.",
//     },
//     { q: "Where can I get support?", a: "Email support@quicklink-dbt.com." },
//   ];

//   return (
//     <section className="max-w-4xl mx-auto px-4 py-8">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">
//         Frequently Asked Questions
//       </h2>

//       <div className="space-y-4">
//         {faqList.map((item, idx) => (
//           <div
//             key={idx}
//             className="p-4 border border-gray-200 rounded-lg bg-white hover:bg-gray-100 transition"
//           >
//             <p className="font-semibold text-gray-900">Q. {item.q}</p>
//             <p className="text-gray-700 mt-1">Ans: {item.a}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default FAQ;
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqList = [
    {
      q: "What is QuickLink DBT?",
      a: "It is a platform for Direct Benefit Transfer services.",
    },
    {
      q: "How do I check my status?",
      a: "Visit your dashboard and select 'Status Check' option.",
    },
    {
      q: "How do I update my profile?",
      a: "Navigate to the Profile section from the header.",
    },
    {
      q: "What documents are required?",
      a: "Aadhaar, Bank account details, and phone number.",
    },
    {
      q: "How long does verification take?",
      a: "Usually 24–48 hours depending on server load.",
    },
    {
      q: "Can I change my registered mobile?",
      a: "Yes, use the Profile > Edit option.",
    },
    {
      q: "What if my payment fails?",
      a: "Contact the support team or re-initiate verification.",
    },
    {
      q: "Is my data secure?",
      a: "Yes, all data is encrypted and stored securely.",
    },
    {
      q: "How do I logout?",
      a: "Use the logout button on the top-right corner.",
    },
    { q: "Where can I get support?", a: "Email support@quicklink-dbt.com." },
  ];

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq-section" className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600">
          Find answers to common questions about QuickLink DBT
        </p>
      </div>

      <div className="space-y-3">
        {faqList.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <button
              onClick={() => toggleFAQ(idx)}
              className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-900 pr-8">{item.q}</span>
              <ChevronDown
                className={`w-5 h-5 text-blue-600 flex-shrink-0 transition-transform duration-300 ${
                  openIndex === idx ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === idx ? "max-h-40" : "max-h-0"
              }`}
            >
              <div className="px-6 pb-5 pt-1">
                <p className="text-gray-700 leading-relaxed">{item.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <p className="text-gray-600 mb-2">Still have questions?</p>
        <a
          href="mailto:support@quicklink-dbt.com"
          className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
        >
          Contact our support team →
        </a>
      </div>
    </section>
  );
};

export default FAQ;
