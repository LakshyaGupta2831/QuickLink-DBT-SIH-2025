// import { useContext } from "react";
// import AuthContext from "../context/AuthContext";
// import AppContext from "../context/AppContext";
// import { LogOut, Menu, Shield, User, X } from "lucide-react";
// import React from "react";
// import { NavLink } from "react-router-dom";

// const Header = () => {
//   let { language, languages, changeLanguage, menuOpen, setMenuOpen, screens } =
//     useContext(AppContext);
//   let { user, logout } = useContext(AuthContext);

//   return (
//     <header className="bg-white shadow-lg border-b-4 border-orange-400">
//       <div className="max-w-4xl mx-auto px-4 py-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-3">
//             <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
//               <Shield className="w-7 h-7 text-white" />
//             </div>
//             <div>
//               <h1 className="text-xl font-bold text-gray-800">QuickLink DBT</h1>
//               <p className="text-sm text-gray-600">Direct Benefit Transfer</p>
//             </div>
//           </div>

//           <div className="flex items-center space-x-2">
//             {/* User Info Display */}
//             <NavLink to="/profile">
//               <div className="hidden md:flex items-center space-x-2 px-3 py-2 hover:bg-blue-100 bg-blue-50 rounded-lg">
//                 <User className="w-4 h-4 text-blue-600" />
//                 <span className="text-sm font-medium text-blue-900">
//                   {user?.username || "User"}
//                 </span>
//               </div>
//             </NavLink>

//             <select
//               value={language}
//               onChange={(e) => changeLanguage(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
//             >
//               {Object.entries(languages).map(([key, value]) => (
//                 <option key={key} value={key}>
//                   {value}
//                 </option>
//               ))}
//             </select>

//             {/* Logout Button */}
//             <button
//               onClick={() => logout()}
//               className="p-2 rounded-lg hover:bg-red-50 text-red-600"
//               title="Logout"
//             >
//               <LogOut className="w-5 h-5" />
//             </button>

//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="md:hidden p-2 rounded-lg hover:bg-gray-100"
//             >
//               {menuOpen ? (
//                 <X className="w-6 h-6" />
//               ) : (
//                 <Menu className="w-6 h-6" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {/* {menuOpen && (
//             <div className="md:hidden mt-4 space-y-2">
//               {Object.entries(screens).map(([key, value]) => (
//                 <button
//                   key={key}
//                   onClick={() => {
//                     setCurrentScreen(key);
//                     setMenuOpen(false);
//                   }}
//                   className={`w-full text-left px-4 py-2 rounded-lg ${
//                     currentScreen === key
//                       ? "bg-blue-100 text-blue-700 font-medium"
//                       : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   {value}
//                 </button>
//               ))}
//             </div>
//           )} */}
//         {menuOpen && (
//           <div className="md:hidden mt-4 space-y-2">
//             {Object.entries(screens).map(([key, value]) => (
//               <NavLink
//                 key={key}
//                 to={key} // 🔥 navigate on click
//                 onClick={() => setMenuOpen(false)} // close menu
//                 className={({ isActive }) =>
//                   `block w-full text-left px-4 py-2 rounded-lg ${
//                     isActive
//                       ? "bg-blue-100 text-blue-700 font-medium"
//                       : "text-gray-600 hover:bg-gray-100"
//                   }`
//                 }
//               >
//                 {key}
//               </NavLink>
//             ))}
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;
import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import AppContext from "../context/AppContext";
import { LogOut, LogOutIcon, Menu, Shield, User, X } from "lucide-react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  let { language, languages, changeLanguage, menuOpen, setMenuOpen, screens } =
    useContext(AppContext);

  let [theme, setTheme] = useState(0);
  let { user, logout, IsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  let [acc, setAcc] = useState(false);
  useEffect(() => {
    localStorage.setItem("acc", acc);
    console.log(acc);
  }, [acc]);

  // Smooth Scroll Handler for FAQ
  const scrollToFAQ = () => {
    const section = document.getElementById("faq-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="bg-white shadow-lg border-b-4 border-orange-400 ">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo + Title */}
          <div
            onClick={() => navigate("/home")}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-md sm:text-xl font-bold text-gray-800">
                QuickLink DBT
              </h1>
              <p className="text-sm hidden sm:block text-gray-600">
                Direct Benefit Transfer
              </p>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-2">
            {/* Desktop User Info */}
            {IsAuthenticated && user && (
              <NavLink to="/profile">
                <div
                  className={`hidden md:flex items-center space-x-2 px-3 py-2 ${
                    user.isSeeded
                      ? "hover:bg-blue-100 bg-blue-50"
                      : "hover:bg-red-100 bg-red-50"
                  } rounded-lg`}
                >
                  <User
                    className={`w-4 h-4 ${
                      user.isSeeded ? "text-blue-600" : "text-red-600"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      user.isSeeded ? "text-blue-900" : "text-red-900"
                    }`}
                  >
                    {user?.fullName || "User"}
                  </span>
                </div>
              </NavLink>
            )}

            {/* Language Selector */}
            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="sm:px-3 py-2 px-2 sm:py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(languages).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>

            {/* Mobile User Icon */}
            {IsAuthenticated && (
              <NavLink
                to="/profile"
                className="md:hidden p-2 rounded-lg hover:bg-blue-50"
                title="Profile"
              >
                <User className="w-5 h-5 text-blue-700" />
              </NavLink>
            )}

            {/* Logout Button */}
            <div
              onClick={() => {
                setAcc(!acc);
              }}
              style={{ width: "27px", margin: "0 5px 0 5px" }}
            >
              <img
                src={
                  !acc
                    ? "https://static.thenounproject.com/png/975768-200.png"
                    : "https://www.svgrepo.com/show/535118/accessibility.svg"
                }
              />
            </div>

            {IsAuthenticated && (
              <button
                onClick={() => logout()}
                className="p-2 sm:block hidden rounded-lg hover:bg-red-50 text-red-600"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            )}

            {/* Mobile Menu Toggle */}
            {IsAuthenticated && (
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                {menuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            )}
          </div>
        </div>
        {IsAuthenticated && (
          <div
            className="hidden md:flex justify-center space-x-6 mt-4"
            style={{ display: "flex", flexDirection: "row", gap: "25px" }}
          >
            {Object.entries(screens).map(([key, value]) => (
              <NavLink
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0",
                  textAlign: "center",
                }}
                key={key}
                to={value.path}
                className={({ isActive }) =>
                  `text-sm font-medium ${
                    isActive
                      ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                      : "text-gray-600 hover:text-blue-600"
                  }`
                }
              >
                {value.name}
              </NavLink>
            ))}

            {/* FAQ Desktop Button */}
            <button
              onClick={scrollToFAQ}
              className="text-sm font-medium text-gray-600 hover:text-blue-600"
            >
              FAQ
            </button>
          </div>
        )}
        {/* Desktop Navbar Links */}

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            {Object.entries(screens).map(([key, value]) => (
              <NavLink
                key={key}
                to={value.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block w-full text-left px-4 py-2 rounded-lg ${
                    isActive
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                {value.name}
              </NavLink>
            ))}

            {/* FAQ Mobile Button */}
            <button
              onClick={() => {
                scrollToFAQ();
                setMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              FAQ
            </button>

            <NavLink
              onClick={() => {
                setMenuOpen(false);
                logout();
              }}
              className="block w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-gray-100"
            >
              <span className="flex items-center gap-2">
                <LogOutIcon className="size-5" />
                Logout
              </span>
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
