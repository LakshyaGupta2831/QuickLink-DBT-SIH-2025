import React from "react";
import { Award, TrendingUp, Globe2, HeartHandshake } from "lucide-react";

const ngos = [
  {
    rank: 1,
    name: "Swasthya Jagruti Foundation",
    impactScore: 96,
    campaigns: 32,
    beneficiaries: "2.4L+",
    focus: "Health & Sanitation",
    badge: "Platinum Impact",
  },
  {
    rank: 2,
    name: "Shiksha For All",
    impactScore: 91,
    campaigns: 24,
    beneficiaries: "1.8L+",
    focus: "Education & Digital Literacy",
    badge: "Gold Impact",
  },
  {
    rank: 3,
    name: "Gramin Vikas Trust",
    impactScore: 87,
    campaigns: 19,
    beneficiaries: "95K+",
    focus: "Rural Development",
    badge: "Gold Impact",
  },
  {
    rank: 4,
    name: "Mahila Shakti Sangathan",
    impactScore: 82,
    campaigns: 21,
    beneficiaries: "78K+",
    focus: "Women Empowerment",
    badge: "Silver Impact",
  },
  {
    rank: 5,
    name: "Green Bharat Initiative",
    impactScore: 79,
    campaigns: 17,
    beneficiaries: "55K+",
    focus: "Environment & Sustainability",
    badge: "Silver Impact",
  },
];

const NgoRanking = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* HEADER CARD */}
        <div className="bg-white rounded-3xl shadow-2xl mb-6 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center shadow-lg">
              <HeartHandshake className="w-9 h-9 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                NGO Awareness Impact Rankings
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Recognising organisations that have played a key role in
                spreading DBT & welfare scheme awareness.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-1">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full">
              <TrendingUp className="w-4 h-4" />
              Data for FY 2024–25 (Pilot)
            </span>
            <span className="text-xs text-gray-500">
              Based on outreach, verified campaigns & beneficiary feedback.
            </span>
          </div>
        </div>

        {/* TABLE CARD */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="px-6 pt-6 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              <h2 className="text-lg font-semibold text-gray-900">
                Top Performing NGOs
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
              <Globe2 className="w-4 h-4" />
              <span>Coverage across urban & rural India</span>
            </div>
          </div>

          {/* HEADER ROW */}
          <div className="px-6 py-3 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide grid grid-cols-12 gap-2">
            <div className="col-span-1 text-center">Rank</div>
            <div className="col-span-4">NGO Name</div>
            <div className="col-span-2 text-center">Impact Score</div>
            <div className="col-span-2 text-center">Campaigns</div>
            <div className="col-span-2 text-center">Beneficiaries</div>
            <div className="col-span-1 text-center">Badge</div>
          </div>

          {/* ROWS */}
          <div className="divide-y divide-gray-100">
            {ngos.map((ngo) => (
              <div
                key={ngo.rank}
                className="px-6 py-4 grid grid-cols-12 gap-2 items-center hover:bg-blue-50/40 transition-colors"
              >
                {/* Rank */}
                <div className="col-span-1 text-center font-semibold">
                  <span
                    className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs ${
                      ngo.rank === 1
                        ? "bg-yellow-100 text-yellow-800"
                        : ngo.rank === 2
                        ? "bg-gray-100 text-gray-800"
                        : ngo.rank === 3
                        ? "bg-amber-100 text-amber-800"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {ngo.rank}
                  </span>
                </div>

                {/* NGO Name + focus */}
                <div className="col-span-4">
                  <div className="font-semibold text-gray-900">{ngo.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Focus: {ngo.focus}
                  </div>
                </div>

                {/* Impact score with bar */}
                <div className="col-span-2 text-center">
                  <div className="text-sm font-semibold text-gray-900 mb-1">
                    {ngo.impactScore}/100
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-gradient-to-r from-blue-500 to-green-500"
                      style={{ width: `${ngo.impactScore}%` }}
                    />
                  </div>
                </div>

                {/* Campaigns */}
                <div className="col-span-2 text-center">
                  <div className="text-sm font-semibold text-gray-900">
                    {ngo.campaigns}
                  </div>
                  <div className="text-xs text-gray-500">awareness drives</div>
                </div>

                {/* Beneficiaries */}
                <div className="col-span-2 text-center">
                  <div className="text-sm font-semibold text-gray-900">
                    {ngo.beneficiaries}
                  </div>
                  <div className="text-xs text-gray-500">beneficiaries</div>
                </div>

                {/* Badge */}
                <div className="col-span-1 text-center">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-semibold ${
                      ngo.badge.includes("Platinum")
                        ? "bg-purple-100 text-purple-800"
                        : ngo.badge.includes("Gold")
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {ngo.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* FOOTER NOTE */}
          <div className="px-6 py-4 bg-gray-50 text-xs text-gray-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p>
              *Impact score is calculated based on verified outreach, geographic
              coverage, repeat campaigns and citizen feedback collected during
              awareness drives.
            </p>
            <p className="font-medium text-gray-600">
              This is a static demo list for presentation purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NgoRanking;
