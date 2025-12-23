import { Link } from "react-router-dom";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <SearchX className="w-24 h-24 text-gray-600" />
        </div>

        <h1 className="text-7xl font-bold text-gray-800">404</h1>

        <p className="mt-4 text-lg text-gray-600">
          Oops! The page you're looking for doesn’t exist.
        </p>

        <Link
          to="/"
          className="mt-8 inline-block px-6 py-3 bg-gray-900 text-white rounded-lg text-md font-medium hover:bg-gray-800 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
