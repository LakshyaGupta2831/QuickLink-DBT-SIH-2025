import {
  AlertCircle,
  BookOpen,
  Building,
  CheckCircle,
  CreditCard,
  Download,
  MessageCircle,
  PhoneCall,
  Shield,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import FAQ from "../components/FAQ";
import { Navigate, NavLink } from "react-router-dom";
import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";

import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { franc } from "franc";

const Home = ({ setCurrentScreen }) => {
  const navigate = useNavigate();
  const { t } = useTranslation("global");
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [t, i18n] = useTranslation("global");

  const infoSlides = [
    {
      icon: <AlertCircle className="w-8 h-8 text-red-500" />,
      title: t("home.quickinfo.info1.title"),
      content: t("home.quickinfo.info1.component"),
      description: t("home.quickinfo.info1.description"),
    },
    {
      icon: <CreditCard className="w-8 h-8 text-orange-500" />,
      title: t("home.quickinfo.info2.title"),
      content: t("home.quickinfo.info2.component"),
      description: t("home.quickinfo.info2.description"),
    },
    {
      icon: <Building className="w-8 h-8 text-green-500" />,
      title: t("home.quickinfo.info3.title"),
      content: t("home.quickinfo.info3.component"),
      description: t("home.quickinfo.info3.description"),
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % infoSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const [audioFile, setAudioFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef();

  useEffect(() => {
    if (audioFile) {
      const blob = new Blob([audioFile], { type: "audio/mpeg" });
      const audioURL = URL.createObjectURL(blob);

      const audio = audioRef.current;
      audio.src = audioURL;

      audio.load();
      audio.play();

      return () => URL.revokeObjectURL(audioURL);
    }
  }, [audioFile]);

  async function TTS(text) {
    if (localStorage.getItem("acc") == "true") {
      try {
        let command = null;

        if (franc(text) == "eng") {
          command = new SynthesizeSpeechCommand({
            Text: text,
            OutputFormat: "mp3",
            VoiceId: "Joanna",
          });
        } else {
          command = new SynthesizeSpeechCommand({
            Text: text,
            OutputFormat: "mp3",
            VoiceId: "Aditi",
          });
        }

        const response = await polly.send(command);
        const audioBytes = await response.AudioStream.transformToByteArray();
        setAudioFile(audioBytes);
        console.log(audioBytes);
      } catch (err) {
        console.error("Polly Error:", err);
      }
    }
  }

  const handleElementClick = (e) => {
    const text = e.target.innerHTML; // Get the innerHTML of the clicked element
    TTS(text); // Call the TTS function with the dynamic text
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % infoSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);
  const polly = new PollyClient({
    region: "us-east-1",
    credentials: fromCognitoIdentityPool({
      clientConfig: { region: "us-east-1" },
      identityPoolId: "us-east-1:a98abf49-94fc-4d1a-a4c1-34c8e5a65d56",
    }),
  });

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-8">
        <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-green-600 rounded-full mx-auto mb-6 flex items-center justify-center">
          <Shield className="w-12 h-12 text-white" />
        </div>
        <h1
          onClick={handleElementClick}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
        >
          {t("home.title")}
        </h1>
        {/* <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Secure Your Scholarship
        </h1> */}
        <p
          onClick={handleElementClick}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          {t("home.subtitle")}
        </p>
        {/* <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Ensure your bank account is DBT-enabled to receive government benefits
          without delays
           <Link to="/faq" className="text-blue-600 underline hover:text-blue-800">
    Skip to FAQ
  </Link>
        </p> */}
      </div>

      {/* Main Action Buttons */}
      <audio
        style={{ position: "absolute", visibility: "hidden" }}
        ref={audioRef}
        controls
      />

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <button
          onClick={() => navigate("/check")}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <CheckCircle className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">
            {t("home.main.check_dbt_status.main_line")}
          </h3>
          <p className="text-blue-100">
            {" "}
            {t("home.main.check_dbt_status.sub_line")}
          </p>
          {/* <p className="text-blue-100">Verify if your account is DBT-enabled</p> */}
        </button>

        <button
          onClick={() => navigate("/awareness")}
          className="bg-gradient-to-r from-green-600 to-green-700 text-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <BookOpen className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">
            {" "}
            {t("home.main.learn_the_difference.main_line")}
          </h3>
          {/* <h3 className="text-xl font-bold mb-2">Learn the Difference</h3> */}
          <p className="text-green-100">
            {t("home.main.learn_the_difference.sub_line")}
          </p>
          {/* <p className="text-green-100">
            Understand Aadhaar link vs DBT-enabled
          </p> */}
        </button>
      </div>

      {/* Info Slider */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3
            onClick={handleElementClick}
            className="text-lg font-semibold text-gray-800"
          >
            {t("home.quickinfo.title")}
          </h3>
          {/* <h3 className="text-lg font-semibold text-gray-800">
            Quick Information
          </h3> */}
          <div className="flex space-x-2">
            {infoSlides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentSlide === index ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="min-h-[120px] bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            {infoSlides[currentSlide].icon}
            <div>
              <h4
                onClick={handleElementClick}
                className="font-semibold text-gray-900 mb-1"
              >
                {infoSlides[currentSlide].title}
              </h4>
              <p
                onClick={handleElementClick}
                className="text-lg font-medium text-gray-800 mb-2"
              >
                {infoSlides[currentSlide].content}
              </p>
              <p onClick={handleElementClick} className="text-sm text-gray-600">
                {infoSlides[currentSlide].description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => navigate("/help-center")}
          to="/help-center"
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <MessageCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          {/* <span className="text-sm font-medium text-gray-800">Help Center</span> */}
          <span className="text-sm font-medium text-gray-800">
            {t("home.footer.helpcenter")}
          </span>
        </button>

        <button
          onClick={() => navigate("/resources")}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <Download className="w-8 h-8 text-green-600 mx-auto mb-2" />
          {/* <span className="text-sm font-medium text-gray-800">Resources</span> */}
          <span className="text-sm font-medium text-gray-800">
            {t("home.footer.toolsandresources")}
          </span>
        </button>

        <button
          onClick={() => navigate("/community")}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <span className="text-sm font-medium text-gray-800">
            {t("home.footer.community")}
          </span>
          {/* <span className="text-sm font-medium text-gray-800">Community</span> */}
        </button>

        <button
          onClick={() => navigate("/contacts")}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <PhoneCall className="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <span className="text-sm font-medium text-gray-800">
            {t("home.footer.contact")}
          </span>
          {/* <span className="text-sm font-medium text-gray-800">Contact</span> */}
        </button>
      </div>
      <FAQ />
    </div>
  );
};

export default Home;
