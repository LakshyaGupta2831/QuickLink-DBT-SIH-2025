import {
  AlertCircle,
  Award,
  CheckCircle,
  HelpCircle,
  PhoneCall,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import NearbyCsc from "../components/NearbyCsc";

const Chatbot = () => {
  const { t } = useTranslation("global");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);

  const categories = [
    {
      id: "what-is-dbt",
      title: "What is DBT?",
      icon: <HelpCircle className="w-6 h-6 text-blue-600" />,
      description: "Learn about Direct Benefit Transfer",
    },
    {
      id: "difference",
      title: "Aadhaar vs DBT-enabled",
      icon: <AlertCircle className="w-6 h-6 text-orange-600" />,
      description: "Understand the key differences",
    },
    {
      id: "enable-dbt",
      title: "How to enable DBT?",
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      description: "Steps to activate DBT in your bank",
    },
    {
      id: "scholarship",
      title: "Check scholarship status",
      icon: <Award className="w-6 h-6 text-purple-600" />,
      description: "Track your scholarship application",
    },
  ];

  const responses = {
    "what-is-dbt": {
      title: "What is Direct Benefit Transfer (DBT)?",
      content:
        "DBT is a system that allows government to transfer subsidies and benefits directly to beneficiaries' bank accounts. It eliminates intermediaries and ensures transparent, efficient delivery of government schemes.",
      options: ["How does DBT work?", "Benefits of DBT", "Go back to menu"],
    },
    difference: {
      title: "Aadhaar Linked vs DBT-enabled Account",
      content:
        "Aadhaar linked account means your Aadhaar is connected to your bank account for KYC. DBT-enabled means your account can receive government benefits directly. You need both - Aadhaar linking AND DBT seeding.",
      options: [
        "Why do I need both?",
        "How to check DBT status?",
        "Go back to menu",
      ],
    },
    "enable-dbt": {
      title: "How to Enable DBT in Your Bank Account",
      content:
        "1. Visit your bank branch with original Aadhaar card\n2. Fill DBT seeding form\n3. Bank will register your account in NPCI database\n4. Wait 24-48 hours for activation\n5. Verify status online",
      options: [
        "Which documents needed?",
        "How long does it take?",
        "Go back to menu",
      ],
    },
    scholarship: {
      title: "Check Your Scholarship Status",
      content:
        "To check scholarship status:\n1. Visit the official scholarship portal\n2. Login with your credentials\n3. Check application status\n4. Ensure your bank account is DBT-enabled\n5. Contact your institution if issues persist",
      options: [
        "My scholarship is delayed",
        "DBT status shows inactive",
        "Go back to menu",
      ],
    },
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setChatHistory([
      {
        type: "bot",
        content: responses[categoryId],
      },
    ]);
  };

  const handleOptionSelect = (option) => {
    if (option === "Go back to menu") {
      setSelectedCategory(null);
      setChatHistory([]);
      return;
    }

    setChatHistory((prev) => [
      ...prev,
      { type: "user", content: option },
      {
        type: "bot",
        content: {
          title: "More Information",
          content:
            "For detailed assistance with this topic, please contact your bank or visit our resources section.",
          options: ["Contact Bank", "View Resources", "Go back to menu"],
        },
      },
    ]);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Help Center</h2>
        <p className="text-gray-600">
          Get instant answers to common DBT questions
        </p>
      </div>

      {!selectedCategory ? (
        /* Category Selection */
        <div className="grid md:grid-cols-2 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-left"
            >
              <div className="flex items-start space-x-4">
                {category.icon}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {category.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        /* Chat Interface */
        <div className="bg-white rounded-2xl shadow-lg">
          <div className="border-b border-gray-200 p-4 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Help Assistant</h3>
            <button
              onClick={() => {
                setSelectedCategory(null);
                setChatHistory([]);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl ${
                    message.type === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {message.type === "user" ? (
                    <p className="text-sm">{message.content}</p>
                  ) : (
                    <div>
                      <h4 className="font-semibold mb-2">
                        {message.content.title}
                      </h4>
                      <p className="text-sm whitespace-pre-line mb-3">
                        {message.content.content}
                      </p>
                      <div className="space-y-1">
                        {message.content.options.map((option, optIndex) => (
                          <button
                            key={optIndex}
                            onClick={() => handleOptionSelect(option)}
                            className="block w-full text-left px-3 py-1 text-xs bg-blue-50 hover:bg-blue-100 rounded border"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <PhoneCall className="w-4 h-4" />
              <span>Need more help? Call your Gram Panchayat or Bank</span>
            </div>
          </div>
        </div>
      )}

      {/* Quick Contact */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <h4 className="font-semibold text-blue-800 mb-2">Still Need Help?</h4>
        <p className="text-sm text-blue-700 mb-4">
          Our automated assistant covers common questions. For personalized
          help:
        </p>
        <div className="flex space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
            <PhoneCall className="w-4 h-4 inline mr-2" />
            Call Helpline
          </button>
          <button className="bg-blue-100 text-blue-800 border border-blue-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-200">
            Submit Feedback
          </button>
        </div>
        <div className="mt-6">
          <iframe
            id="JotFormIFrame-0199702c8cdf7cb89b621623a2bf9f8c777d"
            title="DBT Verification Assistant: Customer Support Agent"
            allow="geolocation; microphone; camera; fullscreen"
            src="https://agent.jotform.com/0199702c8cdf7cb89b621623a2bf9f8c777d?embedMode=iframe&background=1&shadow=1"
            frameBorder="0"
            style={{
              maxWidth: "100%",
              height: "600px",
              border: "none",
              width: "100%",
              borderRadius: "12px",
            }}
            scrolling="no"
          ></iframe>
        </div>
      </div>

      <NearbyCsc />
    </div>
  );
};

export default Chatbot;
