import { Award, MessageCircle, Trophy } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import NgoRanking from "../components/NgoRanking";

const Community = () => {
  const { t } = useTranslation("global");
  const [activeTab, setActiveTab] = useState("quiz");
  const [quizScore, setQuizScore] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});

  const quizQuestions = [
    {
      question: "What does DBT stand for?",
      options: [
        "Direct Bank Transfer",
        "Direct Benefit Transfer",
        "Digital Banking Technology",
      ],
      correct: 1,
    },
    {
      question: "Is Aadhaar linking the same as DBT enabling?",
      options: [
        "Yes, they are the same",
        "No, DBT requires additional seeding",
        "Only for government banks",
      ],
      correct: 1,
    },
    {
      question: "How long does DBT seeding typically take?",
      options: ["Immediate", "24-48 hours", "1 week"],
      correct: 1,
    },
  ];

  const leaderboard = [
    {
      rank: 1,
      school: "Government High School, Nagpur",
      score: 98,
      students: 245,
    },
    {
      rank: 2,
      school: "Zilla Parishad School, Wardha",
      score: 95,
      students: 189,
    },
    { rank: 3, school: "Municipal School, Akola", score: 92, students: 156 },
    {
      rank: 4,
      school: "Government School, Amravati",
      score: 89,
      students: 203,
    },
    { rank: 5, school: "District School, Yavatmal", score: 85, students: 134 },
  ];

  const handleAnswer = (answerIndex) => {
    const newAnswers = { ...userAnswers, [currentQuestion]: answerIndex };
    setUserAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      const score = Object.entries(newAnswers).reduce(
        (total, [qIndex, answer]) => {
          return total + (quizQuestions[qIndex].correct === answer ? 1 : 0);
        },
        0
      );
      setQuizScore(Math.round((score / quizQuestions.length) * 100));
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers({});
    setQuizScore(null);
  };

  return (
    <div className="space-y-8">
      <NgoRanking />
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Community Engagement
        </h2>
        <p className="text-gray-600">Learn together, achieve together</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl shadow-lg">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            {[
              {
                id: "quiz",
                label: "Knowledge Quiz",
                icon: <Award className="w-5 h-5" />,
              },
              {
                id: "leaderboard",
                label: "School Leaderboard",
                icon: <Trophy className="w-5 h-5" />,
              },
              {
                id: "feedback",
                label: "Get Help",
                icon: <MessageCircle className="w-5 h-5" />,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 transition-colors flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600 font-medium"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === "quiz" && (
            <div>
              {quizScore === null ? (
                <div>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">
                        DBT Knowledge Quiz
                      </h3>
                      <span className="text-sm text-gray-500">
                        Question {currentQuestion + 1} of {quizQuestions.length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${
                            ((currentQuestion + 1) / quizQuestions.length) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-6">
                      {quizQuestions[currentQuestion].question}
                    </h4>

                    <div className="space-y-3">
                      {quizQuestions[currentQuestion].options.map(
                        (option, index) => (
                          <button
                            key={index}
                            onClick={() => handleAnswer(index)}
                            className="w-full text-left p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <span className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center text-sm font-medium">
                                {String.fromCharCode(65 + index)}
                              </span>
                              <span>{option}</span>
                            </div>
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* Quiz Results */
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Trophy className="w-12 h-12 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Quiz Complete!
                  </h3>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {quizScore}%
                  </div>
                  <p className="text-gray-600 mb-6">
                    {quizScore >= 80
                      ? "Excellent! You understand DBT very well."
                      : quizScore >= 60
                      ? "Good job! Consider reviewing the learning materials."
                      : "Keep learning! Visit our awareness section for more information."}
                  </p>

                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={resetQuiz}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700"
                    >
                      Retake Quiz
                    </button>
                    <button className="bg-gray-100 text-gray-800 px-6 py-2 rounded-lg font-medium hover:bg-gray-200">
                      Share Score
                    </button>
                  </div>

                  {quizScore >= 80 && (
                    <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800">
                        🎉 Congratulations!
                      </h4>
                      <p className="text-sm text-green-700">
                        You've earned the DBT Expert badge!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === "leaderboard" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                School Participation Leaderboard
              </h3>
              <div className="space-y-3">
                {leaderboard.map((school) => (
                  <div
                    key={school.rank}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          school.rank === 1
                            ? "bg-yellow-100 text-yellow-800"
                            : school.rank === 2
                            ? "bg-gray-100 text-gray-800"
                            : school.rank === 3
                            ? "bg-orange-100 text-orange-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {school.rank}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {school.school}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {school.students} students participated
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">
                        {school.score}%
                      </div>
                      <div className="text-xs text-gray-500">avg score</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">
                  🏆 Monthly Challenge
                </h4>
                <p className="text-sm text-blue-700">
                  Top 3 schools will receive DBT awareness kits and certificates
                  this month!
                </p>
              </div>
            </div>
          )}

          {activeTab === "feedback" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Get Help with DBT
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What do you need help with?
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>Select your issue...</option>
                    <option>DBT seeding not working</option>
                    <option>Bank account not linked</option>
                    <option>Scholarship payment delayed</option>
                    <option>Don't understand the process</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Describe your problem
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    placeholder="Please describe your issue in detail..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your contact number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="+91 9876543210"
                  />
                </div>

                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700">
                  Submit Request
                </button>
              </div>

              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">
                  📱 Instant Help
                </h4>
                <p className="text-sm text-yellow-700 mb-3">
                  For immediate assistance, you can also:
                </p>
                <div className="flex space-x-4">
                  <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-700">
                    Call Gram Panchayat
                  </button>
                  <button className="bg-yellow-100 text-yellow-800 border border-yellow-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-200">
                    WhatsApp Support
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;
