// import { useEffect, useState } from "react";
// // import RootLayout from "./layouts/RootLayout"
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Navigate,
//   Outlet,
//   Route,
//   Routes,
//   useLocation,
//   useNavigate,
// } from "react-router-dom";
// import Home from "./layouts/home";
// import Profile from "./layouts/profile";
// import Search from "./layouts/search";
// import { api } from "./libraries/api";
// import { Dashboard } from "./pages/5.dashboard";
// import { Login } from "./pages/6.login";
// import { Register } from "./pages/7.register";
// import { Test } from "./pages/test-api";
// import { TestRedux } from "./pages/test-redux";
// import { SET_USER } from "./redux/slices/auth";
// import { RootState } from "./redux/store";
// import { Reset } from "./pages/10.reset";
// import { ResetPassword } from "./pages/9.reset-password";
// // import { Forgot } from "./pages/10.forgot-password";

// function App() {
//   const [isLoading, setIsLoading] = useState<Boolean>(true);
//   const navigate = useNavigate();
//   const { pathname } = useLocation();

//   // bagian dari redux
//   const dispatch = useDispatch();
//   // ------ INI BERHUBUNGAN DENGAN PRIVATE ROUTE ---------
//   const currentUser = useSelector((state: RootState) => state.auth.user);

//   const PrivateRoute = () => {
//     if (!isLoading) {
//       if (currentUser) return <Outlet />;

//       // return <Navigate to={"/auth/login"} />;
//       navigate("/auth/login");
//     }

//     // ------ INI BERHUBUNGAN DENGAN PRIVATE ROUTE ---------
//   };

//   async function authCheck() {
//     try {
//       console.log("OKKKKKKKKKK");
//       const token = localStorage.token;
//       const response = await api.post(
//         "/auth/check",
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       dispatch(
//         SET_USER({
//           ...response.data,
//           // cara hitung length dari redux
//           TotalFolloweds: response.data.followeds.length,
//           TotalFollowers: response.data.followers.length,
//         })
//       );

//       setIsLoading(false);
//     } catch (error) {
//       localStorage.removeItem("token");
//       setIsLoading(false);
//     }
//   }

//   console.log("DIKA NICH");
//   useEffect(() => {
//     const token = localStorage.token;

//     if (token) {
//       authCheck();
//     } else {
//       navigate("/auth/login");
//     }
//   }, [pathname]);

//   return (
//     <Routes>
//       <Route path="/auth/login" element={<Login />} />
//       <Route path="/auth/register" element={<Register />} />
//       <Route path="/auth/reset" element={<Reset />} />
//       <Route path="/auth/reset-password" element={<ResetPassword />} />
//       {/* <Route path="/auth/forgot" element={<Forgot />} /> */}
//       <Route path="/test" element={<Test />} />
//       <Route path="/test-redux" element={<TestRedux />} />

//       <Route element={<PrivateRoute />}>
//         <Route path="/" element={<Home />} />
//         <Route path="/profile" element={<Profile />} />
//         {/* <Route path="/search" element={<SearchPage />} /> */}
//         <Route path="/search" element={<Search />} />
//         {/* <Route path="/searchTest" element={<SearchPageTest/>}/> */}

//         <Route path="/dashboard" element={<Dashboard />} />
//       </Route>
//     </Routes>
//   );
// }

// export default App;

import { useEffect, useState } from "react";
// import RootLayout from "./layouts/RootLayout"
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Home from "./layouts/home";
import Profile from "./layouts/profile";
import Search from "./layouts/search";
import { api } from "./libraries/api";
import { Dashboard } from "./pages/5.dashboard";
import { Login } from "./pages/6.login";
import { Register } from "./pages/7.register";
import { Test } from "./pages/test-api";
import { TestRedux } from "./pages/test-redux";
import { SET_USER } from "./redux/slices/auth";
import { RootState } from "./redux/store";
import { Reset } from "./pages/10.reset";
import { ResetPassword } from "./pages/9.reset-password";
// import { Forgot } from "./pages/10.forgot-password";

function App() {
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  // bagian dari redux
  const dispatch = useDispatch();
  // ------ INI BERHUBUNGAN DENGAN PRIVATE ROUTE ---------
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const PrivateRoute = () => {
    if (!isLoading) {
      console.log("test", currentUser);
      if (currentUser) return <Outlet />;

      return <Navigate to={"/auth/login"} />;
    }

    // ------ INI BERHUBUNGAN DENGAN PRIVATE ROUTE ---------
  };

  async function authCheck() {
    try {
      console.log("test");
      const token = localStorage.token;
      const response = await api.post(
        "/auth/check",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("res", response);
      dispatch(
        SET_USER({
          ...response.data,
          // cara hitung length dari redux
          TotalFolloweds: response.data.followeds.length,
          TotalFollowers: response.data.followers.length,
        })
      );
      setIsLoading(false);
      console.log("kamu sudah login", response.data);
    } catch (error) {
      localStorage.removeItem("token");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const token = localStorage.token;
    console.log("cek token", token);
    if (token) authCheck();
  }, []);

  return (
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/reset" element={<Reset />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />
      {/* <Route path="/auth/forgot" element={<Forgot />} /> */}
      <Route path="/test" element={<Test />} />
      <Route path="/test-redux" element={<TestRedux />} />

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/search" element={<SearchPage />} /> */}
        <Route path="/search" element={<Search />} />
        {/* <Route path="/searchTest" element={<SearchPageTest/>}/> */}

        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
