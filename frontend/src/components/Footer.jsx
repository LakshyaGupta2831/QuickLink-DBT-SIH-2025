import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left - SIH Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="/tr.png" // <-- replace with actual logo path
              alt="SIH Logo"
              className="h-60 object-contain"
            />
          </div>

          {/* Right - College Details */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold text-gray-800">
              Vishwakarma Institute of Information Technology
            </h3>
            <p className="text-sm text-gray-600">
              Kondhwa, Pune – 411048, Maharashtra
            </p>
            <p className="text-sm text-gray-600 mt-1">
              © {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-6 pt-4 border-t border-gray-300 text-center flex items-center justify-center gap-2 text-gray-700">
          Made with
          <Heart className="w-4 h-4 text-red-500" fill="red" />
          by College Students
        </div>
      </div>
    </footer>
  );
}
