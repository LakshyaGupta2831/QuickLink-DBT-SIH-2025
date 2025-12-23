import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import { Navigate, NavLink } from "react-router-dom";

const Navigation = () => {
  let { screens } = useContext(AppContext);

  return (
    <nav className="hidden md:block bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex  space-x-8">
          {Object.entries(screens).map(([key, value]) => (
            <NavLink
              key={key}
              to={value.path}
              className={({ isActive }) =>
                `py-4 px-2  border-b-2 transition-colors flex items-center text-center ${
                  isActive
                    ? "border-blue-500 text-blue-600 font-medium"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`
              }
            >
              {value.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

{
  /* <nav className="hidden md:block bg-white border-b">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex space-x-8">
            {Object.entries(screens).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setCurrentScreen(key)}
                className={`py-4 px-2 border-b-2 transition-colors ${
                  currentScreen === key
                    ? "border-blue-500 text-blue-600 font-medium"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      </nav> */
}
