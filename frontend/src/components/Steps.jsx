import React from "react";
import {
  FileSearch,
  Building,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowDown,
} from "lucide-react";

export default function Steps() {
  const steps = [
    {
      icon: FileSearch,
      title: "Understand Account Type",
      description:
        "Check whether your bank account is Aadhaar–Linked or Aadhaar–Seeded.",
      color: "blue",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      dotColor: "bg-blue-600",
    },
    {
      icon: Building,
      title: "Visit Your Bank",
      description:
        "Contact your branch to confirm the status or to request Aadhaar Seeding.",
      color: "purple",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      dotColor: "bg-purple-600",
    },
    {
      icon: FileText,
      title: "Submit Aadhaar Details",
      description:
        "Provide Aadhaar, passbook, or required documents for verification.",
      color: "orange",
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      dotColor: "bg-orange-600",
    },
    {
      icon: Clock,
      title: "Wait for Confirmation",
      description:
        "The bank updates the Aadhaar–Seeded status, usually within 24–48 hours.",
      color: "indigo",
      bgColor: "bg-indigo-50",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      dotColor: "bg-indigo-600",
    },
    {
      icon: CheckCircle,
      title: "Verify Status",
      description:
        "Check SMS or visit the branch to ensure your account is successfully Aadhaar–Seeded.",
      color: "green",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      dotColor: "bg-green-600",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 border border-gray-100">
      {/* Header */}
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          How to Enable DBT
        </h3>
        <p className="text-gray-600 text-sm">
          Follow these simple steps to activate Direct Benefit Transfer
        </p>
      </div>

      {/* Timeline Steps */}
      <div className="relative">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === steps.length - 1;

          return (
            <div key={index} className="relative">
              {/* Timeline connector line */}
              {!isLast && (
                <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-gray-300 to-gray-200 -mb-4" />
              )}

              <div
                className={`relative flex items-start gap-6 mb-8 p-5 rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${step.bgColor} border-2 border-transparent hover:border-${step.color}-200`}
              >
                {/* Icon Circle with pulse effect */}
                <div className="relative flex-shrink-0">
                  <div
                    className={`w-12 h-12 rounded-full ${step.iconBg} flex items-center justify-center shadow-md relative z-10 transition-transform duration-300 hover:scale-110`}
                  >
                    <Icon className={`w-6 h-6 ${step.iconColor}`} />
                  </div>

                  {/* Step number badge */}
                  <div
                    className={`absolute -top-1 -right-1 w-6 h-6 rounded-full ${step.dotColor} flex items-center justify-center text-white text-xs font-bold shadow-md z-20`}
                  >
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow pt-1">
                  <h4 className="font-bold text-gray-900 mb-2 text-lg">
                    {step.title}
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow indicator for flow */}
                {!isLast && (
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 z-10">
                    <ArrowDown className="w-5 h-5 text-gray-400 animate-bounce" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Important Note with enhanced styling */}
      <div className="mt-8 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-xl p-5 shadow-md">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-yellow-200 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-yellow-700" />
            </div>
          </div>
          <div className="flex-grow">
            <h4 className="font-bold text-yellow-900 mb-2 flex items-center gap-2">
              Important Note
              <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full font-semibold">
                READ THIS
              </span>
            </h4>
            <p className="text-yellow-800 leading-relaxed">
              DBT seeding can take <strong>24–48 hours</strong>. Always verify
              your DBT status before scholarship deadlines to avoid any issues.
            </p>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
          Complete all steps for successful DBT activation
        </p>
      </div>
    </div>
  );
}
