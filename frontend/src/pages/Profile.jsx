// import React from "react";
// import { User, CheckCircle } from "lucide-react";

// export default function Profile() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <h1 className="text-4xl font-bold text-gray-900 mb-8">My Profile</h1>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Left Card - User Profile */}
//           <div className="bg-white rounded-lg shadow-sm p-8">
//             {/* Profile Avatar */}
//             <div className="flex justify-center mb-8">
//               <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
//                 <User className="w-16 h-16 text-gray-500" />
//               </div>
//             </div>

//             {/* Profile Details */}
//             <div className="space-y-6">
//               {/* Username */}
//               <div>
//                 <label className="block text-sm text-gray-500 mb-1">
//                   Username
//                 </label>
//                 <div className="text-lg text-gray-900 pb-2 border-b border-gray-200">
//                   user123
//                 </div>
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="block text-sm text-gray-500 mb-1">
//                   Email
//                 </label>
//                 <div className="text-lg text-gray-900 pb-2 border-b border-gray-200">
//                   user@example.com
//                 </div>
//               </div>

//               {/* State */}
//               <div>
//                 <label className="block text-sm text-gray-500 mb-1">
//                   State
//                 </label>
//                 <div className="text-lg text-gray-900 pb-2 border-b border-gray-200">
//                   Maharashtra
//                 </div>
//               </div>

//               {/* City */}
//               <div>
//                 <label className="block text-sm text-gray-500 mb-1">City</label>
//                 <div className="text-lg text-gray-900 pb-2 border-b border-gray-200">
//                   Pune
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Card - DBT Status & Actions */}
//           <div className="space-y-6">
//             {/* DBT Status Card */}
//             <div className="bg-gray-50 rounded-lg p-6">
//               <div className="flex items-start gap-3 mb-4">
//                 <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
//                 <h2 className="text-xl font-semibold text-gray-900">
//                   Last DBT Status Check
//                 </h2>
//               </div>

//               <div className="space-y-2 ml-9">
//                 <div className="text-gray-700">
//                   <span className="font-medium">Status:</span> Verified
//                 </div>
//                 <div className="text-gray-700">
//                   <span className="font-medium">Date:</span> 25/11/2025
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="space-y-4">
//               <button className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-medium">
//                 Edit Profile
//               </button>

//               <button className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-medium">
//                 Change Password
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useContext, useState } from "react";
import { User, CheckCircle, AlertCircle } from "lucide-react";
import AppContext from "../context/AppContext";
import AuthContext from "../context/AuthContext";

export default function Profile() {
  const [subscribeAlerts, setSubscribeAlerts] = useState(false);
  const [userCategory, setUserCategory] = useState("Student");
  const { user } = useContext(AuthContext);
  const [editProfile, setEditProfile] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Card - User Profile */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            {/* Profile Avatar */}
            <div className="flex justify-center mb-8">
              <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-16 h-16 text-gray-500" />
              </div>
            </div>

            {/* Profile Details */}
            <div className="space-y-6">
              {/* Username */}
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Full Name
                </label>
                <div className="text-lg text-gray-900 pb-2 border-b border-gray-200">
                  {user.fullName}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Email
                </label>
                <div className="text-lg text-gray-900 pb-2 border-b border-gray-200">
                  {user.email}
                </div>
              </div>

              {/* State */}
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  State
                </label>
                <div className="text-lg text-gray-900 pb-2 border-b border-gray-200">
                  {user.state}
                </div>
              </div>

              {/* City */}
              <div>
                <label className="block text-sm text-gray-500 mb-1">City</label>
                <div className="text-lg text-gray-900 pb-2 border-b border-gray-200">
                  {user.city}
                </div>
              </div>

              {/* NEW — User Category */}
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Category of User
                </label>
                <div className="text-lg text-gray-900 pb-2 border-b border-gray-200">
                  {user.category}
                </div>

                {/* <select
                  disabled={true}
                  value={userCategory}
                  onChange={(e) => setUserCategory(e.target.value)}
                  className="w-full text-lg text-gray-900 border-b border-gray-300 pb-2 bg-transparent focus:outline-none"
                >
                  <option>Student</option>
                  <option>Parent</option>
                  <option>Teacher</option>
                  <option>College Admin</option>
                  <option>Other</option>
                </select> */}
              </div>

              {/* NEW — Subscription Checkbox */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  disabled={true}
                  checked={user.isSubscribedToEmail}
                  onChange={(e) => setSubscribeAlerts(e.target.checked)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="text-gray-700">
                  Subscribe to regular alerts regarding scholarships
                </label>
              </div>
            </div>
          </div>

          {/* Right Card - DBT Status & Actions */}
          <div className="space-y-6">
            {/* DBT Status Card */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-start gap-3 mb-4">
                {user.isSeeded ? (
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                )}

                <h2 className="text-xl font-semibold text-gray-900">
                  Last DBT Status Check
                </h2>
              </div>

              <div className="space-y-2 ml-9">
                <div className="text-gray-700">
                  <span className="font-medium">Status:</span>{" "}
                  {user.isSeeded ? "Seeded" : "Not Seeded"}
                </div>
                <div className="text-gray-700">
                  <span className="font-medium">Laste Checked:</span>{" "}
                  {new Date(user.updatedAt).toLocaleString()}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Edit Profile
              </button>

              <button className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
