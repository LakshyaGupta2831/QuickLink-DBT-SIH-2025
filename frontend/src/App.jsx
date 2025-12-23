import { useContext, useEffect } from "react";
import "./App.css";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Signin from "./pages/Signin.jsx";
import Resources from "./pages/Resources.jsx";
import Header from "./components/Header.jsx";
import Navigation from "./components/Navigation.jsx";
import AuthContext from "./context/AuthContext.jsx";
import Awareness from "./pages/Awareness.jsx";
import CheckStatus from "./pages/CheckStatus.jsx";
import Chatbot from "./pages/Chatbot.jsx";
import Community from "./pages/Community.jsx";
import Contact from "./pages/Contact.jsx";
import Profile from "./pages/Profile.jsx";
import AlertTicker from "./components/AlertTicker.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./context/ScrollToTop.jsx";
import NotFound from "./pages/NotFound.jsx";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Protected Route Component

const RequireAuth = ({ children }) => {
  const { IsAuthenticated, user } = useContext(AuthContext);
  const location = useLocation();
  // console.log(user.isProfileComplete);
  // console.log(location.pathname);

  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
  }

  // If not authenticated, redirect to signin
  if (!IsAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // If authenticated but profile incomplete, redirect to complete-profile
  // BUT allow access to the complete-profile page itself
  // if (
  //   user &&
  //   !user.isProfileComplete &&
  //   location.pathname !== "/complete-profile"
  // ) {
  //   return <Navigate to="/complete-profile" replace />;
  // }

  return children;
};

// Component to redirect authenticated users away from signin
const RedirectIfAuthenticated = ({ children }) => {
  const { IsAuthenticated, user } = useContext(AuthContext);

  if (IsAuthenticated) {
    // If profile is incomplete, go to profile completion
    // if (!user.isProfileComplete) {
    //   return <Navigate to="/complete-profile" replace />;
    // }
    // Otherwise go to home
    return <Navigate to="/home" replace />;
  }

  return children;
};

function App() {
  const { IsAuthenticated, setIsAuthenticated, user, setUser } =
    useContext(AuthContext);
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/user/auth/me`, {
          method: "GET",
          credentials: "include", // VERY IMPORTANT
        });

        const data = await res.json();
        console.log("printing middleware data");
        console.log(data);

        if (data.success) {
          setIsAuthenticated(true);
          setUser(data.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (err) {
        console.log("error from fronted -> in auth/me");
        console.log(err);
        setIsAuthenticated(false);
      }
    };

    // checkUser();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <Header />
        {/* {IsAuthenticated && <Navigation />} */}
        <AlertTicker />

        <main className="max-w-4xl mx-auto px-4 py-8">
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route
              path="/signin"
              element={
                <RedirectIfAuthenticated>
                  <Signin />
                </RedirectIfAuthenticated>
              }
            />

            {/* Profile Completion (requires auth but not completed profile) */}
            <Route
              path="/complete-profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />

            {/* Protected Routes (require auth AND completed profile) */}
            <Route
              path="/home"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />

            <Route
              path="/awareness"
              element={
                <RequireAuth>
                  <Awareness />
                </RequireAuth>
              }
            />

            <Route
              path="/check"
              element={
                <RequireAuth>
                  <CheckStatus />
                </RequireAuth>
              }
            />

            <Route
              path="/help-center"
              element={
                <RequireAuth>
                  <Chatbot />
                </RequireAuth>
              }
            />

            <Route
              path="/resources"
              element={
                <RequireAuth>
                  <Resources />
                </RequireAuth>
              }
            />

            <Route
              path="/community"
              element={
                <RequireAuth>
                  <Community />
                </RequireAuth>
              }
            />

            <Route
              path="/contacts"
              element={
                <RequireAuth>
                  <Contact />
                </RequireAuth>
              }
            />

            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />

            {/* Redirect root to appropriate page */}
            <Route path="/" element={<Navigate to="/home" replace />} />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ScrollToTop />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;

// import { useContext, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
// import { Navigate, Route, Routes } from "react-router-dom";
// import Home from "./pages/Home.jsx";
// import Signin from "./pages/Signin.jsx";
// import Resources from "./pages/Resources.jsx";
// import Header from "./components/Header.jsx";
// import AuthContext from "./context/AuthContext.jsx";
// import Awareness from "./pages/Awareness.jsx";
// import CheckStatus from "./pages/CheckStatus.jsx";
// import Chatbot from "./pages/Chatbot.jsx";
// import Community from "./pages/Community.jsx";
// import Contacts from "./pages/Contact.jsx";
// import { Contact } from "lucide-react";
// import Profile from "./pages/Profile.jsx";
// export const backendUrl = import.meta.env.VITE_BACKEND_URL;

// // const RequireAuth = ({ children }) => {
// //   let { IsAuthenticated, setIsAuthenicated, user } = useContext(AuthContext);
// //   if (!IsAuthenticated) {
// //     return <Navigate to="/signin" replace />;
// //   }
// //   if (
// //     user &&
// //     !user.isProfileComplete &&
// //     window.location.pathname !== "/complete-profile"
// //   ) {
// //     return <Navigate to="/complete-profile" replace />;
// //   }
// //   return children;
// // };

// // const BlockIfProfileIncomplete = ({ children }) => {
// //   if (user?.isProfileComplete === false) {
// //     return <Navigate to="/complete-profile" replace />;
// //   }
// //   return children;
// // };

// function App() {
//   let { IsAuthenticated, setIsAuthenicated, user } = useContext(AuthContext);
//   // if (!user) {
//   //   return <Navigate to="/signin" replace />;
//   // } else if (
//   //   user &&
//   //   !user.isProfileComplete &&
//   //   window.location.pathname !== "/complete-profile"
//   // ) {
//   //   return <Navigate to="/complete-profile" replace />;
//   // }

//   return (
//     <>
//       <Header />
//       <Routes>
//         {/* Public */}
//         <Route path="/signin" element={<Signin />} />
//         <Route path="/complete-profile" element={<Profile />} />

//         {/* Protected Routes */}
//         <Route
//           path="/home"
//           element={
//             IsAuthenticated ? (
//               user.isProfileComplete ? (
//                 <Home />
//               ) : (
//                 <Navigate to="/complete-profile" replace />
//               )
//             ) : (
//               <Navigate to="/signin" replace />
//             )
//           }
//         />

//         <Route
//           path="/awareness"
//           element={
//             IsAuthenticated ? (
//               user.isProfileComplete ? (
//                 <Awareness />
//               ) : (
//                 <Navigate to="/complete-profile" replace />
//               )
//             ) : (
//               <Navigate to="/signin" replace />
//             )
//           }
//         />

//         <Route
//           path="/check"
//           element={
//             IsAuthenticated ? (
//               user.isProfileComplete ? (
//                 <CheckStatus />
//               ) : (
//                 <Navigate to="/complete-profile" replace />
//               )
//             ) : (
//               <Navigate to="/signin" replace />
//             )
//           }
//         />

//         <Route
//           path="/chatbot"
//           element={
//             IsAuthenticated ? (
//               user.isProfileComplete ? (
//                 <Chatbot />
//               ) : (
//                 <Navigate to="/complete-profile" replace />
//               )
//             ) : (
//               <Navigate to="/signin" replace />
//             )
//           }
//         />

//         <Route
//           path="/resources"
//           element={
//             IsAuthenticated ? (
//               user.isProfileComplete ? (
//                 <Resources />
//               ) : (
//                 <Navigate to="/complete-profile" replace />
//               )
//             ) : (
//               <Navigate to="/signin" replace />
//             )
//           }
//         />

//         <Route
//           path="/community"
//           element={
//             IsAuthenticated ? (
//               user.isProfileComplete ? (
//                 <Community />
//               ) : (
//                 <Navigate to="/complete-profile" replace />
//               )
//             ) : (
//               <Navigate to="/signin" replace />
//             )
//           }
//         />

//         <Route
//           path="/contact"
//           element={
//             IsAuthenticated ? (
//               user.isProfileComplete ? (
//                 <Contact />
//               ) : (
//                 <Navigate to="/complete-profile" replace />
//               )
//             ) : (
//               <Navigate to="/signin" replace />
//             )
//           }
//         />
//       </Routes>
//     </>
//   );
// }

// export default App;

//  <Routes>
//   {/* Public */}
//   <Route path="/signin" element={<Signin />} />

//   {/* Profile completion page should not require completed profile */}
//   <Route path="/complete-profile" element={<Profile />} />

//   {/* Protected routes */}
//   <Route path="/home" element={
//     <RequireAuth><Home /></RequireAuth>
//   } />

//   <Route path="/awareness" element={
//     <RequireAuth><Awareness /></RequireAuth>
//   } />

//   <Route path="/check" element={
//     <RequireAuth><CheckStatus /></RequireAuth>
//   } />

//   <Route path="/chatbot" element={
//     <RequireAuth><Chatbot /></RequireAuth>
//   } />

//   <Route path="/resources" element={
//     <RequireAuth><Resources /></RequireAuth>
//   } />

//   <Route path="/community" element={
//     <RequireAuth><Community /></RequireAuth>
//   } />

//   <Route path="/contact" element={
//     <RequireAuth><Contact /></RequireAuth>
//   } />
// </Routes>
