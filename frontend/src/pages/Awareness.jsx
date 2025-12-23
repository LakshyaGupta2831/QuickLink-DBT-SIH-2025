import Steps from "../components/Steps";
import DBTComparison from "../components/DBTComparison";
// import {
//   AlertCircle,
//   ArrowRight,
//   Building,
//   CheckCircle,
//   CreditCard,
//   Shield,
//   Smartphone,
// } from "lucide-react";
// import React, { useState } from "react";
// import { useTranslation } from "react-i18next";

// const Awareness = () => {
//   const [t, i18n] = useTranslation("global");
//   const [currentCard, setCurrentCard] = useState(0);
//   const [currentStep, setCurrentStep] = useState(0);

//   const comparisonCards = [
//     {
//       title: "Aadhaar Linked Account",
//       icon: <CreditCard className="w-12 h-12 text-orange-500" />,
//       description: "Your Aadhaar is connected to your bank account",
//       features: [
//         "Basic KYC completed",
//         "Can do banking operations",
//         "But cannot receive government benefits directly",
//       ],
//       status: "Not Sufficient",
//       statusColor: "text-red-600 bg-red-100",
//     },
//     {
//       title: "DBT-Enabled Account",
//       icon: <Shield className="w-12 h-12 text-green-500" />,
//       description: "Your account can receive Direct Benefit Transfers",
//       features: [
//         "Aadhaar seeded in NPCI system",
//         "Can receive scholarships directly",
//         "Government benefits transfer smoothly",
//       ],
//       status: "Ready for Benefits",
//       statusColor: "text-green-600 bg-green-100",
//     },
//   ];

//   const steps = [
//     {
//       title: "Link Aadhaar with Bank",
//       description:
//         "Visit your bank branch or use net banking to link your Aadhaar",
//       icon: <Building className="w-8 h-8 text-blue-600" />,
//       completed: currentStep >= 0,
//     },
//     {
//       title: "Seed Aadhaar in DBT System",
//       description: "Bank will register your Aadhaar in NPCI's DBT database",
//       icon: <Smartphone className="w-8 h-8 text-orange-600" />,
//       completed: currentStep >= 1,
//     },
//     {
//       title: "Confirm DBT Status",
//       description: "Verify your account is DBT-enabled through NPCI portal",
//       icon: <CheckCircle className="w-8 h-8 text-green-600" />,
//       completed: currentStep >= 2,
//     },
//   ];

//   return (
//     <div className="space-y-8">
//       <div className="text-center">
//         <h2 className="text-2xl font-bold text-gray-900 mb-4">
//           Understanding the Difference
//         </h2>
//         <p className="text-gray-600">
//           Learn why DBT-enabling is crucial for receiving scholarships
//         </p>
//       </div>

//       {/* Interactive Comparison Cards */}
//       <div className="bg-white rounded-2xl shadow-lg p-6">
//         <h3 className="text-lg font-semibold text-gray-800 mb-6">
//           Compare Account Types
//         </h3>

//         <div className="flex items-center justify-between mb-4">
//           <button
//             onClick={() => setCurrentCard(0)}
//             className={`px-4 py-2 rounded-lg ${
//               currentCard === 0
//                 ? "bg-orange-100 text-orange-700"
//                 : "text-gray-600 hover:bg-gray-100"
//             }`}
//           >
//             Aadhaar Linked
//           </button>
//           <ArrowRight className="w-6 h-6 text-gray-400" />
//           <button
//             onClick={() => setCurrentCard(1)}
//             className={`px-4 py-2 rounded-lg ${
//               currentCard === 1
//                 ? "bg-green-100 text-green-700"
//                 : "text-gray-600 hover:bg-gray-100"
//             }`}
//           >
//             DBT-Enabled
//           </button>
//         </div>

//         <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6">
//           <div className="text-center mb-4">
//             {comparisonCards[currentCard].icon}
//           </div>
//           <h4 className="text-xl font-bold text-gray-900 mb-2 text-center">
//             {comparisonCards[currentCard].title}
//           </h4>
//           <p className="text-gray-600 mb-4 text-center">
//             {comparisonCards[currentCard].description}
//           </p>

//           <div className="space-y-2 mb-4">
//             {comparisonCards[currentCard].features.map((feature, index) => (
//               <div key={index} className="flex items-center space-x-2">
//                 <CheckCircle className="w-4 h-4 text-green-500" />
//                 <span className="text-sm text-gray-700">{feature}</span>
//               </div>
//             ))}
//           </div>

//           <div
//             className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${comparisonCards[currentCard].statusColor}`}
//           >
//             {comparisonCards[currentCard].status}
//           </div>
//         </div>
//       </div>

//       {/* Step-by-Step Guide */}
//       <div className="bg-white rounded-2xl shadow-lg p-6">
//         <h3 className="text-lg font-semibold text-gray-800 mb-6">
//           How to Enable DBT
//         </h3>

//         <div className="space-y-4">
//           {steps.map((step, index) => (
//             <div
//               key={index}
//               className={`flex items-start space-x-4 p-4 rounded-xl cursor-pointer transition-all ${
//                 currentStep === index
//                   ? "bg-blue-50 border-2 border-blue-200"
//                   : "hover:bg-gray-50"
//               }`}
//               onClick={() => setCurrentStep(index)}
//             >
//               <div
//                 className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
//                   step.completed ? "bg-green-100" : "bg-gray-100"
//                 }`}
//               >
//                 {step.completed ? (
//                   <CheckCircle className="w-6 h-6 text-green-600" />
//                 ) : (
//                   <span className="text-gray-600 font-medium">{index + 1}</span>
//                 )}
//               </div>

//               <div className="flex-grow">
//                 <h4 className="font-semibold text-gray-900 mb-1">
//                   {step.title}
//                 </h4>
//                 <p className="text-sm text-gray-600">{step.description}</p>
//               </div>

//               {step.icon}
//             </div>
//           ))}
//         </div>

//         <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//           <div className="flex items-start space-x-2">
//             <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
//             <div>
//               <h4 className="font-medium text-yellow-800">Important Note</h4>
//               <p className="text-sm text-yellow-700 mt-1">
//                 DBT seeding can take 24-48 hours to complete. Always verify your
//                 status before scholarship deadlines.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Awareness;

// import { AlertCircle, CheckCircle, AlertTriangle } from "lucide-react";
// import React, { useState } from "react";
// import { useTranslation } from "react-i18next";

// const Awareness = () => {
//   const [t, i18n] = useTranslation("global");

//   return (
//     <div className="space-y-10">
//       {/* ---------------- PAGE HEADER ---------------- */}
//       <div className="text-center">
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">
//           Understanding DBT Eligibility
//         </h2>
//         <p className="text-gray-600">
//           Know the difference between an Aadhaar-linked account and a
//           DBT-enabled account
//         </p>
//       </div>

//       {/* ---------------- DO & DON'T SECTION ---------------- */}
//       <div>
//         <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">
//           Do & Don’t – Compare Account Types
//         </h3>

//         <div className="flex flex-col md:flex-row items-start justify-center gap-6">
//           {/* ------------- DO CARD (DBT ENABLED) ------------- */}
//           <div className="flex-1 bg-white shadow-lg rounded-2xl p-6 relative">
//             {/* Green Label */}
//             <div className="absolute top-6 -left-4 bg-green-500 text-white px-3 py-1 rounded-r-lg shadow">
//               Aadhar seeded account
//             </div>

//             <div className="space-y-3">
//               <div className="flex items-center gap-3">
//                 <CheckCircle className="text-green-500 w-5 h-5" />
//                 <p className="text-gray-700 text-sm">
//                   Aadhaar seeded in DBT (NPCI)
//                 </p>
//               </div>

//               <div className="flex items-center gap-3">
//                 <CheckCircle className="text-green-500 w-5 h-5" />
//                 <p className="text-gray-700 text-sm">
//                   Can receive scholarships directly
//                 </p>
//               </div>

//               <div className="flex items-center gap-3">
//                 <CheckCircle className="text-green-500 w-5 h-5" />
//                 <p className="text-gray-700 text-sm">
//                   Government transfers work smoothly
//                 </p>
//               </div>

//               <div className="flex items-center gap-3">
//                 <CheckCircle className="text-green-500 w-5 h-5" />
//                 <p className="text-gray-700 text-sm">
//                   DBT-enabled & benefit-ready account
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* ------------- DON'T CARD (Aadhaar Linked Only) ------------- */}
//           <div className="flex-1 bg-white shadow-lg rounded-2xl p-6 relative">
//             {/* Red Label */}
//             <div className="absolute top-6 -right-4 bg-red-500 text-white px-3 py-1 rounded-l-lg shadow">
//               DON’T
//             </div>

//             <div className="space-y-3">
//               <div className="flex items-center gap-3">
//                 <AlertCircle className="text-red-500 w-5 h-5" />
//                 <p className="text-gray-700 text-sm">
//                   Only Aadhaar linked to bank, not DBT seeded
//                 </p>
//               </div>

//               <div className="flex items-center gap-3">
//                 <AlertCircle className="text-red-500 w-5 h-5" />
//                 <p className="text-gray-700 text-sm">
//                   Cannot receive DBT scholarships
//                 </p>
//               </div>

//               <div className="flex items-center gap-3">
//                 <AlertCircle className="text-red-500 w-5 h-5" />
//                 <p className="text-gray-700 text-sm">
//                   Government benefits may fail
//                 </p>
//               </div>

//               <div className="flex items-center gap-3">
//                 <AlertCircle className="text-red-500 w-5 h-5" />
//                 <p className="text-gray-700 text-sm">
//                   Not eligible for subsidy/benefits
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ---------------- IMPORTANT NOTE ---------------- */}
//       <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//         <div className="flex items-start space-x-2">
//           <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
//           <div>
//             <h4 className="font-medium text-yellow-800">Important Note</h4>
//             <p className="text-sm text-yellow-700 mt-1">
//               DBT seeding usually takes 24–48 hours. Always verify DBT status
//               before scholarship deadlines.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Awareness;

import {
  AlertCircle,
  ArrowRight,
  Building,
  CheckCircle,
  CreditCard,
  Shield,
  Smartphone,
} from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import NgoRanking from "../components/NgoRanking.jsx";

const Awareness = () => {
  const [t, i18n] = useTranslation("global");
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="space-y-8">
      {/* Header */}
      {/* <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Understanding the Difference
        </h2>
        <p className="text-gray-600">
          Learn why DBT-enabling is crucial for receiving scholarships
        </p>
      </div> */}

      {/* ================================
          NEW COMPARISON UI
      ================================= */}

      <DBTComparison />

      <Steps />
      {/* <NgoRanking /> */}
    </div>
  );
};

export default Awareness;
