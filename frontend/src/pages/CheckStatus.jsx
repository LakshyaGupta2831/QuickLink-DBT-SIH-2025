// import React, { useState } from "react";
// import { useTranslation } from "react-i18next";
// import { CheckCircle, AlertCircle } from "lucide-react";

// const CheckStatus = () => {
//   const { t } = useTranslation("global");
//   const [checkType, setCheckType] = useState("aadhaar");
//   const [inputValue, setInputValue] = useState("");
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleCheck = () => {
//     setLoading(true);
//     // Simulate API call
//     setTimeout(() => {
//       const isEnabled = Math.random() > 0.5;
//       setResult({
//         isEnabled,
//         account: inputValue,
//         bank: "State Bank of India",
//         lastUpdated: "2 days ago",
//       });
//       setLoading(false);
//     }, 2000);
//   };

//   return (
//     <div className="space-y-8">
//       <div className="text-center">
//         <h2 className="text-2xl font-bold text-gray-900 mb-4">
//           {t("checkscreen.title")}
//         </h2>
//         {/* <h2 className="text-2xl font-bold text-gray-900 mb-4">
//           Check Your DBT Status
//         </h2> */}
//         <p className="text-gray-600">{t("checkscreen.subtitle")}</p>
//         {/* <p className="text-gray-600">
//           Verify if your bank account can receive Direct Benefit Transfers
//         </p> */}
//       </div>

//       {/* Input Section */}
//       <div className="bg-white rounded-2xl shadow-lg p-6">
//         <h3 className="text-lg font-semibold text-gray-800 mb-6">
//           {t("checkscreen.enter_details")}
//         </h3>
//         {/* <h3 className="text-lg font-semibold text-gray-800 mb-6">
//           Enter Your Details
//         </h3> */}

//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               {t("checkscreen.checkusing")}
//             </label>
//             {/* <label className="block text-sm font-medium text-gray-700 mb-2">
//               Check using:
//             </label> */}
//             <div className="flex space-x-4">
//               <button
//                 onClick={() => setCheckType("aadhaar")}
//                 className={`px-4 py-2 rounded-lg border ${
//                   checkType === "aadhaar"
//                     ? "bg-blue-100 border-blue-500 text-blue-700"
//                     : "border-gray-300 text-gray-700"
//                 }`}
//               >
//                 {t("checkscreen.aadhar")}
//               </button>
//               <button
//                 onClick={() => setCheckType("account")}
//                 className={`px-4 py-2 rounded-lg border ${
//                   checkType === "account"
//                     ? "bg-blue-100 border-blue-500 text-blue-700"
//                     : "border-gray-300 text-gray-700"
//                 }`}
//               >
//                 {t("checkscreen.account")}
//               </button>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               {checkType === "aadhaar"
//                 ? t("checkscreen.aadhar")
//                 : t("checkscreen.account")}
//             </label>
//             <input
//               type="text"
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               placeholder={
//                 checkType === "aadhaar" ? "1234 5678 9012" : "1234567890123456"
//               }
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>

//           <button
//             onClick={handleCheck}
//             disabled={!inputValue || loading}
//             className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
//           >
//             {loading ? t("checkscreen.buttonpressed") : t("checkscreen.button")}
//           </button>
//         </div>
//       </div>

//       {/* Results Section */}
//       {result && (
//         <div className="bg-white rounded-2xl shadow-lg p-6">
//           <h3 className="text-lg font-semibold text-gray-800 mb-6">
//             {t("checkscreen.resultsuccess.congo")}
//           </h3>

//           <div
//             className={`rounded-xl p-6 ${
//               result.isEnabled
//                 ? "bg-green-50 border-2 border-green-200"
//                 : "bg-red-50 border-2 border-red-200"
//             }`}
//           >
//             <div className="flex items-start space-x-4">
//               {result.isEnabled ? (
//                 <CheckCircle className="w-12 h-12 text-green-600" />
//               ) : (
//                 <AlertCircle className="w-12 h-12 text-red-600" />
//               )}

//               <div className="flex-grow">
//                 <h4
//                   className={`text-xl font-bold mb-2 ${
//                     result.isEnabled ? "text-green-800" : "text-red-800"
//                   }`}
//                 >
//                   {result.isEnabled
//                     ? t("checkscreen.resultsuccess.congo")
//                     : t("checkscreen.resultfailure.failure")}
//                 </h4>

//                 <p
//                   className={`mb-4 ${
//                     result.isEnabled ? "text-green-700" : "text-red-700"
//                   }`}
//                 >
//                   {result.isEnabled
//                     ? t("checkscreen.resultsuccess.subline")
//                     : t("checkscreen.resultfailure.subline")}
//                 </p>

//                 <div className="text-sm text-gray-600 space-y-1">
//                   <p>
//                     <strong>{t("checkscreen.resultsuccess.bank")}</strong>{" "}
//                     {result.bank}
//                   </p>
//                   <p>
//                     <strong>
//                       {t("checkscreen.resultsuccess.lastupdated")}
//                     </strong>{" "}
//                     {result.lastUpdated}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {!result.isEnabled && (
//             <div className="mt-6">
//               <h4 className="font-semibold text-gray-800 mb-3">
//                 {t("checkscreen.resultfailure.howtoenable")}
//               </h4>
//               <div className="space-y-2">
//                 <div className="flex items-center space-x-2">
//                   <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
//                     1
//                   </span>
//                   <span className="text-sm text-gray-700">
//                     {t("checkscreen.resultfailure.step1")}
//                   </span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
//                     2
//                   </span>
//                   <span className="text-sm text-gray-700">
//                     {t("checkscreen.resultfailure.step2")}
//                   </span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
//                     3
//                   </span>
//                   <span className="text-sm text-gray-700">
//                     {t("checkscreen.resultfailure.step3")}
//                   </span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
//                     4
//                   </span>
//                   <span className="text-sm text-gray-700">
//                     {t("checkscreen.resultfailure.step4")}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Help Section */}
//       <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
//         <h4 className="font-semibold text-yellow-800 mb-2">Need Help?</h4>
//         <p className="text-sm text-yellow-700 mb-4">
//           If you're having trouble checking your status or need assistance with
//           DBT seeding:
//         </p>
//         <div className="flex space-x-4">
//           <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-700">
//             Contact Bank
//           </button>
//           <button className="bg-yellow-100 text-yellow-800 border border-yellow-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-200">
//             Visit Help Center
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckStatus;

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { CheckCircle, AlertCircle } from "lucide-react";
import AuthContext from "../context/AuthContext";

const npci_url = import.meta.env.VITE_NPCI_URL;

const CheckStatus = () => {
  const { t } = useTranslation("global");
  const { updateCheckCount } = useContext(AuthContext);
  const [aadhar, setAadhar] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);

  const [loadingSendOtp, setLoadingSendOtp] = useState(false);
  const [loadingVerifyOtp, setLoadingVerifyOtp] = useState(false);

  const [result, setResult] = useState(null);
  const [loadingCheck, setLoadingCheck] = useState(false);

  // ---------------- SEND OTP ----------------
  const handleSendOtp = async () => {
    setLoadingSendOtp(true);

    try {
      await axios.post(npci_url + "/api/otp/send-otp", { aadhar }); // dummy route
      setOtpSent(true);
      // alert("OTP sent successfully");
      toast.success("OTP sent successfully to your linked email");
    } catch (error) {
      alert("Failed to send OTP");
      console.log(error);
    }

    setLoadingSendOtp(false);
  };

  // ---------------- VERIFY OTP ----------------
  const handleVerifyOtp = async () => {
    setLoadingVerifyOtp(true);

    try {
      await axios.post(npci_url + "/api/otp/verify-otp", {
        aadhar,
        otp,
      }); // dummy route
      setVerified(true);
      alert("OTP verified successfully");
    } catch (error) {
      console.log(error);
      alert("Invalid OTP");
    }

    setLoadingVerifyOtp(false);
  };

  useEffect(() => {
    console.log(result);
  }, [result]);
  // ---------------- CHECK STATUS ----------------
  // const handleCheck = () => {
  //   setLoadingCheck(true);

  //   // Fake API logic
  //   setTimeout(() => {
  //     const isEnabled = Math.random() > 0.5;
  //     setResult({
  //       isEnabled,
  //       account: aadhar,
  //       bank: "State Bank of India",
  //       lastUpdated: "2 days ago",
  //     });
  //     setLoadingCheck(false);
  //   }, 2000);
  // };
  const handleCheck = async () => {
    try {
      setLoadingCheck(true);

      const response = await fetch(npci_url + "/api/mapper/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ aadhar }),
      });

      const data = await response.json();
      console.log(data);

      if (!data.success) {
        throw new Error(data.message || "Something went wrong");
      }

      // let date = new Date(data.lastUpdated);
      // Store API result in state
      setResult({
        aadharNumber: data.aadharNumber,
        accountNumber: data.accountNumber,
        seedingStatus: data.seedingStatus,
        bankName: data.bankName,
        lastUpdated: data.lastUpdated,
      });
      updateCheckCount();
    } catch (error) {
      console.error("Check status error:", error);
      alert(error.message);
    } finally {
      setLoadingCheck(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* TITLE */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t("checkscreen.title")}
        </h2>
        <p className="text-gray-600">{t("checkscreen.subtitle")}</p>
      </div>

      {/* INPUT CARD */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          {t("checkscreen.enter_details")}
        </h3>

        {/* AADHAR INPUT */}
        <div className="space-y-4">
          {/* Aadhar Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("checkscreen.aadhar")}
            </label>
            <input
              type="text"
              value={aadhar}
              onChange={(e) => setAadhar(e.target.value)}
              placeholder="1234 5678 9012"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* SEND OTP BUTTON */}
          {!otpSent && (
            <button
              onClick={handleSendOtp}
              disabled={aadhar.length !== 12 || loadingSendOtp}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loadingSendOtp ? "Sending OTP..." : "Send OTP"}
            </button>
          )}

          {/* OTP INPUT + VERIFY */}
          {otpSent && !verified && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={handleVerifyOtp}
                disabled={!otp || loadingVerifyOtp}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400"
              >
                {loadingVerifyOtp ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          )}

          {/* CHECK STATUS */}
          {verified && (
            <button
              onClick={handleCheck}
              disabled={loadingCheck}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loadingCheck
                ? t("checkscreen.buttonpressed")
                : t("checkscreen.button")}
            </button>
          )}
        </div>
      </div>

      {/* ---------------- RESULTS SECTION ---------------- */}
      {result && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            {t("checkscreen.resultsuccess.congo")}
          </h3>

          <div
            className={`rounded-xl p-6 ${
              result.seedingStatus
                ? "bg-green-50 border-2 border-green-200"
                : "bg-red-50 border-2 border-red-200"
            }`}
          >
            <div className="flex items-start space-x-4">
              {result.seedingStatus ? (
                <CheckCircle className="w-12 h-12 text-green-600" />
              ) : (
                <AlertCircle className="w-12 h-12 text-red-600" />
              )}

              <div className="flex-grow">
                <h4
                  className={`text-xl font-bold mb-2 ${
                    result.seedingStatus ? "text-green-800" : "text-red-800"
                  }`}
                >
                  {result.seedingStatus
                    ? t("checkscreen.resultsuccess.congo")
                    : t("checkscreen.resultfailure.failure")}
                </h4>

                <p
                  className={`mb-4 ${
                    result.seedingStatus ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {result.seedingStatus
                    ? t("checkscreen.resultsuccess.subline")
                    : t("checkscreen.resultfailure.subline")}
                </p>

                {result.seedingStatus && (
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <strong>{t("checkscreen.resultsuccess.bank")}</strong>{" "}
                      {result.bankName}
                    </p>
                    <p>
                      <strong>
                        {t("checkscreen.resultsuccess.accountnumber")}
                      </strong>{" "}
                      <span>********&nbsp;{result.accountNumber % 10000}</span>
                    </p>
                    <p>
                      <strong>
                        {t("checkscreen.resultsuccess.lastupdated")}
                      </strong>{" "}
                      {new Date(result.lastUpdated).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HELP SECTION */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
        <h4 className="font-semibold text-yellow-800 mb-2">Need Help?</h4>
        <p className="text-sm text-yellow-700 mb-4">
          If you're having trouble checking your status or need assistance with
          DBT seeding:
        </p>
        <div className="flex space-x-4">
          <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-700">
            Contact Bank
          </button>
          <button className="bg-yellow-100 text-yellow-800 border border-yellow-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-200">
            Visit Help Center
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckStatus;
