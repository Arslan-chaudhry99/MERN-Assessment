import Admin from "./Pages/Admin/Admin";
import Login from "./Pages/Auth/Login";
import "./Global.css";
import Signup from "./Pages/Auth/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const isAuth = Boolean(useSelector((state) => state.token));


  return (
    <>
     <ToastContainer />
      <BrowserRouter>
        <Routes>
          {isAuth ? (
            <Route path="*" element={<Admin />} />
          ) : (
            <>
              <Route path="*" element={<Login />} />;
              <Route path="/signup" element={<Signup />} />;
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
