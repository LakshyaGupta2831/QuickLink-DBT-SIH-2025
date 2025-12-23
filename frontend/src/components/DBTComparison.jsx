import React from "react";
import {
  Link,
  CheckCircle,
  XCircle,
  ArrowRight,
  Shield,
  Banknote,
  FileCheck,
  Sparkles,
} from "lucide-react";

export default function DBTComparison() {
  const linkedFeatures = [
    { text: "Aadhaar linked to bank account", icon: Link, available: true },
    { text: "Basic KYC completed", icon: FileCheck, available: true },
    {
      text: "Allows regular banking operations",
      icon: Banknote,
      available: true,
    },
    {
      text: "Not eligible for DBT transfers by default",
      icon: XCircle,
      available: false,
    },
    {
      text: "Government benefits may not reach this account",
      icon: XCircle,
      available: false,
    },
  ];

  const seededFeatures = [
    {
      text: "Aadhaar registered in NPCI DBT system",
      icon: Shield,
      available: true,
    },
    {
      text: "Eligible for DBT scholarships/subsidies",
      icon: CheckCircle,
      available: true,
    },
    {
      text: "Government benefits directly credited",
      icon: Banknote,
      available: true,
    },
    {
      text: "Ensures smooth & timely transfers",
      icon: Sparkles,
      available: true,
    },
    {
      text: "Required for government welfare schemes",
      icon: CheckCircle,
      available: true,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Understanding the Difference
        </h2>
        <p className="text-gray-600 text-lg">
          Learn why DBT-enabling is crucial for receiving scholarships
        </p>
      </div>

      {/* Comparison Section */}
      <div className="relative">
        <h3 className="text-xl font-bold text-gray-800 mb-8 text-center">
          Comparison: Aadhaar Linked vs Aadhaar Seeded (DBT Enabled)
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
          {/* VS Badge - Center divider */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="bg-gradient-to-r from-red-500 to-green-500 text-white font-bold text-lg px-6 py-3 rounded-full shadow-xl border-4 border-white">
              VS
            </div>
          </div>

          {/* Aadhaar Linked Card */}
          <div className="relative group">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 border-2 border-red-200 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-full shadow-lg mb-6 font-semibold">
                <XCircle className="w-5 h-5" />
                Aadhaar Linked Account
              </div>

              {/* Subtitle */}
              <p className="text-gray-700 font-medium mb-6">
                Basic linkage - Not DBT enabled
              </p>

              {/* Features List */}
              <ul className="space-y-4">
                {linkedFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <li
                      key={index}
                      className="flex items-start gap-3 group/item"
                    >
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                          feature.available
                            ? "bg-orange-100 text-orange-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span
                        className={`text-sm leading-relaxed ${
                          feature.available
                            ? "text-gray-700"
                            : "text-red-700 font-medium"
                        }`}
                      >
                        {feature.text}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {/* Bottom indicator */}
              <div className="mt-6 pt-6 border-t border-red-200">
                <p className="text-xs text-red-600 font-semibold uppercase tracking-wide flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  Limited for Government Benefits
                </p>
              </div>
            </div>
          </div>

          {/* Aadhaar Seeded Card */}
          <div className="relative group">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border-2 border-green-300 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
              {/* Badge with shine effect */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-2 rounded-full shadow-lg mb-6 font-semibold relative overflow-hidden">
                <CheckCircle className="w-5 h-5" />
                Aadhaar Seeded (DBT Enabled)
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>

              {/* Subtitle */}
              <p className="text-gray-700 font-medium mb-6">
                Full DBT access - Ready for benefits
              </p>

              {/* Features List */}
              <ul className="space-y-4">
                {seededFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <li
                      key={index}
                      className="flex items-start gap-3 group/item"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm text-gray-700 leading-relaxed font-medium">
                        {feature.text}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {/* Bottom indicator */}
              <div className="mt-6 pt-6 border-t border-green-200">
                <p className="text-xs text-green-700 font-bold uppercase tracking-wide flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Fully Eligible for Government Benefits
                </p>
              </div>
            </div>

            {/* Recommended badge */}
            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-4 py-1 rounded-full shadow-lg text-xs font-bold flex items-center gap-1 animate-pulse">
              <Sparkles className="w-3 h-3" />
              RECOMMENDED
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-full px-6 py-3 shadow-md">
            <ArrowRight className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-gray-800">
              Upgrade to Aadhaar Seeded to receive scholarships & government
              benefits
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
